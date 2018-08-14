import React, { Component } from 'react'; 
import WeatherPagePresentational from '../../presentational/weatherApp/WeatherPagePresentational';

export default class WeatherPageContainer extends Component {
    constructor(props) {
        super(props); 

        this.state = {
            address: '42 arnold rd poughkeepsie'
        }

        this.userInput = this.userInput.bind(this);
    }

    userInput(address, forcast) {

        console.log('address from user input', address); 

        this.setState({ address : address, forcast : forcast});

    }

    render() {

        return React.createElement(WeatherPagePresentational, { 
            address: this.state.address,
            values: this.userInput
        });
    }
}
