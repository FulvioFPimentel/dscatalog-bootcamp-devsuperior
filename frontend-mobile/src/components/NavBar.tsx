import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, TouchableNativeFeedback } from 'react-native';
import menu from '../assets/menu.png';
import { nav } from '../styles';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';

const NavBar: React.FC = () => {
    const [ show, setShow ] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();

    function navigate(path: any) {
        if(path) {
            setShow(false);
            navigation.navigate(path);
        }
        setShow(false);
    }

    return(
        <TouchableWithoutFeedback style={nav.drawer} onPress={() => setShow(!show)}>
            <Image source={menu} />
            {show ? (
                <View style={nav.options}>

                <TouchableHighlight 
                    activeOpacity={0.6} 
                    underlayColor="#407BFF61" 
                    style={nav.option} 
                    onPress={() => navigate("Home")}
                    >

                    <Text style={[nav.textOption, route.name === "Home" ? nav.textActive : null]}>Home</Text>
                </TouchableHighlight >

                <TouchableHighlight 
                    activeOpacity={0.6} 
                    underlayColor="#407BFF61" 
                    style={nav.option} 
                    onPress={() => navigate("Catalog")}
                    >

                    <Text style={[nav.textOption, route.name === "Catalog" ? nav.textActive : null]}>Catalogo</Text>
                </TouchableHighlight>

                <TouchableHighlight 
                    activeOpacity={0.6} 
                    underlayColor="#407BFF61" 
                    style={nav.option} 
                    onPress={() => navigate("Login")}
                    >

                    <Text style={[nav.textOption, route.name === "ADM" ? nav.textActive : null]}>ADM</Text>
                </TouchableHighlight>

            </View>) : null }
        </TouchableWithoutFeedback>
    )
}

export default NavBar;