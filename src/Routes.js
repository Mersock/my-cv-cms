import React from "react";
import { Switch, Redirect } from "react-router-dom";

import { PublicRoute, PrivateRoute } from "./components";
import { Main as MainLayout, Minimal as MinimalLayout } from "./layouts";

import {
  Dashboard as DashboardView,
  NotFound as NotFoundView,
  SignIn as SignInView,
  PostsList as PostsView,
  PostsCreate as PostsCreate
} from "./views";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <PublicRoute
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <PrivateRoute
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <PrivateRoute
        component={PostsView}
        exact
        layout={MainLayout}
        path="/posts"
      />
      <PrivateRoute
        component={PostsCreate}
        exact
        layout={MainLayout}
        path="/posts/create"
      />
      <PublicRoute
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
