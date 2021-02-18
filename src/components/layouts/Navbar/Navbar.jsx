import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import clsx from 'clsx';

import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ArrowDropDownTwoToneIcon from '@material-ui/icons/ArrowDropDownTwoTone';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { grey, orange } from '@material-ui/core/colors';

import ListMenu from '../Menu/ListMenu';

import { logout } from '../../../actions/auth';

const drawerWidth = 210;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    // container: {
    //     paddingTop: theme.spacing(2),
    //     paddingBottom: theme.spacing(2),
    // },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: { main: orange[500], },
        secondary: { main: grey[200], },
    },
    typography: {
        useNextVariants: true,
    },
});

const Navbar = ({ user, logout }) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(true);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const handleDrawerClose = () => {
        setOpen(false);
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="initial" noWrap className={classes.title}>
                            Dashboard
                        </Typography>
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            {user && user.name} <ArrowDropDownTwoToneIcon />
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={logout}>Logout</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List><ListMenu /></List>
                {/* <Divider />
                <List>{menuPageTwo}</List> */}
            </Drawer>
        </React.Fragment>
    )
}

Navbar.propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
