import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  TextField,
  Typography,
  Button
} from '@material-ui/core';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(5),
    width: 200
  },
  formField: {
    marginTop: theme.spacing(2)
  }
}));

const schema = {
  slug: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 4,
      minimum: 4
    }
  },
  title: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128,
      minimum: 6
    }
  }
};

const Form = props => {
  const { className, ...rest } = props;

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
    console.log(formState);
  };

  const [blogText, setBlogText] = useState(EditorState.createEmpty());

  const onEditorStateChange = editorState => {
    setBlogText(editorState);
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form onSubmit={handleSubmit}>
        <CardHeader subheader="Manage the posts" title="Posts" />
        <Divider />
        <CardContent>
          <div>
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
              helperText={hasError('slug') ? formState.errors.slug[0] : null}
              onChange={handleChange}
              type="text"
              name="slug"
              value={formState.values.slug || ''}
              variant="outlined"
            />
          </div>
          <div>
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
              helperText={hasError('title') ? formState.errors.title[0] : null}
              onChange={handleChange}
              type="text"
              name="title"
              value={formState.values.title || ''}
              variant="outlined"
            />
          </div>
          <div>
            <Editor
              onEditorStateChange={editorState =>
                onEditorStateChange(editorState)
              }
            />
          </div>
          <div>{draftToHtml(convertToRaw(blogText.getCurrentContent()))}</div>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="outlined"
            disabled={!formState.isValid}
            type="submit"
          >
            Save
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Form.propTypes = {
  className: PropTypes.string
};

export default Form;
