import React from 'react';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import Main from './components/MainComponent';

const store = ConfigureStore();

function App(props) {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
}

export default App;