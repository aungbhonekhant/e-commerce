import React from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import './style.css';

const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'rgba(255, 255, 255, .2)', border: 'none', color:'#fff' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {

        return {
            ...styles,
            backgroundColor: isDisabled
                ? null
                : isSelected
                    ? '#272f4a'
                    : isFocused
                        ? '#272f4a'
                        : 'null',
            color: isDisabled
                ? '#ccc'
                : '#fff',
            cursor: isDisabled ? 'not-allowed' : 'default',

            ':active': {
                ...styles[':active'],
                backgroundColor:
                    !isDisabled && (isSelected ? '#272f4a' : '#0000006c'),
            },
        };
    },
    singleValue: (provided, { data }) => ({
        ...provided,
        color: '#fff',
      }),
    placeholder: base => ({
        ...base,
        color: '#fff',
    }),
    menu: (styles, { data }) => {
        return {
            ...styles,
            backgroundColor: '#fff',
            color: '#fff',
        }
    },

    menuPortal: base => (
        { ...base, zIndex: 9999 }
    ),

    menuList: (styles, { data }) => {
        return {
            ...styles,
            backgroundColor: 'rgba(26, 25, 51, 0.589)',
            color: 'blue',
        }
    },
    multiValue: (styles, { data }) => {

        return {
            ...styles,
            background: 'linear-gradient(to right, #2ec7cb 0%, #6c8bef 100%)',
            fontSize: '75%',
            fontWeight: '700',
            lineHeight: '1',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            verticalAlign: 'baseline',
            borderRadius: '.25rem !important',
            padding: '0.17rem 0.125rem',
        };
    },
    multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: 'white',
    }),
    multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: 'black',
        padding: '0.001rem !important',
        borderRadius: '15px!important',
        color: 'black',
        border: '0.168em solid black',
        ':hover': {
            backgroundColor: 'transparent',
        },
    }),
    indicatorSeparator: base => ({
        ...base,
        backgroundColor: 'transparent !important',
    }),
};

function MultiSelect(props) {
    return (
        <Form.Group className="w-100">
            <Form.Label>
                {props.label}
            </Form.Label>
            <Select
                components={makeAnimated()}
                closeMenuOnSelect={props.closeMenuOnSelect}
                placeholder={props.placeholder}
                onChange={props.onChange}
                autoFocus
                // value={props.value}
                // defaultValue={}
                {...( props.isMulti && { isMulti: 'isMulti' } )}
                noOptionsMessage={props.noOptionsMessage}
                options={props.options}
                styles={colourStyles}
                isSearchable
                menuPortalTarget={document.body} 
            />
        </Form.Group>



    )
}

export default MultiSelect