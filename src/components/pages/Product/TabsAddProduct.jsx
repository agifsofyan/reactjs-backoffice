import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SwipeableViews from 'react-swipeable-views';

import PropTypes from 'prop-types';

import Tabs from '@material-ui/core/Tabs';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import KeyboardBackspaceTwoToneIcon from '@material-ui/icons/KeyboardBackspaceTwoTone';
import SaveAltTwoToneIcon from '@material-ui/icons/SaveAltTwoTone';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import { fetchTopic } from '../../../actions/topic';

import DetailProduct from './Form/DetailProduct';
import BumpProduct from './Form/BumpProduct';

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
                <Box paddingLeft={15} paddingRight={15} paddingTop={5} p={15} height="350px" width="100%">
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
}));

const TabsAddProduct = ({ topics, fetchTopic }) => {
    React.useEffect(() => {
        fetchTopic();
        // eslint-disable-next-line
    },[]);

    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    // Form Product
    const [form, setForm] = React.useState({
        name: '',
        type: '',
        boe: '',
        ecommerce: '',
        topic: [],
        price: 0,
        time_period: '',
        visibility: '',
        sale_method: '',
        bump: '',
        
        headline: '',
        subheadline: '',
        description: '',
        learn_about: '',
        sale_price: 0,
        image_url: [],
        agent: [],
        image_bonus_url: '',
        media_url: '',
        section: '',
        feature: ''
    });

    // Bump
    const [productBump, setProductBump] = React.useState({
        bump_name: '',
        bump_price: 0,
        bump_image: '',
        bump_weight: '',
        bump_heading: '',
        bump_desc: ''
    });

    // Ecommerce
    const [productEcommerce, setProductEcommerce] = React.useState({
        weight: 0,
        shipping_charges: true,
        stock: 0
    }); 

    // Feature
    const [productFeature, setProductFeature] = React.useState({
        feature_onheader: '',
        feature_onpage: ''
    });

    // Topic & Agent
    const [productTopic, setProductTopic] = React.useState([]);
    const [productAgent, setProductAgent] = React.useState([]);

    // Images
    const [productImages, setProductImages] = React.useState({
        image: {
            image_url: '',
            bump_image: '',
            media_url: '',
            image_bonus: ''
        }
    });

    // Product Type
    const [productType, setProductType] = React.useState(null);

    // Product Visibility
    const [productVisibility, setProductVisibility] = React.useState(null);

    // Product Sale Method
    const [productSaleMethod, setProductSaleMethod] = React.useState(null);

    // ToDo: Description

    // Array of image_url
    const [productImageUrl, setProductImageUrl] = React.useState({
        image_url: []
    });

    form.image_url = productImageUrl.image_url;
    form.image_bonus_url = productImages.image.image_bonus;
    form.media_url = productImages.image.media_url;

    const onHandleProductBump = e => {
        setProductBump({ ...productBump, [e.target.name]: e.target.value });
    }

    const onHandleProductEcommerce = e => {
        setProductEcommerce({ ...productEcommerce, [e.target.name]: e.target.value });
    }

    const onHandleProductFeature = e => {
        setProductFeature({ ...productFeature, [e.target.name]: e.target.value });
    }

    const onHandleProductShipping = e => {
        setProductEcommerce({ ...productEcommerce, [e.target.name]: e.target.checked });
    }

    const onProductTopicChange = value => {
        const topics = value.map(item => {
            return {
                value: item._id,
                label: item.name
            }
        });

        const topicIds = topics.map(item => {
            return item.value;
        });
        
        setProductTopic(value);
        console.log('[TabsAddProduct.onProductTopicChange]', productTopic);
        console.log('[TabsAddProduct.onProductTopicChange]', topics);
        console.log('[TabsAddProduct.onProductTopicChange]', topicIds);
    }

    const onProductAgentChange = value => {
        setProductAgent(value);
        console.log('[TabsAddProduct.onProductAgentChange]', productAgent);
    }

    const onProductTypeChange = value => {
        if (value != null) {
            setProductType(value.value);
        } else {
            setProductType(null);
        }
    }

    const onProductVisibilityChange = value => {
        if (value != null) {
            setProductVisibility(value.value);
        } else {
            setProductVisibility(null);
        }
    }

    const onProductSaleMethodChange = value => {
        if (value != null) {
            setProductSaleMethod(value.value);
        } else {
            setProductSaleMethod(null);
        }
    }

    form.bump = [{ ...productBump }];
    form.ecommerce = { ...productEcommerce };
    form.feature = { ...productFeature };

    productBump.bump_image = productImages.image.bump_image;

    const onHandleChangeForm = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    form.type = productType;
    form.visibility = productVisibility;
    form.sale_method = productSaleMethod;
 
    const onHandleChange = (event, newValue) => {
        setValue(newValue);
    }
    
    const onHandleChangeIndex = (index) => {
        setValue(index);
    }

    return (
        <React.Fragment>
            <h3>Add Product</h3>
            <Button
                size="small"
                startIcon={<KeyboardBackspaceTwoToneIcon />}
                component={Link}
                to="/products"
                style={{ marginBottom: '5px' }}
            >
                Back
            </Button>
            <Button
                size="small"
                startIcon={<SaveAltTwoToneIcon />}
                color="primary"
                style={{ marginBottom: '5px', float: 'right' }}
            >
                Save
            </Button>
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
                        <Tab label="Detail" {...a11yProps(0)} />
                        <Tab label="Layout" {...a11yProps(1)} />
                        <Tab label="Bump" {...a11yProps(2)} />
                        <Tab label="Section" {...a11yProps(3)} />
                    </Tabs>
                </Paper>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={onHandleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        {/* Form Detail */}
                        <DetailProduct 
                            topics={topics}
                            onHandleProductShipping={onHandleProductShipping}
                            onProductTopicChange={onProductTopicChange}
                            onChange={onHandleChangeForm}
                            onProductTypeChange={onProductTypeChange}
                            onProductVisibilityChange={onProductVisibilityChange}
                            onProductSaleMethodChange={onProductSaleMethodChange}
                            type={form.type}
                            name={form.name}
                            price={form.price}
                            time_period={form.time_period}
                            visibility={form.visibility}
                            sale_method={form.sale_method}
                            sale_price={form.sale_price}
                            images={productImages}
                            setProductImages={setProductImages}
                            productImageUrl={setProductImageUrl}
                            imageUrl={productImageUrl}
                            stock={productEcommerce.stock}
                            onHandleProductEcommerce={onHandleProductEcommerce}
                            weight={productEcommerce.weight}
                            charge_checked={productEcommerce.shipping_charges}
                            valueTopic={productTopic}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        Form Layout
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <BumpProduct
                            bump_name={productBump.bump_name}
                            bump_price={productBump.bump_price}
                            bump_weight={productBump.bump_weight}
                            bump_heading={productBump.bump_heading}
                            bump_desc={productBump.bump_desc}
                            onBumpChange={onHandleProductBump}
                            images={productImages}
                            setProductImages={setProductImages}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={3} dir={theme.direction}>
                        Form Section
                    </TabPanel>
                </SwipeableViews>
            </div>
        </React.Fragment>
    )
}

TabsAddProduct.propTypes = {
    topics: PropTypes.array,
    fetchTopic: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    topics: state.topic.topics
});

export default connect(mapStateToProps, { fetchTopic })(TabsAddProduct);
