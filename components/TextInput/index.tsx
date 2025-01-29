import { useState } from "react"

import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome6';

export default function COmponent({ text, icon, value, setValue, isSecure=false }) {
    const [isHidden, setIsHidden] = useState(false)

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <AntDesign name={icon} size={24} color="#79747E" />

                <TextInput
                    style={styles.textInput}
                    value={value}
                    onChangeText={(newValue)=> setValue(newValue)}
                    placeholder={text}
                    keyboardType="default"
                    secureTextEntry={isHidden}
                />
            </View>

            {isSecure && (
                <TouchableOpacity onPress={() => setIsHidden(!isHidden)} style={styles.eye}>
                    <FontAwesome name={isHidden ? "eye-slash" : "eye"} size={24} color="#79747E" />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderColor: "#79747E",
        paddingHorizontal: 20,
        width: "80%",
        borderRadius: 20,
        alignItems: "center",
        borderWidth: 1,
        marginBottom: 20,
        height: 50
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    textInput: {
        borderRadius: 20,
        marginLeft: 10,
    },
    eye: {
        right: 0
    }
});
