import React, { Component } from 'react'; 
import axios from 'axios';

import WeatherResultsPresentational from '../../presentational/weatherApp/weatherResultsPresentational';


export default class weatherResultsContainer extends Component {
    constructor(props) {
        super(props); 

        this.state = {
            results: null
        }
    }

   componentDidMount() {

        if(this.props.address) {
            
            this.getData(this.props.address); 
            
        }
    }

    componentDidUpdate(prevProps) {

        if(this.props.address !== prevProps.address) {

            console.log('value has changed for weather')

            this.getData(this.props.address);
        }
    }



    getData(address) {

        const url = '/.netlify/functions/get-weather-results';

        axios({
            method: 'post',
            url: url,
            header: {
                'content-type': 'application/json'
            },
            data: JSON.stringify({
                address: address,
                forcast: 'daily'
            })
        })
            .then((res) => {
                const results = res.data;
                console.log('results', results);
                this.setState({ results })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return React.createElement(WeatherResultsPresentational, { results: this.state.results, address: this.props.address }); 
               
    }


}