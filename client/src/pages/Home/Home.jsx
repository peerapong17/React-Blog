import React, { useState } from "react";
import {
  Container,
  Grow,
  Grid,
  AppBar,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import { useSelector } from "react-redux";

import { getPostsBySearch } from "../../actions/posts";
import Pagination from "../../components/Pagination/Pagination";
import useStyles from "./styles";
import Post from "../../components/Posts/Post/Post";
import { getPosts } from "../../actions/posts";
import useForm from "../../composables/useForm";

const Home = () => {
  const classes = useStyles();
  const query = new URLSearchParams(useLocation().search);
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const tagsQuery = query.get("tags");
  const { posts, isLoading } = useSelector((state) => state.posts);
  const { value, setValue, onChange, handleAddChip, handleDeleteChip } =
    useForm({
      search: "",
      tags: [],
    });

  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    if ((page && searchQuery) || (page && tagsQuery)) {
      setValue({
        search: searchQuery ? searchQuery : "",
        tags: tagsQuery ? tagsQuery.split(",") : [],
      });
      dispatch(
        getPostsBySearch({
          page,
          search: searchQuery ? searchQuery : "",
          tags: tagsQuery ? tagsQuery : "",
        })
      );
    } else {
      setValue({
        search: "",
        tags: [],
      });
      dispatch(getPosts(page));
    }
  }, [page, searchQuery, tagsQuery]);

  const searchPost = () => {
    if (value.search.trim() || value.tags.length > 0) {
      console.log(value.tags);
      history.push(
        `/posts?page=1${value.search ? `&searchQuery=${value.search}` : ""}${
          value.tags.length > 0 ? `&tags=${value.tags.join(",")}` : ""
        }`
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            {isLoading ? (
              <div className={classes.justifyCenter}>
                <CircularProgress />
              </div>
            ) : (
              <Grid container alignItems="stretch" spacing={3}>
                {posts?.length > 0 ? (
                  posts?.map((post) => {
                    return (
                      <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                        <Post key={post._id} post={post} />
                      </Grid>
                    );
                  })
                ) : (
                  <div className={classes.justifyCenter}>
                    <Typography>No post create yet.</Typography>
                  </div>
                )}
              </Grid>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                onKeyDown={handleKeyPress}
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={value.search}
                onChange={onChange}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={value.tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            <Paper className={classes.pagination} elevation={6}>
              <Pagination page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
