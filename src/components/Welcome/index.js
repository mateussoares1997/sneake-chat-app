import React from 'react';
import { useHistory } from 'react-router-dom';

const Welcome = (props) => {
  
  const { userName, setUserName } = props
  const history = useHistory()

  const handleChange = (event) => {
    const value  = event.target.value
    setUserName(value)
  }

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      history.push('/chat');
    }
  }

  return (
    <div className="welcome">
      <label>
        Hello, <input onKeyPress={handleKeyPress} onChange={handleChange} value={userName} autoFocus/>
      </label>
    </div>
  );
}

export default Welcome;
