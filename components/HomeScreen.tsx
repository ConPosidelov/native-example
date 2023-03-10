import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../stores/configureStores';
import {
    Input,
    IconButton,
    Checkbox,
    Divider,
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
import { Feather, Entypo, MaterialIcons } from '@expo/vector-icons'
import { taskAdded, taskToggled, taskRemove, fetchTranslation } from '../reducers/tasks'



const HomeScreen = ({ navigation: { navigate } }) => {
    const [inputValue, setInputValue] = useState('')
    const [translation, setTranslation] = useState('')
    const toast = useToast()
    const dispatch = useDispatch();
    const todoList = useSelector((state: RootState) => state.tasks.entities);
    const sourceLang = useSelector((state: RootState) => state.settings.sourceLang);
    const targetLang = useSelector((state: RootState) => state.settings.targetLang);

    const addItem = async (title) => {
        if(title === '') {
            toast.show({
                title: 'Please Enter Text',
                status: 'warning',
            })
            return
        } else {
            let temp = title.trim();
            await dispatch(fetchTranslation(temp))
        }
    }

    const handleDelete = (id) => {
        dispatch(taskRemove(id));
    }

    const handleStatusChange = (id) => {
        dispatch(taskToggled(id));
    }

    return (
        <Flex p={3} alignItems="center" pt="7">
            <VStack space={2} w="300">
                <HStack w="100%" space={1} justifyContent="space-between">
                    <Box justifyContent="center">
                        <Text textTransform={'uppercase'}>{`${sourceLang} --> ${targetLang}`}</Text>
                    </Box>
                    <IconButton
                        size="sm"
                        variant="outline"

                        _icon={{
                            as: MaterialIcons,
                            name: "settings"
                        }}
                        onPress={() => {
                            navigate('Settings')
                        }}
                    />
                </HStack>
                <Divider thickness="2" mb="10" orientation="horizontal" />
                <Box height={50} maxW="300" w="100%">
                    <HStack space={2} w="100%" >
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
                </Box>

                <Box maxW="300" w="100%">
                    <VStack space={4}>
                        <VStack space={2}>
                            {todoList.map((item, itemI) => (
                                <HStack
                                    w="100%"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    key={item.translation + itemI.toString()}
                                >
                                    <Checkbox
                                        isChecked={item.isCompleted}
                                        onChange={() => handleStatusChange(item.id)}
                                        value={item.translation}
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
                                        {`${item.translation} (${item.origin})`}
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
            </VStack>
        </Flex>
    )
}

export { HomeScreen }
