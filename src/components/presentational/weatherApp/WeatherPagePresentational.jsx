import React, { Component } from 'react'; 
import WeahterInputPresentational from './weatherInputPresentational';
import WeatherResultsContainer from './../../containers/weatherApp/weatherResultsContainer';


export default class weatherPagePresentational extends Component { 
    constructor(props) {
        super(props); 

        
    }



    render() {

        return(
            <div className="main">
                <div className="header mb-4">

                </div>
                <div className="container h-100">
                    <div className="row">
                        <div className="col-10 mx-auto">
                            <h1 className="text-center">What is your weather forcast?</h1>
                            <WeahterInputPresentational userInput={this.props.values} />
                            <div>
                                <WeatherResultsContainer address={this.props.address} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}