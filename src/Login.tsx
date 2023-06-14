import React, { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

const StyledBox = styled(Box)({
  padding: "2em",
  maxWidth: "400px",
  width: "100%",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
});

const StyledButton = styled(Button)({
  marginTop: "1em",
  marginBottom: "1em",
});

type AuthProps = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Auth: React.FC<AuthProps> = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const register = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setLoggedIn(true);
        navigate("/home"); // 新規ログインの場合は "/profile" に遷移
      })
      .catch((error) => {
        alert(error.message);
        console.error(error);
      });
  };

  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setLoggedIn(true);
        navigate("/main"); // ログインの場合は "/main" に遷移
      })
      .catch((error) => {
        alert(error.message);
        console.error(error);
      });
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  return (
    <StyledContainer>
      <StyledBox>
        <Typography variant="h5" align="center" gutterBottom>
          ログイン
        </Typography>
        <Box component="form">
          <TextField
            style={{ marginBottom: "1em" }}
            name="email"
            label="E-mail"
            fullWidth
            variant="outlined"
            value={email}
            onChange={handleChangeEmail}
          />
          <TextField
            style={{ marginBottom: "1em" }}
            name="password"
            label="Password"
            fullWidth
            variant="outlined"
            type="password"
            value={password}
            onChange={handleChangePassword}
          />
          <StyledButton fullWidth onClick={register} variant="contained" color="primary">
            新規登録
          </StyledButton>
          <StyledButton fullWidth onClick={login} variant="contained" color="primary">
            ログイン
          </StyledButton>
        </Box>
      </StyledBox>
    </StyledContainer>
  );
};

export default Auth;
