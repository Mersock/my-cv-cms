import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { PostsToolbar, PostsTable } from './components';
import { getPosts } from '../../actions/Posts';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const PostsList = props => {
  const { getPosts } = props;
  const classes = useStyles();

  useEffect(() => {
    getPosts();
    return () => {};
  }, [getPosts]);

  const [users] = useState(mockData);
  console.log(users);
  return (
    <div className={classes.root}>
      <PostsToolbar />
      <div className={classes.content}>
        <PostsTable users={users} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  aa: 'xx'
});

export default connect(mapStateToProps, { getPosts })(PostsList);
