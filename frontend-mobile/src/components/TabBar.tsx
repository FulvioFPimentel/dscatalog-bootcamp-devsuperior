import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { tabbar } from '../styles'

interface TabBarProps {
    screen: string;
    setScreen: Function;
}

const TabBar:React.FC<TabBarProps> = (props) => {
    const { screen, setScreen } = props;

    function changeScreen(page: string){
        setScreen(page);
    } 

    return (
        <View style={tabbar.container}>
            <TouchableOpacity 
                style={[tabbar.pill, screen === "products" && tabbar.pillActive]} 
                activeOpacity={0.7}
                onPress={() => {changeScreen('products')}}
                >
                <Text style={[
                    tabbar.pillText, 
                    screen === "products" && 
                    tabbar.pillTextActive]}>Produtos
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[tabbar.pill, screen === "categories" && tabbar.pillActive]} 
                activeOpacity={0.7}
                onPress={() => {changeScreen('categories')}}
                >
                <Text style={[
                    tabbar.pillText, 
                    screen === "categories" && 
                    tabbar.pillTextActive]}>Categorias
                </Text>

            </TouchableOpacity>

            <TouchableOpacity 
                style={[tabbar.pill, screen === "users" && tabbar.pillActive]} 
                activeOpacity={0.7}
                onPress={() => {changeScreen('users')}}
                > 
                <Text style={[
                    tabbar.pillText, 
                    screen === "users" && 
                    tabbar.pillTextActive]}>Usúarios
                </Text>

            </TouchableOpacity>
        </View>
    )

}

export default TabBar;