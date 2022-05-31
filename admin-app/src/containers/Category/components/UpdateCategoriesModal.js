import React from 'react';
import { Col, Row } from "react-bootstrap";
import Input from "../../../components/UI/input";
import Modal from "../../../components/UI/Modal";

const UpdateCategoriesModal = (props) => {

    const {
        show,
        size,
        handleClose,
        modalTitle,
        buttons,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        categoryLists
    } = props;

    return (
        <Modal
            show={show}
            handleClose={handleClose}
            buttons={buttons}
            modalTitle={modalTitle}
            size={size}
        >
            <Row style={{display: 'flex'}}>
                <Col md={6}>
                    <h6 style={{ marginTop: "20px"}}>Expanded</h6>
                    {
                        expandedArray.length > 0 &&
                        expandedArray.map((item, index) =>
                            <Row key={index}>
                                <Col md={4}>
                                    <Input
                                        value={item.name}
                                        placeholder={`Category Name`}
                                        onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                                        autoFocus="autoFocus"
                                    />
                                </Col>
                                <Col md={4}>
                                    <select
                                        className="form-control"
                                        value={item.parentId}
                                        style={{
                                            color: "#ffffff",
                                            backgroundColor: "#2e3858",
                                            border: "1px solid #1f253b",
                                        }}
                                        onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}
                                    >
                                        <option value="" >select category</option>
                                        {
                                            categoryLists.map((option) => (
                                                <option
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </Col>
                                <Col md={4}>
                                    <select
                                        className="form-control"
                                        value={item.type}
                                        onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}
                                        style={{
                                            color: "#ffffff",
                                            backgroundColor: "#2e3858",
                                            border: "1px solid #1f253b",
                                        }}

                                    >
                                        <option value="">Select Type</option>
                                        <option value="store">Store</option>
                                        <option value="product">Product</option>
                                        <option value="page"> Page </option>
                                    </select>
                                </Col>
                                <Col>
                                    {/* <input
                                type="file"
                                name="categoryImage"
                                onChange={handleCategoryImage}
                            /> */}
                                </Col>
                            </Row>
                        )
                    }
                </Col>
                <Col md={6}>
                    <h6 style={{ marginTop: "20px"}}>Checked Categories</h6>

                    {
                        checkedArray.length > 0 &&
                        checkedArray.map((item, index) =>
                            <Row key={index}>
                                <Col md={4}>
                                    <Input
                                        value={item.name}
                                        placeholder={`Category Name`}
                                        onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                                        autoFocus="autoFocus"
                                    />
                                </Col>
                                <Col md={4}>
                                    <select
                                        className="form-control"
                                        value={item.parentId}
                                        style={{
                                            color: "#ffffff",
                                            backgroundColor: "#2e3858",
                                            border: "1px solid #1f253b",
                                        }}
                                        onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}
                                    >
                                        <option value="">select category</option>
                                        {categoryLists.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                </Col>
                                <Col md={4}>
                                    <select
                                        className="form-control"
                                        value={item.type}
                                        onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}
                                        style={{
                                            color: "#ffffff",
                                            backgroundColor: "#2e3858",
                                            border: "1px solid #1f253b",
                                        }}
                                    >
                                        <option value="">Select Type</option>
                                        <option value="store">Store</option>
                                        <option value="product">Product</option>
                                        <option value="page"> Page </option>
                                    </select>
                                </Col>
                                <Col>
                                    {/* <input
                                type="file"
                                name="categoryImage"
                                onChange={handleCategoryImage}
                            /> */}
                                </Col>
                            </Row>
                        )
                    }
                </Col>
            </Row>
            <Row>

            </Row>

        </Modal>
    );
};

export default UpdateCategoriesModal;