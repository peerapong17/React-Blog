import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import BlogDetails from "./pages/BlogDetail/BlogDetails";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import CreateBlog from "./pages/CreateBlog/CreateBlog";
import UpdateBlog from "./pages/UpdateBlog/UpdateBlog";
import UserBlog from "./pages/UserBlog/UserBlog";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import EnterEmail from "./pages/EnterEmail/EnterEmail";
import EnterNewPassword from "./pages/EnterNewPassword/EnterNewPassword";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route
          path="/"
          exact
          component={() => <Redirect to="/blogs?page=1" />}
        />
        <Route path="/blogs" exact component={Home} />
        <Route path="/blogs/search" exact component={Home} />
        <Route path="/blogs/:id" exact component={BlogDetails} />
        <Route path="/blog/create" exact component={CreateBlog} />
        <Route path="/blog/update/:id" exact component={UpdateBlog} />
        <Route path="/blog/user" exact component={UserBlog} />
        {/* <Route
          path="/auth"
          exact
          component={() => (!user ? <Auth /> : <Redirect to="/blogs" />)}
        /> */}
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/reset-password/enter-email" exact component={EnterEmail} />
        <Route
          path="/reset-password/enter-new-password/:userId/:token"
          exact
          component={EnterNewPassword}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
