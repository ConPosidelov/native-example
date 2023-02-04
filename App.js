import { Center, NativeBaseProvider } from 'native-base'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { store } from './stores/configureStores'
import { Example } from './components/Example'
import { InnerApp } from './routes/InnerApp'

const persistor = persistStore(store)

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <NativeBaseProvider>
          <InnerApp />
        </NativeBaseProvider>
      </NavigationContainer>
    </PersistGate>
  </Provider>
)

export default App
