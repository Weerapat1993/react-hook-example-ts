import React from 'react';
import Post from './features/post/Post';
import 'beautiful-react-ui/beautiful-react-ui.css';
import User from './features/user/User';
// import { AppContextProvider } from './contexts/AppContextProvider';
import { FeatureContextProvider } from './contexts/FeatureContextProvider';

function App() {
  return (
    <div>
      {/* <AppContextProvider> */}
        <FeatureContextProvider name="post">
          <FeatureContextProvider name="user">
            <Post userId={0} />
            <User userId={0} />
          </FeatureContextProvider>
        </FeatureContextProvider>
      {/* </AppContextProvider> */}
    </div>
  );
}

export default App;
