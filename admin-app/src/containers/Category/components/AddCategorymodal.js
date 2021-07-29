import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Input from "../../../components/UI/input";
import Modal from "../../../components/UI/Modal";

const AddCategoryModal = (props) => {

    const {
        show,
        handleClose,
        modalTitle,
        buttons,
        categoryName,
        setCategoryName,
        parentCategoryId,
        setParentCategoryId,
        categoryType,
        setCategoryType,
        categoryLists,
        handleCategoryImage
    } = props;

    return (
        <Modal
            show={show}
            handleClose={handleClose}
            modalTitle={modalTitle}
            buttons={buttons}
        >
            <Row >
                <Col md={4}>
                    <Input
                        value={categoryName}
                        placeholder={`Category Name`}
                        onChange={(e) => setCategoryName(e.target.value)}
                        autoFocus="autoFocus"
                        className="form-control-sm"
                    />
                </Col>

                <Col md={4}>
                    <select
                        className="form-control form-control-sm"
                        value={parentCategoryId}
                        style={{
                            color: "#ffffff",
                            backgroundColor: "#2e3858",
                            border: "1px solid #1f253b",
                        }}
                        onChange={(e) => setParentCategoryId(e.target.value)}
                    >
                        <option>select category</option>
                        {categoryLists.map((option) => (
                            option.level !== 3 ?
                                <option
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.name}
                                </option>
                                : null
                        ))}
                    </select>
                </Col>

                <Col md={4}>
                    <select
                        className="form-control form-control-sm"
                        value={categoryType}
                        style={{
                            color: "#ffffff",
                            backgroundColor: "#2e3858",
                            border: "1px solid #1f253b",
                        }}
                        onChange={(e) => setCategoryType(e.target.value)}
                    >
                        <option value="">Select Type</option>
                        <option value="store">Store</option>
                        <option value="product">Product</option>
                        <option value="page"> Page </option>
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <input
                        type="file"
                        name="categoryImage"
                        onChange={handleCategoryImage}
                    />
                </Col>
            </Row>
        </Modal>
    );
}

export default AddCategoryModal;