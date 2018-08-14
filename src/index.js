/**
 * allows you to place a program, or a function, 
 * in a "strict" operating context. This strict 
 * context prevents certain actions from being taken 
 * and throws more exceptions.
 */

"use strict";

import React from 'react'; 
import ReactDOM from 'react-dom';

import WeatherPageContainer from './components/containers/weatherApp/weatherPageContainer';

import './main.scss';


ReactDOM.render(React.createElement(WeatherPageContainer), document.getElementById('root'));
