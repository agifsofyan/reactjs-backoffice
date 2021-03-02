import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import Moment from 'react-moment';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';

import MUIDataTable from 'mui-datatables';
import Swal from 'sweetalert2';

import { fetchTopic, deleteManyTopic } from '../../../actions/topic';

import Spinner from '../../layouts/Spinner';
import SnackbarInfo from '../../layouts/SnackbarInfo';

const Topics = ({ 
    topics, 
    delete_topic_many, 
    setLoading, 
    fetchTopic, 
    deleteManyTopic
}) => {
    React.useEffect(() => {
        fetchTopic();
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
                        <div style={{ width: '45px' }}>
                            <img width="100%" src={value} alt={value.name} />
                        </div>
                    )
                }
            } 
        },
        {
            label: 'Topic Name',
            name: 'name',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            label: 'Slug',
            name: 'slug',
            options: {
                filter: false
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
            const ids = rowsDeleted.data.map(row => topics[row.dataIndex]._id);
            Swal.fire({
                title: 'Delete Confirmation',
                html: `<small>Are you sure you want to delete ${ids.length > 1 ? 'these ' + ids.length + ' topics' : 'this topic'}?</small>`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sure, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteManyTopic(ids);
                }
            });
        }
    }

    return (
        <React.Fragment>
            <SnackbarInfo info="success" message={delete_topic_many && delete_topic_many.message} />
            {setLoading ? <Spinner /> : (
                <MUIDataTable 
                    title={<div>
                        <h2>Topic List</h2>
                        <Button
                            variant="contained"
                            color="default"
                            style={{ marginBottom: '10px' }}
                            size="small"
                            startIcon={<AddCircleTwoToneIcon />}
                            component={Link}
                            to="/topic/add"
                        >
                            Add New
                        </Button>
                    </div>} 
                    data={topics} 
                    columns={columns} 
                    options={options} 
                />
            )}
        </React.Fragment>
    )
}

Topics.propTypes = {
    fetchTopic: PropTypes.func.isRequired,
    deleteManyTopic: PropTypes.func.isRequired,
    topic: PropTypes.array,
    delete_topic_many: PropTypes.object,
    setLoading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    topics: state.topic.topics,
    delete_topic_many: state.topic.delete_topic_many,
    setLoading: state.topic.setLoading
});

export default connect(mapStateToProps, { fetchTopic, deleteManyTopic })(Topics);
