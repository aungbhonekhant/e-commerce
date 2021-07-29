import React from 'react';
import { Modal, Button } from "react-bootstrap";

function NewModal(props) {
    return (
        <Modal size={props.size} show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton style={{ backgroundColor: "RGB(0,0,0,0)" }}>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "RGB(0,0,0,0)" }}>
                {props.children}
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: "RGB(0,0,0,0)" }}>
                {
                    props.buttons ? props.buttons.map((btn, index) =>
                        <Button
                            key={index}
                            variant={btn.color}
                            onClick={btn.onClick}
                            {...props}
                            className="btn-sm"
                        >
                            {btn.label}
                        </Button>
                    ) :
                        <Button variant="outline-info"
                            {...props}
                            className="btn-sm"
                            onClick={props.handleClose}
                        >
                            Save
                    </Button>
                }

            </Modal.Footer>
        </Modal>
    )
}

export default NewModal;
