import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  FormControlLabel,
  TextField,
  Typography,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(5),
    width: 200
  }
}));

const Form = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form>
        <CardHeader subheader="Manage the posts" title="Posts" />
        <Divider />
        <CardContent>
          <div>
            <TextField
              id="slug"
              label="Slug"
              style={{ margin: 5 }}
              placeholder="Please specify Slug"
              helperText="Full width!!!!!"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              id="title"
              label="Title"
              style={{ margin: 5 }}
              placeholder="Please specify Title"
              helperText="Full width!!!!!"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              id="body"
              label="Body"
              style={{ margin: 5 }}
              placeholder="Please specify Body"
              helperText="Full width!!!!!"
              fullWidth
              multiline
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              rows={5}
              rowsMax={15}
              variant="outlined"
            ></TextField>
          </div>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="outlined">
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
