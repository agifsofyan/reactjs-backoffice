import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import Moment from 'react-moment';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CheckTwoToneIcon from '@material-ui/icons/CheckTwoTone';
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';
import SupervisorAccountTwoToneIcon from '@material-ui/icons/SupervisorAccountTwoTone';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import MUIDataTable from 'mui-datatables';
// import Swal from 'sweetalert2';

import { fetchContents } from '../../../actions/content';

import Spinner from '../../layouts/Spinner';
// import SnackbarInfo from '../../layouts/SnackbarInfo';

const Contents = ({ 
    contents, 
    setLoading, 
    fetchContents
}) => {
    React.useEffect(() => {
        fetchContents();
        // eslint-disable-next-line
    },[]);

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
            name: 'Action',
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <ButtonGroup size="small" aria-label="small outlined button group">
                                {/* <Button onClick={() => console.log(tableMeta.rowData[0])}>Detail</Button> */}
                                <Button component={Link} to={`/contents/edit/${tableMeta.rowData[0]}`}>Edit</Button>
                            </ButtonGroup>
                        </>
                    )
                }
            }
        }
    ];

    const options = {
        search: true,
        download: true,
        print: 'disabled',
        viewColumns: true,
        filter: true,
        filterType: 'dropdown',
        responsive: 'vertical',
        tableBodyHeight: '100%',
        tableBodyMaxHeight: '400px',
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
        <React.Fragment>
            {setLoading ? <Spinner /> : (
                <MUIDataTable 
                    title={<div>
                        <h2>Content List</h2>
                        <Button
                            variant="contained"
                            color="default"
                            style={{ marginBottom: '10px' }}
                            size="small"
                            startIcon={<AddCircleTwoToneIcon />}
                            component={Link}
                            to="/contents/add"
                        >
                            Add New
                        </Button>
                    </div>} 
                    data={contents} 
                    columns={columns} 
                    options={options} 
                />
            )}
        </React.Fragment>
    )
}

Contents.propTypes = {
    contents: PropTypes.array,
    setLoading: PropTypes.bool.isRequired,
    fetchContents: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    contents: state.content.contents,
    setLoading: state.content.setLoading
});

export default connect(mapStateToProps, { fetchContents })(Contents);
