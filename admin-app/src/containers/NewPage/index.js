import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../components/layout'
import Input from '../../components/UI/input';
import Modal from "../../components/UI/Modal";
import lineatCategories from '../../helpers/linearCategories';
import {createPage} from '../../actions';

function NewPage() {

    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const page = useSelector(state => state.page);

    //get categroies from state
    const category = useSelector(state => state.category);
    //=========================================>

    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');

    useEffect(() => {
        setCategories(lineatCategories(category.categories));
    }, [category])

    useEffect(() => {
        console.log(page);
        if(!page.loading){
            setCreateModal(false);
            setTitle('');
            setCategoryId('');
            setDesc('');
            setProducts([]);
            setBanners([]);
        }
    }, [page])

    const onCategoryChange = (e) => {
        const category = categories.find(category => category.value === e.target.value);
        setCategoryId(e.target.value);
        setType(category.type);
    }

    //handling image file for banners

    const handleBannerImages = (e) => {
        setBanners([...banners, e.target.files[0]]);
    }

    //=========================================>

    //handling image file for products
    const handleProductImages = (e) => {
        setProducts([...products, e.target.files[0]]);
    }
    //=========================================>

    const submitPageForm = (e) => {
        //e.target.preventDefault();

        if(title === ""){
            alert('Title is Required');
            setCreateModal(false)
            return;
        }

        const form = new FormData();
        form.append('title', title);
        form.append('description', desc);
        form.append('category', categoryId);
        form.append('type', type);
        banners.forEach((banner, index) =>{
            form.append('banners', banner)
        })
        products.forEach((product, index) =>{
            form.append('products', product)
        })

        dispatch(createPage(form));
    }

    //Page modal
    const renderCreatePageModal = () => {
        return (
            <Modal
                show={createModal}
                modalTitle={"Create New Page"}
                handleClose={() => setCreateModal(false)}
                buttons={[
                    {
                        label: 'No',
                        color: 'outline-danger',
                        onClick: () => {
                            alert('no');
                            setCreateModal(false);
                        }
                    },
                    {
                        label: page.loading ? 'Sending' : 'Save',
                        color: 'outline-info',
                        onClick: submitPageForm
                    }
                ]}
            >
                <Container>
                    <Row>
                        <Col>
                            {/* <select
                                className="form-control form-control-sm"
                                value={categoryId}
                                onChange={onCategoryChange}
                                style={{
                                    color: "#ffffff",
                                    backgroundColor: "#2e3858",
                                    border: "1px solid #1f253b",
                                }}
                            >
                                <option value="">Select Category</option>
                                {
                                    categories.map(cat =>
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    )
                                }

                            </select> */}
                            <Input
                                type="select"
                                value={categoryId}
                                onChange={onCategoryChange}
                                options={categories}
                                placeholder="Select Category"
                                style={{
                                    color: "#ffffff",
                                    backgroundColor: "#2e3858",
                                    border: "1px solid #1f253b",
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeHolder={'Page Title'}
                                className="form-control-sm"
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Input
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeHolder={'Page Desc'}
                                className="form-control-sm"
                            />
                        </Col>
                    </Row>

                    {
                        banners.length > 0 ?
                            banners.map((banner, index) =>
                                <Row key={index}>
                                    <Col>
                                        {banner.name}
                                    </Col>
                                </Row>
                            ) : null
                    }

                    <Row>
                        <Col>
                            <Input
                                className="form-control form-control-sm"
                                type="file"
                                name="banners"
                                onChange={handleBannerImages}
                            />
                        </Col>
                    </Row>

                    {
                        products.length > 0 ?
                            products.map((product, index) =>
                                <Row key={index}>
                                    <Col>
                                        {product.name}
                                    </Col>
                                </Row>
                            ) : null
                    }

                    <Row>
                        <Col>
                            <Input
                                className="form-control form-control-sm"
                                type="file"
                                name="products"
                                onChange={handleProductImages}
                            />
                        </Col>
                    </Row>

                </Container>

            </Modal>
        )
    }

    //=========================================>

    return (
        <Layout sidebar>
            {renderCreatePageModal()}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <button onClick={() => setCreateModal(true)} style={{ margin: '0 auto' }} > Create Page </button>
            </div>

        </Layout>
    )
}

export default NewPage
