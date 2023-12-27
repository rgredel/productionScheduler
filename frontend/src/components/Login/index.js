import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useLocalState } from '../../util/useLocalStorage';
import { Button, TextField, Typography, Box } from "@mui/material";
import Navbar from '../Navbar/Navbar';

const Login = () => {
    const [jwt, setJwt] = useLocalState("", "jwt")
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const usernameRegexp = /^\w+$/;
    const usernameMessage = 'Login może zawierać tylko litery i cyfry';
    const passwordRegexp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const passwordMessage = "Hasło musi zawierać: cyfre, małą i dużą literę, znak specjalny," +
    " minimum 8 znaków oraz nie może zawierać spacji";
    const mandatoryMessage = ' jest obowiązkowe!';
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if(!username) {
        setError('Pole nazwa użytkownika' + mandatoryMessage);
      } else if (username.length < 3 || username.length > 32) {
        setError('Nazwa użytkownika musi mieć długość między 3 a 32 znaki');
      } else if (!usernameRegexp.test(username)) {
        setError(usernameMessage);
      } else if (!usernameRegexp.test(username)) {
        setError(usernameMessage);
      } else if (!password) {
        setError('Pole hasło' + mandatoryMessage);
      } else if (!passwordRegexp.test(password)) {
        setError(passwordMessage);
      } else {
        const reqBody = {
            login: username,
            password: password,
          }; 
        try {
            const response = await fetch("/auth/login", {
                headers: {
                  "Content-Type": "application/json"},
                method: "post",
                body: JSON.stringify(reqBody),
              })
            
            if(response.status === 200) {
                const data = await response.json();
                setJwt(data.token);
              } else if(response.status === 403) {
                setError('Niepoprawny login lub hasło!');
              } else {
                throw new Error();
              }
        } catch(error) {
            console.log(error);
            setError('Wystąpił błąd. Spróbuj ponownie później.')
          }
      }
    }

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '30%',
      bgcolor: '#cbe0fa',
      border: '2px solid #00308F',
      boxShadow: 24,
      p: 4,
    };

    if(jwt) return <Navigate to="/"/>  
    else
    return (<div>
        <Navbar />
        <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="Nazwa użytkownika"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />

          <TextField
            id="outlined-password-input"
            type="password"
            label="Hasło"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password} s
            onChange={event => setPassword(event.target.value)}
          />
          
          <br />
          {error && <div className="login-error" style={{ color: 'red' }}>{error}</div>}
          <br />
          <Link style={{ display: 'block', textAlign: 'center', marginTop: '20px' }}  to="/register">Nie masz jeszcze konta? Kliknij tutaj, aby się zarejestrować.</Link>
          <br />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            color="editButton"
          >
            Zaloguj
          </Button>
        </form>
       </Box>
        </div>
      );
};

export default Login;