import React, {Component} from 'react'

export default class Die extends Component{
    constructor(...props){
        super(...props)
        this.state = {
            style : {
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
            <div 
                className="panel panel-default rounded"
                style={style}
                onClick={this.props.onClick}>
                    {this.props.die}
            </div>
        )
    }
}
