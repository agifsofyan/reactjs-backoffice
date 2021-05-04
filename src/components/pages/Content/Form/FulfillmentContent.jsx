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

import { fetchProducts, deleteManyProduct } from '../../../../actions/product';

import Spinner from '../../../layouts/Spinner';
import SnackbarInfo from '../../../layouts/SnackbarInfo';

const FulfillmentContent = ({ 
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
            label: 'Name',
            name: 'name',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value) => {
                    return (value)
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
                    console.log('tableMeta', tableMeta)
                    console.log('tableMeta.rowData', tableMeta.rowData)
                    return (
                        <>
                            <ButtonGroup size="small" aria-label="small outlined button group">
                                {/* <Button onClick={() => console.log(tableMeta.rowData[0])}>Detail</Button> */}
                                <Button component={Link} to={`/contents/add/${tableMeta.tableData[tableMeta.rowIndex].slug}`}>Select</Button>
                            </ButtonGroup>
                        </>
                    )
                }
            }
        }
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
        <React.Fragment>
            <SnackbarInfo info="success" message={delete_product_many && delete_product_many.message} />
            {setLoading ? <Spinner /> : (
                <MUIDataTable 
                    title={'List of products'} 
                    data={products} 
                    columns={columns} 
                    options={options} 
                />
            )}
        </React.Fragment>
    )
}

FulfillmentContent.propTypes = {
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

export default connect(mapStateToProps, { fetchProducts, deleteManyProduct })(FulfillmentContent);