import React, {Component} from 'react'
import { Col } from 'reactstrap'

export default class Die extends Component{
    constructor(...props){
        super(...props)
        this.state = {
            style : {
                border: '1px solid black',
                minWidth: 30,
                //height: 45,
                fontSize: 30,
                textAlign: 'center',
                alignItems: 'center',
                padding: 2,
                cursor: 'pointer',
                flex: 1,
                alignSelf: 'center',
                
                marginTop: 15,
            }
        }
    }
    componentDidMount(){
        this.setStyles()
    }
    componentDidUpdate(){
        this.setStyles()
    }
    shouldComponentUpdate(){
        return !this.state.style.borderColor || !this.state.style.borderWidth

    }
    canHold = ()=>{
        console.log(`die: ${this.props.die} canHold: ${this.props.G.canHold}`)
        return this.props.G.canHold.reduce((prev, curr)=>{
            return this.props.die == curr || prev
        },false)
    }
    setStyles = () =>{
        if(this.canHold()  && !this.props.rolling){
            const style = {...this.state.style}
            this.setState({style: {...style, borderColor:'red', borderWidth: 2}})
        }
    }
    render(){
       const {  state: { style } } = this
        return (
             <Col xs={{ size: 2}} md={{ size: 2 }} sm={{size: 2}} lg={{size: 2}}>
            <div 
                className="panel panel-default rounded"
                style={style}
                onClick={this.props.onClick}>
                    {this.props.die}
            </div>
            </Col>
        )
    }
}
