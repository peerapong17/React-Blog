import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import axios from "axios";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { Link } from "react-router-dom";
import useStyles from "./styles";
import Input from "../../components/Input/Input";

const EnterEmail = () => {
  const [email, setEmail] = React.useState("");
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);

    axios.post("http://localhost:5000/reset-password/enter-email", { email });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Enter Your Email
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input
              name="email"
              label="Email Address"
              handleChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Typography component={Link} to="/sign-in">
                Login
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EnterEmail;
