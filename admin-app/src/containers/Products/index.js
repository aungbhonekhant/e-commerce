import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout";
import Input from "../../components/UI/input";
import _ from 'lodash';

//icons
import {
    IoIosAdd,
    IoIosTrash,
    IoIosBrush,
} from 'react-icons/io';

import { FaPlusCircle } from 'react-icons/fa';

//bootstrap
import { OverlayTrigger, Tooltip, Col, Container, Row, Table, Card, Form, Button, Spinner, Alert } from "react-bootstrap";
import { InputTags } from 'react-bootstrap-tagsinput'
//import 'react-bootstrap-tagsinput/dist/index.css'

import { addProduct, deleteProductById, addCategory, addBrand, addTag } from '../../actions';
import Modal from "../../components/UI/Modal";
import { generatePublicUrl } from '../../urlConfig';

//ckEditor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

//file upload with dropZone
import { FileUpload } from '../../components/FileUpload';

//css
import './styles.css'
import MultiSelect from '../../components/MultiSelect';


function Products() {

    const category = useSelector((state) => state.category);
    const product = useSelector(state => state.product);
    const brand = useSelector(state => state.brand);
    const tag = useSelector(state => state.tag);

    const [name, setName] = useState(''); //form
    const [quantity, setQuantity] = useState(''); //form
    const [sku, setSku] = useState(''); //form
    const [price, setPrice] = useState(''); //form
    const [kg, setKg] = useState(''); //form
    const [description, setDescription] = useState(''); //form
    const [categoryId, setCategoryId] = useState(''); //form
    const [brandId, setBrandId] = useState(''); //form
    const [tagsId, setTagsId] = useState([]); //form
    const [productPicture, setProductPicture] = useState([]); //form
    const [status, setStatus] = useState('Draft'); //form
    const [productVarients, setProductVarients] = useState([]); //form
    const [showVariantOption, setShowVariantOption] = useState(false);
    const [variantOption, setVariantOption] = useState([
        { option: "", value: [] },
    ]); //form
    console.log({ name, quantity, sku, price, kg, description, categoryId, brandId, productPicture, status, tagsId, variantOption, productVarients });
    //for category create
    const [newCat, setNewCat] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [parentCategoryId, setParentCategoryId] = useState("");

    //for brand create
    const [newBrand, setNewBrand] = useState(false);
    const [brandName, setBrandName] = useState("");

    //for Tags create
    const [newTag, setNewTag] = useState(false);
    const [tagName, setTagName] = useState("");

    const [invalidImage, setInvalidImage] = useState("");

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
            options.push({ value: category._id, label: category.name });
            if (category.children.length > 0) {
                createCategoryLists(category.children, options);
            }
        }

        return options;
    };

    const CreateDataLists = (datas, options = []) => {
        for (let data of datas) {
            options.push({ value: data._id, label: data.name })
        }
        return options;
    }

    // const handleProductPictures = (e) => {
    //     console.log(productPicture);
    //     setProductPicture([
    //         ...productPicture,
    //         e.target.files[0]
    //     ])
    // }

    //image upload functions
    const handleProductPictures = e => {
        const files = e.target.files;
        const imgCount = productPicture.length;
        const totalCount = files.length + imgCount;

        if (files === 0) {
            setInvalidImage("Please select image.");
            return false;
        }

        if (imgCount > 6 || totalCount > 6) {
            setInvalidImage("Maximum upload is 6.");
            return false;
        }
        let img = [...productPicture];

        _.map(files, file => {
            console.log("file-name", file.name);
            if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
                setInvalidImage("Invalid file included, Please select valid image.");
                return false;
            }
            img[img.length] = file;
            // setInvalidImage("");
        });
        setProductPicture(img)
    }

    const removeUploadedImg = index => {
        const uploadedImages = [...productPicture];
        uploadedImages.splice(index, 1);
        setProductPicture(uploadedImages);
    }

    //=============>

    //showing variant option input field if yser checked
    const handelVariantsCheck = () => {
        setShowVariantOption(!showVariantOption);
    }

    //handling variant option input
    const onHandleVariantOption = (name, value, index) => {

        const options = [...variantOption];
        options[index][name] = value;
        setVariantOption(options);
    }

    //add new variant option field
    const handleAddVariantOption = () => {
        setVariantOption([...variantOption, { option: "", value: [] }]);
    }

    //handleRemoveVariantOption
    const handleRemoveVariantOption = (index) => {
        const options = [...variantOption];
        options.splice(index, 1);
        setVariantOption(options);
    }

    //create varients list
    const addVariants = (variants) => {
        // destructure the 1st item array, and the rest of the variants
        const add = ([{ value }, ...variants], row = []) =>
            // iterate the variants and flatten
            [].concat(...value.map((variantItem) => {
                // create a new array for the current row, and the variant string
                const currRow = [...row, `${variantItem} `];

                // if there are more variants, invoke add with the remaining variants and the current row, or join the array to a string (the end result)
                return variants.length ? add(variants, currRow) : currRow.join('/ ');
            }));

        const variantList = add(variants);
        let _list = [];
        variantList.map((list, index) => {
            _list[index] = {
                name: list,
                price: price,
                quantity: "",
                SKU: "",
                status: true
            }
        })
        setProductVarients(_list);
        return variantList;
    }
    
    useEffect(() => {
        addVariants(variantOption);
    }, [variantOption])

    const onHandleproductVarient = (name, value, index) => {
        const varients = [...productVarients];
        varients[index][name] = value;
        setProductVarients(varients);
    }

    const onRemoveproductVarient = (index, type) => {
        const varients = [...productVarients];
        if (type === 'undo') {
            varients[index]['status'] = true;
            setProductVarients(varients);
        } else {
            varients[index]['status'] = false;
            setProductVarients(varients);
        }


    }

    //handleProductStatus
    const handleProductStatus = e => {
        setStatus(e.target.value)
        console.log(status);
    }

    // create new Category
    const submitAddCategoryForm = () => {

        const form = new FormData();
        if (categoryName === "") {
            alert("Category name is required")
            return;
        }
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        dispatch(addCategory(form)).then(() => {
            setCategoryName('');
            setParentCategoryId('');
            setNewCat(false);
        });
    }

    // create new Brand
    const submitAddBrandForm = () => {
        const form = new FormData();
        if (brandName === "") {
            alert("Brand name is require!");
            return;
        }
        form.append('name', brandName);
        dispatch(addBrand(form)).then(() => {
            setBrandName("");
            setNewBrand(false);
        })
    }

    //handel tags options change
    const handelTags = (e) => {
        setTagsId(Array.isArray(e) ? e.map(x => x.value) : [])
    }

    // create new tag
    const submitAddTagForm = () => {
        //const form = new FormData();
        if (tagName === "") {
            alert("Tag name is require!");
            return;
        }
        //form.append('name', tagName);
        const tag = { name: tagName }
        dispatch(addTag(tag)).then(() => {
            setTagName("");
            setNewTag(false);
        })
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
                            product.products.map((product, index) =>
                                <tr key={index}>
                                    <td> 1 </td>
                                    <td onClick={() => showProductDetailsModal(product)} key={product._id} style={{ cursor: 'pointer' }}>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.category.name}</td>
                                    <td>
                                        <div className="d-flex">
                                            <div className="mr-1">
                                                <Button variant="posv" size="sm"><IoIosBrush /></Button>
                                            </div>
                                            <div>
                                                <Button
                                                    variant="ngt" size="sm"
                                                    onClick={() => {
                                                        const payload = {
                                                            productId: product._id
                                                        };
                                                        dispatch(deleteProductById(payload));
                                                    }}
                                                ><IoIosTrash /></Button>
                                            </div>

                                        </div>

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
                size="xl"
                show={show}
                handleclose={handleClose}
                modaltitle={'Add Product'}
                buttons={[
                    {
                        label: 'No',
                        color: 'ngt',
                        onClick: () => {
                            alert('no');
                            setShow(false);
                        }
                    },
                    {
                        label: category.loading ? 'Saving' : 'Save',
                        color: 'posv',
                        onClick: submitProductForm
                    }
                ]}
            >
                <Row>
                    <Col lg={8} className="priductModelLeft">
                        {/* title and description */}
                        <Card body className="priductModeInnerCard">
                            {/* product name */}
                            <Input
                                label="Name"
                                value={name}
                                placeholder={`Product Name`}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus="autoFocus"
                            />

                            <Input
                                label="Price"
                                value={price}
                                placeholder={`Product Price`}
                                onChange={(e) => setPrice(e.target.value)}
                                autoFocus="autoFocus"
                            />

                            {/* description */}

                            <CKEditor
                                editor={ClassicEditor}
                                config={{
                                    toolbar: {
                                        items: [
                                            'heading', '|',
                                            'bold', 'italic', '|',
                                            'link', '|',
                                            'outdent', 'indent', '|',
                                            'bulletedList', 'numberedList', '|',
                                            'insertTable', '|', 'blockQuote', '|',
                                            'undo', 'redo'
                                        ],
                                    },
                                    height: '300px',
                                    width: 'auto'
                                }}
                                data="Product's descriptions"
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setDescription(data);
                                }}
                            />

                        </Card>
                        <Card body className="priductModeInnerCard">
                            {/* image upload */}
                            <FileUpload
                                id="singlie-upload"
                                label="Product Image Single File"
                                images={productPicture}
                                onchange={handleProductPictures}
                                removeuploadedimg={removeUploadedImg}
                                error={invalidImage}
                            />
                        </Card>
                        <Card body className="priductModeInnerCard">
                            <Card.Title>Inventory</Card.Title>
                            <Row>
                                <Col sm={6} >
                                    <Input
                                        label="SKU (Stock Keeping Unit)"
                                        value={sku}
                                        placeholder={`Enter Unit`}
                                        onChange={(e) => setSku(e.target.value)}
                                        autoFocus="autoFocus"
                                    />
                                </Col>

                                <Col sm={6} >
                                    <Input
                                        label="Quantity"
                                        value={quantity}
                                        placeholder={`Product Quantity`}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        autoFocus="autoFocus"
                                    />
                                </Col>
                            </Row>
                        </Card>
                        <Card body className="priductModeInnerCard">
                            <Input
                                label="Weight"
                                value={kg}
                                placeholder={`enter product's weight`}
                                onChange={(e) => setKg(e.target.value)}
                                autoFocus="autoFocus"
                            />
                        </Card>
                        <Card className="priductModeInnerCard">
                            <Card.Header>
                                <Card.Title>Variants</Card.Title>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check onChange={handelVariantsCheck} checked={showVariantOption} type="checkbox" label="This product has multiple options, like different sizes or colors" />
                                </Form.Group>
                            </Card.Header>
                            {
                                showVariantOption &&
                                <>
                                    <Card.Body>
                                        <h6>Options</h6>
                                        {variantOption.length === 0 && <h6 style={{ textAlign: 'center' }}>No Option here!</h6>}
                                        {
                                            variantOption.map((data, index) => {
                                                return (
                                                    <div key={index}>
                                                        <h5>Option-<small>{index + 1}</small></h5>
                                                        <Row className="m-sm-0">
                                                            <Col sm={11}>
                                                                <Row>
                                                                    <Col md={4} sm={12}>
                                                                        <Input
                                                                            value={data.option}
                                                                            name="option"
                                                                            placeholder={`Option title (eg. color)`}
                                                                            onChange={(e) => onHandleVariantOption(e.target.name, e.target.value, index)}
                                                                            autoFocus="autoFocus"
                                                                            require={true}
                                                                        />
                                                                    </Col>
                                                                    <Col md={8} sm={12} className="inputTags">
                                                                        <InputTags
                                                                            name="value"
                                                                            values={data.value}
                                                                            placeholder={`option value (eg. red, gree)`}
                                                                            onTags={(value) => onHandleVariantOption(value.name, value.values, index)}
                                                                            // onTags={(value) => setEg(value.values)}
                                                                            autoFocus="autoFocus"
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Col>

                                                            <Col sm={1}>
                                                                <Button variant="ngt" onClick={() => handleRemoveVariantOption(index)}><IoIosTrash /></Button>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                );
                                            })
                                        }

                                        <hr className="divider" />
                                        <Button variant="posv" size="sm" onClick={handleAddVariantOption}><IoIosAdd /> Add another option</Button>
                                        <hr className="divider" />
                                        {
                                            productVarients.length > 0 &&
                                            <div>
                                                <h6>Preview</h6>
                                                <Row className="">
                                                    <Table hover responsive className="product-variants-preview">
                                                        <thead>
                                                            <tr>
                                                                <th>variant</th>
                                                                <th>Price</th>
                                                                <th>Quantity</th>
                                                                <th>SKU</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                productVarients.map((varient, index) => (

                                                                    <tr key={index}>
                                                                        {
                                                                            !varient.status ?
                                                                                <td colspan="5">
                                                                                    <p className="text-center">
                                                                                        This varient will not be created &nbsp;
                                                                                        <b className="text-info cursor-pointer" href="http://" onClick={() => onRemoveproductVarient(index, 'undo')}>
                                                                                             Undo
                                                                                        </b>
                                                                                    </p>
                                                                                </td>
                                                                                :
                                                                                <>
                                                                                    <td className="w-25">{varient.name}</td>
                                                                                    <td>
                                                                                        <Input
                                                                                            placeholder={`MMK 0.00`}
                                                                                            value={varient.price}
                                                                                            name="price"
                                                                                            onChange={(e) => onHandleproductVarient(e.target.name, e.target.value, index)}
                                                                                        />
                                                                                    </td>
                                                                                    <td>
                                                                                        <Input
                                                                                            placeholder={`0`}
                                                                                            value={varient.quantity}
                                                                                            name="quantity"
                                                                                            onChange={(e) => onHandleproductVarient(e.target.name, e.target.value, index)}
                                                                                        />
                                                                                    </td>
                                                                                    <td>
                                                                                        <Input
                                                                                            placeholder={`0`}
                                                                                            value={varient.SKU}
                                                                                            name="SKU"
                                                                                            onChange={(e) => onHandleproductVarient(e.target.name, e.target.value, index)}
                                                                                        />
                                                                                    </td>
                                                                                    <td><Button variant="ngt" onClick={() => onRemoveproductVarient(index, 'del')}><IoIosTrash /></Button></td>

                                                                                </>
                                                                        }
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </Table>
                                                </Row>
                                            </div>
                                        }

                                    </Card.Body>
                                </>
                            }
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card body className="priductModeInnerCard">
                            <Card.Title>Product status</Card.Title>
                            <Input
                                type="select"
                                label=""
                                placeholder=""
                                options={[{ value: 'Draft', name: 'Draft' }, { value: 'Active', name: 'Active' }]}
                                value={status}
                                onChange={handleProductStatus}
                            />
                            {
                                status === 'Draft' ?
                                    <p>This product will be hidden from Shop.</p>
                                    : status === 'Active' ?
                                        <p>This product will be available to Shop.</p>
                                        : null
                            }

                        </Card>
                        <Card body className="priductModeInnerCard">
                            <Card.Title>
                                Organization
                            </Card.Title>
                            {/* Category section start */}
                            {
                                !newCat ?
                                    <div className="priductModeInnerCard px-1 d-flex justify-content-between">
                                        <MultiSelect
                                            label="Category"
                                            closeMenuOnSelect="false"
                                            placeholder="select category"
                                            onChange={(value) => setCategoryId(value.value)}
                                            noOptionsMessage={() => 'No other categories!'}
                                            isMulti={false}
                                            options={createCategoryLists(category.categories)}
                                        />
                                        <div className="ml-2 mt-3 align-self-center">
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="button-tooltip-2">Add a new one?</Tooltip>}
                                            >
                                                <Button variant="normal" className="btn-circle text-dark" size="sm" onClick={() => setNewCat(true)}>
                                                    <FaPlusCircle />
                                                </Button>
                                            </OverlayTrigger>
                                        </div>
                                    </div> :
                                    <div className="priductModeInnerCard">
                                        {
                                            category.error !== null &&
                                            <Alert variant="dark" className="text-danger">
                                                {category.error}
                                            </Alert>
                                        }
                                        {
                                            category.loading ? <div className="d-flex justify-content-center"><Spinner animation="border" variant="info" /></div> :
                                                <div className="m-1">
                                                    <h6>Create Category</h6>
                                                    <Input
                                                        value={categoryName}
                                                        placeholder={`Category Name`}
                                                        onChange={(e) => setCategoryName(e.target.value)}
                                                        autoFocus="autoFocus"
                                                        className="form-control-sm"
                                                    />
                                                    <Input
                                                        type="select"
                                                        label=""
                                                        placeholder="select category"
                                                        options={createCategoryLists(category.categories)}
                                                        value={parentCategoryId}
                                                        onChange={(e) => setParentCategoryId(e.target.value)}
                                                    />
                                                    <div className="d-flex justify-content-end">
                                                        <Button variant="posv"
                                                            className="btn-sm"
                                                            onClick={submitAddCategoryForm}
                                                        >
                                                            Save
                                                        </Button>
                                                        <Button variant="ngt"
                                                            className="btn-sm ml-2"
                                                            onClick={() => setNewCat(false)}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>

                                        }


                                    </div>
                            }
                            {/* Category section end */}

                            {/* Brand section start */}
                            {
                                !newBrand ?
                                    <>
                                        {
                                            brand.message !== null &&
                                            setTimeout(() => {
                                                <Alert variant="dark" className="text-danger">
                                                    {brand.message}
                                                </Alert>
                                            }, 1000)

                                        }
                                        <div className="priductModeInnerCard px-1 d-flex justify-content-between">

                                            <MultiSelect
                                                label="Brand Name"
                                                closeMenuOnSelect="true"
                                                placeholder="select brand"
                                                onChange={value => setBrandId(value.value)}
                                                noOptionsMessage={() => 'No other brand!'}
                                                isMulti={false}
                                                options={CreateDataLists(brand.brands)}
                                            />
                                            <div className="ml-2 mt-3 align-self-center">
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip id="button-tooltip-2">Add a new one?</Tooltip>}
                                                >
                                                    <Button variant="normal" className="btn-circle text-dark" size="sm" onClick={() => setNewBrand(true)}>
                                                        <FaPlusCircle />
                                                    </Button>
                                                </OverlayTrigger>
                                            </div>
                                        </div>

                                    </>
                                    :
                                    <div className="priductModeInnerCard">
                                        {
                                            brand.error !== null &&
                                            <Alert variant="dark" className="text-danger">
                                                {brand.error}
                                            </Alert>
                                        }
                                        {
                                            brand.loading ? <div className="d-flex justify-content-center"><Spinner animation="border" variant="info" /></div> :
                                                <div className="m-1">
                                                    <h6>Create New Brand</h6>
                                                    <Input
                                                        value={brandName}
                                                        placeholder={`Brand Name`}
                                                        onChange={(e) => setBrandName(e.target.value)}
                                                        autoFocus="autoFocus"
                                                        className="form-control-sm"
                                                    />
                                                    <div className="d-flex justify-content-end">
                                                        <Button variant="posv"
                                                            className="btn-sm"
                                                            onClick={submitAddBrandForm}
                                                        >
                                                            Save
                                                        </Button>
                                                        <Button variant="ngt"
                                                            className="btn-sm ml-2"
                                                            onClick={() => setNewBrand(false)}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                            }

                            {/* Brand section end */}

                            {/* Tags Section start */}

                            {
                                !newTag ?
                                    <div className="priductModeInnerCard px-1 d-flex justify-content-between">

                                        {
                                            tag.message !== null &&
                                            <Alert variant="dark" className="text-danger">
                                                {tag.message}
                                            </Alert>
                                        }

                                        <MultiSelect
                                            label="Product's Tags"
                                            closeMenuOnSelect="false"
                                            placeholder="select tags"
                                            onChange={handelTags}
                                            noOptionsMessage={() => 'No other tags!'}
                                            isMulti={true}
                                            options={CreateDataLists(tag.tags)}
                                        />

                                        <div className="ml-2 mt-3 align-self-center">
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="button-tooltip-2">Add new tags?</Tooltip>}
                                            >
                                                <Button variant="normal" className="btn-circle text-dark" size="sm" onClick={() => setNewTag(true)}>
                                                    <FaPlusCircle />
                                                </Button>
                                            </OverlayTrigger>
                                        </div>
                                    </div>
                                    :
                                    <div className="priductModeInnerCard">
                                        {
                                            tag.error !== null &&
                                            <Alert variant="dark" className="text-danger">
                                                {tag.error}
                                            </Alert>
                                        }
                                        {
                                            tag.loading ? <div className="d-flex justify-content-center"><Spinner animation="border" variant="info" /></div> :
                                                <div className="m-1">
                                                    <h6>Create New Tag</h6>
                                                    <Input
                                                        value={tagName}
                                                        placeholder={`Tag Name`}
                                                        onChange={(e) => setTagName(e.target.value)}
                                                        autoFocus="autoFocus"
                                                        className="form-control-sm"
                                                    />
                                                    <div className="d-flex justify-content-end">
                                                        <Button variant="posv"
                                                            className="btn-sm"
                                                            onClick={submitAddTagForm}
                                                        >
                                                            Save
                                                        </Button>
                                                        <Button variant="ngt"
                                                            className="btn-sm ml-2"
                                                            onClick={() => setNewTag(false)}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                            }


                        </Card>
                    </Col>
                </Row>

                {/* <Input
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
                /> */}
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
                handleclose={handleCloseProductDetailModel}
                modaltitle={'Product Details'}
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
                                    <img src={generatePublicUrl(picture.img)} alt={productDetails.name} />
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
                <Row className="mt-5 mb-3">
                    <Col md={12}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h3>Products</h3>
                            <Button variant="posv" size="sm" onClick={handleShow}>Add</Button>
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
