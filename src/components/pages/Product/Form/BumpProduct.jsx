import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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

const BumpProduct = (props) => {
    const classes = useStyles();

    const {
        bump_name,
        bump_price,
        bump_weight,
        bump_heading,
        bump_desc,
        onBumpChange,

        images,
        setProductImages
    } = props;

    console.log('[BumpProduct.bump.name]', bump_name);
    console.log('[BumpProduct.bump.price]', bump_price);
    console.log('[BumpProduct.bump.weight]', bump_weight);
    console.log('[BumpProduct.bump.heading]', bump_heading);
    console.log('[BumpProduct.bump.desc]', bump_desc);

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                label="Bump Name"
                type="text"
                name="bump_name"
                id="bump_name"
                value={bump_name}
                onChange={onBumpChange}
            />
            <TextField
                label="Bump Price"
                type="number"
                name="bump_price"
                id="bump_price"
                value={bump_price}
                onChange={onBumpChange}
                helperText={<NumberFormat value={bump_price} displayType="text" thousandSeparator={true} prefix="Rp" />}
            />
            <TextField
                label="Bump Weight"
                type="number"
                name="bump_weight"
                id="bump_weight"
                value={bump_weight}
                onChange={onBumpChange}
                helperText={`${bump_weight} gr`}
            />
            <TextField
                label="Bump Heading"
                type="text"
                name="bump_heading"
                id="bump_heading"
                value={bump_heading}
                onChange={onBumpChange}
            />
            <TextField
                id="bump_desc"
                name="bump_desc"
                value={bump_desc} 
                rowsmin={10}
                rowsMax={100} 
                variant="outlined"
                multiline
                style={{ width: '100%' }}
                label="Bump Description"
                onChange={onBumpChange} 
            />
            <input
                accept="image/x-png,image/gif,image/jpeg"
                className={classes.input}
                id="contained-button-file-image"
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
                    Image
                </Button>
            </label>
        </form>
    )
}

export default BumpProduct;
