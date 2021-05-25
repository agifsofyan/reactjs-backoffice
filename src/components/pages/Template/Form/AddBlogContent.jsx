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
import SaveAltTwoToneIcon from '@material-ui/icons/SaveAltTwoTone';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';
import RemoveTwoToneIcon from '@material-ui/icons/RemoveTwoTone';
import { Container } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import OndemandVideo from '@material-ui/icons/OndemandVideo';
import { Editor } from '@tinymce/tinymce-react';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import { fetchTopic } from '../../../../actions/topic';
import { fetchAgent } from '../../../../actions/agent';
import { addProduct } from '../../../../actions/product';

import Swal from 'sweetalert2';

import NProgress from 'nprogress';

import FulfillmentContent from './FulfillmentContent';
import { addContent, fetchContent, fetchContents } from '../../../../actions/content';

import api from '../../../../utils/api';
import Spinner from '../../../layouts/Spinner';
import MUIDataTable from 'mui-datatables';

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
let idContent = ''

const AddBlogContent = ({ 
    topics, 
    agents,
    content,
    contents, 
    error, 
    product,
    fetchTopic, 
    fetchAgent,
    addProduct,
    fetchContent,
    fetchContents,
    addContent,
    setLoading
}) => {
    React.useEffect(() => {
        fetchContents();
        fetchTopic();
        fetchAgent();
        let fullURL = window.location.href
        idContent = fullURL.split('/')[fullURL.split('/').length-1]
        idContent != '' && fetchContent(idContent);
        // eslint-disable-next-line
    },[]);

    const classes = useStyles();
    const history = useHistory();

    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [value4, setValue4] = React.useState(0);

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showCloseButton: true,
        showConfirmButton: false
    });

    const columns = [
        {
            name: '_id',
            options: {
                display: false,
                filter: false,
                sort: false
            }
        },
        { 
            label: 'Title',
            name: 'title', 
            options: { 
                filter: true,
                sort: true,
                filterOptions: { 
                    fullWidth: true 
                }
            } 
        },
        { 
            label: 'Description',
            name: 'desc', 
            options: { 
                filter: true,
                sort: true,
                filterOptions: { 
                    fullWidth: true 
                }
            } 
        },
        {
            name: 'Action',
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <ButtonGroup size="small" aria-label="small outlined button group">
                                {/* <Button onClick={() => console.log(tableMeta.rowData[0])}>Detail</Button> */}
                                <Button component={Link} to={`/contents/edit/${tableMeta.rowData[0]}`}>Edit</Button>
                            </ButtonGroup>
                        </>
                    )
                }
            }
        }
    ];

    const options = {
        selectableRows:false,
        search: true,
        download: false,
        print: false,
        viewColumns: false,
        filter: false,
        filterType: 'dropdown',
        responsive: 'vertical',
        tableBodyHeight: '100%',
        sortOrder: {
            name: 'created_at',
            direction: 'desc'
        },
        // onTableChange: (action, state) => {
        //     console.log(action);
        //     console.dir(state);
        // },
    }


    // Form Product
    const [isEdit, setIsEdit] = React.useState(false)
    const [topic, setTopic] = React.useState([])
    const [cover, setCover] = React.useState('');
    const [video, setVideo] = React.useState([
        { url: '', title: '' }
    ]);
    const [podcast, setPodcast] = React.useState([
        { url: '', title: '' }
    ]);
    const [placement, setPlacement] = React.useState('spotlight')
    const [form, setForm] = React.useState({
        title: '',
        topic: '',
        desc: '',
        images: [],
        podcast: [],
        video: [],
        placement: 0,
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
            values[id].url = res.data.result.url
            setPodcast(values);
        }
    }

    const onRemovePodcast = async (id) => {
        const values = [...podcast];
        values[id].result = null
        setPodcast(values);
    }

    const onRemoveDynamicLearnAbout = (i) => {
        const values = [...productLearnAbout];
        values.splice(i, 1);
        setProductLearnAbout(values);
    }

    const onHandleAddVideo = () => {
        const values = [...video];
        values.push({url: '', title: ''});
        setVideo(values);
    }

    const onRemoveVideo = async (id) => {
        const values = [...video];
        values[id].result = null
        setVideo(values);
    }

    const onHandleAddPodcast = () => {
        const values = [...podcast];
        values.push({url: '', title: ''});
        setPodcast(values);
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
    const onHandleChange4 = (event, newValue) => {
        setValue4(newValue);
    }
    
    const onHandleChangeIndex4 = (index) => {
        setValue4(index);
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
            values[id].url = res.data.result.url
            setVideo(values);
        }
    }

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
        console.log('[AddBlogContent.onHandleProductBump]', productBump);
    }

    const setProductBumpImage = url => {
        setProductBump({ ...productBump, bump_image: url });
        console.log('[AddBlogContent.setProductBumpImage]', productBump.bump_image);
    }

    const onHandleProductEcommerce = e => {
        setProductEcommerce({ ...productEcommerce, [e.target.name]: e.target.value });
        console.log('[AddBlogContent.onHandleProductEcommerce]', productEcommerce);
    }

    const onHandleProductBonus = e => {
        setProductBonus({ ...productBonus, [e.target.name]: e.target.value });
        console.log('[AddBlogContent.onHandleProductBonus]', productBonus);
    }

    const setProductBonusImage = url => {
        setProductBonus({ ...productBonus, image: url });
        console.log('[AddBlogContent.setProductBonusImage]', productBonus.image);
    }

    const onHandleProductFeature = e => {
        setProductFeature({ ...productFeature, [e.target.name]: e.target.value });
        console.log('[AddBlogContent.onHandleProductFeature]', productFeature);
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
        setForm({...form, topic:topicIds});
        setProductTopic(value);
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
    }

    const onProductTypeChange = value => {
        if (value != null) {
            setProductType(value);
        } else {
            setProductType(null);
        }
        console.log('[AddBlogContent.onProductTypeChange]', productType);
    }

    const onProductVisibilityChange = value => {
        if (value != null) {
            setProductVisibility(value);
        } else {
            setProductVisibility(null);
        }
        console.log('[AddBlogContent.onProductVisibilityChange]', productVisibility);
    }

    const onProductSaleMethodChange = value => {
        if (value != null) {
            setProductSaleMethod(value);
        } else {
            setProductSaleMethod(null);
        }
        console.log('[AddBlogContent.onProductSaleMethodChange]', productSaleMethod);
    }

    const onHandleChangeForm = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
        console.log('[AddBlogContent.onHandleChangeForm]', form);
    }

    const onHandleEditorChange = content => {
        setForm({ ...form, description: content });
    }

    const setMedia = url => {
        setForm({ ...form, media: {
            isVideo: false,
            url
        } });
    }

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
        if(form.title){
            const { title, topic, desc, placement} = form
            const newForm = { title, topic, desc, images: [cover.result.url], podcast, video, placement}

            console.log('idContent 1', idContent)
            addContent(newForm, 'blog');
        } else {
            Toast.fire({
                icongvbbgf: 'error',
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

    if (content && content.statusCode == 200) {
        const { title, topic, desc, images, podcast, video, placement} = content.data
        if(!isEdit){
            !isEdit && setIsEdit(true)
            !cover && !cover.ressult && setCover({
                result:{
                    url: images[0]
                }
            })
            form.title != title && setForm({...form, title, topic, desc, images, podcast, video, placement})
            setVideo(video)
            setPodcast(podcast)

        }
        let _topics = []
        topics && topics.map(item => {
            topic.map(i => {
                i['_id'] == item['_id'] && _topics.push(item)
            })
        });
        productTopic.length == 0 &&  _topics.length > 0 && setProductTopic(_topics)
    }

    return (
        <React.Fragment>
            <h3>Add Blog</h3>
            <Button
                size="small"
                startIcon={<KeyboardBackspaceTwoToneIcon />}
                component={Link}
                to="/contents"
                style={{ marginBottom: '5px' }}
            >
                Back
            </Button>
            <div className={classes.root} style={{padding: '40px 120px 120px'}}>
                        
                    <Button
                        size="small"
                        startIcon={<SaveAltTwoToneIcon />}
                        color="primary"
                        style={{ marginBottom: '5px', float: 'right' }}
                        onClick={() => onSave()}
                    >
                        {isEdit ? 'Edit' : 'Save'}
                    </Button>
                        
                    {/* Form Detail */}
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField
                            label="Title"
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({...form, title: e.target.value})}
                        />
                        <br />
                        <br />
                        Description :
                        <Editor
                            apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                            initialValue={form.desc}
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
                            onEditorChange={e => setForm({...form, desc: e})}
                        />
                        <br/>
                        <input
                            accept="image/*"
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
                                Cover image
                            </Button>
                        </label>
                        <br/>
                        <br/>
                        <FormControl style={{minWidth: 240}}>
                            <Select
                                className={classes.select}
                                placeholder="Select Topic"
                                options={topics}
                                value={productTopic}
                                getOptionValue={(option) => option._id}
                                getOptionLabel={(option) => option.name}
                                onChange={(onProductTopicChange)}
                                style={{width: '50%'}}
                                isClearable
                                isMulti
                            />
                        </FormControl>
                        <br />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={form.placement == 'spotlight'}
                                    onChange={e => setForm({ ...form, placement: e.target.checked?'spotlight':'stories' })}
                                    name="shipping_charges"
                                    color="primary"
                                />
                            }
                            label="Spotlight"
                        />

                    </form>

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
                                            accept="video/*"
                                            className={classes.input}
                                            id={`contained-button-file-video-${i}`}
                                            style={{display: 'none'}}
                                            type="file"
                                            onChange={(e) => onPostSingleVideo(e, i)}
                                        />
                                        {field && field.url && <img src={field.url} />}
                                        {field && field.url && <br />}
                                        {field && field.url &&  <Button
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            startIcon={<DeleteIcon />}
                                            onClick={()=>{onRemoveVideo(i)}}
                                        >
                                            Delete
                                        </Button>}
                                        {field && field.url && <br />}
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
                                            accept="audio/*"
                                            className={classes.input}
                                            id={`contained-button-file-podcast-${i}`}
                                            style={{display: 'none'}}
                                            type="file"
                                            onChange={(e) => onPostSinglePodcast(e, i)}
                                        />
                                        {field && field.url && <img src={field.url} />}
                                        {field && field.url && <br />}
                                        {field && field.url &&  <Button
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            startIcon={<DeleteIcon />}
                                            onClick={()=>{onRemovePodcast(i)}}
                                        >
                                            Delete
                                        </Button>}
                                        {field && field.url && <br />}
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
            </div>
        </React.Fragment>
    )
}

AddBlogContent.propTypes = {
    topics: PropTypes.array,
    agents: PropTypes.array,
    product: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    fetchTopic: PropTypes.func.isRequired,
    fetchAgent: PropTypes.func.isRequired,
    addProduct: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    topics: state.topic.topics,
    agents: state.agent.agents,
    product: state.product.product,
    content: state.content.content,
    error: state.product.error,
    contents: state.content.contents,
    setLoading: state.content.setLoading
});

export default connect(mapStateToProps, { fetchTopic, fetchAgent, addProduct, addContent, fetchContent, fetchContents})(AddBlogContent);
