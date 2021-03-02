import { combineReducers } from 'redux';

import auth from './auth';
import product from './product';
import topic from './topic';
import role from './role';
import admin from './admin';
import coupon from './coupon';
import payment from './payment';
import agent from './agent';
import image from './image';
import order from './order';

export default combineReducers({
    auth,
    product,
    topic,
    role,
    admin,
    coupon,
    payment,
    agent,
    image,
    order
});