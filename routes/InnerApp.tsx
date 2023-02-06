import React, { FC } from 'react'
import { StatusBar } from 'native-base';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '../components/HomeScreen'
import { Settings } from '../components/Settings'

const Stack = createNativeStackNavigator()

const InnerApp: FC = () => (
    <>
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerBackButtonMenuEnabled: true,
                headerBackTitleVisible: true
            }
        }>
            <Stack.Screen
             name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
               />
            <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
        <StatusBar />
    </>
)

export { InnerApp }
