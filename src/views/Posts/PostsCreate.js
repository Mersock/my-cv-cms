import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { Form } from './components';
import { createPosts } from '../../actions/Posts';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const PostsCreate = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item md={12} xs={12}>
          <Form eventPosts={createPosts} history={props.history} />
        </Grid>
      </Grid>
    </div>
  );
};

export default PostsCreate;
