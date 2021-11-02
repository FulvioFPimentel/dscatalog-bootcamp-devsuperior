import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { theme } from '../styles';
import eyesOpened from '../assets/eyes-opened.png';
import eyesClosed from '../assets/eyes-closed.png';
import arrow from '../assets/arrow.png';

const Login: React.FC = () => {
    const [ hidePassword, setHidePassword ] = useState(true);

    return (
        <View style={theme.container}>
           <View style={theme.card}>
            <Text>Login</Text>
            <View style={theme.form}>
                <TextInput 
                    placeholder="Email" 
                    autoCapitalize="none" 
                    keyboardType="email-address" 
                    style={theme.textInput}
                />
                <View style={theme.passwordContainer}>
                    <TextInput 
                        placeholder="Senha" 
                        autoCapitalize="none" 
                        style={theme.textInput}
                    />
                    <TouchableOpacity 
                        style={theme.toggle}
                        onPress={() => setHidePassword(!hidePassword)}>
                        <Image source={hidePassword ? eyesOpened : eyesClosed} style={theme.eyes} />
                    </TouchableOpacity>
                </View>
            </View>
           </View>
        </View>
    )
}

export default Login;