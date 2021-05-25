import React from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import WaTemplate from './Form/WaTemplate';
import EmailTemplate from './Form/EmailTemplate';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box paddingLeft={15} paddingRight={15} paddingTop={5} p={15} height="100%" width="100%">
                    {children}
                </Box>
            )}
        </div>
    );
}

const a11yProps = (index) => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        height: '100%',
        flexGrow: 1,
    },
}));

const Templates = ({}) => {
    const classes = useStyles();

    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const onHandleChange = (event, newValue) => {
        setValue(newValue);
    }
    
    const onHandleChangeIndex = (index) => {
        setValue(index);
    }

    return (
        <React.Fragment>
            <div className={classes.root}>
                <WaTemplate/>
                {/* <Paper>
                    <Tabs
                        value={value}
                        onChange={onHandleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="tab-panel"
                        centered
                    >
                        <Tab label="Template WA" {...a11yProps(0)} />
                        <Tab label="Template Email" {...a11yProps(1)} />
                    </Tabs>
                </Paper>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={onHandleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <WaTemplate/>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <EmailTemplate/>
                    </TabPanel>
                </SwipeableViews> */}
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(Templates);
