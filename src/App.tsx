import React from 'react';
import logo from './logo.svg';
import Post from './features/post/Post';
import 'beautiful-react-ui/beautiful-react-ui.css';
import User from './features/user/User';
import './App.css';
// import { AppContextProvider } from './contexts/AppContextProvider';
import { FeatureContextProvider } from './contexts/FeatureContextProvider';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <AppContextProvider> */}
          <FeatureContextProvider name="post">
            <FeatureContextProvider name="user">
              <Post userId={0} />
              <User userId={0} />
            </FeatureContextProvider>
          </FeatureContextProvider>
        {/* </AppContextProvider> */}
      </header>
    </div>
  );
}

export default App;
