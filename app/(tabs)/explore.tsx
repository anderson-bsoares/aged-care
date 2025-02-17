import { StyleSheet, Image, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router'; // Importa o useRouter
import Header from '../../components/Header';

const users = [
  { id: '1', name: 'Dona Maria', alert: 'Possível queda', freq_cardiaca: 80, last_updates: 2, image: require('../../assets/images/idosa.png') },
  { id: '2', name: 'Dona Lurdes', alert: 'Possível queda', freq_cardiaca: 130, last_updates: 5, image: require('../../assets/images/idosa.png') },
  { id: '3', name: 'Seu João', alert: 'Possível queda', freq_cardiaca: 155, last_updates: 10, image: require('../../assets/images/idosa.png') },
  { id: '4', name: 'Seu Vitor', alert: 'Nenhum', freq_cardiaca: 65, last_updates: 1, image: require('../../assets/images/idosa.png') },
  { id: '5', name: 'Dona Luiza', alert: 'Nenhum', freq_cardiaca: 65, last_updates: 1, image: require('../../assets/images/idosa.png') },
  { id: '6', name: 'Seu Antonio', alert: 'Nenhum', freq_cardiaca: 65, last_updates: 1, image: require('../../assets/images/idosa.png') },
  { id: '7', name: 'Dona Mara', alert: 'Nenhum', freq_cardiaca: 65, last_updates: 1, image: require('../../assets/images/idosa.png') },
  { id: '8', name: 'Dona Lilian', alert: 'Nenhum', freq_cardiaca: 65, last_updates: 1, image: require('../../assets/images/idosa.png') },
];

export default function VerIdosos() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header>
        <Text style={styles.headerText}>Idosos</Text>
      </Header>
      <View style={styles.listContainer}>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.userCard}
              onPress={() =>
                router.push({
                  pathname: '/perfil-idosos',
                  params: {
                    name: item.name,
                    alertM: item.alert,
                    freq_cardiaca: item.freq_cardiaca,
                    last_updated: item.last_updates,
                  },
                })
              }
            >
              <Image source={item.image} style={styles.userImage} />
              <View>
                <Text style={styles.userName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={true} // Esconde a barra de rolagem
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EEF5F1' }, // Garantir que ocupa toda a tela
  listContainer: { flex: 1, paddingTop: 30, paddingHorizontal: 30, paddingBottom: 15 },
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
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    // backgroundColor: '#fff',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3, // Sombra no Android
  },
  userImage: { width: 70, height: 70, borderRadius: 35, marginRight: 10 },
  userName: { fontSize: 20, fontWeight: 'bold', color: '#7B7474', paddingLeft: 15 },
});

