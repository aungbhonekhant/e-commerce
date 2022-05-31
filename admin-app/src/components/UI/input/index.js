import React from "react";
import { Form } from "react-bootstrap";
import './style.css';

function Input(props) {

  let input = null;
  switch (props.type) {
    case 'select':
      input =  <Form.Group className="w-100">
                {props.label && <Form.Label>{props.label}</Form.Label>}
                <select
                  className="form-control select"
                  value={props.value}
                  onChange={props.onChange}
                  style={props.style}
                  size="1"
                >
                  {
                    props.placeholder && 
                    <option className="option" value="">{ props.placeholder }</option>
                  }
                  
                  {
                   props.options.length > 0 ? 
                   props.options.map((option, index) => 
                      <option className="option" key={index} value={option.value}> {option.name} </option>  
                    ) : null
                  }
                </select>
              </Form.Group>
      break;
    case 'text': 
    default:
      input = <Form.Group>
                {props.label && <Form.Label>{props.label}</Form.Label>}
                <Form.Control
                  type={props.type}
                  placeholder={props.placeholder}
                  value={props.value}
                  onChange={props.onChange}
                  style={{ color: '#fff', backgroundColor: "#2e3858", border: "1px solid #1f253b" }}
                  autoFocus={props.autoFocus}
                  {...props}
                />
                <Form.Text className="text-muted">{props.errorMessage}</Form.Text>
              </Form.Group>
  }

  return input;
}

export default Input;
