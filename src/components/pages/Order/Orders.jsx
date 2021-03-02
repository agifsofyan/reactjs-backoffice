import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';
import SmartphoneTwoToneIcon from '@material-ui/icons/SmartphoneTwoTone';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';

import NumberFormat from 'react-number-format';
import Moment from 'react-moment';

import MUIDataTable from 'mui-datatables';

import { fetchOrder } from '../../../actions/order';

import Spinner from '../../layouts/Spinner';

const Orders = ({ orders, setLoading, fetchOrder }) => {
    React.useEffect(() => {
        fetchOrder();
        // eslint-disable-next-line
    }, []);

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
            label: 'Invoice',
            name: 'invoice', 
            options: { 
                filterOptions: { 
                    fullWidth: true 
                }
            } 
        },
        {
            label: 'Products',
            name: 'items',
            options: {
                filter: false,
                sort: false,
                customBodyRender: v => {
                    return <span>{v && v.length}</span>
                },
            }
        },
        {
            label: 'Buyer',
            name: 'user_info',
            options: {
                filter: false,
                // filterOptions: {
                //     renderValue: v => {
                //         return <span>{v && v.name}</span>
                //     }
                // },
                sort: false,
                customBodyRender: value => {
                    return (
                        <>
                            <Chip
                                icon={<PersonOutlineTwoToneIcon />}
                                label={`${value && value.name}`} 
                                size="small"
                                style={{ marginRight: 5, marginBottom: 2 }}
                            />
                            <br />
                            <Chip
                                icon={<SmartphoneTwoToneIcon />}
                                label={`${value && value.phone_number}`} 
                                size="small"
                                style={{ marginRight: 5, marginBottom: 2 }}
                            />
                        </>
                    )
                }
            }
        },
        {
            label: 'Date',
            name: 'create_date',
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
            label: 'Qty',
            name: 'total_qty',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            label: 'Subtotal',
            name: 'sub_total_price',
            options: {
                filter: false,
                filterOptions: {
                    renderValue: v => {
                        return <NumberFormat value={v} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />
                    }
                },
                sort: true,
                customBodyRender: value => {
                    return <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />
                }
            }
        },
        {
            label: 'Total',
            name: 'total_price',
            options: {
                filter: false,
                filterOptions: {
                    renderValue: v => {
                        return <NumberFormat value={v} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />
                    }
                },
                sort: true,
                customBodyRender: value => {
                    return <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />
                }
            }
        },
        {
            label: 'Unique',
            name: 'unique_number',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            label: 'Discount',
            name: 'dicount_value',
            options: {
                filter: false,
                filterOptions: {
                    renderValue: v => {
                        return <NumberFormat value={v} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />
                    }
                },
                sort: true,
                customBodyRender: value => {
                    return <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />
                }
            }
        },
        {
            label: 'Payment Status',
            name: 'status',
            options: {
                filter: true,
                sort: true,
                customBodyRender: value => {
                    return (
                        <>
                            <Chip
                                label={value} 
                                size="small"
                                style={{ marginRight: 5, marginBottom: 2 }}
                            />
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
            name: 'create_date',
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
                        <h2>Order List</h2>
                    </div>} 
                    data={orders} 
                    columns={columns} 
                    options={options} 
                />
            )}
        </React.Fragment>
    )
}

Orders.propTypes = {
    fetchOrder: PropTypes.func.isRequired,
    orders: PropTypes.array,
    setLoading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    orders: state.order.orders,
    setLoading: state.order.setLoading
});

export default connect(mapStateToProps, { fetchOrder })(Orders);

