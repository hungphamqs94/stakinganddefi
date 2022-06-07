import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Gradens extends Component {

    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div className="container">
                <div>
                    <h2>Harvest</h2>
                </div>
                <br/>
                <br/>
                <div>
                    <h2>Seed Box</h2>
                </div>
            </div>
        )
    }
}

export default Gradens;