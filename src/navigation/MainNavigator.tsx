import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import SecondMainScreen from '../screens/SecondMainScreen';

export type MainStackParamList = {
    MainScreen: undefined;
    SecondMainScreen: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="SecondMainScreen" component={SecondMainScreen} />
        </Stack.Navigator>
    );
};

export default MainNavigator;
