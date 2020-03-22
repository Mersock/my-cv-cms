import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const getUser = JSON.parse(localStorage.getItem('userInfo'));
  const user = {
    name: getUser.username,
    avatar: '/images/avatars/avatar_11.png',
    bio: 'Brain Director'
  };
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography variant="body2">Welcome</Typography>
      <Typography className={classes.name} variant="h4">
        {user.name}
      </Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
