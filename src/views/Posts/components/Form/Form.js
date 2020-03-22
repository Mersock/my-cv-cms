import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  CardHeader,
  Divider,
  TextField,
  Typography,
  Button,
  Grid,
  Paper,
  CircularProgress
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../Form/css/style.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(5),
    width: 200
  },
  formField: {
    marginTop: theme.spacing(2)
  },
  paperCenter: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  paperLeft: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  TypographyLeft: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary
  }
}));

const schema = {
  slug: {
    presence: { allowEmpty: false, message: 'is required' },
    format: {
      pattern: /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/,
      message: 'is invalid'
    }
  },
  title: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 1000,
      minimum: 1
    }
  },
  file: {
    format: {
      pattern: /^.*\.(jpg|JPG|JPEG|jpeg|PNG|png)$/,
      message: 'File extension not supported'
    }
  }
};

const Form = props => {
  const { history, eventPosts, className, ...rest } = props;

  const classes = useStyles();

  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const propPosts = useSelector(state => state.posts);
  const [posts, setPosts] = useState({});
  const [apisError, setApisError] = useState('');

  if (posts.create) {
    history.push('/posts');
  }

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));

    setPosts(propPosts);

    if (posts.errors) {
      Object.keys(posts.errors).map(function(key, index) {
        setApisError(posts.errors[key][index]);
      });
    }
  }, [formState.values, posts.errors, propPosts]);

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

    if (event.target.type === 'file') {
      setFile(event.target.files[0]);
    }
  };

  const [body, setBobdy] = useState(EditorState.createEmpty());
  const [file, setFile] = useState('');
  const [loading, setLoading] = useState(false);

  const onEditorStateChange = editorState => {
    setBobdy(editorState);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    formState.values.body = draftToHtml(convertToRaw(body.getCurrentContent()));
    await dispatch(eventPosts(formState.values, file));
    setLoading(false);
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {posts.errors ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {apisError}
            </Alert>
          ) : (
            ''
          )}
          <form onSubmit={event => handleSubmit(event)}>
            <Paper className={classes.paperCenter}>
              <CardHeader subheader="Create your posts" title="Posts" />
              <Divider />
              <label htmlFor="slug">
                <TextField
                  id="slug"
                  label="Slug"
                  style={{ margin: 5 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                  className={classes.formField}
                  error={hasError('slug')}
                  helperText={
                    hasError('slug') ? formState.errors.slug[0] : null
                  }
                  onChange={handleChange}
                  type="text"
                  name="slug"
                  value={formState.values.slug || ''}
                  variant="outlined"
                />
              </label>
              <label htmlFor="title">
                <TextField
                  id="title"
                  label="Title"
                  style={{ margin: 5 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                  className={classes.formField}
                  error={hasError('title')}
                  helperText={
                    hasError('title') ? formState.errors.title[0] : null
                  }
                  onChange={handleChange}
                  type="text"
                  name="title"
                  value={formState.values.title || ''}
                  variant="outlined"
                />
              </label>
              <label htmlFor="file">
                <TextField
                  id="file"
                  label="Image"
                  style={{ margin: 5 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                  className={classes.formField}
                  error={hasError('file')}
                  helperText={
                    hasError('file') ? formState.errors.file[0] : null
                  }
                  onChange={handleChange}
                  type="file"
                  name="file"
                  value={formState.values.file || ''}
                  variant="outlined"
                />
              </label>
              <div>
                <Editor
                  onEditorStateChange={editorState =>
                    onEditorStateChange(editorState)
                  }
                  toolbarClassName="rdw-storybook-toolbar"
                  wrapperClassName="rdw-storybook-wrapper"
                  editorClassName="rdw-storybook-editor"
                />
              </div>
              {/*
              <div>
                {draftToHtml(convertToRaw(body.getCurrentContent()))}
              </div>
              */}
              <Divider />
            </Paper>
            <Paper className={classes.paperCenter}>
              {loading ? (
                <CircularProgress />
              ) : (
                <Button
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  type="submit"
                  variant="contained"
                >
                  Submit
                </Button>
              )}
            </Paper>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

Form.propTypes = {
  className: PropTypes.string
};

export default Form;
