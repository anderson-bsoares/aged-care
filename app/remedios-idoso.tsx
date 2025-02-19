import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Switch } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; 
import { useRouter } from 'expo-router'; 

interface Medicine {
  id: string;
  name: string;
  time: string;
  taken: boolean;
  note?: string; 
}

const medicineData: Medicine[] = [ 
  { id: '1', name: 'Omeprazol', time: '21:00', taken: false, note: 'Dificuldade em engolir' },
  { id: '2', name: 'Glifage', time: '9:00', taken: true },
  { id: '3', name: 'Plolopa', time: '12:00', taken: true },
  { id: '4', name: 'Amoxilina', time: '15:00', taken: true },

];

export default function RemediosScreen() {
  const router = useRouter(); 
  const params = useLocalSearchParams(); 
  const name = params.name as string;
  const [medicines, setMedicines] = useState<Medicine[]>(medicineData); 

  const toggleSwitch = (id: string) => { 
    setMedicines(
      medicines.map((medicine) =>
        medicine.id === id ? { ...medicine, taken: !medicine.taken } : medicine
      )
    );
  };

  const renderMedicineItem = ({ item }: { item: Medicine }) => ( 
    <View style={styles.medicineCard}>
      <View style={styles.medicineInfo}>
        <Text style={styles.medicineName}>{item.name}</Text>
        <Text style={styles.medicineTime}>{item.time}</Text>
        {item.note && <Text style={styles.medicineNote}>Obs: {item.note}</Text>}
      </View>
      <Switch
        value={item.taken}
        onValueChange={() => toggleSwitch(item.id)}
        trackColor={{ false: "#767577", true: "#BFCFC8" }}
        thumbColor={item.taken ? "#BFCFC8" : "#82CBAF"}
        ios_backgroundColor="#3e3e3e"
      />
    </View>
  
  );


  const notTakenMedicines = medicines.filter(medicine => !medicine.taken);
  const takenMedicines = medicines.filter(medicine => medicine.taken);

  return (
    <View style={styles.container}>
      {/* Green Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Remédios - {name}</Text>
      </View>
    <View style={styles.containerRemedios}>
      {notTakenMedicines.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Remédios não dados:</Text>
          <FlatList
            data={notTakenMedicines}
            keyExtractor={(item) => item.id}
            renderItem={renderMedicineItem}
          />
        </View>
      )}

      {takenMedicines.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Remédios dados:</Text>
          <FlatList
            data={takenMedicines}
            keyExtractor={(item) => item.id}
            renderItem={renderMedicineItem}
          />
        </View>
      )}
    </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF5F1',
  },
  containerRemedios: {
    padding: 20,
  },
  header: { 
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    height: 100, 
    backgroundColor: '#82CBAF', 
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: { 
    color: 'white',
    fontSize: 24,
    paddingLeft: 28,
    paddingTop: 28,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#A09A9A'
  },
  medicineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 8,
    marginBottom: 10,
    // elevation: 2, // Add a subtle shadow (Android)
    // shadowColor: '#000', // Add a subtle shadow (iOS)
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
  },
  medicineInfo: {
    flex: 1, 
  },
  medicineName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7B7474'
  },
  medicineTime: {
    fontSize: 18,
    color: '#A09A9A',
    marginTop: 5,
  },
  medicineNote: {
    fontSize: 17,
    color: '#A09A9A', 
    marginTop: 5,
  },
  editButton: {
    backgroundColor: '#82CBAF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 30,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  button: {
    marginTop: 100,
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