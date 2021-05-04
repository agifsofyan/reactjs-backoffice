import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';

import Login from '../components/pages/Login/Login';
import Navbar from '../components/layouts/Navbar/Navbar';
import Dashboard from '../components/pages/Dashboard';

import Products from '../components/pages/Product/Products';
import AddProduct from '../components/pages/Product/AddProduct';
import GetProduct from '../components/pages/Product/GetProduct';
import ViewProduct from '../components/pages/Product/ViewProduct';

import Orders from '../components/pages/Order/Orders';
import DetailOrder from '../components/pages/Order/DetailOrder';

import Topics from '../components/pages/Topic/Topics';
import Roles from '../components/pages/Role/Roles';
import AddContent from '../components/pages/Content/AddContent';
import SubFulfillmentContent from '../components/pages/Content/Form/SubFulfillmentContent';
import Contents from '../components/pages/Content/Contents';
import Admins from '../components/pages/Admin/Admins';
import Coupons from '../components/pages/Coupon/Coupons';
import Payments from '../components/pages/Payment/Payments';

import Footer from '../components/layouts/Footer/Footer';

import PrivateRoute from './PrivateRoute';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
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

const Routes = () => {
    const classes = useStyles();

    return (
        <Switch>
            <Route exact path="/" component={Login} />
            <div className={classes.root}>
                <Navbar />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth={false} className={classes.container}>
                        <PrivateRoute exact path="/dashboard" component={Dashboard} />

                        <PrivateRoute exact path="/products" component={Products} />
                        <PrivateRoute exact path="/product/add" component={AddProduct} />
                        <PrivateRoute exact path="/product/:id/edit" component={GetProduct} />
                        <PrivateRoute exact path="/product/:id/view" component={ViewProduct} />

                        <PrivateRoute exact path="/orders" component={Orders} />
                        <PrivateRoute exact path="/order/:id/detail" component={DetailOrder} />

                        <PrivateRoute exact path="/topics" component={Topics} />
                        <PrivateRoute exact path="/roles" component={Roles} />
                        <PrivateRoute exact path="/contents" component={Contents} />
                        <PrivateRoute exact path="/contents/add" component={AddContent} />
                        <PrivateRoute exact path="/contents/add/:id" component={SubFulfillmentContent} />
                        <PrivateRoute exact path="/contents/edit/:id" component={AddContent} />
                        <PrivateRoute exact path="/admins" component={Admins} />
                        <PrivateRoute exact path="/coupons" component={Coupons} />
                        <PrivateRoute exact path="/payments" component={Payments} />
                        <Box pt={4}>
                            <Footer />
                        </Box>
                    </Container>
                </main>
            </div>
        </Switch>
    )
}

export default Routes;
