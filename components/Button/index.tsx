import { StyleSheet, Text, TouchableOpacity } from 'react-native';


export default function Component({ text, ...rest }) {
  return (
    <TouchableOpacity {...rest} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#82CBAF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    height: 50,
    width: "80%"
  },
  text: {
    color: "#fff",
    fontWeight: "bold"
  }
});
