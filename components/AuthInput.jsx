import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react';

function AuthInput({
    label,
    keyboardType,
    secure,
    onUpdateValue,
    isInvalid,
    placeholder,
    icon1,
    icon2,
    value,
    onFocus
    
}) {
    // const [isInvalid,setIsValid] = useState(false)
    const [isSecure,setIsSecure]= useState(secure)
    return (
        <View style={styles.inputContainer}>
            {isInvalid&&<Text style={[styles.label, isInvalid && styles.labelInvalid]}>
                {label}
            </Text>}
            <View style={styles.inputInnerContainer}>
                <Ionicons name={icon1} size={24} />
                <TextInput
                    style={[styles.input, isInvalid && styles.inputInvalid]}
                    autoCapitalize="none"
                    keyboardType={keyboardType}
                    secureTextEntry={isSecure}
                    onChangeText={(text)=>onUpdateValue(text)}
                    value={value}
                    onFocus={onFocus}
                    placeholder={placeholder}
                    autoCorrect={false}
                    spellCheck={false}
                />
                {icon2 && <Ionicons name={isSecure ? 'eye-off' : 'eye'} size={20} onPress={()=>setIsSecure(!isSecure)} />}
            </View>
        </View>
    );
}

export default AuthInput;

const styles = StyleSheet.create({
    inputInnerContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: '1%',
        paddingHorizontal: '3%',
        borderRadius:10,
        borderWidth:1,
        borderColor:''
    },
    inputContainer: {
        marginVertical: '2%',
        width: '100%',
    },
    label: {
        color: 'white',
        marginBottom: 4,
    },
    labelInvalid: {
        color: 'red',
    },
    input: {
        fontSize: 16,
        width: '80%',
        paddingVertical:'2%',
        marginLeft:'2%'
    },
    inputInvalid: {
        backgroundColor: 'red',
    },
});
