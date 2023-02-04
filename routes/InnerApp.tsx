import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '../components/HomeScreen'

const Stack = createNativeStackNavigator()

const InnerApp: FC = () => (
    <>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    </>
)

export { InnerApp }
