import React from 'react';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Loading } from './components/LoadingComponent';
import Main from './components/MainComponent';

const { persistor, store } = ConfigureStore();

function App(props) {
    return (
        <Provider store={store}>
            <PersistGate
                loading={<Loading />}
                persistor={persistor}
            >
                <Main />
            </PersistGate>
        </Provider>
    );
}

export default App;