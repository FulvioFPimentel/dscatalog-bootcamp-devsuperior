import React from 'react';
import { Home, Catalog, ProductDetails, Login, Dashboard } from '../pages'
import { colors, nav } from '../styles';
import { NavBar } from "../components"
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

export type StackParam = {
    Home: undefined;
    Catalog: undefined;
    ProductDetails: { id: Number };
    Login: undefined;
    Dashboard: undefined;
  };

  // Navigator
const Stack = createStackNavigator<StackParam>();

const HeaderText: React.FC = () => <Text style={nav.leftText}>DS Catalog</Text>;


const Routes: React.FC = () => {
    return (

        <Stack.Navigator screenOptions={{
            headerTitle: " ",
            headerStyle: {
                backgroundColor: colors.primary,
            },
            headerLeft: () => <HeaderText />,
            headerRight: () => <NavBar/>
        }}
        >
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Catalog" component={Catalog}/>
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
    )
}

export default Routes;