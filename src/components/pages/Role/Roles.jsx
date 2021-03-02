import React from 'react';
// import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import Moment from 'react-moment';

import PropTypes from 'prop-types';

// import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CheckTwoToneIcon from '@material-ui/icons/CheckTwoTone';
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';
import SupervisorAccountTwoToneIcon from '@material-ui/icons/SupervisorAccountTwoTone';
// import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';

import MUIDataTable from 'mui-datatables';
// import Swal from 'sweetalert2';

import { fetchRole } from '../../../actions/role';

import Spinner from '../../layouts/Spinner';
// import SnackbarInfo from '../../layouts/SnackbarInfo';

const Roles = ({ 
    roles, 
    setLoading, 
    fetchRole
}) => {
    React.useEffect(() => {
        fetchRole();
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
            label: 'Role',
            name: 'adminType', 
            options: { 
                filter: true,
                sort: true,
                filterOptions: { 
                    fullWidth: true 
                }
            } 
        },
        {
            label: 'Read & Write',
            name: 'readWrite',
            options: {
                filter: true,
                filterOptions: {
                    renderValue: v => {
                        return <span>{v ? 'active' : 'inactive'}</span>
                    }
                },
                sort: true,
                customBodyRender: value => {
                    return (
                        <Chip
                            icon={value ? <CheckTwoToneIcon /> : <CloseTwoToneIcon />}
                            label={value ? 'active' : 'inactive'} 
                            size="small"
                            style={{ marginRight: 5, marginBottom: 2 }}
                        />
                    )
                }
            }
        },
        {
            label: 'Administrator(s)',
            name: 'administrators',
            options: {
                filter: true,
                sort: true,
                customBodyRender: value => {
                    return (
                        <Chip
                            icon={<SupervisorAccountTwoToneIcon />}
                            label={value} 
                            size="small"
                            style={{ marginRight: 5, marginBottom: 2 }}
                        />
                    )
                }
            }
        },
        {
            label: 'Date',
            name: 'created_at',
            options: {
                filter: true,
                filterOptions: {
                    renderValue: v => {
                        return <Moment format="llll">{v}</Moment>
                    }
                },
                sort: true,
                customBodyRender: value => {
                    return <Moment format="llll">{value}</Moment>
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
                        <h2>Role List</h2>
                        {/* <Button
                            variant="contained"
                            color="default"
                            style={{ marginBottom: '10px' }}
                            size="small"
                            startIcon={<AddCircleTwoToneIcon />}
                            component={Link}
                            to="/role/add"
                        >
                            Add New
                        </Button> */}
                    </div>} 
                    data={roles} 
                    columns={columns} 
                    options={options} 
                />
            )}
        </React.Fragment>
    )
}

Roles.propTypes = {
    fetchRole: PropTypes.func.isRequired,
    roles: PropTypes.array,
    setLoading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    roles: state.role.roles,
    setLoading: state.role.setLoading
});

export default connect(mapStateToProps, { fetchRole })(Roles);
