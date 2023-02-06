import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '../components/HomeScreen'
import { Settings } from '../components/Settings'

const Stack = createNativeStackNavigator()

const InnerApp: FC = () => (
    <>
        <Stack.Navigator
            screenOptions={{
                headerTitle: '',
                headerShown: true,
                headerBackButtonMenuEnabled: true,
                headerBackTitleVisible: true
            }
        }>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
    </>
)

export { InnerApp }
