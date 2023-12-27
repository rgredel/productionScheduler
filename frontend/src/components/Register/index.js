import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useLocalState } from '../../util/useLocalStorage';
import Navbar from '../Navbar/Navbar';
import { Button, TextField, Typography, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const Register = () => {
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

  const [jwt, setJwt] = useLocalState("", "jwt")
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [error, setError] = useState('');
  const usernameRegexp = /^\w+$/;
  const usernameMessage = 'Login może zawierać tylko litery i cyfry';
  const passwordRegexp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const passwordMessage = "Hasło musi zawierać: cyfre, małą i dużą literę, znak specjalny," +
    " minimum 8 znaków oraz nie może zawierać spacji";
  const emailRegexp = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/;
  const emailMessage = "Niepoprawyny email!";
  const mandatoryMessage = ' jest obowiązkowe!';

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username) {
      setError('Pole nazwa użytkownika' + mandatoryMessage);
    } else if (username.length < 3 || username.length > 32) {
      setError('Nazwa użytkownika musi mieć długość między 3 a 32 znaki');
    } else if (!usernameRegexp.test(username)) {
      setError(usernameMessage);
    } else if (!email) {
      setError('Pole email' + mandatoryMessage);
    } else if (!emailRegexp.test(email)) {
      setError(emailMessage);
    } else if (!password) {
      setError('Pole hasło' + mandatoryMessage);
    } else if (!passwordRegexp.test(password)) {
      setError(passwordMessage);
    } else if (password !== repeatPassword) {
      setError("Hasła nie pasują do siebie!");
    } else {
      const reqBody = {
        login: username,
        email: email,
        password: password
      };
      try {
        const response = await fetch("/auth/register", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "post",
          body: JSON.stringify(reqBody),
        })

        if (response.status === 200) {
          const data = await response.json();
          setJwt(data.token);
        } else {
          throw new Error();
        }
      } catch (error) {
        setError('Wystąpił błąd. Spróbuj ponownie później.')
      }
    }
  }
  if (jwt) return <Navigate to="/" />
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
            id="outlined-basic"
            label="E-mail"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={event => setEmail(event.target.value)}
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

          <TextField
            id="outlined-password-input"
            type="password"
            label="Powtórz hasło"
            variant="outlined"
            fullWidth
            margin="normal"
            value={repeatPassword}
            onChange={event => setRepeatPassword(event.target.value)}
          />

          {error && <div className="login-error" style={{ color: 'red' }}>{error}</div>}
          
          <br />
          <Link to="/login" style={{ display: 'block', textAlign: 'center', marginTop: '20px' }}>Masz juź konto? Kliknij tutaj, aby się zalogowć.</Link>
          <br />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            color="addButton"
            startIcon={<AddIcon />}
          >
            Zarejestruj
          </Button>
        </form>
      </Box>
    </div>
    );
};

export default Register;