import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Chip from '@material-ui/core/Chip';
import SmartphoneTwoToneIcon from '@material-ui/icons/SmartphoneTwoTone';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';

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

import { fetchOrders, fetchFollowUps, postFollowUp } from '../../../actions/order';

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
const Orders = ({ orders, followups, setLoading, fetchOrders, fetchFollowUps, postFollowUp }) => {

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
                setCellProps: () => ({ style: { minWidth: '130px', maxWidth: '130px' }}),
                filterOptions: { 
                    fullWidth: true 
                }
            } 
        },
        {
            label: 'Buyer',
            name: 'user_info',
            options: {
                setCellProps: () => ({ style: { minWidth: '90px', maxWidth: '90px' }}),
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
                            {value && value.user_info && value.user_info.phone_number !== undefined && (
                                <Chip
                                    icon={<SmartphoneTwoToneIcon />}
                                    label={`${value && value.user_info.phone_number}`} 
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
                    return (
                        value[0].product_info.name
                    )
                    // return <span>{v && v.length}</span>
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
                                    style={{ marginRight: 5, marginBottom: 2, cursor: 'pointer', background: data[0].is_done ? 'green' : 'yellow'}}
                                    onClick={() => handleClickOpenFollowUp(1, value, data[0].is_done ? 'green' : 'yellow')}
                                />
                                <Chip
                                    label={2} 
                                    size="small"
                                    style={{ marginRight: 5, marginBottom: 2, cursor: 'pointer', background: data[1].is_done ? 'green' : data[1].next ? 'yellow' : 'gray' }}
                                    onClick={() => handleClickOpenFollowUp(2, value, data[1].is_done ? 'green' : data[1].next ? 'yellow' : 'gray')}
                                />
                                <Chip
                                    label={3} 
                                    size="small"
                                    style={{ marginRight: 5, marginBottom: 2, cursor: 'pointer', background: data[2].is_done ? 'green' : data[2].next ? 'yellow' : 'gray' }}
                                    onClick={() => handleClickOpenFollowUp(3, value, data[2].is_done ? 'green' : data[2].next ? 'yellow' : 'gray')}
                                />
                                <Chip
                                    label={4} 
                                    size="small"
                                    style={{ marginRight: 5, marginBottom: 2, cursor: 'pointer', background: data[3].is_done ? 'green' : data[3].next ? 'yellow' : 'gray' }}
                                    onClick={() => handleClickOpenFollowUp(4, value, data[3].is_done ? 'green' : data[3].next ? 'yellow' : 'gray')}
                                />
                                <Chip
                                    label={5} 
                                    size="small"
                                    style={{ marginRight: 5, marginBottom: 2, cursor: 'pointer', background: data[4].is_done ? 'green' : data[4].next ? 'yellow' : 'gray' }}
                                    onClick={() => handleClickOpenFollowUp(5, value, data[4].is_done ? 'green' : data[4].next ? 'yellow' : 'gray')}
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
                    return (
                        <>
                            <ButtonGroup size="small" aria-label="small outlined button group">
                                <Button component={Link} to={`/order/${tableMeta.rowData[0]}/detail`}>Edit</Button>
                            </ButtonGroup>
                            <br/>
                            <ButtonGroup size="small" aria-label="small outlined button group">
                                <Button component={Link} to={`/order/${tableMeta.rowData[0]}/detail`}>Detail</Button>
                            </ButtonGroup>
                            <br/>
                            <ButtonGroup size="small" aria-label="small outlined button group">
                                <Button component={Link} onClick={() => handleClickOpenPay(value)}>Bayar</Button>
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

    const handleClickOpenFollowUp = (nomor, obj, warna) => {
        fetchFollowUps(obj['_id'])
        message = followups && followups.data && followups.data.activity[open && open.nomor-1 || 0].message || ''
        let name = obj.user_info.name
        let contry_code = obj.user_info.phone_number && obj.user_info.phone_number[0] && obj.user_info.phone_number[0].country_code || ''
        let hp = obj.user_info.phone_number && obj.user_info.phone_number[0] && obj.user_info.phone_number[0].phone_number || ''
        if(hp && hp.substring(0, 1) == 0)
            hp = hp.substring(1, hp.length)

        setOpen({...open, open: true, nomor, name, hp: contry_code + hp, id: obj['_id'], warna, message});
    };
  
    const handleCloseFollowUp = (condition, id) => {
        message = message.replace('{name}', open.name)
        setOpen({...open, open: false})
        
        condition && condition == "up" && window.open('http://wa.me/' + open.hp + '/?text=' + message, '_blank');
        condition && condition == "up" && postFollowUp(id, message)
        condition && condition == "up" && fetchOrders()
        
    };

    const handleClickOpenPay = (obj) => {
        setPay({...pay, open: true, obj});
    };
  
    const handleClosePay = key => {
        setPay({...pay, open: false});

        key && key == "bayar" && handleClickOpenShipping();
    };

    const handleClickOpenShipping = (obj) => {
        setShipping({...shipping, open: true, obj});
    };
  
    const handleCloseShipping = () => {
        setShipping({...shipping, open: false});
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
                    No. HP : {open && open.hp || ''}
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
                    <Button autoFocus onClick={() => handleCloseFollowUp('up', open.id)} disabled={open && open.warna != "yellow" || false} color="primary">
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
                                <td>{pay && pay.obj && pay.obj['_id'] || ''}</td>
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
                            <tr>
                                <td>Ubah Status</td>
                                <td>:</td>
                                <td></td>
                            </tr>
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
                            {pay && pay.obj && pay.obj.user_info && pay.obj.user_info.phone_number && pay.obj.user_info.phone_number.length > 0 && <tr>
                                <td>Phone</td>
                                <td>:</td>
                                <td>{pay.obj.user_info.phone_number[0].country_code || ''} {pay.obj.user_info.phone_number[0].phone_number || ''}</td>
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
                    <Typography gutterBottom>
                    Data Pembayaran
                    </Typography>
                    <Typography gutterBottom>
                        <table>
                            <tr>
                                <td>Payment</td>
                                <td>:</td>
                                <td><img src="https://laruno2020.s3.ap-southeast-1.amazonaws.com/ASSETS/payment_method/dana.png" style={{width: '70px',height: '21px',objectFit: 'contain', margin: '0 0 0 10px'}} /></td>
                            </tr>
                            {pay && pay.obj && pay.obj.status &&
                            <tr>
                                <td>Status</td>
                                <td>:</td>
                                <td>{pay.obj.status == 'PAID' ? 'Paid' : pay.obj.status}</td>
                            </tr>}
                        </table>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => handleClosePay('close')} color="primary">
                    Close
                    </Button>
                    <Button autoFocus onClick={() => handleClosePay('bayar')} color="primary">
                    Terima Pembayaran
                    </Button>
                </DialogActions>
            </Dialog>
            
            <Dialog onClose={handleCloseShipping} aria-labelledby="customized-dialog-title" open={shipping && shipping.open || false}>
                <DialogTitle id="customized-dialog-title" onClose={handleCloseShipping}>
                    Data Shipping
                </DialogTitle>
                <DialogContent dividers style={{width: '500px'}}>
                    <Typography gutterBottom>
                    Invoice Number : {shipping && shipping.obj && shipping.obj || ''}
                    </Typography>
                    <Typography gutterBottom>
                    Order Date : 
                    </Typography>
                    <Typography gutterBottom>
                    Status Payment :
                    </Typography>
                    <Typography gutterBottom>
                    Ubah Status : 
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseShipping} color="primary">
                    Close
                    </Button>
                    <Button autoFocus onClick={handleCloseShipping} color="primary">
                    Delete
                    </Button>
                    <Button autoFocus onClick={handleCloseShipping} color="primary">
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
    orders: state.order.orders,
    followups: state.order.followups,
    setLoading: state.order.setLoading
});

export default connect(mapStateToProps, { fetchOrders, fetchFollowUps, postFollowUp })(Orders);

