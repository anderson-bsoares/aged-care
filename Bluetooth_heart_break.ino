#include "BluetoothSerial.h"
#include <Wire.h>
#include "MAX30105.h"   
#include "heartRate.h"  
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>

#if !defined(CONFIG_BT_ENABLED) || !defined(CONFIG_BLUEDROID_ENABLED)
#error Bluetooth is not enabled! Please run `make menuconfig` to enable it
#endif

BluetoothSerial SerialBT;  

MAX30105 particleSensor;  
Adafruit_MPU6050 mpu;

float prevAccelMagnitude = 0.0; 
float accelThreshold = 10.0;  
const byte RATE_SIZE = 4; 
byte rates[RATE_SIZE];   
byte rateSpot = 0;
long lastBeat = 0;  
float beatsPerMinute;
int beatAvg;

void setup() {
  Serial.begin(115200);
  SerialBT.begin("ESP32test");  
  Serial.println("O dispositivo foi iniciado, agora você pode parear com o Bluetooth!");

  if (particleSensor.begin(Wire, I2C_SPEED_FAST) == false) {
    Serial.println("Sensor não encontrado. Verifique a fiação/energia.");
    while (1);  
  }

  particleSensor.setup();                     
  particleSensor.setPulseAmplitudeRed(0x0A);   
  Serial.println("Sensor encontrado.");
  Serial.begin(115200);
  while (!Serial)
    delay(10);

  Serial.println("Adafruit MPU6050 test!");

  if (!mpu.begin()) {
    Serial.println("Failed to find MPU6050 chip");
    while (1) {
      delay(10);
    }
  }
  Serial.println("MPU6050 Found!");

  mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
  mpu.setGyroRange(MPU6050_RANGE_500_DEG);
  mpu.setFilterBandwidth(MPU6050_BAND_5_HZ);
  
  Serial.println("");
  delay(100);
}

void loop() {
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

  float accelMagnitude = sqrt(a.acceleration.x * a.acceleration.x + 
                              a.acceleration.y * a.acceleration.y + 
                              a.acceleration.z * a.acceleration.z);

  float accelVariation = fabs(accelMagnitude - prevAccelMagnitude);

  if (accelVariation > accelThreshold) {
    Serial.print("Queda detectada! ");
    Serial.print("Variação de aceleração: ");
    Serial.println(accelVariation);

    Serial.print("Aceleração X: ");
    Serial.print(a.acceleration.x);
    Serial.print(", Y: ");
    Serial.print(a.acceleration.y);
    Serial.print(", Z: ");
    Serial.print(a.acceleration.z);
    Serial.println(" m/s^2");

    Serial.print("Rotação X: ");
    Serial.print(g.gyro.x);
    Serial.print(", Y: ");
    Serial.print(g.gyro.y);
    Serial.print(", Z: ");
    Serial.print(g.gyro.z);
    Serial.println(" rad/s");

    Serial.print("Temperatura: ");
    Serial.print(temp.temperature);
    Serial.println(" degC");

    Serial.println("");
  }

  prevAccelMagnitude = accelMagnitude;

  long irValue = particleSensor.getIR();  

  if (irValue > 7000) { 
    if (checkForBeat(irValue)) { 
      long delta = millis() - lastBeat; 
      lastBeat = millis();

      beatsPerMinute = 60 / (delta / 1000.0);  
      if (beatsPerMinute < 255 && beatsPerMinute > 20) {  
        rates[rateSpot++] = (byte)beatsPerMinute;
        rateSpot %= RATE_SIZE;


        beatAvg = 0;
        for (byte x = 0; x < RATE_SIZE; x++) {
          beatAvg += rates[x];
        }
        beatAvg /= RATE_SIZE;
      }

      SerialBT.print("[Heart] ");
      SerialBT.print(beatAvg);
      SerialBT.println(" BPM");
    }
  }

  if (irValue < 7000) {  
    beatAvg = 0;
    Serial.println("Por favor, coloque seu dedo no sensor.");
    SerialBT.println("[Heart] sem sinal");  
  }

  if (Serial.available()) {
    SerialBT.println(" BPM");
    SerialBT.write(Serial.read()); 
  }

  if (SerialBT.available()) {
    Serial.write(SerialBT.read());
  }

  delay(20);
}

