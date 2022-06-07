import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Home extends Component {

    // constructor(props){
    //     super(props);
    //     this.state = {

    //     }
    // }

    componentDidMount() {

    }

    render() {
        return (
            <div className="container">
                {/* <div>
                    <h2>Approve Rena</h2>
                    <Form style={{width: "50%", marginLeft: "25%", background: 'black',}}>
                        <Form.Group style={{background: '#a3a2a2', padding: '15px', display: 'table', width: '100%'}}>
                            <Form.Control placeholder="Number Rena" style={{width:'100%'}} onChange={this.handleChangeRena}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" variant="success" style={{width: '90%', marginTop: '20px', marginBottom: '20px'}} onClick={()=>this.approveRena()}>
                            Approve RENA
                        </Button>
                    </Form>
                        
                    </div>
                    <div>
                        <h2>Approve Jewel</h2>
                        <Form style={{width: "50%", marginLeft: "25%", background: 'black',}}>
                          <Form.Group style={{background: '#a3a2a2', padding: '15px', display: 'table', width: '100%'}}>
                            <Form.Control placeholder="Number Rena" style={{width:'100%'}} onChange={this.handleChangeJewel}/>
                          </Form.Group>
                        </Form>
                        <Button variant="primary" type="submit" variant="success" style={{width: '90%', marginTop: '20px', marginBottom: '20px'}} onClick={()=>this.approveJewel()}>
                          Approve JEWEL
                        </Button>
                    </div> */}
                <h2>WellCome To Meta Farm Game</h2>
            </div>
        )
    }
}

export default Home;