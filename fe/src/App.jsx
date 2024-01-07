import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux';
import AppRouter from './router';

const App = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

export default App;

