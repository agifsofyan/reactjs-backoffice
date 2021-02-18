import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import SupervisorAccountTwoToneIcon from '@material-ui/icons/SupervisorAccountTwoTone';
import Typography from '@material-ui/core/Typography';

import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { login } from '../../../actions/auth';

import SnackbarInfo from '../../layouts/SnackbarInfo';
import Footer from '../../layouts/Footer/Footer';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.warning.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: theme.palette.warning.main,
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: orange,
    },
});

const validation = yup.object({
    email: yup
        .string()
        .email('Invalid email')
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required'),
})

const Login = ({ login, is_authenticated, error }) => {
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },

        validationSchema: validation,
        onSubmit: (values) => {
            login(values);
        }
    });

    if (is_authenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <SnackbarInfo info="error" message={error && error.message} />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <SupervisorAccountTwoToneIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Backoffice
                </Typography>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <ThemeProvider theme={theme}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            autoComplete="current-password"
                        />
                    </ThemeProvider>
                    <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        className={classes.submit}
                        disabled={formik.isSubmitting}
                    >
                        Login
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Footer />
            </Box>
        </Container>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    is_authenticated: PropTypes.bool,
    error: PropTypes.object
}

const mapStateToProps = state => ({
    is_authenticated: state.auth.is_authenticated,
    error: state.auth.error
});

export default connect(mapStateToProps, { login })(Login);
