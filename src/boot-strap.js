import React, { Component } from 'react'
import classNames from 'classnames'

export const Container = props => <div className="container" {...props} />
export const Row = props => <div className="row" {...props} />

export class Column extends Component{
  className = () =>{
    let names = {}
    const sizes = ['xs','sm','md','lg']
    sizes.forEach(size=>{
      if(size in this.props){
        names = {...names, [`col-${size}-${this.props[size]}`]: true}
      }
    })
    return classNames(names)
  }
  render(){
    const {xs, sm, md, lg, ...rest} = this.props
    return <div className={this.className()} {...rest}>{this.props.children}</div>
  }
}