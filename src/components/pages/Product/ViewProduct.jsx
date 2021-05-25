import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { fetchProduct } from '../../../actions/product';

import ShowProduct from './ShowProduct';
import Spinner from '../../layouts/Spinner';

const ViewProduct = ({ product, fetchProduct }) => {
    let { id } = useParams();

    React.useEffect(() => {
        fetchProduct(id);
        // eslint-disable-next-line
    }, []);

    return (
        <React.Fragment>
            {product === null || product._id !== id ? <Spinner /> : (
                <ShowProduct
                    id={id}
                    name={product.name}
                    slug={product.slug}
                    type={product.type}
                    ecommerce={product.ecommerce}
                    topic={product.topic}
                    price={product.price}
                    time_period={product.time_period}
                    visibility={product.visibility}
                    sale_method={product.sale_method}
                    bump={product.bump[0]}                    
                    headline={product.headline}
                    subheadline={product.subheadline}
                    description={product.description}
                    learn_about={product.learn_about}
                    sale_price={product.sale_price}
                    image_url={product.image_url}
                    bonus={product.bonus === undefined ? null : product.bonus}
                    agent={product.agent}
                    media={product.media}
                    section={product.section}
                    feature={product.feature}
                />)}    
        </React.Fragment>
    )
}

ViewProduct.propTypes = {
    product: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    fetchProduct: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    product: state.product.product,
    error: state.product.error
});

export default connect(mapStateToProps, { fetchProduct })(ViewProduct);

