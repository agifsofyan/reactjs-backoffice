import React from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MUIDataTable from 'mui-datatables';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import { Editor } from '@tinymce/tinymce-react';

import Spinner from '../../../layouts/Spinner';
import SnackbarInfo from '../../../layouts/SnackbarInfo';

import { fetchFollowUps, putFollowUpsSetTemplate } from '../../../../actions/order';

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

let message = ""
const WaTemplate = ({
    fetchFollowUps,
    putFollowUpsSetTemplate,
    followups,
    setLoading
}) => {
    React.useEffect(() => {
        fetchFollowUps('60a80870d1a5ce001c556ab6')
    }, []);

    const classes = useStyles();
    const [open, setOpen] = React.useState({open: false});
    
    const [blastList, setBlastList] = React.useState([]);

    const columns = [
        {
            name: '_id',
            options: {
                display: false,
                filter: false,
                sort: false
            }
        },
        { 
            label: 'Title',
            name: 'title', 
            options: { 
                filter: true,
                sort: true,
                filterOptions: { 
                    fullWidth: true 
                }
            } 
        },
        { 
            label: 'Description',
            name: 'desc', 
            options: { 
                filter: true,
                sort: true,
                filterOptions: { 
                    fullWidth: true 
                }
            } 
        },
        { 
            label: 'Created At',
            name: 'created_at', 
            options: { 
                filter: true,
                sort: true,
                filterOptions: { 
                    fullWidth: true 
                }
            } 
        },
        // {
        //     name: 'Action',
        //     options: {
        //         filter: false,
        //         sort: false,
        //         empty: true,
        //         customBodyRender: (value, tableMeta, updateValue) => {
        //             return (
        //                 <>
        //                     <ButtonGroup size="small" aria-label="small outlined button group">
        //                         {/* <Button onClick={() => console.log(tableMeta.rowData[0])}>Detail</Button> */}
        //                         <Button component={Link} to={`/contents/blog/${tableMeta.rowData[0]}`}>Edit</Button>
        //                     </ButtonGroup>
        //                 </>
        //             )
        //         }
        //     }
        // }
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
        // onTableChange: (action, state) => {
        //     console.log(action);
        //     console.dir(state);
        // },
    }

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

    const handleClickOpenFollowUp = (nomor) => {
        message = followups && followups.data && followups.data.activity[nomor-1].message || '';
        setOpen({...open, open: true, nomor});
    }
  
    const handleCloseFollowUp = (condition, nomor) => {
        condition && condition == 'set' && putFollowUpsSetTemplate('60a80870d1a5ce001c556ab6', message, nomor)
        setOpen({...open, open: false})
    }

    return (
    <>
    <Dialog onClose={handleCloseFollowUp} aria-labelledby="customized-dialog-title" open={open && open.open || false}>
        <DialogTitle id="customized-dialog-title" onClose={handleCloseFollowUp}>
            Follow Up {open && open.nomor || 1}
        </DialogTitle>
        <DialogContent dividers>
            <Typography gutterBottom>
                <TextareaAutosize
                    rows={8}
                    cols={60}
                    onChange={(e) => message = e.currentTarget.value}
                    placeholder="Message"
                    defaultValue={message}
                    />
                </Typography>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={() => handleCloseFollowUp('set', open && open.nomor || 1)} color="primary">
            Set Message
            </Button>
        </DialogActions>
    </Dialog>

    Template WA Order
    <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>Follow Up 1</TableCell>
                    <TableCell>
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <Button onClick={() => handleClickOpenFollowUp(1)}>Buat / Edit</Button>
                        </ButtonGroup>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Follow Up 2</TableCell>
                    <TableCell>
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <Button onClick={() => handleClickOpenFollowUp(2)}>Buat / Edit</Button>
                        </ButtonGroup>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Follow Up 3</TableCell>
                    <TableCell>
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <Button onClick={() => handleClickOpenFollowUp(3)}>Buat / Edit</Button>
                        </ButtonGroup>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Follow Up 4</TableCell>
                    <TableCell>
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <Button onClick={() => handleClickOpenFollowUp(4)}>Buat / Edit</Button>
                        </ButtonGroup>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Follow Up 5</TableCell>
                    <TableCell>
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <Button onClick={() => handleClickOpenFollowUp(5)}>Buat / Edit</Button>
                        </ButtonGroup>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer> <br/> <br/>

    {/* Template WA Follow Up
    <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>Template daily unpaid</TableCell>
                    <TableCell>
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <Button component={Link} to={`/template/wa/1`}>Buat / Edit</Button>
                        </ButtonGroup>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Template weekly unpaid </TableCell>
                    <TableCell>
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <Button component={Link} to={`/template/wa/2`}>Buat / Edit</Button>
                        </ButtonGroup>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer> <br/> <br/>

    Template WA Blast */}
    {/* <SnackbarInfo info="success" /> */}
    {/* {false ? <Spinner /> : (
        <MUIDataTable 
            title={<div>
                <h2>List of Template</h2>
                <Button
                    variant="contained"
                    color="default"
                    style={{ marginBottom: '10px' }}
                    size="small"
                    startIcon={<AddCircleTwoToneIcon />}
                >
                    Add New
                </Button>
            </div>} 
            data={[]} 
            columns={columns} 
            options={options} 
        />
    )} */}
    </>
    )
}

const mapStateToProps = state => ({
    error: state.product.error,
    followups: state.order.followups,
    setLoading: state.content.setLoading
});

export default connect(mapStateToProps, { fetchFollowUps, putFollowUpsSetTemplate })(WaTemplate);
