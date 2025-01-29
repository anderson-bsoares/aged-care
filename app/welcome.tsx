import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

import { useRouter } from "expo-router";

import Header from "../components/Header"
import Button from "../components/Button"

export default function HomeScreen() {
  const router = useRouter();

  return (
    <>
      <Header>
        <Image style={styles.image} source={require("../assets/images/Logo.png")} />
      </Header>

      <View style={styles.container}>
        <Button onPress={() => router.push("/login")} text="INICIAR" />

        <Text style={styles.text}>Política de privacidade</Text>
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
  stepContainer: {
    gap: 8,
    marginBottom: 8,
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
