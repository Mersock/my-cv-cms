import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { Form } from './components';
import { useDispatch } from 'react-redux';
import { getPostsById, updatePosts } from '../../actions/Posts';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const PostsEdit = props => {
  const { match } = props;
  const { params } = match;
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    async function fetchDetail() {
      await dispatch(getPostsById(params.id));
    }
    fetchDetail();
  }, [dispatch, params.id]);

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item md={12} xs={12}>
          <Form
            eventPosts={updatePosts}
            history={props.history}
            cardHeader={`Edit Posts`}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default PostsEdit;
