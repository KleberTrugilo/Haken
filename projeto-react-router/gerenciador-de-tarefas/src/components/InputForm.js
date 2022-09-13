import React, { Component } from "react";

import { FormGroup, Label, Col, Input, FormFeedback } from 'reactstrap';

export default class InputForm extends Component {
    render() {
        const { 
            label, type, id, name, value, placeholder,
            required, onChange, errorMessage, validator 
        } = this.props;
        return (
            <FormGroup row>
                <Label for={id} sm={2}>
                    {label}
                </Label>
                <Col sm={10}>
                    <Input 
                        type={type} id={id} name={name} 
                        value={value} placeholder={placeholder} required={required}
                        />
                    <FormFeedback>{errorMessage}</FormFeedback>
                </Col>
            </FormGroup>
        );
    }
}