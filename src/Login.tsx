import React, { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
type AuthProps = {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  };
const Auth: React.FC<AuthProps> = ({ setLoggedIn }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const register = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setLoggedIn(true); // ユーザーがログインしたらログイン状態をtrueに設定
        navigate("/home");
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
        setLoggedIn(true); // ユーザーがログインしたらログイン状態をtrueに設定
        navigate("/home");
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
    <Container>
      <Grid container>
        <Grid item md={4}></Grid>
        <Grid item md={4}>
          <Grid item md={4}>
            ログイン
          </Grid>
          <Box component="form">
            <TextField
              style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
              name="email"
              label="E-mail"
              fullWidth
              variant="outlined"
              value={email}
              onChange={handleChangeEmail}
            />
            <TextField
              style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
              name="password"
              label="Password"
              fullWidth
              variant="outlined"
              type="password"
              value={password}
              onChange={handleChangePassword}
            />
            <Button
              fullWidth
              style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
              onClick={register}
            >
              新規登録
            </Button>
            <Button
              fullWidth
              style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
              onClick={login}
            >
              ログイン
            </Button>
          </Box>
        </Grid>
        <Grid item md={4}></Grid>
      </Grid>
    </Container>
  );
};

export default Auth;

