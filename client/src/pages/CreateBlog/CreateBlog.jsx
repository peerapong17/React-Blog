import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import FileBase from "react-file-base64";
import { useHistory } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { createPost } from "../../actions/posts";
import useStyles from "./styles";
import useForm from "../../composables/useForm";

const CreateBlog = () => {
  const { value, setValue, onChange, handleAddChip, handleDeleteChip } =
    useForm({
      title: "",
      message: "",
      tags: [],
      imageFile: "",
    });

  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(createPost({ ...value, name: user?.result?.name }));

    setValue({
      title: "",
      message: "",
      tags: [],
      imageFile: "",
    });
  };

  const handleFilePicked = (e) => {
    console.log(e.target.files[0])
    const { name, files } = e.target;
    const imageFile = files[0];
    setValue((prev) => {
      return {
        ...prev,
        [name]: imageFile,
      };
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper} elevation={6}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">Creating a Memory</Typography>
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={value.title}
            onChange={onChange}
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            multiline
            rows={4}
            value={value.message}
            onChange={onChange}
          />
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            helperText="press enter to add"
            style={{ margin: "0 8px" }}
            value={value.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
          <input
            accept="image/*"
            name="imageFile"
            className={classes.input}
            id="contained-button-file"
            onChange={handleFilePicked}
            multiple
            type="file"
          />
          <label
            className={classes.labelUpload}
            htmlFor="contained-button-file"
          >
            <Button
              className={classes.btnUpload}
              variant="contained"
              color="primary"
              component="span"
            >
              Upload
            </Button>
          </label>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => history.push("/")}
            fullWidth
          >
            Back
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateBlog;
