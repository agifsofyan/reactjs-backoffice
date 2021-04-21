import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Chip from '@material-ui/core/Chip';
// import Chip from '@material-ui/core/Chip';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
// import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
// import LocalOfferTwoToneIcon from '@material-ui/icons/LocalOfferTwoTone';
// import InsertDriveFileTwoToneIcon from '@material-ui/icons/InsertDriveFileTwoTone';

import MUIDataTable from 'mui-datatables';
import Swal from 'sweetalert2';

import { fetchProducts, deleteManyProduct } from '../../../actions/product';

import Spinner from '../../layouts/Spinner';
import SnackbarInfo from '../../layouts/SnackbarInfo';

const Products = ({ 
    products, 
    delete_product_many, 
    setLoading, 
    fetchProducts, 
    deleteManyProduct
}) => {
    React.useEffect(() => {
        fetchProducts();
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
            label: 'Details',
            name: 'details',
            options: {
                setCellProps: () => ({ style: { minWidth: '150px', maxWidth: '150px' }}),
                filter: false,
                sort: false,
                customBodyRender: (value) => {
                    return (
                        <>
                            <Chip
                                label={`${value.name}`} 
                                size="small"
                                style={{ marginRight: 5, marginBottom: 2 }}
                            />
                            <br />
                            {value && value.topic && (
                                <Chip
                                    label={`${value.topic}`} 
                                    size="small"
                                    style={{ marginRight: 5, marginBottom: 2 }}
                                />
                            )}
                            <br />
                            {value && value.code && (
                                <Chip
                                    label={`${value.code}`} 
                                    size="small"
                                    style={{ marginRight: 5, marginBottom: 2 }}
                                />
                            )}
                            {value && value.slug && (
                                <Chip
                                    label={`${value.slug}`} 
                                    size="small"
                                    style={{ marginRight: 5, marginBottom: 2 }}
                                />
                            )}
                            {value && value.time_period && (
                                <Chip
                                    label={`${value.time_period}`} 
                                    size="small"
                                    style={{ marginRight: 5, marginBottom: 2 }}
                                />
                            )}
                        </>
                    )
                }
            }
        },
        {
            label: 'Price',
            name: 'prices',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value) => {
                    return (
                        <>
                            <Chip
                                label={`${value.price}`} 
                                size="small"
                                style={{ marginRight: 5, marginBottom: 2, blockSize: 'auto' }}
                            />
                            <br />
                            <Chip
                                label={`${value.sales_price}`} 
                                size="small"
                                style={{ marginRight: 5, marginBottom: 2}}
                            />
                        </>
                    )
                }
            }
        },
        {
            label: 'Status',
            name: 'status',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value) => {
                    return (
                        <>
                            <Chip
                                label={`${value.visibility}`} 
                                size="small"
                                style={{ marginRight: 5, marginBottom: 2 }}
                            />
                            <br />
                            <Chip
                                label={`${value.bump}`} 
                                size="small"
                                style={{ marginRight: 5, marginBottom: 2 }}
                            />
                            <br />
                            {value && value.type == "ecommerce" && (
                                <Chip
                                    label={`${value.inventory}`} 
                                    size="small"
                                    style={{ marginRight: 5, marginBottom: 2 }}
                                />
                            )}
                        </>
                    )
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
                                <Button component={Link} to={`/product/${tableMeta.rowData[0]}/view`}>View</Button>
                                <Button component={Link} to={`/product/${tableMeta.rowData[0]}/edit`}>Edit</Button>
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
    fetchProducts: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { fetchProducts, deleteManyProduct })(Products);
