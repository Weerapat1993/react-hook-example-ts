import React from 'react';
import logo from './logo.svg';
import Post from './features/post/Post';
import 'beautiful-react-ui/beautiful-react-ui.css';
import User from './features/user/User';
import './App.css';
import { Provider } from './utils/use-codex';
import { store } from './app/store';
import TestHOC from './features/user/TestHoc';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Provider store={store}>
          <Post userId={0} />
          <User userId={0} />
          <TestHOC userId={1} />
        </Provider>
      </header>
    </div>
  );
}

export default App;
