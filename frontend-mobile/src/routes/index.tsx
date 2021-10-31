import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type StackParam = {
    Home: undefined;
    Catalog: undefined;
  };

  // Navigator
const Stack = createNativeStackNavigator<StackParam>();

import { Home, Catalog } from '../pages'

const Routes: React.FC = () => {
    return (

        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Catalog" component={Catalog}/>
        </Stack.Navigator>

    )
}

export default Routes;