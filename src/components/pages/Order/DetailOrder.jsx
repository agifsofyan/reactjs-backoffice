import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import SwipeableViews from 'react-swipeable-views';

import NumberFormat from 'react-number-format';
import Moment from 'react-moment';

import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import ExpandLessTwoToneIcon from '@material-ui/icons/ExpandLessTwoTone';
import ExpandMoreTwoToneIcon from '@material-ui/icons/ExpandMoreTwoTone';
import KeyboardBackspaceTwoToneIcon from '@material-ui/icons/KeyboardBackspaceTwoTone';
// import SaveAltTwoToneIcon from '@material-ui/icons/SaveAltTwoTone';
import SendTwoToneIcon from '@material-ui/icons/SendTwoTone';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import NoDataAmico from './no-data-amico.png';

import { fetchOrder } from '../../../actions/order';
import { fetchFollowUps } from '../../../actions/followup';

import Spinner from '../../layouts/Spinner';

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

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

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
    nested: {
        paddingLeft: theme.spacing(4)
    },
    nested2: {
        paddingLeft: theme.spacing(8)
    }
}));

const DetailOrder = ({ order, followups, fetchOrder, fetchFollowUps }) => {
    let { id } = useParams();
    
    const classes = useStyles();
    const theme = useTheme();

    const [value, setValue] = React.useState(0);
    // const [followUp, setFollowUp] = React.useState([
    //     { index: 1, name: 'Follow Up 1' },
    //     { index: 2, name: 'Follow Up 2' },
    //     { index: 3, name: 'Follow Up 3' },
    //     { index: 4, name: 'Follow Up 4' },
    //     { index: 5, name: 'Follow Up 5' }
    // ]);
    const [openPaymentMethod, setOpenPaymentMethod] = React.useState(false);
    const [openShipmentInfo, setOpenShipmentInfo] = React.useState(false);
    const [openShipmentInfoAddress, setOpenShipmentInfoAddress] = React.useState(false);
    const [openShipmentInfoParcelJob, setOpenShipmentInfoParcelJob] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);

    React.useEffect(() => {
        fetchOrder(id);
        fetchFollowUps();
        // eslint-disable-next-line
    },[]);

    const onHandleChange = (event, newValue) => setValue(newValue);
    const onHandleChangeIndex = (index) => setValue(index);
    const handlePaymentMethodClick = () => setOpenPaymentMethod(!openPaymentMethod);
    const handleShipmentInfoClick = () => setOpenShipmentInfo(!openShipmentInfo);
    const handleShipmentInfoAddressClick = () => setOpenShipmentInfoAddress(!openShipmentInfoAddress);
    const handleShipmentInfoParcelJobClick = () => setOpenShipmentInfoParcelJob(!openShipmentInfoParcelJob);
    const onInvoiceClick = (url) => window.open(url, '_blank');
    const onDialogModalClick = (name, phone_number, total_price, total_qty, invoice, email, template, template_name) => {
        setOpenDialog(!openDialog);
        return (
            <div>
                <Dialog
                    open={openDialog}
                    onClose={() => setOpenDialog(!openDialog)}
                    aria-labelledby="followup-dialog-slide-title"
                    aria-describedby="followup-dialog-slide-description"
                >
                    <DialogTitle id="followup-dialog-slide-title">{template_name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="followup-dialog-slide-description">
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Name"
                                type="text"
                                value={name}
                                disabled
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="phone"
                                label="Phone Number"
                                type="number"
                                value={phone_number === null ? 0 : phone_number} 
                                disabled
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="email"
                                label="Email"
                                type="email"
                                value={email}
                                disabled
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="template"
                                label="Template"
                                type="text"
                                value={template} 
                                rowsmin={10}
                                rowsMax={100}
                                multiline
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(!openDialog)} color="primary">
                            Close
                        </Button>
                        <Button onClick={() => setOpenDialog(!openDialog)} color="primary">
                            Send
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    return (
        <React.Fragment>
            {order === null || order._id !== id ? <Spinner /> : (
                <>
                <h3>Detail Order</h3>
                <Button
                    size="small"
                    startIcon={<KeyboardBackspaceTwoToneIcon />}
                    component={Link}
                    to="/orders"
                    style={{ marginBottom: '5px' }}
                >
                    Back
                </Button>
                {/* <Button
                    size="small"
                    startIcon={<SaveAltTwoToneIcon />}
                    color="primary"
                    style={{ marginBottom: '5px', float: 'right' }}
                    // onClick={() => onUpdate()}
                >
                    Update
                </Button> */}
                <div className={classes.root}>
                    <Paper>
                        <Tabs
                            value={value}
                            onChange={onHandleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            aria-label="tab-panel"
                            centered
                        >
                            <Tab label="Payment" {...a11yProps(0)} />
                            <Tab label="Coupon" {...a11yProps(1)} />
                            <Tab label="Shipment" {...a11yProps(2)} />
                            <Tab label="Product" {...a11yProps(3)} />
                            <Tab label="Buyer" {...a11yProps(4)} />
                            <Tab label="Follow Up" {...a11yProps(5)} />
                        </Tabs>
                    </Paper>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={onHandleChangeIndex}
                    >
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            {/* Payment */}
                            {order.payment === undefined ? (
                                <Container>
                                    <img src={NoDataAmico} width="40%" height="100%" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}/>
                                </Container>
                            ) : (
                                <>
                                    <List>
                                        <ListItem>
                                            <ListItemText primary="External ID (Invoice)" secondary={order.payment.external_id} />
                                        </ListItem>
                                        <Divider />
                                        <ListItem button onClick={handlePaymentMethodClick}>
                                            <ListItemText primary="Method" />
                                            {openPaymentMethod ? <ExpandLessTwoToneIcon /> : <ExpandMoreTwoToneIcon />}
                                        </ListItem>
                                        <Collapse in={openPaymentMethod} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                <ListItemText className={classes.nested} primary="Name" secondary={order.payment.method.name} />
                                                <ListItemText className={classes.nested} primary="Info" secondary={order.payment.method.info} />
                                                <ListItemText className={classes.nested} primary="Status" secondary={order.payment.method.isActive ? 'Active' : 'Inactive'} />
                                                <ListItemText className={classes.nested} primary={<img src={order.payment.method.icon} width="10%" height="20%" />} />
                                            </List>
                                        </Collapse>
                                        <Divider />
                                        {order.payment.invoice_url !== undefined && (
                                            <>
                                                <ListItem button onClick={() => onInvoiceClick(order.payment.invoice_url)}>
                                                    <ListItemText primary="Invoice URL" />
                                                </ListItem>
                                                <Divider />
                                            </>
                                        )}
                                        <ListItem>
                                            <ListItemText primary="Payment Code" secondary={order.payment.payment_code === null ? 'None' : order.payment.payment_code} />
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemText primary="Pay UID" secondary={order.payment.pay_uid === null ? 'None' : order.payment.pay_uid} />
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemText primary="Phone Number" secondary={order.payment.phone_number === null ? 'None' : order.payment.phone_number} />
                                        </ListItem>
                                        {order.payment.callback_id !== null && (
                                            <>
                                                <Divider />
                                                <ListItem>
                                                    <ListItemText primary="Callback ID" secondary={order.payment.callback_id} />
                                                </ListItem>
                                            </>
                                        )}
                                    </List>
                                </>
                            )}
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            {/* Coupon */}
                            {order.coupon === undefined ? (
                                <Container>
                                    <img src={NoDataAmico} width="350px" height="100%" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}/>
                                </Container>
                            ) : (
                                <>
                                    <List>
                                        <ListItem>
                                            <ListItemText primary="Name" secondary={order.coupon.name} />
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemText primary="Value" secondary={order.coupon.value} />
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemText primary="Max Discount" secondary={<NumberFormat value={order.coupon.max_discount} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} />
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemText primary="Type" secondary={order.coupon.type} />
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemText primary="Code" secondary={order.coupon.code} />
                                        </ListItem>
                                    </List>
                                </>
                            )}
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction}>
                            {/* Shipment */}
                            {order.shipment === undefined ? (
                                <Container>
                                    <img src={NoDataAmico} width="350px" height="100%" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}/>
                                </Container>
                            ) : (
                                <>
                                    <List>
                                        <ListItem>
                                            <ListItemText primary="Service Type" secondary={order.shipment.shipment_info === null ? 'None' : order.shipment.shipment_info.service_type} />
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemText primary="Service Level" secondary={order.shipment.shipment_info === null ? 'None' : order.shipment.shipment_info.service_level} />
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemText primary="Tracking Number" secondary={order.shipment.shipment_info === null ? 'None' : order.shipment.shipment_info.requested_tracking_number} />
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemText primary="Price" secondary={<NumberFormat value={order.shipment.price} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} />
                                        </ListItem>
                                        {order.shipment.shipment_info !== null && (
                                            <>
                                                <Divider />
                                                <ListItem button onClick={handleShipmentInfoClick}>
                                                    <ListItemText primary="Shipment Info" />
                                                    {openShipmentInfo ? <ExpandLessTwoToneIcon /> : <ExpandMoreTwoToneIcon />}
                                                </ListItem>
                                                <Collapse in={openShipmentInfo} timeout="auto" unmountOnExit>
                                                    {order.shipment.shipment_info.to === null || order.shipment.shipment_info.to === undefined ? (
                                                        <Container>
                                                            <img src={NoDataAmico} width="350px" height="100%" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}/>
                                                        </Container>
                                                    ) : (
                                                        <List component="div" disablePadding>
                                                            <ListItemText className={classes.nested} primary="Name" secondary={order.shipment.shipment_info.to.name} />
                                                            <ListItemText className={classes.nested} primary="Phone Number" secondary={order.shipment.shipment_info.to.phone_number} />
                                                            <ListItemText className={classes.nested} primary="Email" secondary={order.shipment.shipment_info.to.email} />
                                                            <ListItem button onClick={handleShipmentInfoAddressClick}>
                                                                <ListItemText primary="Address Info" />
                                                                {openShipmentInfoAddress ? <ExpandLessTwoToneIcon /> : <ExpandMoreTwoToneIcon />}
                                                            </ListItem>
                                                            <Collapse in={openShipmentInfoAddress} timeout="auto" unmountOnExit>
                                                                <List component="div" disablePadding>
                                                                    <ListItemText className={classes.nested} primary="Type" secondary={order.shipment.shipment_info.to.address.address_type} />
                                                                    <ListItemText className={classes.nested} primary="Country" secondary={order.shipment.shipment_info.to.address.country} />
                                                                    <ListItemText className={classes.nested} primary="Address" secondary={`${order.shipment.shipment_info.to.address.address1}, Kel. ${order.shipment.shipment_info.to.address.kelurahan}, Kec. ${order.shipment.shipment_info.to.address.kecamatan}, Kota ${order.shipment.shipment_info.to.address.city}, ${order.shipment.shipment_info.to.address.province}`} />
                                                                    <ListItemText className={classes.nested} primary="Postal Code" secondary={order.shipment.shipment_info.to.address.postcode} />
                                                                </List>
                                                            </Collapse>
                                                            <Divider />
                                                            <ListItem button onClick={handleShipmentInfoParcelJobClick}>
                                                                <ListItemText primary="Parcel Job" />
                                                                {openShipmentInfoParcelJob ? <ExpandLessTwoToneIcon /> : <ExpandMoreTwoToneIcon />}
                                                            </ListItem>
                                                            <Collapse in={openShipmentInfoParcelJob} timeout="auto" unmountOnExit>
                                                                <List component="div" disablePadding>
                                                                    <ListItemText className={classes.nested} primary="Pickup Service Level" secondary={order.shipment.shipment_info.parcel_job.pickup_service_level} />
                                                                    <ListItemText className={classes.nested} primary="Pickup Date" secondary={<Moment format="llll">{order.shipment.shipment_info.parcel_job.pickup_date}</Moment>} />
                                                                    <ListItemText className={classes.nested} primary="Delivery Date" secondary={<Moment format="llll">{order.shipment.shipment_info.parcel_job.delivery_start_date}</Moment>} />
                                                                </List>
                                                            </Collapse>
                                                        </List>
                                                    )}
                                                </Collapse>
                                            </>
                                        )}
                                    </List>
                                </>
                            )}
                        </TabPanel>
                        <TabPanel value={value} index={3} dir={theme.direction}>
                            {/* Product */}
                            {order.items.map((item, i) => {
                                return (
                                    <>
                                        <ListItem button>
                                            <ListItemText primary={item.product_info.name} secondary={`utm: ${item.utm}`} />
                                        </ListItem>
                                        <Divider />
                                        <List component="div" disablePadding>
                                            <ListItemText className={classes.nested} primary="Type" secondary={item.product_info.type} />
                                            {item.product_info.type === 'ecommerce' && (
                                                <ListItemText className={classes.nested} secondary={`charged shipping: ${item.product_info.ecommerce.shipping_charges ? 'paid' : 'free'}, weight: ${item.product_info.ecommerce.weight}, stock: ${item.product_info.ecommerce.stock}`} />
                                            )}
                                            {item.product_info.topic !== null && (
                                                <>
                                                    <ListItemText className={classes.nested} primary="Topic(s)" />
                                                    {item.product_info.topic.map((topic, i2) => {
                                                        return (
                                                            <ListItemText className={classes.nested} secondary={topic.name} />
                                                        )
                                                    })}
                                                </>
                                            )}
                                            {item.product_info.agent !== null && (
                                                <>
                                                    <ListItemText className={classes.nested} primary="Agent(s)" />
                                                    {item.product_info.agent.map((agent, i3) => {
                                                        return (
                                                            <ListItemText className={classes.nested} secondary={agent.name} />
                                                        )
                                                    })}
                                                </>
                                            )}
                                            <ListItemText className={classes.nested} primary="Visibility" secondary={item.product_info.visibility} />
                                            <ListItemText className={classes.nested} primary="Time Period" secondary={item.product_info.time_period > 1 ? `${item.product_info.time_period} months` : `${item.product_info.time_period} month`} />
                                            <ListItemText className={classes.nested} primary="Price" secondary={<NumberFormat value={item.product_info.price} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} />
                                            <ListItemText className={classes.nested} primary="Sale Price" secondary={<NumberFormat value={item.product_info.sale_price} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} />
                                            {item.product_info.bump !== null && (
                                                <>
                                                    <ListItemText className={classes.nested} primary="Bump" />
                                                    <ListItemText className={classes.nested2} primary="Name" secondary={item.product_info.bump[0].bump_name} />
                                                    <ListItemText className={classes.nested2} primary="Heading" secondary={item.product_info.bump[0].bump_heading} />
                                                    <ListItemText className={classes.nested2} primary="Price" secondary={<NumberFormat value={item.product_info.bump[0].bump_price} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} />
                                                    <ListItemText className={classes.nested2} primary={<img src={item.product_info.bump[0].bump_image} width="10%" height="20%" />} />
                                                    <ListItemText className={classes.nested2} primary="Weight" secondary={item.product_info.bump[0].bump_weight} />
                                                    <ListItemText className={classes.nested2} primary="Description" secondary={item.product_info.bump[0].bump_desc} />
                                                </>
                                            )}
                                        </List>
                                    </>
                                )
                            })}
                        </TabPanel>
                        <TabPanel value={value} index={4} dir={theme.direction}>
                            {/* Buyer */}
                            {order.user_info === undefined ? (
                                <Container>
                                    <img src={NoDataAmico} width="350px" height="100%" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}/>
                                </Container>
                            ) : (
                                <>
                                    <List>
                                        <ListItem>
                                            <ListItemText primary="Name" secondary={order.user_info.name} />
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemText primary="Email" secondary={order.user_info.email} />
                                        </ListItem>
                                        {order.user_info.phone_number !== undefined && (
                                            <>
                                                <Divider />
                                                <ListItem>
                                                    <ListItemText primary="Phone Number" secondary={order.user_info.phone_number} />
                                                </ListItem>
                                            </>
                                        )}
                                    </List>
                                </>
                            )}
                        </TabPanel>
                        <TabPanel value={value} index={5} dir={theme.direction}>
                            {/* Follow Up */}
                            {followups.map((item, i) => (
                                <>
                                    {item.type === 'WA' && (
                                        <>
                                            <ListItem button onClick={() => onDialogModalClick(order.user_info.name, order.user_info.phone_number === undefined ? null : order.user_info.phone_number, order.total_price, order.total_qty, order.invoice, order.user_info.email, item.template, item.name)}>
                                                <ListItemText primary={item.name} />
                                                <SendTwoToneIcon fontSize="small" />
                                            </ListItem>
                                            <Divider />
                                        </>
                                    )}
                                </>
                            ))}
                        </TabPanel>
                    </SwipeableViews>
                </div>
                </>
            )}
        </React.Fragment>
    )
}


DetailOrder.propTypes = {
    order: PropTypes.object,
    error: PropTypes.object,
    fetchOrder: PropTypes.func.isRequired,
    fetchFollowUps: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    order: state.order.order,
    followups: state.followup.followups,
    error: state.order.error
});

export default connect(mapStateToProps, { fetchOrder, fetchFollowUps })(DetailOrder);
