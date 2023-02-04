import { useState } from 'react'
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
} from 'native-base'
import { Feather, Entypo } from '@expo/vector-icons'
import { taskAdded, taskToggled, taskRemove } from '../reducers/tasks'


const HomeScreen = () => {
    const [inputValue, setInputValue] = useState('')
    const toast = useToast()
    const todoList = useSelector((state: RootState) => state.todos.entities);
    //console.log('todoList', todoList)
    const dispatch = useDispatch();

    const addItem = (title) => {
        if(title === '') {
            toast.show({
                title: 'Please Enter Text',
                status: 'warning',
            })
            return
        } else {
            let temp = title.trim();
            dispatch(taskAdded({ id: Date.now(), title: temp, isCompleted: false }));
        }
    }

    const handleDelete = (id) => {
        dispatch(taskRemove(id));
    }

    const handleStatusChange = (id) => {
        dispatch(taskToggled(id));
    }

    return (
        <Center flex={1} px="3">
            <Center w="100%">
                <Box maxW="300" w="100%">
                    <Heading mb="2" size="md">
                        Wednesday
                    </Heading>
                    <VStack space={4}>
                        <HStack space={2}>
                            <Input
                                flex={1}
                                onChangeText={(v) => setInputValue(v)}
                                value={inputValue}
                                placeholder="Add Task"
                            />
                            <IconButton
                                borderRadius="sm"
                                variant="solid"
                                icon={
                                    <Icon as={Feather} name="plus" size="sm" color="warmGray.50" />
                                }
                                onPress={() => {
                                    addItem(inputValue)
                                    setInputValue('')
                                }}
                            />
                        </HStack>
                        <VStack space={2}>
                            {todoList.map((item, itemI) => (
                                <HStack
                                    w="100%"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    key={item.title + itemI.toString()}
                                >
                                    <Checkbox
                                        isChecked={item.isCompleted}
                                        onChange={() => handleStatusChange(item.id)}
                                        value={item.title}
                                    ></Checkbox>
                                    <Text
                                        width="100%"
                                        flexShrink={1}
                                        textAlign="left"
                                        mx="2"
                                        strikeThrough={item.isCompleted}
                                        _light={{
                                            color: item.isCompleted ? 'gray.400' : 'coolGray.800',
                                        }}
                                        _dark={{
                                            color: item.isCompleted ? 'gray.400' : 'coolGray.50',
                                        }}
                                        onPress={() => handleStatusChange(item.id)}
                                    >
                                        {item.title}
                                    </Text>
                                    <IconButton
                                        size="sm"
                                        colorScheme="trueGray"
                                        icon={
                                            <Icon
                                                as={Entypo}
                                                name="minus"
                                                size="xs"
                                                color="trueGray.400"
                                            />
                                        }
                                        onPress={() => handleDelete(item.id)}
                                    />
                                </HStack>
                            ))}
                        </VStack>
                    </VStack>
                </Box>
            </Center>
        </Center>
    )
}

export { HomeScreen }
