import React from 'react';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import SecurityTwoToneIcon from '@material-ui/icons/SecurityTwoTone';
import MoreHorizTwoToneIcon from '@material-ui/icons/MoreHorizTwoTone';
import Collapse from '@material-ui/core/Collapse';
import AllInboxTwoToneIcon from '@material-ui/icons/AllInboxTwoTone';
import LocalOfferTwoToneIcon from '@material-ui/icons/LocalOfferTwoTone';
import AssessmentTwoToneIcon from '@material-ui/icons/AssessmentTwoTone';
import TrackChangesTwoToneIcon from '@material-ui/icons/TrackChangesTwoTone';
import AccountBalanceWalletTwoToneIcon from '@material-ui/icons/AccountBalanceWalletTwoTone';
import BookTwoToneIcon from '@material-ui/icons/BookTwoTone';
import ExpandLessTwoToneIcon from '@material-ui/icons/ExpandLessTwoTone';
import ExpandMoreTwoToneIcon from '@material-ui/icons/ExpandMoreTwoTone';
import InsertDriveFileTwoToneIcon from '@material-ui/icons/InsertDriveFileTwoTone';
import ChatTwoToneIcon from '@material-ui/icons/ChatTwoTone';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
}));

const ListMenu = () => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div className={classes.root}>
            <ListItem button component={Link} to="/dashboard">
                <ListItemIcon>
                    <DashboardTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/products">
                <ListItemIcon>
                    <AllInboxTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
            </ListItem>
            <ListItem button component={Link} to="/orders">
                <ListItemIcon>
                    <ShoppingCartTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <AssessmentTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <TrackChangesTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Tools" />
            </ListItem>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <MoreHorizTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Others" />
                {open ? <ExpandLessTwoToneIcon /> : <ExpandMoreTwoToneIcon />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} component={Link} to="/topics">
                        <ListItemIcon>
                            <BookTwoToneIcon />
                        </ListItemIcon>
                        <ListItemText primary="Topics" />
                    </ListItem>
                    <ListItem button className={classes.nested} component={Link} to="/roles">
                        <ListItemIcon>
                            <SecurityTwoToneIcon />
                        </ListItemIcon>
                        <ListItemText primary="Roles" />
                    </ListItem>
                    <ListItem button className={classes.nested} component={Link} to="/admins">
                        <ListItemIcon>
                            <PeopleAltTwoToneIcon />
                        </ListItemIcon>
                        <ListItemText primary="Administrators" />
                    </ListItem>
                    <ListItem button className={classes.nested} component={Link} to="/coupons">
                        <ListItemIcon>
                            <LocalOfferTwoToneIcon />
                        </ListItemIcon>
                        <ListItemText primary="Coupons" />
                    </ListItem>
                    <ListItem button className={classes.nested} component={Link} to="/payments">
                        <ListItemIcon>
                            <AccountBalanceWalletTwoToneIcon />
                        </ListItemIcon>
                        <ListItemText primary="Payments" />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <InsertDriveFileTwoToneIcon />
                        </ListItemIcon>
                        <ListItemText primary="Contents" />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <ChatTwoToneIcon />
                        </ListItemIcon>
                        <ListItemText primary="Templates" />
                    </ListItem>
                </List>
            </Collapse>
        </div>
    )
}

export default ListMenu;