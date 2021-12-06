import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import BlogDetails from "./pages/BlogDetail/BlogDetails";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Auth from "./components/Auth/Auth";
import CreateBlog from "./pages/CreateBlog/CreateBlog";
import UpdateBlog from "./pages/UpdateBlog/UpdateBlog";
import UserBlog from "./pages/UserBlog/UserBlog";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/posts?page=1" />} />
        <Route path="/posts" exact component={Home} />
        <Route path="/posts/search" exact component={Home} />
        <Route path="/posts/:id" exact component={BlogDetails} />
        <Route path="/blog/create" exact component={CreateBlog} />
        <Route path="/blog/update/:id" exact component={UpdateBlog} />
        <Route path="/blog/user" exact component={UserBlog} />
        <Route
          path="/auth"
          exact
          component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
