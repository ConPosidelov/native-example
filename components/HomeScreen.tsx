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



const translate = async ({ q, sourceLang = 'en', targetLang = 'ru' }) => {
    const options = {
        method: 'GET',
        url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/get',
        params: { langpair: `${sourceLang}|${targetLang}`, q, mt: '1', onlyprivate: '0', de: 'a@b.c' },
        headers: {
            'X-RapidAPI-Key': '4d631c1aa7msh898ea8edaa21832p1f1a9ejsn7932d54855c3',
            'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
        }
    };
    try {
        const res = await axios.request(options)
        if(res) {
            return res.data.matches[0].translation
        } else {
            return null
        }
    } catch {
        console.error(error)
    }
}


const HomeScreen = () => {
    const [inputValue, setInputValue] = useState('')
    const [translation, setTranslation] = useState('')

    const toast = useToast()
    const todoList = useSelector((state: RootState) => state.todos.entities);
    //console.log('todoList', todoList)
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('=======================translation2==================================', translation);
    }, [translation]);
    useEffect(() => {
        //translate({q: 'привет'}).then(r => setTranslation(r))
    }, []);

    const addItem = async (title) => {
        console.log('addItem1=====')
        if(title === '') {
            toast.show({
                title: 'Please Enter Text',
                status: 'warning',
            })
            return
        } else {
            let temp = title.trim();
            //dispatch(taskAdded({ id: Date.now(), title: temp, isCompleted: false }));
            //console.log('addItem2=====')
            translate({ q: temp, sourceLang: 'ru', targetLang: 'en' }).then(r => {
                setTranslation(r)
                dispatch(taskAdded({ id: Date.now(), origin: temp, translation: r, isCompleted: false }));
            })
        }
    }

    const handleDelete = (id) => {
        dispatch(taskRemove(id));
    }

    const handleStatusChange = (id) => {
        dispatch(taskToggled(id));
    }

    return (
        <Flex p={3} alignItems="center">
            <VStack space={2}>
                <Box height={100} maxW="300" w="100%">
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
