import React, { useState } from "react";
import {
  Container,
  Grow,
  Grid,
  AppBar,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import { useSelector } from "react-redux";

import Pagination from "../../components/Pagination/Pagination";
import useStyles from "./styles";
import Blog from "../../components/Blogs/Blog/Blog";
import { getUserblogs, getBlogsBySearch } from "../../states/action-creators/blogs";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const { blogs, isLoading } = useSelector((state) => state.blogs);

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const history = useHistory();

  React.useEffect(() => {
    if (page) {
      dispatch(getUserblogs(page));
    }
  }, [dispatch, page]);

  const searchBlog = () => {
    if (search.trim() || tags) {
      dispatch(getBlogsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/blogs/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchBlog();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

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
                {blogs?.length > 0 ? (
                  blogs?.map((blog) => {
                    return (
                      <Grid key={blog._id} item xs={12} sm={12} md={6} lg={4}>
                        <Blog key={blog._id} blog={blog} />
                      </Grid>
                    );
                  })
                ) : (
                  <div className={classes.justifyCenter}>
                    <Typography variant="h4">No post create yet.</Typography>
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchBlog}
                className={classes.searchButton}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
