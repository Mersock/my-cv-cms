import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';

import { Topbar } from './components';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 64,
    height: '100%'
  },
  content: {
    height: '100%'
  }
}));

const Minimal = props => {
  const { children, history } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Topbar history={history} />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

Minimal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default withRouter(Minimal);
