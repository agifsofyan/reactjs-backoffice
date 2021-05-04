import React from 'react';
import Select from 'react-select';

import NumberFormat from 'react-number-format';
import slugify from 'react-slugify';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import AddPhotoAlternateTwoToneIcon from '@material-ui/icons/AddPhotoAlternateTwoTone';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import DeleteIcon from '@material-ui/icons/Delete';

import NProgress from 'nprogress';

import { makeStyles } from '@material-ui/core/styles';

import api from '../../../../utils/api';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    select: {
        float: 'left',
        marginBottom: '5px',
    },
    input: {
        display: 'none',
    },
    btnUploads: {
        marginTop: 15,
        marginRight: 5
    },
}));

const BlogContent = (props) => {
    const classes = useStyles();

    const productTypes = [
        { value: 'boe', label: 'Boe' },
        { value: 'ecourse', label: 'E-course' },
        { value: 'ecommerce', label: 'E-commerce' },
        { value: 'bonus', label: 'Bonus' }
    ]

    const productVisibilities = [
        { value: 'publish', label: 'Public' },
        { value: 'private', label: 'Private' },
        { value: 'draft', label: 'Draft' }
    ]

    const productSaleMethods = [
        { value: 'normal', label: 'Normal' },
        { value: 'upsale', label: 'Upsale' },
        { value: 'upgrade', label: 'Upgrade' },
        { value: 'crosssale', label: 'Cross-sale' }
    ]

    const productTypeShipping = [
        { value: false, label: 'COD' },
        { value: true, label: 'Reguler' },
    ]

    const {
        name,
        slug,
        type,
        is_reguler,
        price,
        time_period,
        visibility,
        sale_method,
        // point_gamification,

        onChange,

        onProductTypeChange,
        onProductVisibilityChange,
        onProductSaleMethodChange,
        onHandleIsReguler,
        topics,
        onProductTopicChange,
        valueTopic,

        onHandleProductShipping,
        weight,
        stock,
        charge_checked,
        sale_price,
        onHandleProductEcommerce
    } = props;

    const [placement, setPlacement] = React.useState('spotlight');
    const [posttype, setPostype] = React.useState('');
    const [cover, setCover] = React.useState('');

    const handleChangePlacement = (event) => {
        setPlacement(event.target.value);
      };
    const handleChangePostType = (event) => {
        setPostype(event.target.value);
    };

    const setLabel = (arr, value) => {
        let getData;

        arr.map(item => {
            if(item.value == value.value ? value.value : value)
                getData = item
        })

        return getData ? getData.label : value
    }

    const setValue = (arr, value) => {
        let getData;

        arr.map(item => {
            if(item.value == value.value ? value.value : value)
                getData = item
        })
        console.log('value 1', value, getData)
        return value
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

    return (
        <form className={classes.root} noValidate autoComplete="off" style={{padding: '10px 50px', alignContent: 'center'}}>
            <TextField
                label="Title"
                type="text"
            />
            <br /><br />
            <Select
                className={classes.select}
                placeholder="Select Topic"
                options={topics}
                value={valueTopic}
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
    )
}

export default BlogContent;
