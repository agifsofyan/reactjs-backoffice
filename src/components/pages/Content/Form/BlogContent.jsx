import React from 'react';
import Select from 'react-select';

import NumberFormat from 'react-number-format';
import slugify from 'react-slugify';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { Editor } from '@tinymce/tinymce-react';

import { makeStyles } from '@material-ui/core/styles';

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
    const [description, setDescription] = React.useState('');

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

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                label="Title"
                type="text"
            /><br/>
            <TextField
                label="Cover Image"
                type="text"
            /><br/>
            <TextField
                label="Video URL"
                type="text"
            /><br/>
            <TextField
                label="Podcast URL"
                type="text"
            /><br/>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={charge_checked}
                        onChange={onHandleProductShipping}
                        name="shipping_charges"
                        color="primary"
                    />
                }
                label="Placement Spotlight"
            /> 
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
            /><br />
            Description :
            <Editor
                apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                initialValue={description}
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
                onEditorChange={e => setDescription(e)}
            />
        </form>
    )
}

export default BlogContent;
