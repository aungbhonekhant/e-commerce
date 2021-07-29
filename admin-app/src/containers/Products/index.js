import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout";
import Input from "../../components/UI/input";
import { Col, Container, Row, Table } from "react-bootstrap";
import { addProduct, deleteProductById } from '../../actions';
import Modal from "../../components/UI/Modal";
import { generatePublicUrl } from '../../urlConfig';

//css
import './styles.css'


function Products() {

    const category = useSelector((state) => state.category);
    const product = useSelector(state => state.product);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [productPicture, setProductPicture] = useState([]);
    const [show, setShow] = useState(false);
    const [productDetailModal, setProductDetailModal] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    const dispatch = useDispatch();

    const handleClose = () => {
        setShow(false);
    }

    const submitProductForm = () => {
        const form = new FormData();
        form.append("name", name);
        form.append("quantity", quantity);
        form.append("price", price);
        form.append("description", description);
        form.append("category", categoryId);
    
        for (let pic of productPicture) {
          form.append("productPicture", pic);
        }
    
        dispatch(addProduct(form)).then(() => setShow(false));
      }

    const handleShow = () => setShow(true);


    const createCategoryLists = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryLists(category.children, options);
            }
        }

        return options;
    };

    const handleProductPictures = (e) => {
        setProductPicture([
            ...productPicture,
            e.target.files[0]
        ])
    }

    const renderProducts = () => {
        return (
            <Table responsive="sm" hover variant="dark" style={{ backgroundColor: '#2e3858', fontSize: '0.8rem' }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.products.length > 0 ?
                            product.products.map(product =>
                                <tr >
                                    <td> 1 </td>
                                    <td onClick={() => showProductDetailsModal(product)} key={product._id} style={{ cursor: 'pointer' }}>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.category.name}</td>
                                    <td>
                                        <button>Edit</button>
                                        <button
                                            onClick={()=>{
                                                const payload = {
                                                    productId: product._id
                                                };
                                                dispatch(deleteProductById(payload));
                                            }}
                                        >del</button>
                                    </td>

                                </tr>) : null
                    }

                </tbody>
            </Table>
        )
    };


    const renderAddProductModel = () => {
        return (
            <Modal 
                show={show}
                handleClose={handleClose}
                modalTitle={'Add Product'}
                buttons={[
                    {
                        label: 'No',
                        color: 'outline-danger',
                        onClick: () => {
                            alert('no');
                            setShow(false);
                        }
                    },
                    {
                        label: category.loading ? 'Saving' : 'Save',
                        color: 'outline-info',
                        onClick: submitProductForm
                    }
                ]}
            >
                <Input
                    label="Name"
                    value={name}
                    placeholder={`Product Name`}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus="autoFocus"
                />

                <Input
                    label="Quantity"
                    value={quantity}
                    placeholder={`Product Quantity`}
                    onChange={(e) => setQuantity(e.target.value)}
                    autoFocus="autoFocus"
                />

                <Input
                    label="Price"
                    value={price}
                    placeholder={`Product Price`}
                    onChange={(e) => setPrice(e.target.value)}
                    autoFocus="autoFocus"
                />

                <Input
                    label="Description"
                    value={description}
                    placeholder={`Product Description`}
                    onChange={(e) => setDescription(e.target.value)}
                    autoFocus="autoFocus"
                />

                <select
                    className="form-control"
                    value={categoryId}
                    style={{
                        color: "#ffffff",
                        backgroundColor: "#2e3858",
                        border: "1px solid #1f253b",
                    }}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    <option>select category</option>
                    {createCategoryLists(category.categories).map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.name}
                        </option>
                    ))}
                </select>

                {
                    productPicture.length > 0 ?
                        productPicture.map((pic, index) => <div key={index}> {pic.name}</div>) : null
                }

                <input
                    type="file"
                    name="productPicture"
                    onChange={handleProductPictures}
                />
            </Modal >
        );
    };

    const handleCloseProductDetailModel = () => {
        setProductDetailModal(false);
    }

    const showProductDetailsModal = (product) => {
        setProductDetails(product);
        setProductDetailModal(true);
    }

    const renderShowProductDetailsModel = () => {

        if (!productDetails) {
            return null;
        }

        return (
            <Modal
                show={productDetailModal}
                handleClose={handleCloseProductDetailModel}
                modalTitle={'Product Details'}
                size="lg"
            >

                <Row>
                    <Col md="6">
                        <label className="key">Name</label>
                        <p className="value">{productDetails.name}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Price</label>
                        <p className="value">{productDetails.price}</p>
                    </Col>
                </Row>

                <Row>
                    <Col md="6">
                        <label className="key">Quantity</label>
                        <p className="value">{productDetails.quantity}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Category</label>
                        <p className="value">{productDetails.category.name}</p>
                    </Col>
                </Row>

                <Row>
                    <Col md="12">
                        <label className="key">Description</label>
                        <p className="value">{productDetails.description}</p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <label className="key">Product Pictures</label>
                        <div style={{ display: "flex" }}>
                            {productDetails.productPictures.map(picture =>
                                <div className="productImgContainer">
                                    <img src={generatePublicUrl(picture.img)} />
                                </div>
                            )}

                        </div>

                    </Col>
                </Row>

            </Modal>
        )
    }

    return (
        <Layout sidebar >
            <Container fluid>
                <Row>
                    <Col md={12}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h3>Products</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderProducts()}
                    </Col>
                </Row>
            </Container>
            {renderAddProductModel()}
            {renderShowProductDetailsModel()}
        </Layout>
    )
}

export default Products
