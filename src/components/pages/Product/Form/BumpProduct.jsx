import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import AddPhotoAlternateTwoToneIcon from '@material-ui/icons/AddPhotoAlternateTwoTone';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import NumberFormat from 'react-number-format';

import NProgress from 'nprogress';

import { fetchImages } from '../../../../actions/image';

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
    images: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: 'white',
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(1,1,1,1) 3%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));

const BumpProduct = (props) => {
    React.useEffect(() => {
        fetchImages('sub_path', 'bump');
        // eslint-disable-next-line
    },[]);

    const classes = useStyles();

    const {
        bump_name,
        bump_price,
        bump_weight,
        bump_heading,
        bump_desc,
        bump_image,

        images,
        fetchImages,

        onBumpChange,
        setProductBumpImage
    } = props;

    console.log('[BumpProduct.bump.name]', bump_name);
    console.log('[BumpProduct.bump.price]', bump_price);
    console.log('[BumpProduct.bump.weight]', bump_weight);
    console.log('[BumpProduct.bump.heading]', bump_heading);
    console.log('[BumpProduct.bump.desc]', bump_desc);
    console.log('[BumpProduct.bump.image]', bump_image);

    const onPostSingleImage = async (e) => {
        NProgress.start();

        const bodyForm = new FormData();
        bodyForm.append('file', e.target.files[0]);
        const res = await api.post('/uploads/products?sub_path=bump', bodyForm, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (res.data.result) {
            NProgress.done();

            setProductBumpImage(res.data.result.url);
            console.log(bump_image);
        }
    }

    const onClickGallery = url => {
        setProductBumpImage(url);
        console.log(bump_image);
    }

    return (
        <React.Fragment>
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
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file-image-bump"
                    type="file"
                    onChange={(e) => onPostSingleImage(e)}
                />
                <label htmlFor="contained-button-file-image-bump">
                    <Button 
                        variant="contained" 
                        color="default"     
                        component="span" 
                        className={classes.btnUploads}
                        startIcon={<PhotoCamera />}
                        size="small"
                    >
                        Bump Image
                    </Button>
                </label>
                {bump_image && (
                    <div style={{ width: '30%' }}>
                        <img
                            width="100%"
                            height="100%"
                            src={bump_image}
                            alt={bump_image}
                        />
                    </div>
                )}
            </form>
            {images && (
                <>
                    <br />
                    <Typography variant="subtitle2">Gallery (total {images.length} files)</Typography>
                    <div className={classes.images}>
                        <GridList className={classes.gridList} cols={2.5}>
                            {images.map((tile, i) => {
                                return (
                                    <GridListTile key={i}>
                                        <img src={tile.url} alt={tile} />
                                        <GridListTileBar
                                            title={`${tile.path}/${tile.filename}`}
                                            classes={{
                                                root: classes.titleBar,
                                                title: classes.title,
                                            }}
                                            actionIcon={
                                                <IconButton onClick={() => onClickGallery(tile.url)} title='Add as Bump Image'>
                                                    <AddPhotoAlternateTwoToneIcon className={classes.title} />
                                                </IconButton>
                                            }
                                        />
                                    </GridListTile>
                                )
                            })}
                        </GridList>
                    </div>
                </>
            )}
        </React.Fragment>
    )
}

BumpProduct.propTypes = {
    images: PropTypes.array,
    fetchImages: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    images: state.image.images,
});

export default connect(mapStateToProps, { fetchImages })(BumpProduct);
