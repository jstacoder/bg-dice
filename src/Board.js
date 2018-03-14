import React, { Component } from 'react'

import Die from './Die'

export default class Board extends Component{
    roll = () =>{
        if(this.props.ctx.phase === 'holding'){
            this.props.events.endPhase()
        }
        this.props.moves.roll()
        this.props.events.endPhase()
    }
    hold = die =>{
        this.props.moves.hold(die)
    }
    pass = () =>{
        this.props.events.endTurn()
    }
    getScore = player =>{
        return this.props.G.scores[player].score
    }
    render(){
        return (
            <div>
                <p>current player is player#{this.props.ctx.currentPlayer} score: {this.getScore(this.props.ctx.currentPlayer)}</p>
                {this.props.G.scores.map((o,i)=>{
                    return <p key={i}>{o.score} {o.temp}</p>
                })}
                <button onClick={()=>this.roll()}>roll</button>
                <button onClick={()=>this.pass()}>Pass</button>
                {this.props && this.props.G && this.props.G.dice &&
                    this.props.G.dice.map((die, idx)=>(
                        <Die key={`${idx}${die}`} die={die} onClick={()=>this.hold(die)} />
                    ))
                }
            </div>
        )
    }
}
