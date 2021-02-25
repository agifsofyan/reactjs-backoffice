import React from 'react';
import Select from 'react-select';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import VideocamTwoToneIcon from '@material-ui/icons/VideocamTwoTone';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';
import RemoveTwoToneIcon from '@material-ui/icons/RemoveTwoTone';

import { Divider, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Editor } from '@tinymce/tinymce-react';

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
}));

const LayoutProduct = (props) => {
    const classes = useStyles();

    const {
        headline,
        subheadline,
        description,
        learnAbout,
        sections,
        agents,
        valueAgent,

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
        onHandleSectionChangeImage
    } = props;

    console.log('[LayoutProduct.form.headline]', headline);
    console.log('[LayoutProduct.form.subheadline]', subheadline);
    console.log('[LayoutProduct.form.description]', description);
    console.log('[LayoutProduct.form.agent]', valueAgent);

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
                startIcon={<AddTwoToneIcon />}
                color="secondary"
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
                                    style={{ marginBottom: '15px' }}
                                >
                                    Image
                                </Button>
                            </label>                    
                        </Container>
                    </>
                )
            })}
        </React.Fragment>
    )
}

export default LayoutProduct;
