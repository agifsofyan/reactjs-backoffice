import React from 'react';
// import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import Moment from 'react-moment';

import PropTypes from 'prop-types';

// import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CheckTwoToneIcon from '@material-ui/icons/CheckTwoTone';
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';
// import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';

import MUIDataTable from 'mui-datatables';
// import Swal from 'sweetalert2';

import { fetchPaymentCount } from '../../../actions/payment';

import Spinner from '../../layouts/Spinner';
// import SnackbarInfo from '../../layouts/SnackbarInfo';

const Payments = ({ 
    payment_methods, 
    // delete_payment_many, 
    setLoading, 
    fetchPaymentCount, 
    // deleteManyPayment
}) => {
    React.useEffect(() => {
        fetchPaymentCount();
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
            label: 'Icon',
            name: 'icon', 
            options: { 
                filter: false,
                sort: false,
                filterOptions: { 
                    fullWidth: true 
                },
                customBodyRender: value => {
                    return (
                        <div style={{ width: '70px' }}>
                            <img width="100%" src={value} alt={value.name} />
                        </div>
                    )
                }
            } 
        },
        {
            label: 'Payment Method Name',
            name: 'name',
            options: {
                filter: true
            }
        },
        {
            label: 'Vendor',
            name: 'vendor',
            options: {
                filter: true
            }
        },
        {
            label: 'Status',
            name: 'isActive',
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
        // onRowsDelete: (rowsDeleted) => {
        //     const ids = rowsDeleted.data.map(row => payment_methods[row.dataIndex]._id);
        //     Swal.fire({
        //         title: 'Delete Confirmation',
        //         html: `<small>Are you sure you want to delete ${ids.length > 1 ? 'these ' + ids.length + ' payment methods' : 'this payment method'}?</small>`,
        //         icon: 'warning',
        //         showCancelButton: true,
        //         confirmButtonColor: '#3085d6',
        //         cancelButtonColor: '#d33',
        //         confirmButtonText: 'Sure, delete it!'
        //     }).then((result) => {
        //         if (result.isConfirmed) {
        //             deleteManyPayment(ids);
        //         }
        //     });
        // }
    }

    return (
        <React.Fragment>
            {/* <SnackbarInfo info="success" message={delete_payment_many && delete_payment_many.message} /> */}
            {setLoading ? <Spinner /> : (
                <MUIDataTable 
                    title={<div>
                        <h2>Payment Method List</h2>
                        {/* <Button
                            variant="contained"
                            color="default"
                            style={{ marginBottom: '10px' }}
                            size="small"
                            startIcon={<AddCircleTwoToneIcon />}
                            component={Link}
                            to="/payment/add"
                        >
                            Add New
                        </Button> */}
                    </div>} 
                    data={payment_methods} 
                    columns={columns} 
                    options={options} 
                />
            )}
        </React.Fragment>
    )
}

Payments.propTypes = {
    // deleteManyPayment: PropTypes.func.isRequired,
    payment_methods: PropTypes.array,
    delete_payment_many: PropTypes.object,
    setLoading: PropTypes.bool.isRequired,
    fetchPaymentCount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    payment_methods: state.payment.payment_methods,
    delete_payment_many: state.payment.delete_payment_many,
    setLoading: state.payment.setLoading
});

export default connect(mapStateToProps, { fetchPaymentCount /* deleteManyPayment */ })(Payments);
