import React from 'react';
import { Modal, Button } from "react-bootstrap";
import './style.css';

function NewModal(props) {
    return (
        <Modal size={props.size} show={props.show} onHide={props.handleclose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.modaltitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modalBody">
                {props.children}
            </Modal.Body>
            <Modal.Footer>
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
                        <Button variant="posv"
                            {...props}
                            className="btn-sm"
                            onClick={props.handleclose}
                        >
                            Save
                        </Button>
                }

            </Modal.Footer>
        </Modal>
    )
}

export default NewModal;
