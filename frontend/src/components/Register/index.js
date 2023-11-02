import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useLocalState } from '../../util/useLocalStorage';
import Homepage from '../Homepage';
import '../Login/LoginForm.css';

const Register = () => {
        const [jwt, setJwt] = useLocalState("", "jwt")
        const [username, setUsername] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [repeatPassword, setRepeatPassword] = useState('');
    
        const [error, setError] = useState('');
        const usernameRegexp = /^\w+$/;
        const usernameMessage = 'Login can contain only letters, numbers or _ character';
        const passwordRegexp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
        const passwordMessage = "Password must contain: a digit, a lower case letter, an uppercase letter, a special character," +
                      " must be at least 8 characters long and cannot contain any spaces";
        const emailRegexp = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/;
        const emailMessage = "Wrong email format!";
        const mandatoryMessage = ' is mandatory!';
      
        const handleSubmit = async (event) => {
          event.preventDefault();
          if(!username) {
            setError('Username '+mandatoryMessage);
          } else if(username.length < 3 || username.length > 32) {
            setError('Username must be between 3 and 32 characters long');
          } else if (!usernameRegexp.test(username)) {
            setError(usernameMessage);
          } else if (!email) {
            setError('Email '+mandatoryMessage);
          } else if (!emailRegexp.test(email)) {
            setError(emailMessage);
          } else if (!password) {
            setError('Password '+mandatoryMessage);
          } else if (!passwordRegexp.test(password)) {
            setError('Password '+passwordMessage);
          } else if (password !== repeatPassword) {
            setError("Passwords do not match!");
          } else {
            const reqBody = {
                login: username,
                email: email,
                password: password
              }; 
            try {
                const response = await fetch("/persons/auth/register", {
                    headers: {
                      "Content-Type": "application/json",
                    },
                    method: "post",
                    body: JSON.stringify(reqBody),
                  })
                
                if(response.status === 200) {
                    const data = await response.json();
                    alert('Registred!');
                    setJwt(data.token);
                  } else if(response.status === 400) {
                    const data = await response.json();
                    setError(data.message);
                  } else if(response.status === 409) {
                    const data = await response.json();
                    setError(data.message);
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
                <label htmlFor="email" >E-mail:</label>
                <input
                  className="login-input"
                  type="text"
                  name="email"
                  placeholder='E-mail'
                  value={email}
                  onChange={event => setEmail(event.target.value)}
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
              <label htmlFor="repeatPassword">Repeat password:</label>
                <input
                  className="login-input"
                  name="repeatPassword"
                  type="password"
                  placeholder='Password'
                  value={repeatPassword}
                  onChange={event => setRepeatPassword(event.target.value)}
                />
              
              <br />
              {error && <div className="login-error" style={{ color: 'red' }}>{error}</div>}
              <br />
              <Link to="/login">Do you have account already? Click here to login.</Link>
              <button className="login-button" type="submit">Register</button>
            </form>
            </div>
          );
    };

export default Register;