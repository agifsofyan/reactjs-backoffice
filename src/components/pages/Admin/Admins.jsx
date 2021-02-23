import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import Moment from 'react-moment';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';

import { Divider } from '@material-ui/core';

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

    const [responsive, setResponsive] = React.useState('vertical');
    const [tableBodyHeight, setTableBodyHeight] = React.useState('100%');
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = React.useState('400px');
    const [searchBtn, setSearchBtn] = React.useState(true);
    const [downloadBtn, setDownloadBtn] = React.useState(true);
    const [printBtn, setPrintBtn] = React.useState(true);
    const [viewColumnBtn, setViewColumnBtn] = React.useState(true);
    const [filterBtn, setFilterBtn] = React.useState(true);

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
        search: searchBtn,
        download: downloadBtn,
        print: printBtn,
        viewColumns: viewColumnBtn,
        filter: filterBtn,
        filterType: 'dropdown',
        responsive,
        tableBodyHeight,
        tableBodyMaxHeight,
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
            <FormControl>
                <InputLabel id="demo-simple-select-label">Responsive Option</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={responsive}
                    style={{ width: '130px', marginBottom: '10px', marginRight: 10 }}
                    onChange={e => setResponsive(e.target.value)}>
                    <MenuItem value={'vertical'}>vertical</MenuItem>
                    <MenuItem value={'standard'}>standard</MenuItem>
                    <MenuItem value={'simple'}>simple</MenuItem>

                    <MenuItem value={'scroll'}>scroll (deprecated)</MenuItem>
                    <MenuItem value={'scrollMaxHeight'}>scrollMaxHeight (deprecated)</MenuItem>
                    <MenuItem value={'stacked'}>stacked (deprecated)</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Table Body Height</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={tableBodyHeight}
                    style={{ width: '130px', marginBottom: '10px', marginRight: 10 }}
                    onChange={e => setTableBodyHeight(e.target.value)}>
                    <MenuItem value={''}>[blank]</MenuItem>
                    <MenuItem value={'400px'}>400px</MenuItem>
                    <MenuItem value={'800px'}>800px</MenuItem>
                    <MenuItem value={'100%'}>100%</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Max Table Body Height</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={tableBodyMaxHeight}
                    style={{ width: '130px', marginBottom: '10px', marginRight: 10 }}
                    onChange={e => setTableBodyMaxHeight(e.target.value)}>
                    <MenuItem value={''}>[blank]</MenuItem>
                    <MenuItem value={'400px'}>400px</MenuItem>
                    <MenuItem value={'800px'}>800px</MenuItem>
                    <MenuItem value={'100%'}>100%</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Search Button</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={searchBtn}
                    style={{ width: '130px', marginBottom: '10px', marginRight: 10 }}
                    onChange={e => setSearchBtn(e.target.value)}>
                    <MenuItem value={'true'}>{'true'}</MenuItem>
                    <MenuItem value={'false'}>{'false'}</MenuItem>
                    <MenuItem value={'disabled'}>disabled</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Download Button</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={downloadBtn}
                    style={{ width: '130px', marginBottom: '10px', marginRight: 10 }}
                    onChange={e => setDownloadBtn(e.target.value)}>
                    <MenuItem value={'true'}>{'true'}</MenuItem>
                    <MenuItem value={'false'}>{'false'}</MenuItem>
                    <MenuItem value={'disabled'}>disabled</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Print Button</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={printBtn}
                    style={{ width: '130px', marginBottom: '10px', marginRight: 10 }}
                    onChange={e => setPrintBtn(e.target.value)}>
                    <MenuItem value={'true'}>{'true'}</MenuItem>
                    <MenuItem value={'false'}>{'false'}</MenuItem>
                    <MenuItem value={'disabled'}>disabled</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label">View Column Button</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={viewColumnBtn}
                    style={{ width: '130px', marginBottom: '10px', marginRight: 10 }}
                    onChange={e => setViewColumnBtn(e.target.value)}>
                    <MenuItem value={'true'}>{'true'}</MenuItem>
                    <MenuItem value={'false'}>{'false'}</MenuItem>
                    <MenuItem value={'disabled'}>disabled</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Filter Button</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filterBtn}
                    style={{ width: '130px', marginBottom: '10px', marginRight: 10 }}
                    onChange={e => setFilterBtn(e.target.value)}>
                    <MenuItem value={'true'}>{'true'}</MenuItem>
                    <MenuItem value={'false'}>{'false'}</MenuItem>
                    <MenuItem value={'disabled'}>disabled</MenuItem>
                </Select>
            </FormControl>
            <Divider hidden />
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
    fetchAdmin: PropTypes.func.isRequired,
    deleteManyAdmin: PropTypes.func.isRequired,
    admins: PropTypes.array,
    delete_admin_many: PropTypes.object,
    setLoading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    admins: state.admin.admins,
    delete_admin_many: state.admin.delete_admin_many,
    setLoading: state.admin.setLoading
});

export default connect(mapStateToProps, { fetchAdmin, deleteManyAdmin })(Admins);
