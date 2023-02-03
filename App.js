import { Center, NativeBaseProvider } from 'native-base'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { store } from './stores/configureStores'
import { Example } from './components/Example'

const persistor = persistStore(store)

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NativeBaseProvider>
        <Center flex={1} px="3">
          <Example />
        </Center>
      </NativeBaseProvider>
    </PersistGate>
  </Provider>
)

export default App
