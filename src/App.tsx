import React from 'react';
import Post from './features/post/Post';
import 'beautiful-react-ui/beautiful-react-ui.css';
import User from './features/user/User';

function App() {
  return (
    <div>
      <Post userId={0} />
      <User userId={0} />
    </div>
  );
}

export default App;
