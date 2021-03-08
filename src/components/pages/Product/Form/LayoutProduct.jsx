import React from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';

import VideocamTwoToneIcon from '@material-ui/icons/VideocamTwoTone';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';
import AddPhotoAlternateTwoToneIcon from '@material-ui/icons/AddPhotoAlternateTwoTone';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import RemoveTwoToneIcon from '@material-ui/icons/RemoveTwoTone';

import { Divider, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Editor } from '@tinymce/tinymce-react';

import NProgress from 'nprogress';

import { fetchImages } from '../../../../actions/image';

import api from '../../../../utils/api';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '34ch',
        },
    },
    select: {
        float: 'right',
        zIndex: 1000
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

const LayoutProduct = (props) => {
    React.useEffect(() => {
        fetchImages('sub_path', 'image_url');
        // eslint-disable-next-line
    },[]);

    const classes = useStyles();

    const newImageUrls = [];

    const {
        headline,
        subheadline,
        description,
        learnAbout,
        sections,
        agents,
        images,
        valueAgent,

        media_url,
        setMediaUrl,

        imageUrl,
        setProductImageUrl,

        onChange,
        onEditorChange,
        onProductAgentChange,

        onHandleAddLearnAbout,
        onHandleRemoveLearnAbout,
        onHandleLearnAboutChangeTitle,
        onHandleLearnAboutChangeContent,
        onHandleLearnAboutChangeNote,

        onHandleAddSection,
        onHandleRemoveSection,
        onHandleSectionChangeTitle,
        onHandleSectionChangeContent,
        onHandleSectionChangeImage,

        fetchImages
    } = props;

    console.log('[LayoutProduct.form.headline]', headline);
    console.log('[LayoutProduct.form.subheadline]', subheadline);
    console.log('[LayoutProduct.form.description]', description);
    console.log('[LayoutProduct.form.agent]', valueAgent);

    const onPostSingleImage = async (e) => {
        NProgress.start();

        const bodyForm = new FormData();
        bodyForm.append('file', e.target.files[0]);
        const res = await api.post('/uploads/products?sub_path=image_url', bodyForm, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (res.data.result) {
            NProgress.done();

            newImageUrls.push(res.data.result.url);

            setProductImageUrl(old => [...old, newImageUrls]);
            console.log(imageUrl);
        }
    }

    const onClickGallery = async (url) => {
        setProductImageUrl(old => [...old, url]);
        console.log(imageUrl);
    }

    const onPostHeaderMedia = async (e) => {
        NProgress.start();

        const bodyForm = new FormData();
        bodyForm.append('file', e.target.files[0]);
        const res = await api.post('/uploads/products?sub_path=media_url', bodyForm, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (res.data.result) {
            NProgress.done();

            setMediaUrl(res.data.result.url);
            console.log(media_url);
        }
    }

    const onPostSectionImage = async (e, i) => {
        NProgress.start();

        const bodyForm = new FormData();
        bodyForm.append('file', e.target.files[0]);
        const res = await api.post('/uploads/products?sub_path=section', bodyForm, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (res.data.result) {
            NProgress.done();

            onHandleSectionChangeImage(i, res.data.result.url);
            console.log(sections[i].image, i);
        }
    }

    return (
        <React.Fragment>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    label="Headline"
                    type="text"
                    name="headline"
                    id="headline"
                    value={headline}
                    onChange={onChange}
                />
                <TextField
                    label="Subheadline"
                    type="text"
                    name="subheadline"
                    id="subheadline"
                    value={subheadline}
                    onChange={onChange}
                />
                <Select
                    className={classes.select}
                    placeholder="Select Agent"
                    options={agents}
                    defaultValue={valueAgent}
                    value={valueAgent}
                    getOptionValue={(option) => option._id}
                    getOptionLabel={(option) => option.name}
                    onChange={onProductAgentChange}
                    isClearable
                    isMulti
                />
                <Editor
                    apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                    initialValue={description ? description : null}
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
                    onEditorChange={onEditorChange}
                />
                <input
                    accept="image/x-png,image/gif,image/jpeg"
                    className={classes.input}
                    id="contained-button-file-image"
                    type="file"
                    onChange={(e) => onPostSingleImage(e)}
                />
                <label htmlFor="contained-button-file-image">
                    <Button 
                        variant="contained" 
                        color="default" 
                        component="span" 
                        className={classes.btnUploads}
                        startIcon={<AddPhotoAlternateTwoToneIcon />}
                        size="small"
                    >
                        Product Image(s)
                    </Button>
                </label>
                <input
                    accept="video/mp4,video/x-m4v,video/*,image/x-png,image/gif,image/jpeg"
                    className={classes.input}
                    id="contained-button-file-media"
                    type="file"
                    onChange={(e) => onPostHeaderMedia(e)}
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
            {imageUrl.length > 0 && (
                <>
                    <br />
                    <Typography variant="subtitle2">Product Image(s)</Typography>
                    <div className={classes.images}>
                        <GridList className={classes.gridList} cols={2.5}>
                            {imageUrl.map((tile, i) => {
                                return (
                                    <GridListTile key={i}>
                                        <img src={tile} alt={tile} />
                                        <GridListTileBar
                                            classes={{
                                                root: classes.titleBar,
                                                title: classes.title,
                                            }}
                                            actionIcon={
                                                <IconButton onClick={() => {
                                                    setProductImageUrl(current => current.filter((img, idx) => idx !== i))
                                                }} title='Delete from Product Image(s)'>
                                                    <HighlightOffTwoToneIcon className={classes.title} />
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
            {media_url && (
                <>
                    <br />
                    <Typography variant="subtitle2">Header Media</Typography>
                    <video width="50%" height="100%" controls>
                        <source src={media_url} type="video/mp4" />
                        <source src={media_url} type="video/ogg" />
                        Your browser does not support the video tag.
                    </video>
                </>
            )}
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
                                                <IconButton onClick={() => onClickGallery(tile.url)} title='Add to Product Image(s)'>
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
            <br />
            <br />
            <Divider />
            <br />
            <Typography variant="subtitle1" style={{ textAlign: 'center' }}><b>What you will learn?</b></Typography>
            <Button
                size="small"
                startIcon={<AddTwoToneIcon />}
                color="secondary"
                style={{ marginBottom: '5px', float: 'right' }}
                onClick={() => onHandleAddLearnAbout()}
            >
                Add
            </Button>
            {learnAbout.map((field, i) => {
                return (
                    <>
                        <Button
                            size="small"
                            startIcon={<RemoveTwoToneIcon />}
                            style={{ marginBottom: '5px' }}
                            onClick={() => onHandleRemoveLearnAbout(i)}
                        >
                            Delete
                        </Button>
                        <Container key={`${field}-${i}`}>
                            <TextField
                                label="Title"
                                type="text"
                                name={`learn-about-title-${i}`}
                                id={`learn-about-title-${i}`}
                                value={field.title}
                                onChange={(e) => onHandleLearnAboutChangeTitle(i, e)}
                            /> 
                            <TextField
                                label="Note"
                                type="text"
                                name={`learn-about-note-${i}`}
                                id={`learn-about-note-${i}`}
                                value={field.note}
                                style={{ marginLeft: '10px' }}
                                onChange={(e) => onHandleLearnAboutChangeNote(i, e)}
                            />
                            <TextField
                                id={`learn-about-content-${i}`}
                                name={`learn-about-content-${i}`}
                                value={field.content} 
                                variant="outlined"
                                rowsmin={10}
                                rowsMax={100} 
                                multiline
                                style={{ width: '100%', marginTop: '10px', marginBottom: '15px' }}
                                label="Content"
                                onChange={(e) => onHandleLearnAboutChangeContent(i, e)} 
                            />                    
                        </Container>
                    </>
                )
            })}
            <br />
            <br />
            <Divider />
            <br />
            <Typography variant="subtitle1" style={{ textAlign: 'center' }}><b>Section</b></Typography>
            <Button
                size="small"
                color="secondary"
                startIcon={<AddTwoToneIcon />}
                style={{ marginBottom: '5px', float: 'right' }}
                onClick={() => onHandleAddSection()}
            >
                Add
            </Button>
            {sections.map((field, i) => {
                return (
                    <>
                        <Button
                            size="small"
                            startIcon={<RemoveTwoToneIcon />}
                            style={{ marginBottom: '5px' }}
                            onClick={() => onHandleRemoveSection(i)}
                        >
                            Delete
                        </Button>
                        <Container key={`${field}-${i}`}>
                            <TextField
                                label="Title"
                                type="text"
                                name={`section-title-${i}`}
                                id={`section-title-${i}`}
                                value={field.title}
                                onChange={(e) => onHandleSectionChangeTitle(i, e)}
                            /> 
                            <TextField
                                id={`section-content-${i}`}
                                name={`section-content-${i}`}
                                value={field.content} 
                                variant="outlined"
                                rowsmin={10}
                                rowsMax={100} 
                                multiline
                                style={{ width: '100%', marginTop: '10px' }}
                                label="Content"
                                onChange={(e) => onHandleSectionChangeContent(i, e)} 
                            />
                            <input
                                accept="image/x-png,image/gif,image/jpeg"
                                className={classes.input}
                                id={`contained-button-file-image-section-${i}`}
                                name={`contained-button-file-image-section-${i}`}
                                type="file"
                                onChange={(e) => onPostSectionImage(e, i)} 
                            />
                            <label htmlFor={`contained-button-file-image-section-${i}`}>
                                <Button 
                                    variant="contained" 
                                    color="default" 
                                    component="span" 
                                    className={classes.btnUploads}
                                    startIcon={<AddPhotoAlternateTwoToneIcon />}
                                    size="small"
                                    style={{ marginBottom: '15px' }}
                                >
                                    Section Image
                                </Button>
                            </label>
                            <div style={{ width: '125px' }}>
                                <img
                                    width="100%"
                                    src={sections[i].image}
                                    alt={sections[i].image}
                                />
                            </div>                    
                        </Container>
                    </>
                )
            })}
        </React.Fragment>
    )
}

LayoutProduct.propTypes = {
    images: PropTypes.array,
    fetchImages: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    images: state.image.images,
});

export default connect(mapStateToProps, { fetchImages })(LayoutProduct);