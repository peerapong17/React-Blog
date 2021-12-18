import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import axios from "axios";
import useStyles from "./styles";
import Input from "../../components/Input/Input";
import useForm from "../../composables/useForm";

const initialState = {
  password: "",
  confirmPassword: "",
};

const SignIn = () => {
  const { value, onChange } = useForm(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { userId, token } = useParams();

  console.log(userId, token);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(userId, token, value.password);

    const { data } = await axios.post(
      `http://localhost:5000/reset-password/enter-new-password/${userId}/${token}`,
      {
        password: value.password,
      }
    );

    if (data.message == "password reset sucessfully") {
      history.push("/sign-in");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Enter New Password
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input
              name="password"
              label="Password"
              handleChange={onChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            <Input
              name="confirmPassword"
              label="confirmPassword"
              handleChange={onChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Confirm
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SignIn;
