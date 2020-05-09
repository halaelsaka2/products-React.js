import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";



import App from './app'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

import './css/style.css'


ReactDom.render(<BrowserRouter> <App /></BrowserRouter>,document.getElementById('root'));

// ReactDom.render(<Provider store={store}><App /></Provider>,document.getElementById('root'));


            