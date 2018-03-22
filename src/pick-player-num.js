import React, { Component } from 'react'

export default class PickPlayerNum extends Component{
  nums = [1,2,3,4,5]
  onClick = num =>{
    console.log('clicked ', num)
    this.props.setPlayers(num)
  }
  render(){
    return (
      <div>
        <p>pick players</p>
        <hr />
        {this.nums.map(num=>{
          return (
            <p style={{height: 20, width: 20, border: '1px solid black'}} key={num} onClick={()=>this.onClick(num)}>{num}</p>
          )
        })}
      </div>
    )
  }
}