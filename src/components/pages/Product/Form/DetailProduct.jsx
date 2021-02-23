import React from 'react';
import Select from 'react-select';

import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import VideocamTwoToneIcon from '@material-ui/icons/VideocamTwoTone';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import { makeStyles } from '@material-ui/core/styles';

import NumberFormat from 'react-number-format';


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

const AddDetailProduct = (props) => {
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

    const {
        name,
        type,
        price,
        time_period,
        visibility,
        sale_method,

        onChange,

        onProductTypeChange,
        onProductVisibilityChange,
        onProductSaleMethodChange,
        
        topics,
        onProductTopicChange,
        valueTopic,

        onHandleProductShipping,
        weight,
        stock,
        charge_checked,
        sale_price,

        onHandleProductEcommerce,

        images,
        setProductImages,
        productImageUrl,
        setProductImageUrl
    } = props;

    console.log('[DetailProduct.form.name]', name);
    console.log('[DetailProduct.form.time_period]', time_period);
    console.log('[DetailProduct.form.price]', price);
    console.log('[DetailProduct.form.sale_price]', sale_price);
    console.log('[DetailProduct.form.topic]', valueTopic);
    console.log('[DetailProduct.form.type]', type);
    console.log('[DetailProduct.form.visibility]', visibility);
    console.log('[DetailProduct.form.sale_method]', sale_method);
    console.log('[DetailProduct.productEcommerce.shipping_charges', charge_checked);
    console.log('[DetailProduct.productEcommerce.weight', weight);
    console.log('[DetailProduct.productEcommerce.stock', stock);

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                label="Product Name"
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={onChange}
            />
            <TextField
                label="Time Period"
                type="number"
                name="time_period"
                id="time_period"
                value={time_period}
                onChange={onChange}
                helperText={`${time_period > 1 ? time_period + ' months' : time_period + ' month'}`}
            />
            <TextField
                label="Regular Price"
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={onChange}
                helperText={<NumberFormat value={price} displayType="text" thousandSeparator={true} prefix="Rp" />}
            />
            <TextField
                label="Special Price"
                type="number"
                name="sale_price"
                id="sale_price"
                value={sale_price}
                onChange={onChange}
                helperText={<NumberFormat value={sale_price} displayType="text" thousandSeparator={true} prefix="Rp" />}
            />
            <Select
                className={classes.select}
                placeholder="Select Topic"
                options={topics}
                getOptionValue={(option) => option._id}
                getOptionLabel={(option) => option.name}
                onChange={onProductTopicChange}
                isClearable
                isMulti
            />
            <Select
                className={classes.select}
                placeholder="Select Product Type"
                options={productTypes}
                onChange={onProductTypeChange}
                isClearable
            />
            {type === 'ecommerce' ? (
                <>
                    <TextField
                        label="Weight"
                        type="number"
                        name="weight"
                        id="weight"
                        value={weight}
                        onChange={onHandleProductEcommerce}
                        helperText={`${weight} gr`}
                    />
                    <TextField
                        label="Stock"
                        type="number"
                        name="stock"
                        id="stock"
                        value={stock}
                        onChange={onHandleProductEcommerce}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={charge_checked}
                                onChange={onHandleProductShipping}
                                name="shipping_charges"
                                color="primary"
                            />
                        }
                        label="Charge Shipping?"
                    />
                </>
            ) : null}
            <Select
                className={classes.select}
                placeholder="Select Visibility"
                options={productVisibilities}
                onChange={onProductVisibilityChange}
                isClearable
            />
            <Select
                className={classes.select}
                placeholder="Select Sale Method"
                options={productSaleMethods}
                onChange={onProductSaleMethodChange}
                isClearable
            />
            <input
                accept="image/x-png,image/gif,image/jpeg"
                className={classes.input}
                id="contained-button-file-image"
                multiple
                type="file"
            />
            <label htmlFor="contained-button-file-image">
                <Button 
                    variant="contained" 
                    color="default" 
                    component="span" 
                    className={classes.btnUploads}
                    startIcon={<PhotoCamera />}
                    size="small"
                >
                    Image(s)
                </Button>
            </label>
            <input
                accept="video/mp4,video/x-m4v,video/*,image/x-png,image/gif,image/jpeg"
                className={classes.input}
                id="contained-button-file-media"
                type="file"
            />
            <label htmlFor="contained-button-file-media">
                <Button 
                    variant="contained" 
                    color="default"
                    className={classes.btnUploads} 
                    component="span" 
                    startIcon={<VideocamTwoToneIcon />}
                    size="small"
                >
                    Header Media
                </Button>
            </label>
        </form>
    )
}

export default AddDetailProduct;
