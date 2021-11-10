import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, TouchableNativeFeedback } from 'react-native';
import menu from '../assets/menu.png';
import { nav, text } from '../styles';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { doLogout, isAuthenticated } from '../services/auth';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParam } from '../routes';

type navigationScreenProp = StackNavigationProp<StackParam>;

const NavBar: React.FC = () => {
    const [ show, setShow ] = useState(false);
    const [ authenticated, setAuthenticated ] = useState(false);
    const navigation = useNavigation<navigationScreenProp>();
    const route = useRoute();

    function navigate(path: any) {
        if(path) {
            setShow(false);
            navigation.navigate(path);
        }
        setShow(false);
    }

    async function logged () {
        const result = await isAuthenticated();
        result ? setAuthenticated(true) : setAuthenticated(false)
    }

    function logout () {
        doLogout();
        navigation.navigate("Login")
    }

    useEffect(() => {
        logged();
    }, [])

    return(

    <>
        {authenticated ? (
            <TouchableOpacity style={nav.logoutBtn} onPress={() => logout()}>
                <Text style={text.logoutText}>Logout</Text>
            </TouchableOpacity>

        ) : (

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
        )}
    </>


    )
}

export default NavBar;