import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { PostsToolbar, PostsTable } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const PostsList = () => {
  const classes = useStyles();

  const [users] = useState(mockData);

  return (
    <div className={classes.root}>
      <PostsToolbar />
      <div className={classes.content}>
        <PostsTable users={users} />
      </div>
    </div>
  );
};

export default PostsList;
