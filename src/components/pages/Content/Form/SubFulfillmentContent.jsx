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
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import KeyboardBackspaceTwoToneIcon from '@material-ui/icons/KeyboardBackspaceTwoTone';
import AddPhotoAlternateTwoToneIcon from '@material-ui/icons/AddPhotoAlternateTwoTone';
import OndemandVideo from '@material-ui/icons/OndemandVideo';
import Mic from '@material-ui/icons/Mic';
import SaveAltTwoToneIcon from '@material-ui/icons/SaveAltTwoTone';
import RemoveTwoToneIcon from '@material-ui/icons/RemoveTwoTone';
import { Divider, Typography, Container } from '@material-ui/core';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { Editor } from '@tinymce/tinymce-react';
import DialogTitle from '@material-ui/core/DialogTitle';

import { fetchTopic } from '../../../../actions/topic';
import { fetchAgent } from '../../../../actions/agent';
import { fetchProducts } from '../../../../actions/product';

import { addContent, fetchContentByProductSlug } from '../../../../actions/content';
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
import MUIDataTable from 'mui-datatables';

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

let _post = {}

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
    error, 
    products,
    fetchTopic, 
    fetchAgent,
    fetchProducts,
    addContent,
    fetchContentByProductSlug,
    content
}) => {

    const DialogContent = withStyles((theme) => ({
        root: {
        padding: theme.spacing(2),
        },
    }))(MuiDialogContent);
  
    const DialogActions = withStyles((theme) => ({
        root: {
        margin: 0,
        padding: theme.spacing(1),
        },
    }))(MuiDialogActions);


    const [open, setOpen] = React.useState({open: false});
    // Form Product
    const [form, setForm] = React.useState({
        "product": "",
        "thanks": {
          "video": "",
          "title": "",
          "description": ""
        },
        "goal": "",
        "module": {
          "statement": [],
          "question": [],
          "mission": [],
          "mind_map": []
        },
        "post": []
      });

    // Post Product
    const [post, setPost] = React.useState({
          "title": "",
          "desc": "",
          "topic": "",
          "images": "",
          "post_type": "tips",
          "webinar": {
            "platform": "",
            "url": "",
            "start_datetime": "",
            "duration": 0
          },
          "video": {
            "url": ""
          },
          "podcast": {
            "url": ""
          },
          "tips": ""
        });


    React.useEffect(() => {
        let fullURL = window.location.href
        let slug = fullURL.split('/')[fullURL.split('/').length-1]
        let filter = "?fields=slug&value=" + slug
        fetchTopic();
        fetchAgent();
        fetchProducts(filter);

        fetchContentByProductSlug(slug);
        // eslint-disable-next-line
    },[]);

    React.useEffect(() => {
        if(products && products.length > 0 && products[0]['_id']) {
            const product = products[0]['_id']
            setForm({...form, product})
        }
    }, products);

    React.useEffect(() => {
        if(content && content.statusCode == 200 && content.message == "Success get Fulfillment Detail by product slug.") {
            isEdit == false && setIsEdit(true)
            let obj = {...content.data, product: form.product}
            if(!content.data.module) obj = {...obj, "module": {
                "statement": [],
                "question": [],
                "mission": [],
                "mind_map": []
              }}

            setForm(obj)
        }
    }, content);

    const [isEdit, setIsEdit] = React.useState(false)
    const [cover, setCover] = React.useState('');


    const onPostSingleImage = async e => {
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

        NProgress.done();
        res.data.result && setPost({...post, images: res.data.result.url});
    }
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [value2, setValue2] = React.useState(0);

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showCloseButton: true,
        showConfirmButton: false
    });

    // Learn About
    const [mindmap, setMindmap] = React.useState([
        { title: '', content: '', result: null }
    ]);


    const onHandleChangeContent = (type, i, e) => {
        let module = {...form.module}
        if(type == 'action') module.statement[i].value = e.target.value;
        if(type == 'question') module.question[i].value = e.target.value;
        if(type == 'check') module.mission[i].value = e.target.value;
        if(type == 'mindmap') module.mind_map[i].value = e.target.value;
        setForm({...form, module})
    }

    const onRemoveDynamicActionList = (i) => {
        let module = {...form.module}
        module.statement.splice(i, 1);
        setForm({...form, module})
    }

    const onRemoveDynamicQuestionList = (i) => {
        let module = {...form.module}
        module.question.splice(i, 1);
        setForm({...form, module})
    }

    const onRemoveDynamicCheckList = (i) => {
        let module = {...form.module}
        module.mission.splice(i, 1);
        setForm({...form, module})
    }

    const onRemoveDynamicMindmap = (i) => {
        let module = {...form.module}
        module.mind_map.splice(i, 1);
        setForm({...form, module})
    }

    const onProductTopicChange = topic => {
        setPost({...post, topic})
    }

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

    const onSaveWelcome = () => {
        const { goal, product, thanks } = form
        if(product && goal && thanks && thanks.video) {
            addContent(form, '', isEdit ? content.data['_id'] : 'default')
        } else {
            Toast.fire({
                icongvbbgf: 'error',
                title: 'Unable to save. Check empty field, errors and try again'
            });
        }
    }

    const onSaveAddModule = () => {
        const { product, module } = form
        const { statement, question, mission, mind_map } = module
        if(product && (statement || question || mission || mind_map)) {
            console.log('module', module)
            addContent({product, module}, '', isEdit ? content.data['_id'] : 'default')
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Unable to save. Check empty field, errors and try again'
            });
        }
    }

    const onSaveAddPost = () => {
        const { product } = form
        const { post_type, webinar } = post
        const { title, tips } = _post
        let topic = [], newPost
        if(product){
            post.topic.map((val)=>{ topic.push(val['_id']) })
            newPost = {...post, topic, title, tips }

            if(post_type == "tips"){
                delete newPost.webinar
                delete newPost.video
            }else if(post_type == "video"){
                delete newPost.webinar
                delete newPost.tips
            }else if(post_type == "webinar"){
                delete newPost.video
                delete newPost.tips
            }

            form.post.push(newPost)
            addContent(form, '', isEdit ? content.data['_id'] : 'default')
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Unable to save. Check empty field, errors and try again'
            });
        }
    }

    if (content && content.statusCode == 200 && content.message == "Success update the content(Fulfillment).") {
        Toast.fire({
            icon: 'success',
            title: content.message
        });
        window.location.replace("/contents");
    }

    const onHandleAddActionList = () => {
        const module = {...form.module}
        module.statement.push({ title: '', content: '', note: '' });
        setForm({...form, module})
    }

    const onHandleAddQuestionList = () => {
        const module = {...form.module}
        module.question.push({ title: '', content: '', note: '' });
        setForm({...form, module})
    }

    const onHandleAddCheckList = () => {
        const module = {...form.module}
        module.mission.push({ title: '', content: '', note: '' });
        setForm({...form, module})
    }

    const onHandleAddMindmap = () => {
        const module = {...form.module}
        module.mind_map.push({ title: '', content: '', note: '' });
        setForm({...form, module})
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
            NProgress.done()
            
            let module = {...form.module}
            module.mind_map[id].value = res.data.result.url
            setForm({...form, module})
        }
    }

    const onPostSingleVideo = async e => {
        const bodyForm = new FormData();
        const headers = {'Content-Type': 'multipart/form-data'}
        let res

        NProgress.start();
        bodyForm.append('file', e.target.files[0]);
        res = await api.post('/uploads/contents?sub_path=fulfillment-video', bodyForm, headers);

        res.data.result && NProgress.done();
        res.data.result && setPost({...post, video:{url: res.data.result}});
    }

    const onPostSinglePodcast = async e => {
        const bodyForm = new FormData();
        const headers = {'Content-Type': 'multipart/form-data'}
        let res

        NProgress.start();
        bodyForm.append('file', e.target.files[0]);
        res = await api.post('/uploads/contents?sub_path=fulfillment-podcast', bodyForm, headers);

        res.data.result && NProgress.done();
        res.data.result && setPost({...post, podcast:{url: res.data.result}});
    }

    const onPostSingleVideoThanks = async e => {
        NProgress.start();

        const bodyForm = new FormData();
        bodyForm.append('file', e.target.files[0]);
        const res = await api.post('/uploads/contents?sub_path=fulfillment-video-thanks', bodyForm, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (res.data.result) {
            NProgress.done()
            const {url, filename} = res.data.result
            const thanks = {video: url, title: filename, description: filename}
            setForm({...form, thanks})
        }
    }

    const onRemoveMindmap = async (id) => {
        const values = [...mindmap];
        values[id].result = null
        setMindmap(values);
    }

    const columns = [
        {
            label: 'Title',
            name: 'title',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value) => {
                    return (value)
                }
            }
        },
        {
            label: 'Placement',
            name: 'placement',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value) => {
                    return (value)
                }
            }
        },
        {
            label: 'Post type',
            name: 'post_type',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value) => {
                    return (value)
                }
            }
        },
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
    }

    const handleClosePopUp = (condition) => {
        setOpen({...open, open: false})
        
        // condition && condition == "up" && warna == "#FF9800" && fetchOrders()
    };

    return (
        <React.Fragment>
            <Button
                size="small"
                startIcon={<KeyboardBackspaceTwoToneIcon />}
                component={Link}
                to="/contents/fulfillment"
                style={{ marginBottom: '5px' }}
            >
                Back
            </Button>
            <div className={classes.root}>
                <Paper style={{paddingTop: '1px', paddingLeft: '10px'}}>
                    {products && 
                    <h2>Product {products[0].name} Fulfillment Content (laruno)</h2>
                    }
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
                            accept="video/*"
                            className={classes.input}
                            id={`contained-button-file-video-thanks`}
                            type="file"
                            style={{display: 'none'}}
                            onChange={e => onPostSingleVideoThanks(e)}
                        />
                        {form.thanks && form.thanks.video && <img src={form.thanks.video} alt={form.thanks.title} />}
                        {form.thanks && form.thanks.video && <br />}
                        {form.thanks && form.thanks.video &&  <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                            onClick={()=>{setForm({...form, thanks: {}})}}
                        >
                            Delete
                        </Button>}
                        {form.thanks && form.thanks.video && <br />}
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
                            onChange={e => setForm({...form, goal: e.currentTarget.value})}
                            placeholder="Message"
                            defaultValue={form.goal}
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
                                {form.module && form.module.statement && form.module.statement.map((field, i) => {
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
                                                    onChange={e => onHandleChangeContent('action', i, e)} 
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
                                {form.module && form.module.question && form.module.question.map((field, i) => {
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
                                                    onChange={e => onHandleChangeContent('question', i, e)} 
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
                                {form.module && form.module.mission && form.module.mission.map((field, i) => {
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
                                                    onChange={e => onHandleChangeContent('check', i, e)} 
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
                                {form.module && form.module.mind_map && form.module.mind_map.map((field, i) => {
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
                                                    accept="image/*"
                                                    className={classes.input}
                                                    id={`contained-button-file-mindmap-${i}`}
                                                    style={{display: 'none'}}
                                                    type="file"
                                                    onChange={e => onPostSingleMindmap(e, i)}
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

                    
                        {content && content.data &&
                        <MUIDataTable 
                            title={<div>
                                <h2>Post List</h2>
                                <Button
                                    variant="contained"
                                    color="default"
                                    style={{ marginBottom: '10px' }}
                                    size="small"
                                    onClick={() => setOpen({...open, open: true})}
                                    startIcon={<AddCircleTwoToneIcon />}
                                >
                                    Add Post
                                </Button>
                            </div>} 
                            data={content.data.post} 
                            columns={columns} 
                            options={options} 
                        />
                            }


                        <Dialog onClose={handleClosePopUp} aria-labelledby="customized-dialog-title" open={open && open.open || false}>
                            <DialogTitle id="customized-dialog-title" onClose={handleClosePopUp}>
                                Add Post
                            </DialogTitle>
                            <DialogContent dividers>
                                <form className={classes.root} noValidate autoComplete="off" style={{padding: '10px 0px', alignContent: 'center'}}>
                                    <TextField
                                        label="Title"
                                        type="text"
                                        value={_post.title}
                                        onChange={e => _post.title = e.target.value}
                                    />
                                    <br /><br />
                                    <Select
                                        className={classes.select}
                                        placeholder="Select Topic"
                                        options={topics}
                                        value={post.topic}
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
                                        onChange={e => onPostSingleImage(e)}
                                    />
                                    {post.images && <img src={post.images} />}
                                    {post.images && <br />}
                                    {post.images && <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        startIcon={<DeleteIcon />}
                                        onClick={()=>setPost({...post, images: ''})}
                                    >
                                        Delete
                                    </Button>}
                                    {post.images && <br />}
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
                                    <span style={{display: 'flex'}}>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Placement</FormLabel>
                                            <RadioGroup aria-label="gender" name="gender1" value={post.placement} onChange={e => setPost({...post, placement: e.target.value})}>
                                            <FormControlLabel value="" control={<Radio />} label="None" />
                                            <FormControlLabel value="spotlight" control={<Radio />} label="Spotlight (any tips)" />
                                                <FormControlLabel value="stories" control={<Radio />} label="Stories (16:9)" />
                                            </RadioGroup>
                                        </FormControl>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Post Type</FormLabel>
                                            <RadioGroup aria-label="gender" name="gender1" value={post.post_type} onChange={e => setPost({...post, post_type: e.target.value})}>
                                                <FormControlLabel value="webinar" control={<Radio />} label="Webinar" />
                                                <FormControlLabel value="video" control={<Radio />} label="Video" />
                                                <FormControlLabel value="tips" control={<Radio />} label="Tips" />
                                            </RadioGroup>
                                        </FormControl>
                                    </span>
                                </form>

                                {/* Detail */}
                                {post.post_type && 
                                    <>
                                        <br />
                                        <FormLabel component="legend">Post Type : {post.post_type.charAt(0).toUpperCase() + post.post_type.slice(1)}</FormLabel>
                                        <br />
                                        {post.post_type == "webinar" && 
                                        <>
                                            <Container>
                                                <TextField
                                                    label="Title"
                                                    type="text"
                                                    value={post.webinar.title}
                                                    onChange={e => setPost({...post, webinar:{...post.webinar, title: e.target.value}})}
                                                />
                                                <br />
                                                <TextField
                                                    label="Live Room"
                                                    type="text"
                                                    value={post.webinar.url}
                                                    onChange={e => setPost({...post, webinar:{...post.webinar, url: e.target.value}})}
                                                />
                                                <br />
                                                <TextField
                                                    label="Platform"
                                                    type="text"
                                                    value={post.webinar.platform}
                                                    onChange={e => setPost({...post, webinar:{...post.webinar, platform: e.target.value}})}
                                                />
                                                <br />
                                                <TextField
                                                    label="Jadwal"
                                                    type="text"
                                                    value={post.webinar.start_datetime}
                                                    onChange={e => setPost({...post, webinar:{...post.webinar, start_datetime: e.target.value}})}
                                                />
                                                <br />
                                                <TextField
                                                    label="Duration"
                                                    type="text"
                                                    value={post.webinar.duration}
                                                    onChange={e => setPost({...post, webinar:{...post.webinar, duration: e.target.value}})}
                                                />
                                            </Container>
                                        </>
                                        }
                                        
                                        {post.post_type == "video" && 
                                        <>
                                            <Container>
                                                <input
                                                    accept="video/*"
                                                    className={classes.input}
                                                    id={`contained-button-file-video`}
                                                    style={{display: 'none'}}
                                                    type="file"
                                                    onChange={e => onPostSingleVideo(e)}
                                                />
                                                {post.video.url && <img src={post.video.url} />}
                                                {post.video.url && <br />}
                                                {post.video.url && <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    className={classes.button}
                                                    startIcon={<DeleteIcon />}
                                                    onClick={() => setPost({...post, video:{url: ''}})}
                                                >
                                                    Delete
                                                </Button>}
                                                {post.video.url && <br />}
                                                <label htmlFor={`contained-button-file-video`}>
                                                    <Button 
                                                        variant="contained" 
                                                        color="default"
                                                        className={classes.btnUploads} 
                                                        component="span" 
                                                        startIcon={<OndemandVideo />}
                                                        size="small"
                                                    >
                                                        Video
                                                    </Button>
                                                </label>
                                            </Container>
                                            <br/>

                                            <Container>
                                                <input
                                                    accept="audio/*"
                                                    className={classes.input}
                                                    id={`contained-button-file-podcast`}
                                                    style={{display: 'none'}}
                                                    type="file"
                                                    onChange={e => onPostSinglePodcast(e)}
                                                />
                                                {post.podcast.url && <img src={post.podcast.url} />}
                                                {post.podcast.url && <br />}
                                                {post.podcast.url && <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    className={classes.button}
                                                    startIcon={<DeleteIcon />}
                                                    onClick={() => setPost({...post, podcast:{url: ''}})}
                                                >
                                                    Delete
                                                </Button>}
                                                {post.podcast.url && <br />}
                                                <label htmlFor={`contained-button-file-podcast`}>
                                                    <Button 
                                                        variant="contained" 
                                                        color="default"
                                                        className={classes.btnUploads} 
                                                        component="span" 
                                                        startIcon={<Mic />}
                                                        size="small"
                                                    >
                                                        Podcast
                                                    </Button>
                                                </label>
                                            </Container>
                                        </>
                                        }

                                        {post.post_type == "tips" && 
                                        <>
                                            <Editor
                                                apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                                                initialValue={post.tips}
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
                                                onEditorChange={e => _post.tips = e}
                                            />
                                        </>
                                        }
                                    </>
                                }
                            </DialogContent>
                            <DialogActions>
                                <Button
                                        size="small"
                                        startIcon={<SaveAltTwoToneIcon />}
                                        color="primary"
                                        style={{ marginBottom: '5px', float: 'right' }}
                                        onClick={() => onSaveAddPost()}
                                    >
                                        Save
                                    </Button>
                            </DialogActions>
                        </Dialog>
                        

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

export default connect(mapStateToProps, { fetchTopic, fetchAgent, fetchProducts, addContent, fetchContentByProductSlug})(SubFulfillmentContent);
