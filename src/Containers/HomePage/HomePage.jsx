import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import DinamicComp from '../HomePage/DinamicComp/DinamicComp';
import './HomePage.css';

class HomePage extends Component {
    render() {
        return (
            <div className="Hompage">
                <DinamicComp/>  //componenta Marius 
            /* CategoriesList component */   //componenta Daniel 
            </div>
        );
    }
}

export default withRouter(HomePage);