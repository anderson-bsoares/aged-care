import { createContext, useContext, useEffect, useState } from 'react'

import { Platform, PermissionsAndroid } from "react-native"

import BluetoothSerial, { BluetoothDevice } from "react-native-bluetooth-classic";

export interface IBluetoohProps {
    lastTime: string,
    devices: BluetoothDevice[],
    connectedDevice: BluetoothDevice | null,
    receivedData: string,
    listDevices: () => Promise<void>,
    connectToDevice: (device: BluetoothDevice) => Promise<void>
}

const BluetoothContext = createContext({} as IBluetoohProps)

export const BluetoothProvider = ({ children }: { children: React.ReactNode }) => {
    const [devices, setDevices] = useState<BluetoothDevice[]>([]);
    const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
    const [receivedData, setReceivedData] = useState<string>("");
    const [lastTime, setLastTime] = useState<string>("")

    async function requestBluetoothPermission() {
        if (Platform.OS === "android") {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            ]);

            return (
                granted["android.permission.BLUETOOTH_CONNECT"] === PermissionsAndroid.RESULTS.GRANTED &&
                granted["android.permission.BLUETOOTH_SCAN"] === PermissionsAndroid.RESULTS.GRANTED
            );
        }

        throw Error("Vai pro android!")
    }

    async function listDevices() {
        try {
            const isEnable = await requestBluetoothPermission()

            if (isEnable) {
                const pairedDevices = await BluetoothSerial.startDiscovery();

                setDevices(pairedDevices);
            }
        } catch (error) {
            console.error("Erro ao listar dispositivos:", error);
        }
    }

    async function connectToDevice(device: BluetoothDevice) {
        try {
            const connected = await BluetoothSerial.connectToDevice(device.id);
            setConnectedDevice(connected ? device : null);
            console.log(`Conectado a ${device.name}`);
        } catch (error) {
            console.error("Erro ao conectar:", error);
        }
    }

    useEffect(() => {
        listDevices();
        
        if (connectedDevice) {
          const subscription = BluetoothSerial.onDeviceRead(
            connectedDevice.id,
            (event) => {
              const data = event.data;
              console.log('Dados recebidos:', data);
              setReceivedData((prevData) => prevData + data + '\n'); 
              setLastTime(new Date().toISOString())
            }
          );
    
          return () => {
            if (subscription) {
              subscription.remove(); 
            }
          };
        }
      }, [connectedDevice]);

    return <BluetoothContext.Provider value={{
        lastTime,
        devices,
        connectedDevice,
        receivedData,
        listDevices,
        connectToDevice 
    }}>
        {children}
    </BluetoothContext.Provider>
}

export const useBluetooh = () => useContext(BluetoothContext)