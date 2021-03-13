import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import Moment from 'react-moment';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';

import MUIDataTable from 'mui-datatables';
import Swal from 'sweetalert2';

import { fetchAdmin, deleteManyAdmin } from '../../../actions/admin';

import Spinner from '../../layouts/Spinner';
import SnackbarInfo from '../../layouts/SnackbarInfo';

const Admins = ({ 
    admins, 
    delete_admin_many, 
    setLoading, 
    fetchAdmin, 
    deleteManyAdmin
}) => {
    React.useEffect(() => {
        fetchAdmin();
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
            label: 'Admin Name',
            name: 'name', 
            options: { 
                filter: false,
                sort: false,
                filterOptions: { 
                    fullWidth: true 
                }
            } 
        },
        {
            label: 'Email',
            name: 'email',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            label: 'Role',
            name: 'role',
            options: {
                filter: false,
                customBodyRender: v => {
                    return <span>{v[0].adminType}</span>
                }
            }
        },
        {
            label: 'Phone Number',
            name: 'phone_number',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            label: 'Date Created',
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
        },
        {
            label: 'Date Updated',
            name: 'updated_at',
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
        onRowsDelete: (rowsDeleted) => {
            const ids = rowsDeleted.data.map(row => admins[row.dataIndex]._id);
            Swal.fire({
                title: 'Delete Confirmation',
                html: `<small>Are you sure you want to delete ${ids.length > 1 ? 'these ' + ids.length + ' admins' : 'this admin'}?</small>`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sure, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteManyAdmin(ids);
                }
            });
        }
    }

    return (
        <React.Fragment>
            <SnackbarInfo info="success" message={delete_admin_many && delete_admin_many.message} />
            {setLoading ? <Spinner /> : (
                <MUIDataTable 
                    title={<div>
                        <h2>Admin List</h2>
                        <Button
                            variant="contained"
                            color="default"
                            style={{ marginBottom: '10px' }}
                            size="small"
                            startIcon={<AddCircleTwoToneIcon />}
                            component={Link}
                            to="/admin/add"
                        >
                            Add New
                        </Button>
                    </div>} 
                    data={admins} 
                    columns={columns} 
                    options={options} 
                />
            )}
        </React.Fragment>
    )
}

Admins.propTypes = {
    deleteManyAdmin: PropTypes.func.isRequired,
    admins: PropTypes.array,
    delete_admin_many: PropTypes.object,
    setLoading: PropTypes.bool.isRequired,
    fetchAdmin: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    admins: state.admin.admins,
    delete_admin_many: state.admin.delete_admin_many,
    setLoading: state.admin.setLoading
});

export default connect(mapStateToProps, { fetchAdmin, deleteManyAdmin })(Admins);
