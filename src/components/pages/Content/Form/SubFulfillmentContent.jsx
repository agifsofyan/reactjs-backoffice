import React from 'react';
import Select from 'react-select';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import SwipeableViews from 'react-swipeable-views';

import PropTypes from 'prop-types';

import Tabs from '@material-ui/core/Tabs';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import KeyboardBackspaceTwoToneIcon from '@material-ui/icons/KeyboardBackspaceTwoTone';
import AddPhotoAlternateTwoToneIcon from '@material-ui/icons/AddPhotoAlternateTwoTone';
import OndemandVideo from '@material-ui/icons/OndemandVideo';
import SaveAltTwoToneIcon from '@material-ui/icons/SaveAltTwoTone';
import RemoveTwoToneIcon from '@material-ui/icons/RemoveTwoTone';
import { Divider, Typography, Container } from '@material-ui/core';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Editor } from '@tinymce/tinymce-react';

import { fetchTopic } from '../../../../actions/topic';
import { fetchAgent } from '../../../../actions/agent';
import { fetchProducts } from '../../../../actions/product';
import { addContent } from '../../../../actions/content';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';


import Swal from 'sweetalert2';

import NProgress from 'nprogress';

import api from '../../../../utils/api';

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

const SubFulfillmentContent = ({ 
    topics, 
    agents,
    error, 
    products,
    fetchTopic, 
    fetchAgent,
    fetchProducts,
    addContent,
    content
}) => {
    React.useEffect(() => {
        let fullURL = window.location.href
        let slug = fullURL.split('/')[fullURL.split('/').length-1]
        let filter = "?fields=slug&value=" + slug
        fetchTopic();
        fetchAgent();
        fetchProducts(filter);
        // eslint-disable-next-line

    },[]);

    const [placement, setPlacement] = React.useState('spotlight');
    const [posttype, setPostype] = React.useState('webinar');
    const [cover, setCover] = React.useState('');

    const handleChangePlacement = (event) => {
        setPlacement(event.target.value);
      };
    const handleChangePostType = (event) => {
        setPostype(event.target.value);
    };

    const onPostSingleImage = async (e) => {
        let fullurl = window.location.href
        let spliturl = fullurl.split('/')
        let path = spliturl[spliturl.length-1]
        NProgress.start();

        const bodyForm = new FormData();
        bodyForm.append('file', e.target.files[0]);
        const res = await api.post('/uploads/contents?sub_path=fulfillment_' + path, bodyForm, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (res.data.result) {
            NProgress.done();

            setCover(res.data);
        }
    }
    const classes = useStyles();
    const history = useHistory();

    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [value2, setValue2] = React.useState(0);
    const [value3, setValue3] = React.useState(0);
    const [value4, setValue4] = React.useState(0);

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showCloseButton: true,
        showConfirmButton: false
    });

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
    const [actionList, setActionList] = React.useState([
        { title: '', content: '', note: '' }
    ]);
    const [questionList, setQuestionList] = React.useState([
        { title: '', content: '', note: '' }
    ]);
    const [checkList, setCheckList] = React.useState([
        { title: '', content: '', note: '' }
    ]);
    const [mindmap, setMindmap] = React.useState([
        { title: '', content: '', result: null }
    ]);
    const [webinar, setWebinar] = React.useState([
        { title: '', platform: '', url: '', start_datetime: '', duration: '' }
    ]);
    const [video, setVideo] = React.useState([
        { title: '', content: '', note: '' }
    ]);
    const [podcast, setPodcast] = React.useState([
        { title: '', content: '', note: '' }
    ]);
    const [videoThanks, setVideoThanks] = React.useState([
        { title: '', content: '', note: '' }
    ]);
    const [goalofproducts, setGoalofproducts] = React.useState('')
    const [title, setTitle] = React.useState('')
    const [tips, setTips] = React.useState('')


    const onHandleLearnAboutChangeTitle = (i, e) => {
        const values = [...actionList];
        values[i].title = e.target.value;
        setActionList(values);
    }

    const onHandleLearnAboutChangeNote = (i, e) => {
        const values = [...actionList];
        values[i].content = e.target.value;
        setActionList(values);
    }

    const onHandleChangeContent = (type, i, e) => {
        let values;
        switch(type){
            case 'action':
                values = [...actionList];
                values[i].value = e.target.value;
                setActionList(values);
                break;
            case 'question':
                values = [...questionList];
                values[i].value = e.target.value;
                setQuestionList(values);
                break;
            case 'check':
                values = [...checkList];
                values[i].value = e.target.value;
                setCheckList(values);
                break;
            case 'mindmap':
                values = [...mindmap];
                values[i].value = e.target.value;
                setMindmap(values);
                break;
        }
    }

    const onHandleRemoveLearnAbout = (i, e) => {
        const values = [...actionList];
        if(e && e.target) values[i].note = e.target.value;
        setActionList(values);
    }

    const onAddDynamicLearnAbout = () => {
        const values = [...actionList];
        values.push({ title: '', content: '', note: '' });
        setActionList(values);
    }

    const onRemoveDynamicActionList = (i) => {
        const values = [...actionList];
        values.splice(i, 1);
        setActionList(values);
    }

    const onRemoveDynamicQuestionList = (i) => {
        const values = [...questionList];
        values.splice(i, 1);
        setQuestionList(values);
    }

    const onRemoveDynamicCheckList = (i) => {
        const values = [...checkList];
        values.splice(i, 1);
        setCheckList(values);
    }

    const onRemoveDynamicMindmap = (i) => {
        const values = [...mindmap];
        values.splice(i, 1);
        setMindmap(values);
    }

    const onRemoveDynamicVideo = (i) => {
        const values = [...video];
        values.splice(i, 1);
        setVideo(values);
    }

    const onRemoveDynamicPodcast = (i) => {
        const values = [...podcast];
        values.splice(i, 1);
        setPodcast(values);
    }

    const onRemoveDynamicWebinar = (i) => {
        const values = [...webinar];
        values.splice(i, 1);
        setWebinar(values);
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
        setTopic(value);
    }

    form.learn_about = [...actionList];

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
    const [topic, setTopic] = React.useState([]);
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
    const onHandleChange2 = (event, newValue) => {
        setValue2(newValue);
    }
    
    const onHandleChangeIndex2 = (index) => {
        setValue2(index);
    }
    const onHandleChange3 = (event, newValue) => {
        setValue3(newValue);
    }
    
    const onHandleChangeIndex3 = (index) => {
        setValue3(index);
    }
    const onHandleChange4 = (event, newValue) => {
        setValue4(newValue);
    }
    
    const onHandleChangeIndex4 = (index) => {
        setValue4(index);
    }

    const onSaveWelcome = () => {
        if(products && goalofproducts && videoThanks){
            const newForm = {
                "product": products[0]['_id'],
                "thanks": {
                  "video": videoThanks.result.url,
                  "title": "",
                  "description": ""
                },
                "goal": goalofproducts
              }
    
            addContent(newForm);
        } else {
            Toast.fire({
                icongvbbgf: 'error',
                title: 'Unable to save. Check empty field, errors and try again'
            });
        }
    }
    const onSaveAddModule = () => {
        if(products && (actionList || questionList || checkList || mindmap)){
            const newForm = {
                "product": products[0]['_id'],
                "module": {
                    "statement": actionList,
                    "question": questionList,
                    "mission": checkList,
                    "mind_map": mindmap
                  }
              }
    
            addContent(newForm);
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Unable to save. Check empty field, errors and try again'
            });
        }
    }

    const onSaveAddPost = () => {
        let arrTopic = [], arrWebinar = [], arrVideo = [], arrPodcast = []
        if(products && (topic || webinar)){
            topic.map((val)=>{
                arrTopic.push(val['_id'])
            })
            let newForm = {
                "product": products[0]['_id'],
                "post": {
                    "title": title,
                    "topic": arrTopic,
                    "images": [cover && cover.result && cover.result.url || ''],
                    "placement": placement,
                    "post_type": posttype
                },
              }
             
              if(posttype == 'webinar') {
                  webinar.map((val)=>{
                      arrWebinar.push({
                          "platform": val.platform,
                          "url": val.liferoom,
                          "title": val.title,
                          "start_datetime": val.jadwal,
                          "duration": val.duration
                      })
                  })
                  newForm['webinar'] = arrWebinar
              }
             
              if(posttype == 'video') {
                video.map((val, i)=>{
                    arrVideo.push({
                          "url": val,
                          "title": "Video part " + (i+1),
                      })
                  })
                  newForm['video'] = arrVideo

                  podcast.map((val, i)=>{
                      arrPodcast.push({
                            "url": val,
                            "title": "Podcast part " + (i+1),
                        })
                    })
                    newForm['podcast'] = arrPodcast
              }
             
              if(posttype == 'tips')  newForm['tips'] = tips
    
            console.log('onSave', newForm);
    
            addContent(newForm);
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Unable to save. Check empty field, errors and try again'
            });
        }
    }

    if (content && content.statusCode == 201) {
        Toast.fire({
            icon: 'success',
            title: content.message
        });
        window.location.replace("/contents");
    }

    const onHandleAddActionList = () => {
        const values = [...actionList];
        values.push({ title: '', content: '', note: '' });
        setActionList(values);
    }

    const onHandleAddQuestionList = () => {
        const values = [...questionList];
        values.push({ title: '', content: '', note: '' });
        setQuestionList(values);
    }

    const onHandleAddCheckList = () => {
        const values = [...checkList];
        values.push({ title: '', content: '', note: '' });
        setCheckList(values);
    }

    const onHandleAddMindmap = () => {
        const values = [...mindmap];
        values.push({ title: '', content: '', note: '' });
        setMindmap(values);
    }

    const onHandleAddWebinar = () => {
        const values = [...webinar];
        values.push({ title: '', content: '', note: '' });
        setWebinar(values);
    }

    const onHandleAddVideo = () => {
        const values = [...video];
        values.push({ title: '', content: '', note: '' });
        setVideo(values);
    }

    const onHandleAddPodcast = () => {
        const values = [...podcast];
        values.push({ title: '', content: '', note: '' });
        setPodcast(values);
    }

    const onHandleAddVideoThanks = () => {
        const values = [...videoThanks];
        values.push({ title: '', content: '', note: '' });
        setVideoThanks(values);
    }

    const onPostSingleMindmap = async (e, id) => {
        NProgress.start();

        const bodyForm = new FormData();
        bodyForm.append('file', e.target.files[0]);
        const res = await api.post('/uploads/contents?sub_path=fulfillment-mindmap', bodyForm, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (res.data.result) {
            NProgress.done();

            const values = [...mindmap];
            values[id].value = res.data.result.url
            setMindmap(values);
        }
    }

    const onPostSingleVideo = async (e, id) => {
        NProgress.start();

        const bodyForm = new FormData();
        bodyForm.append('file', e.target.files[0]);
        const res = await api.post('/uploads/contents?sub_path=fulfillment-video', bodyForm, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (res.data.result) {
            NProgress.done();

            const values = [...video];
            values[id].result = res.data.result
            setVideo(values);
        }
    }

    const onPostWebinarTitle = async (e, id) => {
        const values = [...webinar];
        values[id].title = e.target.value
        setWebinar(values);
    }

    const onPostWebinarLifeRoom = async (e, id) => {
        const values = [...webinar];
        values[id].liferoom = e.target.value
        setWebinar(values);
    }

    const onPostWebinarPlatform = async (e, id) => {
        const values = [...webinar];
        values[id].platform = e.target.value
        setWebinar(values);
    }

    const onPostWebinarDuration = async (e, id) => {
        const values = [...webinar];
        values[id].duration = e.target.value
        setWebinar(values);
    }

    const onPostWebinarJadwal = async (e, id) => {
        const values = [...webinar];
        values[id].jadwal = e.target.value
        setWebinar(values);
    }

    const onPostSinglePodcast = async (e, id) => {
        NProgress.start();

        const bodyForm = new FormData();
        bodyForm.append('file', e.target.files[0]);
        const res = await api.post('/uploads/contents?sub_path=fulfillment-podcast', bodyForm, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (res.data.result) {
            NProgress.done();

            const values = [...podcast];
            values[id].result = res.data.result
            setPodcast(values);
        }
    }

    const onPostSingleVideoThanks = async (e) => {
        NProgress.start();

        const bodyForm = new FormData();
        bodyForm.append('file', e.target.files[0]);
        const res = await api.post('/uploads/contents?sub_path=fulfillment-video-thanks', bodyForm, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (res.data.result) {
            NProgress.done();

            setVideoThanks(res.data);
        }
    }

    const onRemoveMindmap = async (id) => {
        const values = [...mindmap];
        values[id].result = null
        setMindmap(values);
    }

    const onRemoveVideo = async (id) => {
        const values = [...video];
        values[id].result = null
        setVideo(values);
    }

    const onRemovePodcast = async (id) => {
        const values = [...podcast];
        values[id].result = null
        setPodcast(values);
    }

    return (
        <React.Fragment>
            {products && 
            <h3>Product {products[0].name} Fulfillment Content (laruno)</h3>
            }
            <Button
                size="small"
                startIcon={<KeyboardBackspaceTwoToneIcon />}
                component={Link}
                to="/contents/add"
                style={{ marginBottom: '5px' }}
            >
                Back
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
                        <Tab label="Welcome" {...a11yProps(0)} />
                        <Tab label="Add Module" {...a11yProps(1)} />
                        <Tab label="Add Post" {...a11yProps(2)} />
                    </Tabs>
                </Paper>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={onHandleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <Button
                            size="small"
                            startIcon={<SaveAltTwoToneIcon />}
                            color="primary"
                            style={{ marginBottom: '5px', float: 'right' }}
                            onClick={() => onSaveWelcome()}
                        >
                            Save
                        </Button>
                        {/* Welcome */}
                        <input
                            accept="image/x-png,image/gif,image/jpeg"
                            className={classes.input}
                            id={`contained-button-file-video-thanks`}
                            type="file"
                            style={{display: 'none'}}
                            onChange={(e) => onPostSingleVideoThanks(e)}
                        />
                        {videoThanks && videoThanks.result && <img src={videoThanks.result.url} alt={videoThanks.result.filename} />}
                        {videoThanks && videoThanks.result && <br />}
                        {videoThanks && videoThanks.result &&  <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                            onClick={()=>{setVideoThanks('')}}
                        >
                            Delete
                        </Button>}
                        {videoThanks && videoThanks.result && <br />}
                        <label htmlFor={`contained-button-file-video-thanks`}>
                            <Button 
                                variant="contained" 
                                color="default"
                                className={classes.btnUploads} 
                                component="span" 
                                startIcon={<OndemandVideo />}
                                size="small"
                            >
                                Video Thanks
                            </Button>
                        </label>
                        <br />
                        <br />
                        Goal of products
                        <br />
                        <TextareaAutosize
                            rows={8}
                            cols={60}
                            onChange={(e) => setGoalofproducts(e.currentTarget.value)}
                            placeholder="Message"
                            defaultValue={goalofproducts}
                            />
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <Button
                            size="small"
                            startIcon={<SaveAltTwoToneIcon />}
                            color="primary"
                            style={{ marginBottom: '5px', float: 'right' }}
                            onClick={() => onSaveAddModule()}
                        >
                            Save
                        </Button>
                        <Paper>
                            <Tabs
                                value={value2}
                                onChange={onHandleChange2}
                                indicatorColor="primary"
                                textColor="primary"
                                aria-label="tab-panel"
                                centered
                            >
                                <Tab label="Action List" {...a11yProps(0)} />
                                <Tab label="Question List" {...a11yProps(1)} />
                                <Tab label="Check List" {...a11yProps(2)} />
                                <Tab label="Mindmap" {...a11yProps(3)} />
                            </Tabs>
                        </Paper>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value2}
                            onChangeIndex={onHandleChangeIndex2}
                        >
                            <TabPanel value={value2} index={0} dir={theme.direction}>
                                <Button
                                    size="small"
                                    startIcon={<AddTwoToneIcon />}
                                    color="secondary"
                                    style={{ marginBottom: '5px', float: 'right' }}
                                    onClick={() => onHandleAddActionList()}
                                >
                                    Add
                                </Button>
                                {actionList.map((field, i) => {
                                    return (
                                        <>
                                            <Button
                                                size="small"
                                                startIcon={<RemoveTwoToneIcon />}
                                                style={{ marginBottom: '5px' }}
                                                onClick={() => onRemoveDynamicActionList(i)}
                                            >
                                                Delete
                                            </Button>
                                            <Container key={`${field}-${i}`}>
                                                <TextField
                                                    id={`learn-about-content-${i}`}
                                                    name={`learn-about-content-${i}`}
                                                    value={field.value} 
                                                    variant="outlined"
                                                    rowsmin={10}
                                                    rowsMax={100} 
                                                    multiline
                                                    style={{ width: '100%', marginTop: '10px', marginBottom: '15px' }}
                                                    label="Data"
                                                    onChange={(e) => onHandleChangeContent('action', i, e)} 
                                                />                    
                                            </Container>
                                        </>
                                    )
                                })}
                            </TabPanel>
                            <TabPanel value={value2} index={1} dir={theme.direction}>
                                <Button
                                    size="small"
                                    startIcon={<AddTwoToneIcon />}
                                    color="secondary"
                                    style={{ marginBottom: '5px', float: 'right' }}
                                    onClick={() => onHandleAddQuestionList()}
                                >
                                    Add
                                </Button>
                                {questionList.map((field, i) => {
                                    return (
                                        <>
                                            <Button
                                                size="small"
                                                startIcon={<RemoveTwoToneIcon />}
                                                style={{ marginBottom: '5px' }}
                                                onClick={() => onRemoveDynamicQuestionList(i)}
                                            >
                                                Delete
                                            </Button>
                                            <Container key={`${field}-${i}`}>
                                                <TextField
                                                    id={`learn-about-content-${i}`}
                                                    name={`learn-about-content-${i}`}
                                                    value={field.value} 
                                                    variant="outlined"
                                                    rowsmin={10}
                                                    rowsMax={100} 
                                                    multiline
                                                    style={{ width: '100%', marginTop: '10px', marginBottom: '15px' }}
                                                    label="Data"
                                                    onChange={(e) => onHandleChangeContent('question', i, e)} 
                                                />            
                                            </Container>
                                        </>
                                    )
                                })}
                            </TabPanel>
                            <TabPanel value={value2} index={2} dir={theme.direction}>
                                <Button
                                    size="small"
                                    startIcon={<AddTwoToneIcon />}
                                    color="secondary"
                                    style={{ marginBottom: '5px', float: 'right' }}
                                    onClick={() => onHandleAddCheckList()}
                                >
                                    Add
                                </Button>
                                {checkList.map((field, i) => {
                                    return (
                                        <>
                                            <Button
                                                size="small"
                                                startIcon={<RemoveTwoToneIcon />}
                                                style={{ marginBottom: '5px' }}
                                                onClick={() => onRemoveDynamicCheckList(i)}
                                            >
                                                Delete
                                            </Button>
                                            <Container key={`${field}-${i}`}>
                                                <TextField
                                                    id={`learn-about-content-${i}`}
                                                    name={`learn-about-content-${i}`}
                                                    value={field.value} 
                                                    variant="outlined"
                                                    rowsmin={10}
                                                    rowsMax={100} 
                                                    multiline
                                                    style={{ width: '100%', marginTop: '10px', marginBottom: '15px' }}
                                                    label="Data"
                                                    onChange={(e) => onHandleChangeContent('check', i, e)} 
                                                /> 
                                            </Container>
                                        </>
                                    )
                                })}
                            </TabPanel>
                            <TabPanel value={value2} index={3} dir={theme.direction}>
                                <Button
                                    size="small"
                                    startIcon={<AddTwoToneIcon />}
                                    color="secondary"
                                    style={{ marginBottom: '5px', float: 'right' }}
                                    onClick={() => onHandleAddMindmap()}
                                >
                                    Add
                                </Button>
                                {mindmap.map((field, i) => {
                                    return (
                                        <>
                                            <Button
                                                size="small"
                                                startIcon={<RemoveTwoToneIcon />}
                                                style={{ marginBottom: '5px' }}
                                                onClick={() => onRemoveDynamicMindmap(i)}
                                            >
                                                Delete
                                            </Button>
                                            <Container key={`${field}-${i}`}>
                                                <input
                                                    accept="image/x-png,image/gif,image/jpeg"
                                                    className={classes.input}
                                                    id={`contained-button-file-mindmap-${i}`}
                                                    style={{display: 'none'}}
                                                    type="file"
                                                    onChange={(e) => onPostSingleMindmap(e, i)}
                                                />
                                                {field && field.value && <img src={field.value} />}
                                                {field && field.value && <br />}
                                                {field && field.value &&  <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    className={classes.button}
                                                    startIcon={<DeleteIcon />}
                                                    onClick={()=>{onRemoveMindmap(i)}}
                                                >
                                                    Delete
                                                </Button>}
                                                {field && field.result && <br />}
                                                <label htmlFor={`contained-button-file-mindmap-${i}`}>
                                                    <Button 
                                                        variant="contained" 
                                                        color="default"
                                                        className={classes.btnUploads} 
                                                        component="span" 
                                                        startIcon={<AddPhotoAlternateTwoToneIcon />}
                                                        size="small"
                                                    >
                                                        Upload
                                                    </Button>
                                                </label>
                                            </Container>
                                        </>
                                    )
                                })}
                            </TabPanel>
                        </SwipeableViews>
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <Button
                            size="small"
                            startIcon={<SaveAltTwoToneIcon />}
                            color="primary"
                            style={{ marginBottom: '5px', float: 'right' }}
                            onClick={() => onSaveAddPost()}
                        >
                            Save
                        </Button>

                        <form className={classes.root} noValidate autoComplete="off" style={{padding: '10px 0px', width: '50%', alignContent: 'center'}}>
                            <TextField
                                label="Title"
                                type="text"
                                value={title}
                                onChange={(e)=> setTitle(e.target.value)}
                            />
                            <br /><br />
                            <Select
                                className={classes.select}
                                placeholder="Select Topic"
                                options={topics}
                                value={topic}
                                getOptionValue={(option) => option._id}
                                getOptionLabel={(option) => option.name}
                                onChange={onProductTopicChange}
                                isClearable
                                isMulti
                            />
                            <br /><br />
                            <br />
                            <input
                                accept="image/x-png,image/gif,image/jpeg"
                                className={classes.input}
                                id="contained-button-file-cover"
                                style={{display: 'none'}}
                                type="file"
                                onChange={(e) => onPostSingleImage(e)}
                            />
                            {cover && cover.result && <img src={cover.result.url} alt={cover.result.filename} />}
                            {cover && cover.result && <br />}
                            {cover && cover.result &&  <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<DeleteIcon />}
                                onClick={()=>{setCover('')}}
                            >
                                Delete
                            </Button>}
                            {cover && cover.result && <br />}
                            <label htmlFor="contained-button-file-cover">
                                <Button 
                                    variant="contained" 
                                    color="default"
                                    className={classes.btnUploads} 
                                    component="span" 
                                    startIcon={<AddPhotoAlternateTwoToneIcon />}
                                    size="small"
                                >
                                    Cover upload
                                </Button>
                            </label>
                            <br /><br />
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Placement</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={placement} onChange={handleChangePlacement}>
                                    <FormControlLabel value="spotlight" control={<Radio />} label="Spotlight (any tips)" />
                                    <FormControlLabel value="stories" control={<Radio />} label="Stories (16:9)" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Post Type</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={posttype} onChange={handleChangePostType}>
                                    <FormControlLabel value="webinar" control={<Radio />} label="Webinar" />
                                    <FormControlLabel value="video" control={<Radio />} label="Video" />
                                    <FormControlLabel value="tips" control={<Radio />} label="Tips" />
                                </RadioGroup>
                            </FormControl>
                        </form>

                        {/* Detail */}
                        <br />
                        <FormLabel component="legend">Post Type : {posttype.charAt(0).toUpperCase() + posttype.slice(1)}</FormLabel>
                        <br />
                        {posttype == "webinar" && 
                        <>
                            <Button
                                size="small"
                                startIcon={<AddTwoToneIcon />}
                                color="secondary"
                                style={{ marginBottom: '5px', float: 'right' }}
                                onClick={() => onHandleAddWebinar()}
                            >
                                Add
                            </Button>
                            {webinar.map((field, i) => {
                                return (
                                    <>
                                    <Button
                                        size="small"
                                        startIcon={<RemoveTwoToneIcon />}
                                        style={{ marginBottom: '5px' }}
                                        onClick={() => onRemoveDynamicWebinar(i)}
                                    >
                                        Delete
                                    </Button>
                                    <Container key={`${field}-${i}`}>
                                        <TextField
                                            label="Title"
                                            type="text"
                                            value={field.title}
                                            onChange={(e) => onPostWebinarTitle(e, i)}
                                        />
                                        <br />
                                        <TextField
                                            label="Life Room"
                                            type="text"
                                            value={field.liferoom}
                                            onChange={(e) => onPostWebinarLifeRoom(e, i)}
                                        />
                                        <br />
                                        <TextField
                                            label="Platform"
                                            type="text"
                                            value={field.platform}
                                            onChange={(e) => onPostWebinarPlatform(e, i)}
                                        />
                                        <br />
                                        <TextField
                                            label="Jadwal"
                                            type="text"
                                            value={field.jadwal}
                                            onChange={(e) => onPostWebinarJadwal(e, i)}
                                        />
                                        <br />
                                        <TextField
                                            label="Duration"
                                            type="text"
                                            value={field.duration}
                                            onChange={(e) => onPostWebinarDuration(e, i)}
                                        />
                                    </Container>
                                    </>
                                )
                            })}
                        </>
                        }
                        
                        {posttype == "video" && 
                        <>
                            <Paper>
                                <Tabs
                                    value={value4}
                                    onChange={onHandleChange4}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    aria-label="tab-panel"
                                    centered
                                >
                                    <Tab label="Video" {...a11yProps(0)} />
                                    <Tab label="Podcast" {...a11yProps(1)} />
                                </Tabs>
                            </Paper>
                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={value4}
                                onChangeIndex={onHandleChangeIndex4}
                            >
                                <TabPanel value={value4} index={0} dir={theme.direction}>
                                    <Button
                                        size="small"
                                        startIcon={<AddTwoToneIcon />}
                                        color="secondary"
                                        style={{ marginBottom: '5px', float: 'right' }}
                                        onClick={() => onHandleAddVideo()}
                                    >
                                        Add
                                    </Button>
                                    {video.map((field, i) => {
                                        return (
                                            <>
                                            <Button
                                                size="small"
                                                startIcon={<RemoveTwoToneIcon />}
                                                style={{ marginBottom: '5px' }}
                                                onClick={() => onRemoveDynamicVideo(i)}
                                            >
                                                Delete
                                            </Button>
                                            <Container key={`${field}-${i}`}>
                                                <input
                                                    accept="video"
                                                    className={classes.input}
                                                    id={`contained-button-file-video-${i}`}
                                                    style={{display: 'none'}}
                                                    type="file"
                                                    onChange={(e) => onPostSingleVideo(e, i)}
                                                />
                                                {field && field.result && <img src={field.result.url} alt={field.result.filename} />}
                                                {field && field.result && <br />}
                                                {field && field.result &&  <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    className={classes.button}
                                                    startIcon={<DeleteIcon />}
                                                    onClick={()=>{onRemoveVideo(i)}}
                                                >
                                                    Delete
                                                </Button>}
                                                {field && field.result && <br />}
                                                <label htmlFor={`contained-button-file-video-${i}`}>
                                                    <Button 
                                                        variant="contained" 
                                                        color="default"
                                                        className={classes.btnUploads} 
                                                        component="span" 
                                                        startIcon={<OndemandVideo />}
                                                        size="small"
                                                    >
                                                        Upload
                                                    </Button>
                                                </label>
                                            </Container>
                                            </>
                                        )
                                    })}
                                </TabPanel>
                                <TabPanel value={value4} index={1} dir={theme.direction}>
                                    <Button
                                            size="small"
                                            startIcon={<AddTwoToneIcon />}
                                            color="secondary"
                                            style={{ marginBottom: '5px', float: 'right' }}
                                            onClick={() => onHandleAddPodcast()}
                                        >
                                        Add
                                    </Button>
                                    {podcast.map((field, i) => {
                                        return (
                                            <>
                                            <Button
                                                size="small"
                                                startIcon={<RemoveTwoToneIcon />}
                                                style={{ marginBottom: '5px' }}
                                                onClick={() => onRemoveDynamicPodcast(i)}
                                            >
                                                Delete
                                            </Button>
                                            <Container key={`${field}-${i}`}>
                                                <input
                                                    accept="video"
                                                    className={classes.input}
                                                    id={`contained-button-file-podcast-${i}`}
                                                    style={{display: 'none'}}
                                                    type="file"
                                                    onChange={(e) => onPostSinglePodcast(e, i)}
                                                />
                                                {field && field.result && <img src={field.result.url} alt={field.result.filename} />}
                                                {field && field.result && <br />}
                                                {field && field.result &&  <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    className={classes.button}
                                                    startIcon={<DeleteIcon />}
                                                    onClick={()=>{onRemovePodcast(i)}}
                                                >
                                                    Delete
                                                </Button>}
                                                {field && field.result && <br />}
                                                <label htmlFor={`contained-button-file-podcast-${i}`}>
                                                    <Button 
                                                        variant="contained" 
                                                        color="default"
                                                        className={classes.btnUploads} 
                                                        component="span" 
                                                        startIcon={<OndemandVideo />}
                                                        size="small"
                                                    >
                                                        Upload
                                                    </Button>
                                                </label>
                                            </Container>
                                            </>
                                        )
                                    })}
                                </TabPanel>
                            </SwipeableViews>
                        </>
                        }

                        {posttype == "tips" && 
                        <>
                            <Editor
                                apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                                initialValue={tips}
                                init={{
                                    height: 300,
                                    width: 833,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code wordcount'
                                    ],
                                    toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen preview save print | insertfile image media template link anchor codesample | ltr rtl'
                                }}
                                onEditorChange={e => setTips(e)}
                            />
                        </>
                        }
                    </TabPanel>
                </SwipeableViews>
            </div>
        </React.Fragment>
    )
}

SubFulfillmentContent.propTypes = {
    topics: PropTypes.array,
    agents: PropTypes.array,
    products: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    fetchTopic: PropTypes.func.isRequired,
    fetchAgent: PropTypes.func.isRequired,
    addContent: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    topics: state.topic.topics,
    agents: state.agent.agents,
    products: state.product.products,
    content: state.content.content,
    error: state.product.error
});

export default connect(mapStateToProps, { fetchTopic, fetchAgent, fetchProducts, addContent })(SubFulfillmentContent);
