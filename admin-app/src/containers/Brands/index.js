import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Card, Button, Form, Alert, Modal as DelModal } from 'react-bootstrap';
import Layout from '../../components/layout';
import Input from "../../components/UI/input";
import Modal from "../../components/UI/Modal";
import { SingleFileUpload } from '../../components/FileUpload';

import noImage from '../../../src/no-image.png';

import {
    getAllBrands,
    addBrand,
    updateBrand,
    deleteBrand
} from "../../actions";

import {
    BiEdit,
    BiCheck,
    BiX
} from 'react-icons/bi';
import {
    IoIosAdd,
    IoIosTrash
} from 'react-icons/io';

import { RiAlertFill, RiCheckboxCircleFill } from 'react-icons/ri'

//css
import './style.css';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';
import Spinner from '../../components/Spinner';

function Brands(props) {

    const brands = useSelector(state => state.brand)

    const [addShow, setAddShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [delShow, setDelShow] = useState(false);
    const [delItemId, setDelItemId] = useState({});

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [invalidImage, setInvalidImage] = useState("");
    const [active, setActive] = useState(true);
    const [editId, setEditId] = useState("");
    const [alertMessage, setAlertMessage] = useState({
        show: false,
        type: "",
        message: ""
    });

    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getAllBrands());
    // }, [])

    //success message
    useEffect(() => {
        if (brands.message !== null) {
            const alert = {
                show: true,
                type: "success",
                message: brands.message,
                icon: (<RiCheckboxCircleFill />)
            }

            setAlertMessage(alert);

        }
    }, [brands.message]);

    //error message
    useEffect(() => {
        if (brands.error !== null) {
            const alert = {
                show: true,
                type: "danger",
                message: brands.error,
                icon: (<RiAlertFill />)
            }

            setAlertMessage(alert);

        }
    }, [brands.error]);

    const handleShow = () => setAddShow(true);

    const handleclose = (t) => {
        if (t === 'add') {
            setAddShow(false);
        } else if (t === 'edit') {
            setEditShow(false);
        }
        setName("");
        setImage("");
        setActive(true);
    }

    const handleImage = e => {
        const file = e.target.files[0];
        if (!file) {
            setInvalidImage("Please select image.");
            return false;
        }

        if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
            setInvalidImage("Invalid file included, Please select valid image.");
            return false;
        }
        setImage(file)
    }

    const submitAddBrand = () => {
        const form = new FormData();
        form.append("name", name);
        form.append("brandImage", image);
        form.append("active", active);
        dispatch(addBrand(form)).then(() => {
            setName("");
            setImage("");
            setAddShow(false);
        });
    }

    const handleEdit = (brand) => {
        setEditShow(true);
        setName(brand.name);
        setImage(brand.brandImage);
        setActive(brand.active);
        setEditId(brand._id);
    }

    const submitEditBrand = () => {
        const form = new FormData();

        form.append("_id", editId);
        form.append("name", name);
        typeof (image) === "object" && form.append("brandImage", image);
        form.append("active", active);
        dispatch(updateBrand(form)).then(() => {
            setName("");
            setImage("");
            setEditShow(false);
        });
    }

    const handleDelete = (id) => {
        setDelShow(true);
        setDelItemId({ brandId: id });
    }

    const submitDelBrand = () => {
        dispatch(deleteBrand(delItemId)).then(() => {
            setDelShow(false);
            setDelItemId({});
        });
    }


    return (
        <Layout sidebar>

            <Container fluid>
                {
                    brands.loading ? <Spinner />
                        :
                        <>
                            {
                                alertMessage.show &&
                                <Alert className="py-1" variant={alertMessage.type} onClose={() => setAlertMessage({ show: false })} dismissible>
                                    <div className="d-inline-block mr-2" style={{ fontSize: "1.5rem" }}>{alertMessage.icon}</div>

                                    <span>
                                        {alertMessage.message}
                                    </span>
                                </Alert>
                            }
                            <Row className="mt-5 mx-auto justify-content-between">
                                <Col md={6}>
                                    <div style={{ margin: "5px 0" }}>
                                        <h3>Brand lists</h3>
                                    </div>
                                </Col>
                                <Col md={6} >
                                    <div className="actionsBtnContainer justify-content-end">
                                        <span className="mr-1">Actions: </span>
                                        <Button size="sm" onClick={handleShow}><IoIosAdd /> <span>Add</span></Button>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mx-auto mb-3">
                                {
                                    brands.brands.length > 0 ?
                                        brands.brands.map((brand, index) =>
                                            <Col key={index} sm={6} md={4} lg={3} xl={2} className="mb-3">
                                                <Card>
                                                    <Card.Img
                                                        variant="top"
                                                        width="200px"
                                                        height="200px"
                                                        src={brand.brandImage ? brand.brandImage : noImage}
                                                    />
                                                    <Card.Body>
                                                        <Card.Title className="d-flex justify-content-between">
                                                            <div>
                                                                <span className="h6">
                                                                    {brand.name}
                                                                </span>
                                                                {
                                                                    brand.active ? <small className="status-active d-block">active</small>
                                                                        : <small className="status-inactive d-block">inactive</small>
                                                                }

                                                            </div>

                                                            <div>
                                                                <span className="cursor-pointer text-info" onClick={() => handleEdit(brand)}><BiEdit /></span>
                                                                <span
                                                                    className="cursor-pointer text-danger"
                                                                    onClick={
                                                                        () => handleDelete(brand._id)
                                                                    }> <IoIosTrash /> </span>
                                                            </div>

                                                        </Card.Title>
                                                        {
                                                            brand.description &&
                                                            <Card.Text>
                                                                {brand.description}
                                                            </Card.Text>
                                                        }

                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        )
                                        :
                                        <Col sm={12}>
                                            <h4>No data Here. Please add some....</h4>
                                        </Col>
                                }


                            </Row>
                        </>
                }


            </Container>


            <ConfirmDeleteModal
                size="md"
                show={delShow}
                cancelDelete={() => { setDelShow(false); setDelItemId({}) }}
                confirmDelete={submitDelBrand}
                loading={brands.loading}
            />

            {/* Add Brand modal */}
            <Modal
                show={addShow}
                handleclose={() => handleclose("add")}
                modaltitle='Edit Brand'
                buttons={[
                    {
                        label: 'No',
                        color: 'ngt',
                        onClick: () => {
                            alert('no');
                            handleclose("add");
                        }
                    },
                    {
                        label: brands.loading ? 'Saving' : 'Save',
                        color: 'posv',
                        onClick: submitAddBrand
                    }
                ]}
            >
                <Row className="m-auto">
                    <Col sm={12}>
                        <Input
                            value={name}
                            placeholder={`Brand's Name`}
                            onChange={(e) => setName(e.target.value)}
                            autoFocus="autoFocus"
                            className="form-control-sm"
                        />

                    </Col>
                    <Col sm={12}>
                        <SingleFileUpload
                            id="singlie-upload"
                            label="Product Image Single File"
                            image={image}
                            onchange={handleImage}
                            error={invalidImage}
                        />
                    </Col>
                    <Col sm={12}>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check
                                type="checkbox"
                                checked={active}
                                onChange={(e) => setActive(e.target.checked)}
                                label="Active?"
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Modal>

            {/* Edit Modal */}
            <Modal
                show={editShow}
                handleclose={() => handleclose("edit")}
                modaltitle='Add New Brand'
                buttons={[
                    {
                        label: 'No',
                        color: 'ngt',
                        onClick: () => {
                            alert('no');
                            handleclose("edit")
                        }
                    },
                    {
                        label: brands.loading ? 'Saving' : 'Save',
                        color: 'posv',
                        onClick: submitEditBrand
                    }
                ]}
            >
                <Row className="m-auto">
                    <Col sm={12}>
                        <Input
                            value={name}
                            placeholder={`Brand's Name`}
                            onChange={(e) => setName(e.target.value)}
                            autoFocus="autoFocus"
                            className="form-control-sm"
                        />

                    </Col>
                    <Col sm={12}>
                        <SingleFileUpload
                            id="singlie-upload"
                            label="Product Image Single File"
                            image={image}
                            onchange={handleImage}
                            error={invalidImage}
                        />
                    </Col>
                    <Col sm={12}>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check
                                type="checkbox"
                                checked={active}
                                onChange={e => setActive(e.target.checked)}
                                label="Active?"
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Modal>
        </Layout>
    )
}

export default Brands
