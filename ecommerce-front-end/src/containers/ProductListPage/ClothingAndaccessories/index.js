import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySlug } from '../../../actions';
import Card from '../../../componets/UI/Card';
import { generatePublicUrl } from '../../../urlConfig';
import { Link } from "react-router-dom";
import './style.css';

const ClothingAndAccessories = (props) => {
    const product = useSelector(state => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
    }, []);

    return (
        <div style={{ padding: "10px" }}>
            <Card
                style={{
                    boxSizing: "border-box",
                    padding: "10px",
                    display: "flex",
                }}
            >
                {
                    product.products.map((product) => (
                        <div className="caContainer">
                            <Link  to={`/${product.slug}/${product._id}/p`}>
                                <div className="caImgContainer">
                                    <img className="caImgContainerImg" src={generatePublicUrl(product.productPictures[0].img)} alt="" />
                                </div>
                                
                            </Link>
                            <div>
                                <div className="caProductName" title={product.name.toUpperCase()}>
                                    {`${product.name.substring(0, 50)}...`}
                                </div>
                                <div className="caProductPrice">
                                    {product.price} MMK
                                </div>
                            </div>
                        </div>
                    ))
                }
            </Card>
        </div>
    )
}

export default ClothingAndAccessories
