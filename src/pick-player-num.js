import React, { Component } from 'react'
import { Col, ListGroup, ListGroupItem, Card, CardBody, CardHeader, CardText } from 'reactstrap'

export default class PickPlayerNum extends Component{
  nums = [1,2,3,4,5]
  onClick = num =>{
    console.log('clicked ', num)
    this.props.setPlayers(num)
  }
  render(){
    return (
      <Col xs="12" md={{size: 10, offset: 1}} lg={{size: 8, offset: 2}}>
        <Card>
          <CardHeader>pick players</CardHeader>
          <CardBody>
            <ListGroup>
            {this.nums.map(num=>{
             return (
               <ListGroupItem tag="button" key={num} onClick={()=>this.onClick(num)} action><CardText>{num}</CardText></ListGroupItem>
             )
            })}
            </ListGroup>
          </CardBody>
        </Card>
      </Col>
    )
  }
}