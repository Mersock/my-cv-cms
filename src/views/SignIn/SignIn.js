import React, { useState, useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles } from "@material-ui/styles";
import { Grid, Button, TextField, Link, Typography } from "@material-ui/core";
import { signInAction } from "../../actions/SignIn";
import { connect } from "react-redux";

const schema = {
  username: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
      minimum: 4
    }
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128,
      minimum: 6
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%"
  },
  grid: {
    height: "100%"
  },
  quoteContainer: {
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url(/images/auth.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  quoteInner: {
    textAlign: "center",
    flexBasis: "600px"
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center"
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignIn = props => {
  const { history, authenticate } = props;

  if(authenticate){
    history.push('/dashboard')
  }

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
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSignIn = event => {
    event.preventDefault();
    props.signInAction(formState.values, history);
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.content} item lg={4}></Grid>
        <Grid className={classes.content} item lg={4} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleSignIn}>
                <Typography className={classes.title} variant="h2">
                  Sign in
                </Typography>

                {props.errorMessage ? (
                  <Typography
                    align="center"
                    className={classes.sugestion}
                    color="error"
                    variant="subtitle2"
                  >
                    Username Or Password Invalid.
                  </Typography>
                ) : (
                  ""
                )}

                <TextField
                  className={classes.textField}
                  error={hasError("username")}
                  fullWidth
                  helperText={
                    hasError("username") ? formState.errors.username[0] : null
                  }
                  label="Username"
                  name="username"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.username || ""}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError("password")}
                  fullWidth
                  helperText={
                    hasError("password") ? formState.errors.password[0] : null
                  }
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ""}
                  variant="outlined"
                />
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign in now
                </Button>
                <Typography color="textSecondary" variant="body1">
                  Don't have an account?{" "}
                  <Link component={RouterLink} to="/sign-up" variant="h6">
                    Sign up
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={4}></Grid>
      </Grid>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

const mapStateToProps = state => ({
  errorMessage: state.auth.error,
  authenticate: state.auth.authenticate
});

export default connect(mapStateToProps, { signInAction })(withRouter(SignIn));
