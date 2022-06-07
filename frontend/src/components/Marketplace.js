import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

class Marketplace extends Component {
    constructor(props){
        super(props);
        this.state = {
            amountRena: undefined,
            amountJewel: undefined
        }
        this.handleChangeAmountRena = this.handleChangeAmountRena.bind(this);
        this.handleChangeAmountJewel = this.handleChangeAmountJewel.bind(this);
    }

    componentDidMount() {
    }

    addChichiLiquidity() {
        console.log('vao day')
        //this.props.addLiquidity(String(this.state.amountRena),String(this.state.amountJewel));
    }

    handleChangeAmountRena(e){
        this.setState({amountRena: e.target.value})
    }

    handleChangeAmountJewel(e){
        this.setState({amountJewel: e.target.value})
    }

    render() {
        return (
            <div className="container">
                <div>
                    <h2>Trader</h2>
                    <fieldset style={{width: "100%", textAlign: "center"}}>
                        <legend>Trade</legend>
                        <Form style={{width: "50%", marginLeft: "25%", background: 'black',}}>
                            <Form.Group style={{background: '#a3a2a2', padding: '15px', display: 'table', width: '100%'}}>
                                    <Form.Control placeholder="From" style={{width:'70%', float: 'left', marginRight: '20px'}} />
                                    <Dropdown style={{width:'20%', float: 'left'}}>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            Choice Token
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">RENA</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">JEWEL</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">BNB</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                            </Form.Group>
                            <Form.Group style={{background: '#a3a2a2', padding: '15px', display: 'table', width: '100%'}}>
                                    <Form.Control placeholder="To" style={{width:'70%', float: 'left', marginRight: '20px'}}/>
                                    <Dropdown style={{width:'20%', float: 'left'}}>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            Choice Token
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Rena</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Jewel</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">BNB</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                            </Form.Group>
                            <Button variant="primary" type="submit" variant="success" style={{width: '90%', marginTop: '20px', marginBottom: '20px'}}>
                                Swap
                            </Button>
                        </Form>
                    </fieldset>
                </div>
                <br/>
                <br/>
                <div>
                    <h2>Druid</h2>
                    <fieldset style={{width: "100%", textAlign: "center"}}>
                        <legend>Create Pool</legend>
                        <Form style={{width: "50%", marginLeft: "25%", background: 'black',}}>
                            <Form.Group style={{background: '#a3a2a2', padding: '15px', display: 'table', width: '100%'}}>
                                    <Form.Control placeholder="From" style={{width:'70%', float: 'left', marginRight: '20px'}} onChange={this.handleChangeAmountRena}/>
                                    <Dropdown style={{width:'20%', float: 'left'}}>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            Choice Token
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">RENA</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">JEWEL</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">BNB</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                            </Form.Group>
                            <Form.Group style={{background: '#a3a2a2', padding: '15px', display: 'table', width: '100%'}}>
                                    <Form.Control placeholder="To" style={{width:'70%', float: 'left', marginRight: '20px'}} onChange={this.handleChangeAmountJewel}/>
                                    <Dropdown style={{width:'20%', float: 'left'}}>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            Choice Token
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Rena</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Jewel</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">BNB</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                            </Form.Group>
                            <Button variant="primary" type="submit" variant="success" style={{width: '90%', marginTop: '20px', marginBottom: '20px'}} onClick={()=>this.addChichiLiquidity()}>
                                Add Liquidity
                            </Button>
                        </Form>
                    </fieldset>
                    <br/>
                    <fieldset style={{width: "100%", textAlign: "center"}}> 
                        <legend>Buy Seed</legend>
                        <Form style={{width: "50%", marginLeft: "25%"}}>
                            <Form.Group className="mb-3">
                                <Form.Control placeholder="From" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control placeholder="To" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Add Seed
                            </Button>
                        </Form>
                    </fieldset>
                </div>
                <br/>
                <br/>
                <div>
                    <h2>Vendor</h2>
                    <fieldset style={{width: "100%", textAlign: "center"}}>
                        <legend>Buy Item</legend>
                        
                    </fieldset>
                    <br/>
                    <fieldset style={{width: "100%", textAlign: "center"}}> 
                        <legend>Sell Item</legend>
                    </fieldset>
                </div>

            </div>
        )
    }
}

export default Marketplace;