import React from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MUIDataTable from 'mui-datatables';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
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

import { Editor } from '@tinymce/tinymce-react';

import Spinner from '../../../layouts/Spinner';
import SnackbarInfo from '../../../layouts/SnackbarInfo';

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

const EmailTemplate = ({ 
    setLoading
}) => {
    const classes = useStyles();
    
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
    return (
    <>
    Template Email Order
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
                    <TableCell>Email order H + 3 Jam</TableCell>
                    <TableCell>
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <Button component={Link} to={`/template/wa/1`}>View</Button>
                        </ButtonGroup>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Email order H + 6 Jam</TableCell>
                    <TableCell>
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <Button component={Link} to={`/template/wa/2`}>View</Button>
                        </ButtonGroup>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Email order H + 12 Jam</TableCell>
                    <TableCell>
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <Button component={Link} to={`/template/wa/2`}>View</Button>
                        </ButtonGroup>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Email order H + 24 Jam</TableCell>
                    <TableCell>
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <Button component={Link} to={`/template/wa/2`}>View</Button>
                        </ButtonGroup>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer> <br/> <br/>


    Template WA Blast
    {/* <SnackbarInfo info="success" /> */}
    {false ? <Spinner /> : (
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
    )}
    </>
    )
}

const mapStateToProps = state => ({
    error: state.product.error,
    setLoading: state.content.setLoading
});

export default connect(mapStateToProps, { })(EmailTemplate);
