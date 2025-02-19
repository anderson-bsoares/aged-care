import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';

const AdicionarIdoso = () => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [medicacoes, setMedicacoes] = useState([
    { id: 1, nome: '', dosagem: '', horario: '' },
  ]);
  const [observacoes, setObservacoes] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const adicionarMediacao = () => {
    const novoId = medicacoes.length + 1;
    setMedicacoes([...medicacoes, { id: novoId, nome: '', dosagem: '', horario: '' }]);
  };

  const salvar = () => {
    // Aqui você pode implementar a lógica para salvar os dados
    console.log('Dados salvos:', {
      nome,
      idade,
      medicacoes,
      observacoes,
    });

    setModalVisible(true)
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Adicionar Idoso</Text>
      </View>

      <View style={styles.content}>
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
                style={styles.input}
                placeholder="Nome do remédio"
                value={medicacao.nome}
                onChangeText={(text) => {
                  const novasMedicacoes = [...medicacoes];
                  novasMedicacoes[medicacao.id - 1] = { ...medicacao, nome: text };
                  setMedicacoes(novasMedicacoes);
                }}
              />
              <View style={styles.rowMedication}>
                <TextInput
                  style={styles.input}
                  placeholder="Dosagem"
                  value={medicacao.dosagem}
                  onChangeText={(text) => {
                    const novasMedicacoes = [...medicacoes];
                    novasMedicacoes[medicacao.id - 1] = { ...medicacao, dosagem: text };
                    setMedicacoes(novasMedicacoes);
                  }}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Horário"
                  value={medicacao.horario}
                  onChangeText={(text) => {
                    const novasMedicacoes = [...medicacoes];
                    novasMedicacoes[medicacao.id - 1] = { ...medicacao, horario: text };
                    setMedicacoes(novasMedicacoes);
                  }}
                />
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.button} onPress={adicionarMediacao}>
            <Text style={styles.buttonText}>+ Adicionar outra medicação</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Observações</Text>
          <TextInput
            style={styles.multilineInput}
            placeholder="Informações sobre idoso"
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
            <Text style={styles.modalContentText}>Idoso adicionado com sucesso!</Text>
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
  },
  headerText: { 
    color: 'white',
    fontSize: 24,
    paddingLeft: 28,
    paddingTop: 28,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#79747E',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    // backgroundColor: 'white',
    padding: 10,
    borderWidth: 1, 
    borderColor: '#79747E',
    borderRadius: 15,
    marginBottom: 10,
    paddingRight: 40,
    marginRight: 20,
    fontSize: 17,
    color: '#79747E'

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
  medicationItem: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  rowMedication: {
    flexDirection: 'row',
    // justifyContent: 'space-between'
    paddingRight: 40,
  },
  inputMedication: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
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

export default AdicionarIdoso;