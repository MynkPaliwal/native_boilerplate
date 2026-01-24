import React from 'react';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const isLoggedIn: boolean = true;
function RootNavigator() {
    return isLoggedIn ? <MainNavigator /> : <AuthNavigator />;
}

export default RootNavigator;
