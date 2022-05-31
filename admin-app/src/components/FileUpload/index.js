import React from 'react';
import { Form, Row, Col } from "react-bootstrap";
import { FaFileUpload } from "react-icons/fa"
import "./style.css";

export const FileUpload = (props) => {

    const { id, label, images, onchange, removeuploadedimg, error } = props;

    return (
        <Form.Group>
            <Form.Label htmlFor={id}>{label}</Form.Label>
            {/* {
                error !=="" || error !== null && <div className="error-text">{error}</div>
            } */}
            <div className="error-text">{error}</div>
            
            <div className="d-flex">
                <div className="mr-2">
                    <Form.Control className="uploader-input" onChange={onchange} id={id} type="file" multiple />
                    <div className="uploader-mas">
                        <FaFileUpload />
                    </div>
                </div>

                <Row className="ml-1 align-items-center">
                    {

                        images.length > 0  &&
                        images.map((image, index) => (
                            <Col key={index} sm={2} className="pl-1 pr-1 uploaded-image-contaner">
                                {images && <img src={URL.createObjectURL(image)} alt="uploaded image" className="img-fluid img-thumbnail uploaded-image" />}
                                <div className="uploaded-image-remove" onClick={() => removeuploadedimg(index)}>x</div>
                            </Col>
                        ))
                    }
                </Row>

            </div>


        </Form.Group>
    )
}

export const SingleFileUpload = (props) => {

    const { id, label, image, onchange,error } = props;
    return (
        <Form.Group>
            <Form.Label htmlFor={id}>{label}</Form.Label>
            {/* {
                error !=="" || error !== null && <div className="error-text">{error}</div>
            } */}
            <div className="error-text">{error}</div>
            
            <div className="d-flex">
                <div className="mr-2">
                    <Form.Control className="uploader-input" onChange={onchange} id={id} type="file" multiple />
                    <div className="uploader-mas">
                        <FaFileUpload />
                    </div>
                </div>

                <Row className="ml-1 align-items-center">
                    {
                        <Col sm={2} className="pl-1 pr-1 uploaded-image-contaner">
                            {image && <img src={typeof(image) === "object" ? URL.createObjectURL(image) : image} alt="uploaded image" className="img-fluid img-thumbnail uploaded-image" />}
                        </Col>
                    }
                </Row>

            </div>


        </Form.Group>
    )
}
