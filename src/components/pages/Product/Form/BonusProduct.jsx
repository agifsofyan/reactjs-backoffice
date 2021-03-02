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

const BonusProduct = (props) => {
    React.useEffect(() => {
        fetchImages('sub_path', 'bonus');
        // eslint-disable-next-line
    },[]);

    const classes = useStyles();

    const {
        bonus_title,
        bonus_description,
        bonus_image,

        images,
        fetchImages,

        onBonusChange,
        setProductBonusImage
    } = props;

    console.log('[BonusProduct.title]', bonus_title);
    console.log('[BonusProduct.description]', bonus_description);
    console.log('[BonusProduct.image', bonus_image);
    
    const onPostSingleImage = async (e) => {
        NProgress.start();

        const bodyForm = new FormData();
        bodyForm.append('file', e.target.files[0]);
        const res = await api.post('/uploads/products?sub_path=bonus', bodyForm, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (res.data.result) {
            NProgress.done();

            setProductBonusImage(res.data.result.url);
            console.log(bonus_image);
        }
    }

    const onClickGallery = url => {
        setProductBonusImage(url);
        console.log(bonus_image);
    }

    return (
        <React.Fragment>
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
                    id="contained-button-file-image-bonus"
                    type="file"
                    onChange={(e) => onPostSingleImage(e)}
                />
                <label htmlFor="contained-button-file-image-bonus">
                    <Button 
                        variant="contained" 
                        color="default"     
                        component="span" 
                        className={classes.btnUploads}
                        startIcon={<PhotoCamera />}
                        size="small"
                    >
                        Bonus Image
                    </Button>
                </label>
                {bonus_image && (
                    <div style={{ width: '30%' }}>
                        <img
                            width="100%"
                            height="100%"
                            src={bonus_image}
                            alt={bonus_image}
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
                                                <IconButton onClick={() => onClickGallery(tile.url)} title='Add as Bonus Image'>
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

BonusProduct.propTypes = {
    images: PropTypes.array,
    fetchImages: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    images: state.image.images,
});

export default connect(mapStateToProps, { fetchImages })(BonusProduct);
