import React, {Component} from 'react'

export default class Die extends Component{
    constructor(...props){
        super(...props)
        this.style = {
            border: '1px solid black',
            width: 15,
        }
    }
    render(){
        return (
            <p
                style={this.style}
                onClick={this.props.onClick}>
                    {this.props.die}
            </p>
        )
    }
}
