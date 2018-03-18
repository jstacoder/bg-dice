import React, {Component} from 'react'

export default class Die extends Component{
    constructor(...props){
        super(...props)
        this.style = {
            border: '1px solid black',
            maxWidth: 45,
            height: 45,
            fontSize: 30,
            textAlign: 'center',
            alignItems: 'center',
            padding: 2,
            cursor: 'pointer',
            flex: 1,
            alignSelf: 'center',
            marginRight: 15,
            marginTop: 15,
            
        }
    }
    render(){
        return (
            <div 
                className="panel panel-default"
                style={this.style}
                onClick={this.props.onClick}>
                    {this.props.die}
            </div>
        )
    }
}
