import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../stores/configureStores';
import {
    IconButton,
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
    Select,
    CheckIcon,
} from 'native-base'
import { Feather, Entypo } from '@expo/vector-icons'
import { sourceLangChange, targetLangChange } from '../reducers/settings'



const Settings = () => {
    const langs = useSelector((state: RootState) => state.settings.langs);
    const sourceLang = useSelector((state: RootState) => state.settings.sourceLang);
    const targetLang = useSelector((state: RootState) => state.settings.targetLang);
    const dispatch = useDispatch();

    const changeSourceLang = (v) => {
        dispatch(sourceLangChange(v));
    }
    const changeTargetLang = (v) => {
        dispatch(targetLangChange(v));
    }
    return (
        <Flex p={3} alignItems="center">
            <VStack space={2} w="300">
                <HStack w="100%" justifyContent="space-between">
                    <Box justifyContent="center">
                        <Text>{'Source Lang'}</Text>
                    </Box>
                    <Box justifyContent="center">
                        <Select
                            selectedValue={sourceLang}
                            width="100px"
                            borderColor="blue.700"
                            color="blue.700"
                            textTransform="uppercase"
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="1" />
                            }}
                            _actionSheetBody={{
                                p: "10"
                            }}
                            mt={1}
                            onValueChange={itemValue => changeSourceLang(itemValue)}
                        >
                            {langs.map(({label, value}, i) => <Select.Item key={label+i} label={label} value={value} />)}
                        </Select>
                    </Box>
                </HStack>
                <HStack w="100%" justifyContent="space-between">
                    <Box justifyContent="center">
                        <Text>{'Target Lang'}</Text>
                    </Box>
                    <Box justifyContent="center">
                        <Select
                            selectedValue={targetLang}
                            width="100px"
                            borderColor="blue.700"
                            color="blue.700"
                            textTransform="uppercase"
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="1" />
                            }}
                            _actionSheetBody={{
                                p: "10"
                            }}
                            mt={1}
                            onValueChange={itemValue => changeTargetLang(itemValue)}
                        >
                            {langs.map(({label, value}, i) => <Select.Item key={label+i} label={label} value={value} />)}
                        </Select>
                    </Box>
                </HStack>
            </VStack>
        </Flex>
    )
}

export { Settings }
