import React from 'react';
import Layout from '../../componets/Layout';
import getParams from '../../utils/getParams';
import ClothingAndAccessories from './ClothingAndaccessories';
import ProductPage from './ProductPage';
import ProductStore from './ProductStore';

import './style.css';

function ProductListPage(props) {

    const renderProducts = () => {
        const params = getParams(props.location.search);
        let content = null;
        switch (params.type) {
            case 'store':
                content = <ProductStore {...props} />
                break;
            case 'page':
                content = <ProductPage {...props} />
                break;

            default:
                content = <ClothingAndAccessories {...props}/> ;
                break;
        }

        return content;
    }

    return (

        <Layout menuheader={true} more={true} cart={true} search={true} login={true}>
            {renderProducts()}
        </Layout>

    )
}

export default ProductListPage
