import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';

const App = () => {
  const [nome, setNome] = useState('Maria Aparecida Evangelista Alves da Silva');
  const [idade, setIdade] = useState('61 anos');
  const [medicacoes, setMedicacoes] = useState([
    { id: 1, horario: '10h', remedio: 'Prolopa 2 cp' },
    { id: 2, horario: '12h', remedio: 'Glifage 2 cp' },
    { id: 3, horario: '20h', remedio: 'Rivotril 2 cp' },
  ]);
  const [observacoes, setObservacoes] = useState('Dificuldade em engolir remédios');
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar o Modal

  const adicionarRemedio = () => {
    const novoId = medicacoes.length + 1;
    setMedicacoes([...medicacoes, { id: novoId, horario: '', remedio: '' }]);
  };

  const salvar = () => {
    // Aqui você pode implementar a lógica para salvar os dados
    console.log('Dados salvos:', {
      nome,
      idade,
      medicacoes,
      observacoes,
    });
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Editar Idoso</Text>
      </View>

      <View style={styles.subContainer}>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dados gerais</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.inputIdade}
          placeholder="Idade"
          value={idade}
          onChangeText={setIdade}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medicações</Text>
        {medicacoes.map((medicacao) => (
          <View key={medicacao.id} style={styles.medicationItem}>
            <TextInput
              style={styles.inputMedicationRemedio}
              placeholder="Horário"
              value={medicacao.horario}
              onChangeText={(text) => {
                const novosMedicamentos = [...medicacoes];
                novosMedicamentos[medicacao.id - 1] = { ...medicacao, horario: text };
                setMedicacoes(novosMedicamentos);
              }}
            />
            <TextInput
              style={styles.inputMedication}
              placeholder="Remédio"
              value={medicacao.remedio}
              onChangeText={(text) => {
                const novosMedicamentos = [...medicacoes];
                novosMedicamentos[medicacao.id - 1] = { ...medicacao, remedio: text };
                setMedicacoes(novosMedicamentos);
              }}
            />
          </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={adicionarRemedio}>
          <Text style={styles.buttonText}>+ Adicionar outro Remédio</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Observações</Text>
        <TextInput
          style={styles.multilineInput}
          placeholder="Observações"
          multiline
          value={observacoes}
          onChangeText={setObservacoes}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={salvar}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
      </View>
      <Modal
        animationType="slide" // Ou "fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalContentText}>Dados alterados com sucesso!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF5F1',
    // padding: 20,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo semi-transparente
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalButton: {
    backgroundColor: "#82CBAF",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  modalContentText: {
    fontSize: 17,
    color: '#7B7474'
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  subContainer: {
    padding: 20,
  },
  button: {
    marginTop: 15,
    backgroundColor: '#82CBAF',
    padding: 13,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginLeft: 35,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerText: { 
    color: 'white',
    fontSize: 24,
    paddingLeft: 28,
    paddingTop: 28,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#79747E'
  },
  input: {
    // backgroundColor: 'white',
    padding: 10,
    borderWidth: 1, 
    borderColor: '#79747E',
    borderRadius: 15,
    marginBottom: 10,
    fontSize: 17,
    color: '#79747E'

  },
  inputIdade: {
    padding: 10,
    borderWidth: 1, 
    borderColor: '#79747E',
    borderRadius: 15,
    marginBottom: 10,
    fontSize: 17,
    marginRight: 280,
    color: '#79747E'
  },
  medicationItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  inputMedication: {
    flex: 1,
    // backgroundColor: 'white',
    borderWidth: 1, 
    borderColor: '#79747E',
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
    color: '#79747E',
    fontSize: 17,
  },
  inputMedicationRemedio: {
    width: 80,
    // backgroundColor: 'white',
    borderWidth: 1, 
    borderColor: '#79747E',
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
    color: '#79747E',
    fontSize: 17,
  },
  addButton: {
    backgroundColor: '#82CBAF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  multilineInput: {
    // backgroundColor: 'white',
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    borderWidth: 1, 
    borderColor: '#79747E',
    borderRadius: 15,
    fontSize: 17,
    color: '#79747E'
  },
  saveButton: {
    backgroundColor: '#82CBAF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default App;