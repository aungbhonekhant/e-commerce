import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getProductsBySlug } from '../../../actions';
import { generatePublicUrl } from '../../../urlConfig';
import { Link } from 'react-router-dom';
import Card from '../../../componets/UI/Card';
import { MaterialButton } from "../../../componets/MaterialUI";
import Rating from  "../../../componets/UI/Rating";
import Price from  "../../../componets/UI/Price";

function ProductStore(props) {

    const product = useSelector(state => state.product);
    const priceRange = product.priceRange;
    const dispatch = useDispatch();

    useEffect(() => {
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
    }, []);

    return (
        <>
            {
                Object.keys(product.productsByPrice).map((key, index) => {

                    return (
                        product.productsByPrice[key] != false &&
                        <Card key={index}
                            headerleft={`${props.match.params.slug} ${priceRange[key]}`}
                            headerright={<button> view all</button>}
                            style={{ 
                                width: 'calc(100% - 40px)',
                                margin: '20px' 
                            }}
                        >
                            <div style={{ display: 'flex' }}>
                                {
                                    product.productsByPrice[key].map(product =>
                                        <Link
                                            to={`/${product.slug}/${product._id}/p`}
                                            className="productContainer" key={product._id}
                                        >
                                            <div className="productImgContainer">
                                                <img src={generatePublicUrl(product.productPictures[0].img)} alt="" />
                                            </div>
                                            <div className="productInfo">
                                                <div style={{ margin: '5px 0' }}>{product.name}</div>
                                                <div>
                                                    <Rating value="4.3"/>
                                                    &nbsp; &nbsp;
                                                    <span 
                                                        style={{ 
                                                            color: "#777",
                                                            fontWeight: "500",
                                                            fontSize: "12px"
                                                         }}
                                                    >3353</span>
                                                </div>
                                                <Price value={product.price} />
                                            </div>
                                        </Link>
                                    )
                                }
                            </div>
                        </Card>
                    )
                })
            }
        </>
    )
}

export default ProductStore
