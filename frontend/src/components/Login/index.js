import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useLocalState } from '../../util/useLocalStorage';
import './LoginForm.css';

const Login = () => {
    const [jwt, setJwt] = useLocalState("", "jwt")
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const usernameRegexp = /^\w+$/;
    const usernameMessage = 'Login can contain only letters, numbers or _ character';
    const passwordRegexp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
    const passwordMessage = "Password must contain: a digit, a lower case letter, an uppercase letter, a special character," +
                  " must be at least 8 characters long and cannot contain any spaces";
    const mandatoryMessage = ' is mandatory!';
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if(!username) {
        setError('Username '+mandatoryMessage);
      } else if(username.length < 3 || username.length > 32) {
        setError('Username must be between 3 and 32 characters long');
      } else if (!usernameRegexp.test(username)) {
        setError(usernameMessage);
      } else if (!password) {
        setError('Password '+mandatoryMessage);
      } else if (!passwordRegexp.test(password)) {
        setError(passwordMessage);
      } else {
        const reqBody = {
            login: username,
            password: password,
          }; 
        try {
            const response = await fetch("/persons/auth/authenticate", {
                headers: {
                  "Content-Type": "application/json",
                },
                method: "post",
                body: JSON.stringify(reqBody),
              })
            
            if(response.status === 200) {
                const data = await response.json();
                alert('Logged in successful!');
                setJwt(data.token);
              } else if(response.status === 403) {
                setError('Invalid credentials!');
              } else {
                throw new Error();
              }
        } catch(error) {
            console.log(error);
            setError('An error occurred, please try again later.')
        }
      }
    }
    if(jwt) return <Navigate to="/"/>  
    else
    return (<div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username" >Username:</label>
            <input
              className="login-input"
              type="text"
              name="username"
              placeholder='Username'
              value={username}
              onChange={event => setUsername(event.target.value)}
            />
          
          <br />
          <label htmlFor="password">Password:</label>
            <input
              className="login-input"
              name="password"
              type="password"
              placeholder='Password'
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          
          <br />
          {error && <div className="login-error" style={{ color: 'red' }}>{error}</div>}
          <br />
          <Link to="/register">Don't you have account yet? Click here to register.</Link>
          <button className="login-button" type="submit">Log in</button>
        </form>
       
        </div>
      );
};

export default Login;