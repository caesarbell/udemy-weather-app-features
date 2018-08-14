import React, { Component } from 'react';
import { Form, FormGroup, Label, InputGroupAddon, InputGroup, Input, Button } from 'reactstrap'; 

export default class weatherInputPresentational extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            address: ''
        };

        this.userInput = this.userInput.bind(this); 
        this.userAddress = this.userAddress.bind(this);


    }

    userAddress(e) {

        this.setState({ address: e.currentTarget.value}); 
    }

    userInput(e) {
        
        e.preventDefault();

        const address = this.state.address;

        this.props.userInput(address); 
    }

    render(){

        console.log('state', this.state); 

        return (
            <div className="input-component">
                <Form>
                    <InputGroup>
                        <Input className="weather-input p-3 mb-5" placeholder="Enter your address here" onChange={this.userAddress} />
                        <InputGroupAddon addonType="append">
                            <Button className="submit" onClick={this.userInput}> <i className="fa fa-search"></i> </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Form>
            </div>
        );
    }
}