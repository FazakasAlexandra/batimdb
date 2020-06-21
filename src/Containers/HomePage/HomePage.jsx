import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import DinamicComp from '../HomePage/DinamicComp/DinamicComp';
import './HomePage.css';
import CategoriesLists from '../HomePage/CategoriesLists/CategoriesLists'

class HomePage extends Component {
    render() {
        return (
            <div className="Hompage">
                <DinamicComp/>  
                <CategoriesLists />
            </div>
        );
    }
}

export default withRouter(HomePage);