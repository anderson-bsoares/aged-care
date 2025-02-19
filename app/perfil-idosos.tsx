import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // Import useLocalSearchParams
import { useRouter } from 'expo-router'; // Import useRouter

import { useBluetooh } from "../hooks/useBluetooh"

import { elapsedTime } from "../utils/time"

const users = [
  { id: '1', name: 'Dona Maria',remedios: 'Glifage', horario: '16h30', image: require('../assets/images/idosa.png') },
  { id: '2', name: 'Dona Lurdes', remedios: 'Prolopa', horario: '16h30', image: require('../assets/images/idosa1.png') },
  { id: '3', name: 'Seu João', remedios: 'Frontal', horario: '16h40', image: require('../assets/images/idoso2.png') },
  { id: '4', name: 'Dona Vivian', remedios: 'Glifage', horario: '16h45', image: require('../assets/images/idoso4.png') },
];


export default function ProfileIdosoScreen() {
  const { receivedData, lastTime, connectedDevice } = useBluetooh()

  const router = useRouter(); 
  const params = useLocalSearchParams(); // Access all parameters
  const name = params.name as string;
  const alertM = params.alertM as string;
  const freq_cardiaca = params.freq_cardiaca as string;
  const last_updated = params.last_updated as string; // Extract the name parameter and cast it to a string

  if (!name) {
    return (
      <View style={styles.container}>
        <Text>Error: No name parameter provided.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header verde */}
      <View style={styles.headerGreen} />

      {/* Card do perfil */}
      <View style={styles.profileCard}>
        <Image source={require('../assets/images/idosa.png')} style={styles.profileImage} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.age}>61 anos</Text>
      </View>

      {/* Informações de saúde */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Frequência</Text>
          <Text style={styles.infoValue}>{connectedDevice ? receivedData?.split("[Heart]")[1] : freq_cardiaca} bpm</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Alerta</Text>
          <Text style={styles.infoValue}>{connectedDevice ? receivedData?.split("[Break]")[1] : alertM}</Text>
        </View>
        <Text style={styles.lastUpdate}>Última atualização: {connectedDevice ? elapsedTime(lastTime) : last_updated} minuto(s) atrás</Text>
      </View>

      {/* Botão de remédios */}
      <TouchableOpacity style={styles.button} onPress={() => router.push({ pathname: '/remedios-idoso',
            params: { name: name,
                       }})}>
        <Text style={styles.buttonText}>Remédios de {name}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push({ pathname: '/editar-remedios',
            params: { name: name,
                       }})}>
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EAF4F4',
    paddingHorizontal: 20,
  },
  headerGreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 280, // Altura do header verde
    backgroundColor: '#82CBAF', // Cor verde
    borderBottomLeftRadius: 30, // Bordas arredondadas
    borderBottomRightRadius: 30,
  },
  profileCard: {
    alignItems: 'center',
    marginTop: 50,
    zIndex: 1, // Garante que o card fique acima do header verde
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 80,
    borderWidth: 3, // Borda branca ao redor da imagem
    borderColor: '#FFF',
  },
  editButton: {
    backgroundColor: '#82CBAF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: 30,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    paddingHorizontal: 68,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white',
  },
  age: {
    fontSize: 22,
    color: 'white',
    marginTop: 5,
  },
  infoContainer: {
    marginTop: 50,
    width: '100%',
    // backgroundColor: '#FFF', // Fundo branco para as informações
    borderRadius: 15,
    padding: 20,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 6,
    // elevation: 3, // Sombra no Android
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  infoLabel: {
    fontSize: 18,
    color: '#7B7474',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  lastUpdate: {
    fontSize: 17,
    color: '#C1B2B2',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 70,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#82CBAF',
    padding: 13,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});