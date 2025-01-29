import { useState } from "react"

import { StyleSheet, Text, View, Image } from 'react-native';

import { useRouter } from "expo-router"

import AntDesign from '@expo/vector-icons/AntDesign';

import Header from "../components/Header"
import Button from "../components/Button"
import TextInput from "../components/TextInput"

export default function HomeScreen() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    if (email === "Admin" && password === "Admin") {
      router.push("/(tabs)")
    }
  }

  return (
    <>
      <Header>
        <Image style={styles.image} source={require("../assets/images/Logo.png")} />
      </Header>

      <View style={styles.container}>
        <View style={styles.inputs}>
          <TextInput text="Email" icon="mail" value={email} setValue={setEmail} />
          <TextInput text="Senha" icon="lock" value={password} setValue={setPassword} isSecure />
        </View>

        <Button onPress={handleLogin} text="ENTRAR" />

        <Text style={styles.text}>Esqueci minha senha</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputs: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  button: {
    backgroundColor: "#82CBAF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    height: 50,
    // padding: 50
    width: "80%"
  },
  textButton: {
    color: "#fff",
    fontWeight: "bold"
  },
  text: {
    color: "#79747E",
    marginTop: 20
  },
  image: {
    marginTop: 100
  }
});
