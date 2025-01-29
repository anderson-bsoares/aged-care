import { StyleSheet, View } from 'react-native';

export default function Component({ children }) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: "#82CBAF",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center"
  }
});
