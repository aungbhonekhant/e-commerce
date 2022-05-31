import React from 'react';
import { Modal, Button, Spinner } from "react-bootstrap";
import { BiXCircle } from 'react-icons/bi';

function ConfirmDeleteModal(props) {
    return (
        <Modal size={props.size} show={props.show} centered>

            <Modal.Body className="modalBody">

                <div className="text-center text-danger m-0 p-0" >
                    {
                        props.loading ?
                            <div className="my-4">
                                <Spinner animation="border" variant="info" />
                            </div>
                            :
                            <div style={{ fontSize: '7rem' }}>
                                <BiXCircle />
                            </div>
                    }

                </div>
                <div className="text-center">
                    <h3 >Are You Sure?</h3>
                    <p>You will not be able to recover this!</p>

                    <Button variant="secondary mr-2 mt-2" onClick={props.cancelDelete}> Cancel </Button>
                    <Button variant="ngt mt-2" onClick={props.confirmDelete}> Delete! </Button>
                </div>

            </Modal.Body>
            {/* <Modal.Footer>
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

            </Modal.Footer> */}
        </Modal>
    )
}

export default ConfirmDeleteModal;
