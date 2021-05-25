import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Select from 'react-select';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Chip from '@material-ui/core/Chip';
import SmartphoneTwoToneIcon from '@material-ui/icons/SmartphoneTwoTone';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import { Container } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import NumberFormat from 'react-number-format';
import Moment from 'react-moment';

import MUIDataTable from 'mui-datatables';

import { fetchOrders, fetchFollowUps, postFollowUp, putOrders, putOrdersAddBonus } from '../../../actions/order';
import { fetchProducts } from '../../../actions/product';

import Spinner from '../../layouts/Spinner';

const useStyles = makeStyles({
    table: {
        minWidth: 550,
        maxWidth: 550,
    },
  });

let AllUps = []
let ObjUp = {}
let firstLoad = true
let message = ""
const Orders = ({ orders, followups, setLoading, fetchOrders, fetchFollowUps, postFollowUp, putOrders, putOrdersAddBonus, products, fetchProducts}) => {

    // if((followups &&  AllUps.indexOf(followups.data) === -1) || (followups && followups.data['order'] == open && open['id'])) {
    //     // AllUps.(followups.data);
    //     // ObjUp[followups.data['order']] = followups.data.activity
    // }

    // if(firstLoad && orders){
    //     firstLoad = false
    //     // orders.map(val => fetchFollowUps(val['_id']))
    // }
    

    React.useEffect(() => {
        fetchOrders();
        fetchProducts('?fields=type&value=bonus');
        
        // eslint-disable-next-line
    }, []);

    React.useEffect(() => {
        pay.open && orders && pay && orders.map(obj=> {
            if(obj && obj.invoice && pay.obj.invoice && obj.invoice == pay.obj.invoice)
                setPay({...pay, obj})
        })
    }, [orders]);

    React.useEffect(() => {
        let val = []
        products &&  products.map(obj=> {
            let value = obj['_id']
            let label = obj.name
            val.push({value, label})
        })
        setProductBonus(val)
    }, [products]);

    const [productBonus, setProductBonus] = React.useState([]);
    const [valueProductBonus, setValueProductBonus] = React.useState([]);
    const [ubahStatus, setUbahStatus] = React.useState({});

    let ubah_unpaid = [
        { value: 'paid', label: 'Paid' },
        { value: 'pending', label: 'Pending' }
      ];

    let ubah_paid = [
        { value: 'refund', label: 'Refund' },
        { value: 'unpaid', label: 'Unpaid' }
    ];

    let ubah_pending = [
        { value: 'unpaid', label: 'Unpaid' },
        { value: 'paid', label: 'Paid' }
    ];

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
                            {value && (
                                <Chip
                                    icon={<SmartphoneTwoToneIcon />}
                                    label={`${value && value.whatsapp}`} 
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
            label: 'Product',
            name: 'items',
            options: {
                setCellProps: () => ({ style: { minWidth: '140px', maxWidth: '140px' }}),
                filter: false,
                sort: false,
                customBodyRender: value => {
                    let name = ""
                    value.map(e=>{name += e.product_info.name + ", "})
                    name = name && name.substring(0, name.length-2)
                    return (
                        name
                    )
                },
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
            label: 'Total',
            name: 'total_price',
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
        },
        {
            label: 'Follow Up',
            name: 'details',
            options: {
                filter: false,
                sort: false,
                customBodyRender: value => {
                    if(value.followup) {
                        let data = value.followup.activity
                        return (
                            <>
                                <Chip
                                    label={1} 
                                    size="small"
                                    style={{ marginRight: 5, marginBottom: 2, cursor: 'pointer', color: 'white', background: data[0].is_done ? '#25D366' : '#FF9800'}}
                                    onClick={() => handleClickOpenFollowUp(1, value, data[0].is_done ? '#25D366' : '#FF9800')}
                                />
                                <Chip
                                    label={2} 
                                    size="small"
                                    style={{ marginRight: 5, marginBottom: 2, cursor: 'pointer', color: 'white', background: data[1].is_done ? '#25D366' : data[1].next ? '#FF9800' : '#e0e0e0' }}
                                    onClick={() => handleClickOpenFollowUp(2, value, data[1].is_done ? '#25D366' : data[1].next ? '#FF9800' : '#e0e0e0')}
                                />
                                <Chip
                                    label={3} 
                                    size="small"
                                    style={{ marginRight: 5, marginBottom: 2, cursor: 'pointer', color: 'white', background: data[2].is_done ? '#25D366' : data[2].next ? '#FF9800' : '#e0e0e0' }}
                                    onClick={() => handleClickOpenFollowUp(3, value, data[2].is_done ? '#25D366' : data[2].next ? '#FF9800' : '#e0e0e0')}
                                />
                                <Chip
                                    label={4} 
                                    size="small"
                                    style={{ marginRight: 5, marginBottom: 2, cursor: 'pointer', color: 'white', background: data[3].is_done ? '#25D366' : data[3].next ? '#FF9800' : '#e0e0e0' }}
                                    onClick={() => handleClickOpenFollowUp(4, value, data[3].is_done ? '#25D366' : data[3].next ? '#FF9800' : '#e0e0e0')}
                                />
                                <Chip
                                    label={5} 
                                    size="small"
                                    style={{ marginRight: 5, marginBottom: 2, cursor: 'pointer', color: 'white', background: data[4].is_done ? '#25D366' : data[4].next ? '#FF9800' : '#e0e0e0' }}
                                    onClick={() => handleClickOpenFollowUp(5, value, data[4].is_done ? '#25D366' : data[4].next ? '#FF9800' : '#e0e0e0')}
                                />
                            </>
                        )
                    }else return ('')
                    // return <span>{v && v.length}</span>
                },
            }
        },
        {
            name: 'Action',
            name: 'details',
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    let isBayar = !value.payment || (value.payment && (value.payment.status != "UNPAID" || value.payment.method.vendor == "Dana") || (!value.transfer_evidence || (value.transfer_evidence && value.transfer_evidence.is_confirmed != false)) )
                    let isBonus = value.status == "PAID"
                    return (
                        <>
                            <ButtonGroup size="small" aria-label="small outlined button group">
                                <Button component={Link} to={`/order/${tableMeta.rowData[0]}/detail`}>Detail</Button>
                            </ButtonGroup>
                            <br/>
                            {/* <ButtonGroup size="small" aria-label="small outlined button group">
                                <Button component={Link} to={`/order/${tableMeta.rowData[0]}/detail`}>Delete</Button>
                            </ButtonGroup>
                            <br/> */}
                            <ButtonGroup size="small" aria-label="small outlined button group">
                                <Button component={Link} onClick={() => handleClickOpenPay(value, tableMeta.rowIndex)}>Bayar</Button>
                            </ButtonGroup>
                            <br/>
                            <ButtonGroup size="small" aria-label="small outlined button group">
                                <Button component={Link} onClick={() => handleClickOpenShipping(value, tableMeta.rowData[2]['_id'])} disabled={!isBonus}>Bonus</Button>
                            </ButtonGroup>
                        </>
                    )
                }
            }
        }
    ];

    const [open, setOpen] = React.useState({open: false});
    const [pay, setPay] = React.useState({open: false});
    const [shipping, setShipping] = React.useState({open: false});

    const options = {
        search: true,
        download: true,
        print: 'disabled',
        viewColumns: true,
        filter: true,
        filterType: 'dropdown',
        responsive: 'vertical',
        tableBodyHeight: '100%',
        tableBodyWidth: '100%',
        maxWidth: "xl",
        tableBodyMaxHeight: '65vh',
        sortOrder: {
            name: 'create_date',
            direction: 'desc'
        },
        // onTableChange: (action, state) => {
        //     console.log(action);
        //     console.dir(state);
        // },
    }

    const handleClickOpenFollowUp = (nomor, obj, warna) => {
        message = obj.followup.activity[nomor-1 || 0].message || ''
        let name = obj.user_info.name
        let hp = obj.user_info.whatsapp || ''
        if(hp && hp.substring(0, 1) == 0)
            hp = hp.substring(1, hp.length)
        message = message.replace('{nama}', name)

        setOpen({...open, open: true, nomor, name, hp: hp, id: obj['_id'], warna, message});
    };
  
    const handleCloseFollowUp = (condition, id, warna) => {
        message = message.replace('{nama}', open.name)
        setOpen({...open, open: false})
        
        condition && condition == "up" && window.open('http://wa.me/' + open.hp + '/?text=' + message, '_blank');
        condition && condition == "up" && warna == "#FF9800" && postFollowUp(id, message)
        condition && condition == "up" && warna == "#FF9800" && fetchOrders()
    };

    const handleClickOpenPay = (obj,idx) => {
        console.log('idx', idx)
        setPay({...pay, open: true, idx, obj});
    };
  
    const handleClosePay = (key, id) => {
        key && key == "close" && setPay({...pay, open: false});

        key && key == "bayar" && putOrders(id);
    };

    const handleClickOpenShipping = (obj, user_id) => {
        setShipping({...shipping, open: true, obj, user_id});
    };

    const onProductBonusChange = e => {
        setValueProductBonus(e)
    }
  
    const handleCloseShipping = (key) => {
        if(key == "save"){
            const product_id = []
            const user_id = shipping.user_id

            valueProductBonus.map(e=>product_id.push(e.value))

            const invoice_number = shipping.obj.invoice
            const body = {product_id, user_id}
            putOrdersAddBonus(invoice_number, body)
        }
        setShipping({open: false});
        setValueProductBonus([]);
    };

    const DialogContent = withStyles((theme) => ({
        root: {
        padding: theme.spacing(2),
        },
    }))(MuiDialogContent);
  
    const DialogActions = withStyles((theme) => ({
        root: {
        margin: 0,
        padding: theme.spacing(1),
        },
    }))(MuiDialogActions);
    const classes = useStyles();
    return (
        <React.Fragment>
            <Dialog onClose={handleCloseFollowUp} aria-labelledby="customized-dialog-title" open={open && open.open || false}>
                <DialogTitle id="customized-dialog-title" onClose={handleCloseFollowUp}>
                    Follow Up {open && open.nomor || 1}
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                    Name :  {open && open.name || ''}
                    </Typography>
                    <Typography gutterBottom>
                    Phone : {open && open.hp || ''}
                    </Typography>
                    <Typography gutterBottom>
                    Message : 
                    </Typography>
                    <Typography gutterBottom>
                    <TextareaAutosize
                        rows={8}
                        cols={60}
                        onChange={(e) => message = e.currentTarget.value}
                        placeholder="Message"
                        defaultValue={message}
                        />
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => handleCloseFollowUp('up', open.id, open.warna)} color="primary">
                    Follow Up
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog onClose={handleClosePay} aria-labelledby="customized-dialog-title" open={pay && pay.open || false}>
                <DialogTitle id="customized-dialog-title" onClose={handleClosePay}>
                    Order Detail
                </DialogTitle>
                <DialogContent dividers style={{width: '600px', padding: '20px'}}>
                    <Typography gutterBottom>
                        <table>
                            <tr>
                                <td>Invoice Number</td>
                                <td>:</td>
                                <td>{pay && pay.obj && pay.obj.invoice || ''}</td>
                            </tr>
                            <tr>
                                <td>Order Date</td>
                                <td>:</td>
                                <td>{pay && pay.obj && pay.obj.create_date || ''}</td>
                            </tr>
                            <tr>
                                <td>Status Payment</td>
                                <td>:</td>
                                <td>{pay && pay.obj && pay.obj.status || ''}</td>
                            </tr>
                            {/* {pay && pay.obj && 
                            <tr>
                                <td>Ubah Status</td>
                                <td>:</td>
                                <td>
                                    <Select
                                        className={classes.select}
                                        placeholder="Ubah Status"
                                        options={pay.obj.status == 'PAID' ? ubah_paid : pay.obj.status == 'UNPAID' ? ubah_unpaid : pay.obj.status == 'PENDING' ? ubah_pending : []}
                                        value={ubahStatus}
                                        onChange={setUbahStatus}
                                    />
                                </td>
                            </tr>
                            } */}
                        </table>
                    </Typography>
                    <br />
                    <Typography gutterBottom>
                    Data User
                    </Typography>
                    <Typography gutterBottom>
                        <table>
                            {pay && pay.obj && pay.obj.user_info && pay.obj.user_info.name && <tr>
                                <td>Nama</td>
                                <td>:</td>
                                <td>{pay && pay.obj && pay.obj.user_info && pay.obj.user_info.name || ''}</td>
                            </tr>}
                            {pay && pay.obj && pay.obj.user_info && pay.obj.user_info.email && <tr>
                                <td>Email</td>
                                <td>:</td>
                                <td>{pay.obj.user_info.email || ''}</td>
                            </tr>}
                            {pay && pay.obj && pay.obj.user_info && pay.obj.user_info.whatsapp && <tr>
                                <td>Phone</td>
                                <td>:</td>
                                <td>{pay.obj.user_info.whatsapp || ''}</td>
                            </tr>}
                            {pay && pay.obj && pay.obj.user_info && pay.obj.user_info.address && pay.obj.user_info.address.length > 0 && <tr>
                                <td>Alamat</td>
                                <td>:</td>
                                <td>{pay.obj.user_info.address[0].detail_address || ''} {pay.obj.user_info.address[0].city || ''} {pay.obj.user_info.address[0].province || ''}</td>
                            </tr>}
                        </table>
                    </Typography>
                    <br />
                    {/* <Typography gutterBottom>
                    Follow up : 
                    </Typography> */}
                    <br />
                    {pay && pay.obj && pay.obj.items && <Typography gutterBottom>
                    Data Product
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">QTY</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pay.obj.items.map(val => {
                                    return(<TableRow>
                                        <TableCell component="th" scope="row">
                                            {val.product_info.name}
                                        </TableCell>
                                        <TableCell align="right">{val.quantity}</TableCell>
                                        <TableCell align="right">{val.sub_price}</TableCell>
                                    </TableRow>)
                                })}
                                <TableRow>
                                    <TableCell rowSpan={3}/>
                                    <TableCell>Grand Total</TableCell>
                                    <TableCell align="right">{pay.obj.grand_total || 0}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell >Diskon</TableCell>
                                    <TableCell align="right">{pay.obj.dicount_value || 0}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Total</TableCell>
                                    <TableCell align="right">{pay.obj.total_price || 0}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        </TableContainer>
                    </Typography>}
                    <br />
                    {pay && pay.obj && pay.obj.payment && 
                        <>
                        <Typography gutterBottom>
                        Data Pembayaran
                        </Typography>
                        <Typography gutterBottom>
                            <table>
                                {pay.obj.payment.method.vendor == "Dana" ? 
                                <tr>
                                    <td>Payment Dompet Digital</td>
                                    <td style={{paddingTop: '5px'}}><img src={pay.obj.payment.method.icon} style={{width: '70px',height: '21px',objectFit: 'contain', margin: '0 0 0 10px'}} /></td>
                                </tr>
                                :
                                <tr>
                                    <td>Payment Bank Transfer</td>
                                    <td style={{paddingTop: '5px'}}><img src={pay.obj.payment.method.icon} style={{width: '70px',height: '21px',objectFit: 'contain', margin: '0 0 0 10px'}} /></td>
                                </tr>
                                }
                            </table>
                        </Typography>
                        </>
                    }
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => handleClosePay('close')} color="primary">
                    Close
                    </Button>
                    <Button disabled={pay && pay.obj && pay.obj.status == "PAID"} autoFocus onClick={() => handleClosePay('bayar', pay && pay.obj && pay.obj['_id'] || '')} color="primary">
                    Terima Pembayaran
                    </Button>
                </DialogActions>
            </Dialog>
            
            <Dialog onClose={handleCloseShipping} aria-labelledby="customized-dialog-title" open={shipping && shipping.open || false}>
                <DialogTitle id="customized-dialog-title" onClose={handleCloseShipping}>
                    Data Bonus
                </DialogTitle>
                <DialogContent dividers style={{width: '500px'}}>
                    <Typography gutterBottom>
                        <Select
                            className={classes.select}
                            placeholder="Select Bonus"
                            options={productBonus}
                            value={valueProductBonus}
                            getOptionValue={(option) => option.value}
                            getOptionLabel={(option) => option.label}
                            onChange={onProductBonusChange}
                            isClearable
                            isMulti
                        />
                    </Typography>
                    <br /><br /><br />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={e => handleCloseShipping('close')} color="primary">
                    Close
                    </Button>
                    <Button autoFocus onClick={e => handleCloseShipping('save')} color="primary">
                    Save
                    </Button>
                </DialogActions>
            </Dialog>
            
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
    orders: PropTypes.array,
    setLoading: PropTypes.bool.isRequired,
    fetchOrders: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    products: state.product.products,
    orders: state.order.orders,
    followups: state.order.followups,
    setLoading: state.order.setLoading
});

export default connect(mapStateToProps, { fetchOrders, fetchFollowUps, postFollowUp, putOrders, putOrdersAddBonus, fetchProducts })(Orders);

