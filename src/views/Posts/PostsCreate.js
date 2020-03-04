import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Form } from './components';

const schema = {
  title: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64,
      minimum: 4
    }
  },
  slug: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128,
      minimum: 6
    }
  },
  body: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128,
      minimum: 6
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const PostsCreate = props => {
  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item md={12} xs={12}>
          <Form />
        </Grid>
      </Grid>
    </div>
  );
};

export default PostsCreate;
