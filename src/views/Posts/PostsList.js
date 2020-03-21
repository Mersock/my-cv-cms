import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { PostsToolbar, PostsTable } from './components';
import { getPosts } from '../../actions/Posts';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const PostsList = () => {
  const posts = useSelector(state => state.posts);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    const params ={
      sortType:'desc'
    }
    dispatch(getPosts(params));
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <PostsToolbar />
      <div className={classes.content}>
        <PostsTable posts={posts} />
      </div>
    </div>
  );
};

export default PostsList;
