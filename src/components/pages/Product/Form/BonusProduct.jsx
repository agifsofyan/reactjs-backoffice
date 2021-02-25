import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

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

const BonusProduct = (props) => {
    const classes = useStyles();

    const {
        bonus_title,
        bonus_description,
        onBonusChange,

        images,
        setProductImages
    } = props;

    console.log('[BonusProduct.title]', bonus_title);
    console.log('[BonusProduct.description]', bonus_description);

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                label="Bonus Title"
                type="text"
                name="title"
                id="title"
                value={bonus_title}
                onChange={onBonusChange}
            />
            <TextField
                id="description"
                name="description"
                value={bonus_description} 
                rowsmin={10}
                rowsMax={100}
                multiline
                variant="outlined"
                style={{ width: '100%' }}
                label="Bonus Description"
                onChange={onBonusChange} 
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

export default BonusProduct;
