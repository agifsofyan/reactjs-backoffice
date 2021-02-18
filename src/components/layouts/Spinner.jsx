import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      position: 'relative',
    },
    bottom: {
      color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
      display: 'block',
      position: 'fixed',
      zIndex: '1031',
      top: '50%',
      left: '50%',
      marginTop: '1px', 
      marginRight: '100px',
    },
    top: {
      color: theme.palette.warning.main,
      animationDuration: '550ms',
      display: 'block',
      position: 'fixed',
      zIndex: '1031',
      top: '50%',
      left: '50%',
      marginTop: '1px', 
      marginRight: '100px',
    },
    circle: {
      strokeLinecap: 'round',
    },
}));

const Spinner = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress
                variant="determinate"
                className={classes.bottom}
                size={40}
                thickness={4}
                {...props}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                className={classes.top}
                classes={{
                    circle: classes.circle,
                }}
                size={40}
                thickness={4}
                {...props}
            />
        </div>
    )
}

export default Spinner;
