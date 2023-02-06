import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../stores/configureStores';
import {
    Input,
    IconButton,
    Checkbox,
    Text,
    Box,
    VStack,
    HStack,
    Heading,
    Icon,
    Center,
    useToast,
    NativeBaseProvider,
    Flex,
} from 'native-base'
import { Feather, Entypo } from '@expo/vector-icons'
import { taskAdded, taskToggled, taskRemove } from '../reducers/tasks'


const Settings = () => {
    const [inputValue, setInputValue] = useState('')
    const [translation, setTranslation] = useState('')

    const toast = useToast()
    const todoList = useSelector((state: RootState) => state.todos.entities);
    //console.log('todoList', todoList)
    const dispatch = useDispatch();

    useEffect(() => {
        //translate({q: 'привет'}).then(r => setTranslation(r))
    }, []);



    const handleDelete = (id) => {

    }

    const handleStatusChange = (id) => {

    }

    return (
        <Flex p={3} alignItems="center">
            <VStack space={2}>
                <Box height={100} maxW="300" w="100%">

                </Box>

                <Box maxW="300" w="100%">

                </Box>
            </VStack>
        </Flex>
    )
}

export { Settings }
