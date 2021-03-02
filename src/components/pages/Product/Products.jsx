import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
// import Chip from '@material-ui/core/Chip';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
// import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
// import LocalOfferTwoToneIcon from '@material-ui/icons/LocalOfferTwoTone';
// import InsertDriveFileTwoToneIcon from '@material-ui/icons/InsertDriveFileTwoTone';

import MUIDataTable from 'mui-datatables';
import Swal from 'sweetalert2';

import { fetchProduct, deleteManyProduct } from '../../../actions/product';

import Spinner from '../../layouts/Spinner';
import SnackbarInfo from '../../layouts/SnackbarInfo';

const Products = ({ 
    products, 
    delete_product_many, 
    setLoading, 
    fetchProduct, 
    deleteManyProduct
}) => {
    React.useEffect(() => {
        fetchProduct();
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
            label: 'Product Name',
            name: 'name', 
            options: { 
                filterOptions: { 
                    fullWidth: true 
                }
            } 
        },
        {
            label: 'Visibility',
            name: 'visibility',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            label: 'Product Code',
            name: 'code',
            options: {
                filter: false
            }
        },
        // {
        //     label: 'Stock(s)',
        //     // name: 'type',
        //     options: {
        //         filter: false,
        //         sort: false,
        //         customBodyRender: value => {
        //             if (value.type !== 'ecommerce') {
        //                 return <span><code>none</code></span>
        //             } else if (value.ecommerce === undefined) {
        //                 return <span>0</span>
        //             } else {
        //                 return <span>{value.ecommerce.stock}</span>
        //             }
        //         }
        //     }
        // },
        // {
        //     label: 'Others',
        //     // name: 'order',
        //     options: {
        //         filter: false,
        //         sort: false,
        //         customBodyRender: value => {
        //             return (
        //                 <>
        //                     <Chip
        //                         icon={<ShoppingCartTwoToneIcon />}
        //                         label={`Orders ${value}`} 
        //                         size="small"
        //                         style={{ marginRight: 5, marginBottom: 2 }}
        //                     />
        //                     <Chip
        //                         icon={<LocalOfferTwoToneIcon />}
        //                         label={`Coupons ${value.coupon}`} 
        //                         size="small"
        //                         style={{ marginRight: 5, marginBottom: 2 }}
        //                     />
        //                     <Chip
        //                         icon={<InsertDriveFileTwoToneIcon />}
        //                         label={`Contents ${value.content}`} 
        //                         size="small"
        //                     />
        //                 </>
        //             )
        //         }
        //     }
        // },
        {
            label: 'Product Type',
            name: 'type',
            options: {
                filter: true
            }
        },
        {
            label: 'Sale Method',
            name: 'sale_method',
            options: {
                filter: true
            }
        },
        {
            label: 'Period',
            name: 'time_period',
            options: {
                filter: true,
                filterOptions: {
                    renderValue: v => {
                        return <span>{v > 1 ? v + ' months' : v + ' month'}</span>
                    }
                },
                sort: true,
                customBodyRender: value => {
                    return <span>{value > 1 ? value + ' months' : value + ' month'}</span>
                }
            }
        },
        {
            label: 'Price',
            name: 'price',
            options: {
                filter: true,
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
        onRowsDelete: (rowsDeleted) => {
            const ids = rowsDeleted.data.map(row => products[row.dataIndex]._id);
            Swal.fire({
                title: 'Delete Confirmation',
                html: `<small>Are you sure you want to delete ${ids.length > 1 ? 'these ' + ids.length + ' products' : 'this product'}?</small>`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sure, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteManyProduct(ids);
                }
            });
        }
    }

    return (
        <React.Fragment>
            <SnackbarInfo info="success" message={delete_product_many && delete_product_many.message} />
            {setLoading ? <Spinner /> : (
                <MUIDataTable 
                    title={<div>
                        <h2>Product List</h2>
                        <Button
                            variant="contained"
                            color="default"
                            style={{ marginBottom: '10px' }}
                            size="small"
                            startIcon={<AddCircleTwoToneIcon />}
                            component={Link}
                            to="/product/add"
                        >
                            Add New
                        </Button>
                    </div>} 
                    data={products} 
                    columns={columns} 
                    options={options} 
                />
            )}
        </React.Fragment>
    )
}

Products.propTypes = {
    fetchProduct: PropTypes.func.isRequired,
    deleteManyProduct: PropTypes.func.isRequired,
    products: PropTypes.array,
    delete_product_many: PropTypes.object,
    setLoading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    products: state.product.products,
    delete_product_many: state.product.delete_product_many,
    setLoading: state.product.setLoading
});

export default connect(mapStateToProps, { fetchProduct, deleteManyProduct })(Products);
