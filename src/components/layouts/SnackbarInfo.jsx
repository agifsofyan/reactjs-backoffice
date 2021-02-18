import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core/styles';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const SnackbarInfo = ({ info, message }) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(true);

    const handleClose = (reason) => {
        if (reason === 'clickaway') return;

        setOpen(!open);
    };

    return (
        <div className={classes.root}>
            <Snackbar open={message !== null ? open : false} autoHideDuration={6000}>
                <Alert onClose={handleClose} severity={info}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default SnackbarInfo;
