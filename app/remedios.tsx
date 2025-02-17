import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Switch } from 'react-native';

interface Medicine {
  id: number;
  nome: string;
  horario: string;
  remedio: string;
  taken: boolean;
}

const VerRemedios = () => {
  const [agora, setAgora] = useState<Medicine[]>([
    { id: 1, nome: 'Dona Maria', horario: '9h', remedio: 'Glifage 1cp', taken: false },
    { id: 2, nome: 'Dona Maria', horario: '9h', remedio: 'Glifage 1cp', taken: false },
    { id: 3, nome: 'Dona Maria', horario: '9h', remedio: 'Glifage 1cp', taken: false },
    { id: 4, nome: 'Dona Maria', horario: '9h', remedio: 'Glifage 1cp', taken: false },
  ]);

  const [proximos, setProximos] = useState<Medicine[]>([
    { id: 5, nome: 'Dona Maria', horario: '9h30', remedio: 'Glifage 1cp', taken: false },
    { id: 6, nome: 'Dona Maria', horario: '9h45', remedio: 'Glifage 1cp', taken: false },
  ]);

  const toggleSwitch = (id: number, list: 'agora' | 'proximos') => {
    if (list === 'agora') {
      setAgora(prevAgora => prevAgora.map(item =>
        item.id === id ? { ...item, taken: !item.taken } : item
      ));
    } else {
      setProximos(prevProximos => prevProximos.map(item =>
        item.id === id ? { ...item, taken: !item.taken } : item
      ));
    }
  };

  const renderItem = ({ item, list }: { item: Medicine, list: 'agora' | 'proximos' }) => (
    <View style={styles.item}>
      <Image source={require('../assets/images/idosa.png')} style={styles.imagem} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.remedio}>{item.horario} - {item.remedio}</Text>
      </View>
      {list === 'agora' && ( // Condição para exibir o Switch
      <Switch
        value={item.taken}
        trackColor={{ false: "#767577", true: "#BFCFC8" }}
        thumbColor={item.taken ? "#BFCFC8" : "#82CBAF"}
        onValueChange={() => toggleSwitch(item.id, list)}
      />
    )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Remédios</Text>
      </View>

      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>Agora:</Text>
        <FlatList
          data={agora}
          renderItem={({ item }) => renderItem({ item, list: 'agora' })}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>Próximos:</Text>
        <FlatList
          data={proximos}
          renderItem={({ item }) => renderItem({ item, list: 'proximos' })}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF5F1',
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
  secao: {
    margin: 20,
  },
  secaoTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#BAADAD'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  imagem: {
    width: 70,
    height: 70,
    borderRadius: 25,
    marginRight: 10,
  },
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7B7474', 
    paddingLeft: 15
  },
  remedio: {
    color: '#BAADAD', 
    paddingLeft: 15,
    fontSize: 18,
    fontWeight:'400',
    
  }
});

export default VerRemedios;