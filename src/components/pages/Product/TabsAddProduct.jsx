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
import { fetchAgent } from '../../../actions/agent';

import DetailProduct from './Form/DetailProduct';
import BumpProduct from './Form/BumpProduct';
import BonusProduct from './Form/BonusProduct';
import LayoutProduct from './Form/LayoutProduct';

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
}));

const TabsAddProduct = ({ 
    topics, 
    agents, 
    fetchTopic, 
    fetchAgent
}) => {
    React.useEffect(() => {
        fetchTopic();
        fetchAgent();
        // eslint-disable-next-line
    },[]);

    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    // Form Product
    const [form, setForm] = React.useState({
        name: '',
        slug: '',
        type: '',
        boe: '',
        ecommerce: '',
        topic: [],
        price: 0,
        time_period: 0,
        visibility: '',
        sale_method: '',
        bump: '',
        // point_gamification: 0,
        
        headline: '',
        subheadline: '',
        description: '',
        learn_about: '',
        sale_price: 0,
        image_url: [],
        bonus: '',
        agent: [],
        media_url: '',
        section: '',
        feature: ''
    });

    // Learn About
    const [productLearnAbout, setProductLearnAbout] = React.useState([
        { title: '', content: '', note: '' }
    ]);

    const onHandleChangeDynamicLearnAboutTitle = (i, e) => {
        const values = [...productLearnAbout];
        values[i].title = e.target.value;
        setProductLearnAbout(values);
    }

    const onHandleChangeDynamicLearnAboutContent = (i, e) => {
        const values = [...productLearnAbout];
        values[i].content = e.target.value;
        setProductLearnAbout(values);
    }

    const onHandleChangeDynamicLearnAboutNote = (i, e) => {
        const values = [...productLearnAbout];
        values[i].note = e.target.value;
        setProductLearnAbout(values);
    }

    const onAddDynamicLearnAbout = () => {
        const values = [...productLearnAbout];
        values.push({ title: '', content: '', note: '' });
        setProductLearnAbout(values);
    }

    const onRemoveDynamicLearnAbout = (i) => {
        const values = [...productLearnAbout];
        values.splice(i, 1);
        setProductLearnAbout(values);
    }

    form.learn_about = [...productLearnAbout];

    // Section
    const [productSection, setProductSection] = React.useState([
        { title: '', content: '', image: '' }
    ]);

    const onHandleChangeDynamicSectionTitle = (i, e) => {
        const values = [...productSection];
        values[i].title = e.target.value;
        setProductSection(values);
    }

    const onHandleChangeDynamicSectionContent = (i, e) => {
        const values = [...productSection];
        values[i].content = e.target.value;
        setProductSection(values);
    }

    const onHandleChangeDynamicSectionImage = (i, url) => {
        const values = [...productSection];
        values[i].image = url;
        setProductSection(values);
    }

    const onAddDynamicSection = () => {
        const values = [...productSection];
        values.push({ title: '', content: '', image: '' });
        setProductSection(values);
    }

    const onRemoveDynamicSection = (i) => {
        const values = [...productSection];
        values.splice(i, 1);
        setProductSection(values);
    }

    form.section = [...productSection];

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

    // Bonus
    const [productBonus, setProductBonus] = React.useState({
        image: '',
        title: '',
        description: ''
    });

    // Feature
    const [productFeature, setProductFeature] = React.useState({
        feature_onheader: '',
        // feature_onpage: ''
        active_header: false,
        active_page: false
    });

    // Topic & Agent
    const [productTopic, setProductTopic] = React.useState([]);
    const [productAgent, setProductAgent] = React.useState([]);

    // Product Type
    const [productType, setProductType] = React.useState(null);

    // Product Visibility
    const [productVisibility, setProductVisibility] = React.useState(null);

    // Product Sale Method
    const [productSaleMethod, setProductSaleMethod] = React.useState(null);

    // ToDo: Description

    // Array of image_url
    const [productImageUrl, setProductImageUrl] = React.useState([]);

    const onHandleProductBump = e => {
        setProductBump({ ...productBump, [e.target.name]: e.target.value });
        console.log('[TabsAddProduct.onHandleProductBump]', productBump);
    }

    const setProductBumpImage = url => {
        setProductBump({ ...productBump, bump_image: url });
        console.log('[TabsAddProduct.setProductBumpImage]', productBump.bump_image);
    }

    const onHandleProductEcommerce = e => {
        setProductEcommerce({ ...productEcommerce, [e.target.name]: e.target.value });
        console.log('[TabsAddProduct.onHandleProductEcommerce]', productEcommerce);
    }

    const onHandleProductBonus = e => {
        setProductBonus({ ...productBonus, [e.target.name]: e.target.value });
        console.log('[TabsAddProduct.onHandleProductBonus]', productBonus);
    }

    const setProductBonusImage = url => {
        setProductBonus({ ...productBonus, image: url });
        console.log('[TabsAddProduct.setProductBonusImage]', productBonus.image);
    }

    const onHandleProductFeature = e => {
        setProductFeature({ ...productFeature, [e.target.name]: e.target.value });
        console.log('[TabsAddProduct.onHandleProductFeature]', productFeature);
    }

    const onHandleProductShipping = e => {
        setProductEcommerce({ ...productEcommerce, [e.target.name]: e.target.checked });
        console.log('[TabsAddProduct.onHandleProductShipping]', productEcommerce);
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
        form.topic = topicIds;

        setProductTopic(value);
        console.log('[TabsAddProduct.onProductTopicChange]', productTopic);
        console.log('[TabsAddProduct.onProductTopicChange]', topics);
        console.log('[TabsAddProduct.onProductTopicChange]', topicIds);
        console.log('[TabsAddProduct.onProductTopicChange', form.topic);
    }

    const onProductAgentChange = value => {
        const agents = value.map(item => {
            return {
                value: item._id,
                label: item.name
            }
        });

        const agentIds = agents.map(item => {
            return item.value;
        });
        form.agent = agentIds;

        setProductAgent(value);
        console.log('[TabsAddProduct.onProductAgentChange]', productAgent);
        console.log('[TabsAddProduct.onProductAgentChange]', agents);
        console.log('[TabsAddProduct.onProductAgentChange]', agentIds);
        console.log('[TabsAddProduct.onProductAgentChange]', form.agent);
    }

    const onProductTypeChange = value => {
        if (value != null) {
            setProductType(value);
        } else {
            setProductType(null);
        }
        console.log('[TabsAddProduct.onProductTypeChange]', productType);
    }

    const onProductVisibilityChange = value => {
        if (value != null) {
            setProductVisibility(value);
        } else {
            setProductVisibility(null);
        }
        console.log('[TabsAddProduct.onProductVisibilityChange]', productVisibility);
    }

    const onProductSaleMethodChange = value => {
        if (value != null) {
            setProductSaleMethod(value);
        } else {
            setProductSaleMethod(null);
        }
        console.log('[TabsAddProduct.onProductSaleMethodChange]', productSaleMethod);
    }

    const onHandleChangeForm = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
        console.log('[TabsAddProduct.onHandleChangeForm]', form);
    }

    const onHandleEditorChange = content => {
        setForm({ ...form, description: content });
    }

    const setMediaUrl = url => {
        setForm({ ...form, media_url: url });
    }

    form.type = productType;
    form.visibility = productVisibility;
    form.sale_method = productSaleMethod;
    form.image_url = productImageUrl;

    form.bump = [{ ...productBump }];
    form.ecommerce = { ...productEcommerce };
    form.bonus = { ...productBonus };
    form.feature = { ...productFeature };

    // productBump.bump_image = productImages.image.bump_image;
    // productBonus.image = productImages.image.image_bonus;
 
    const onHandleChange = (event, newValue) => {
        setValue(newValue);
    }
    
    const onHandleChangeIndex = (index) => {
        setValue(index);
    }

    const onSave = () => {
        form.type = productType ? productType.value : '';
        if (form.type !== 'ecommerce') {
            delete form.ecommerce;
        }

        form.visibility = productVisibility ? productVisibility.value : '';
        form.sale_method = productSaleMethod ? productSaleMethod.value : '';
        
        console.log(form);
        
        for (let key in form) {
            if (form[key] === '' || (form[key] instanceof Array && form[key].length === 0)) {
                delete form[key];
            }
        }

        console.log('onSave', form);
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
                onClick={() => onSave()}
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
                        <Tab label="Bonus" {...a11yProps(3)} />
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
                            slug={form.slug}
                            name={form.name}
                            price={form.price}
                            time_period={form.time_period}
                            visibility={form.visibility}
                            sale_method={form.sale_method}
                            sale_price={form.sale_price}
                            // point_gamification={form.point_gamification}
                            stock={productEcommerce.stock}
                            onHandleProductEcommerce={onHandleProductEcommerce}
                            weight={productEcommerce.weight}
                            charge_checked={productEcommerce.shipping_charges}
                            valueTopic={productTopic}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <LayoutProduct
                            headline={form.headline}
                            subheadline={form.subheadline}
                            description={form.description}
                            agents={agents}
                            media_url={form.media_url}
                            setMediaUrl={setMediaUrl}
                            valueAgent={productAgent}
                            onProductAgentChange={onProductAgentChange}
                            onChange={onHandleChangeForm}
                            onEditorChange={onHandleEditorChange}
                            imageUrl={productImageUrl}
                            setProductImageUrl={setProductImageUrl}
                            learnAbout={productLearnAbout}
                            onHandleAddLearnAbout={onAddDynamicLearnAbout}
                            onHandleRemoveLearnAbout={onRemoveDynamicLearnAbout}
                            onHandleLearnAboutChangeTitle={onHandleChangeDynamicLearnAboutTitle}
                            onHandleLearnAboutChangeContent={onHandleChangeDynamicLearnAboutContent}
                            onHandleLearnAboutChangeNote={onHandleChangeDynamicLearnAboutNote}
                            sections={productSection}
                            onHandleAddSection={onAddDynamicSection}
                            onHandleRemoveSection={onRemoveDynamicSection}
                            onHandleSectionChangeTitle={onHandleChangeDynamicSectionTitle}
                            onHandleSectionChangeContent={onHandleChangeDynamicSectionContent}
                            onHandleSectionChangeImage={onHandleChangeDynamicSectionImage}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <BumpProduct
                            bump_name={productBump.bump_name}
                            bump_price={productBump.bump_price}
                            bump_weight={productBump.bump_weight}
                            bump_heading={productBump.bump_heading}
                            bump_desc={productBump.bump_desc}
                            bump_image={productBump.bump_image}
                            onBumpChange={onHandleProductBump}
                            setProductBumpImage={setProductBumpImage}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={3} dir={theme.direction}>
                        <BonusProduct
                            bonus_title={productBonus.title}
                            bonus_description={productBonus.description}
                            bonus_image={productBonus.image}
                            onBonusChange={onHandleProductBonus}
                            setProductBonusImage={setProductBonusImage}
                        />
                    </TabPanel>
                </SwipeableViews>
            </div>
        </React.Fragment>
    )
}

TabsAddProduct.propTypes = {
    topics: PropTypes.array,
    agents: PropTypes.array,
    fetchTopic: PropTypes.func.isRequired,
    fetchAgent: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    topics: state.topic.topics,
    agents: state.agent.agents
});

export default connect(mapStateToProps, { fetchTopic, fetchAgent })(TabsAddProduct);
