import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetailsById } from '../../actions';
import Layout from '../../componets/Layout'
import { generatePublicUrl } from '../../urlConfig';
import { MaterialButton } from '../../componets/MaterialUI';
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { AiFillThunderbolt } from "react-icons/ai";
import { addToCart } from '../../actions';

import "./style.css";

function ProductDetailsPage(props) {

    const dispatch = useDispatch();
    const product = useSelector(state => state.product);

    useEffect(() => {
        const { productId } = props.match.params;

        const payload = {
            params: {
                productId: productId
            }
        }
        dispatch(getProductDetailsById(payload));
    },[]);

    if (Object.keys(product.productDetails).length === 0) {
        return null;
    }

    return (
        <Layout menuheader={true} more={true} cart={true} search={true} login={true}>
            {/* <div>{product.productDetails.name}</div> */}
            <div className="productDescriptionContainer">
                <div className="flexRow">
                    <div className="verticalImageStack">
                        {product.productDetails.productPictures.map((thumb, index) => (
                            <div className="thumbnail">
                                <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
                            </div>
                        ))}
                    </div>
                    <div className="productDescContainer">
                        <div className="productDescImgContainer">
                            <img
                                src={generatePublicUrl(product.productDetails.productPictures[0].img)}
                                alt={`${product.productDetails.productPictures[0].img}`}
                            />
                        </div>

                        {/* action buttons */}
                        <div className="flexRow">
                            <MaterialButton
                                title="ADD TO CART"
                                bgColor="#ff9f00"
                                textColor="#ffffff"
                                style={{
                                    marginRight: "5px",
                                }}
                                icon={<IoMdCart />}
                                onClick={() => {
                                    const { _id, name, price } = product.productDetails;
                                    const img = product.productDetails.productPictures[0].img;
                                    dispatch(addToCart({ _id, name, price, img }));
                                    props.history.push(`/cart`);
                                }}
                            />
                            <MaterialButton
                                title="BUY NOW"
                                bgColor="#fb641b"
                                textColor="#ffffff"
                                style={{
                                    marginLeft: "5px",
                                }}
                                icon={<AiFillThunderbolt />}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    {/* home > category > subCategory > productName */}
                    <div className="breed">
                        <ul>
                            <li>
                                <a href="#">Home</a>
                                <IoIosArrowForward />
                            </li>
                            <li>
                                <a href="#">Mobiles</a>
                                <IoIosArrowForward />
                            </li>
                            <li>
                                <a href="#">Samsung</a>
                                <IoIosArrowForward />
                            </li>
                            <li>
                                <a href="#">{product.productDetails.name}</a>
                            </li>
                        </ul>
                    </div>
                    {/* product description */}
                    <div className="productDetails">
                        <p className="productTitle">{product.productDetails.name}</p>
                        <div>
                            <span className="ratingCount">
                                4.3 <IoIosStar />
                            </span>
                            <span className="ratingNumbersReviews">
                                72,234 Ratings & 8,140 Reviews
                            </span>
                        </div>
                        <div className="extraOffer">
                            Extra 
                            4500 MMK  off{" "}
                        </div>
                        <div className="flexRow priceContainer">
                            <span className="price">
                                
                                {product.productDetails.price} MMK 
                            </span>
                            <span className="discount" style={{ margin: "0 10px" }}>
                                22% off
                            </span>
                            {/* <span>i</span> */}
                        </div>
                        <div>
                            <p className="available-offers">
                                Available Offers
                            </p>
                            <p className="description">
                                <span className="description-title">
                                    Description
                                </span>
                                <span className="description-body">
                                    {product.productDetails.description}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetailsPage
