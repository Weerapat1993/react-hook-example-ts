import React from 'react';
import logo from './logo.svg';
import Post from './features/post/Post';
import 'beautiful-react-ui/beautiful-react-ui.css';
import User from './features/user/User';
import './App.css';
import { Provider } from './config/context';
import { store } from './app/store';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Provider store={store} features={['post', 'user']}>
          <Post userId={0} />
          <User userId={0} />
        </Provider>
      </header>
    </div>
  );
}

export default App;
