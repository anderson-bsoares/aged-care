import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter
import Header from '../../components/Header';

const users = [
  { id: '1', name: 'Dona Maria',age: 78, freq_cardiaca: 80, alert: 'Possível queda',last_updates: 2,image: require('../../assets/images/idosa.png') },
  { id: '2', name: 'Dona Lurdes', age: 81, freq_cardiaca: 130 ,alert: 'Frequência cardíaca alterada',last_updates: 5, image: require('../../assets/images/idosa.png') },
  { id: '3', name: 'Seu João', age: 91,freq_cardiaca: 155, alert: 'Frequência cardíaca alterada',last_updates: 10, image: require('../../assets/images/idosa.png') },
  { id: '4', name: 'Dona Vivian', age: 95, freq_cardiaca: 65, alert: 'Remédio atrasado',last_updates: 1, image: require('../../assets/images/idosa.png') },
];

export default function HomeScreen() {
  const router = useRouter(); 

  return (
    <View style={styles.container}>
      <Header>
        <Text style={styles.headerText}>Olá, Ana!</Text>
      </Header>
      <View style={styles.listContainer}>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.userCard}
              onPress={() => router.push({ pathname: '/perfil-idosos',
                params: { name: item.name,
                          alertM: item.alert,
                          freq_cardiaca: item.freq_cardiaca, 
                          last_updated: item.last_updates }})}
            >
              <Image source={item.image} style={styles.userImage} />
              <View>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userAlert}>{item.alert}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.buttonB}>
        <TouchableOpacity 
          style={styles.containerButton}
          onPress={() => router.push({ pathname: '/remedios',
            params: { name: 'item.name',
                       }})}>
          <Text style={styles.textButton}>Ver Remédios Hoje</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#EEF5F1' },
  containerButton: {
    backgroundColor: '#82CBAF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: 50,
    width: '80%',
    paddingHorizontal: 40,
  },
  listContainer: { paddingTop: 30, paddingHorizontal: 30, paddingBottom: 15 },
  buttonB: { paddingTop: 150, justifyContent: 'center', alignItems: 'center' },
  headerText: {
    fontSize: 30,
    fontFamily: 'inter',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: 30,
    marginBottom: 20,
    paddingTop: 45,
    width: '100%',
  },
  userCard: { flexDirection: 'row', alignItems: 'center', padding: 5, borderRadius: 10, marginBottom: 10 },
  userImage: { width: 70, height: 70, borderRadius: 25, marginRight: 10 },
  userName: { fontSize: 20, fontWeight: 'bold', color: '#7B7474', paddingLeft: 15 },
  userAlert: { fontSize: 16, paddingLeft: 15, color: '#BAADAD', fontWeight: '600' },
  textButton: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});