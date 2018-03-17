import React, { Component } from 'react'

import Die from './Die'

export default class Board extends Component{
    roll = () =>{
        console.log(this.props.G)
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
        if(this.props.G.heldThisPhase){
            const tmpScore = this.getTempScore()
            console.log('saving ', tmpScore)
            this.props.moves.saveScore(tmpScore)
        }
        this.props.events.endTurn()
    }
    getHeldScore = () =>{
        return this.props.G.turnScores.heldScore.score
    }
    getTempScore = () =>{
        return this.props.G.turnScores.scores.reduce((prev, curr)=> prev + curr.score, this.getHeldScore())
    }
    getScore = player =>{
        return this.props.G.players && this.props.G.players[player]+this.getTempScore()||0
    }
    render(){
        return (
            <div style={{padding: 50}}>
                <p>
                    current player is 
                        <span>player#
                            <span className="player">
                                { this.props.ctx.currentPlayer }
                            </span>
                        </span> 
                </p>
                <p>
                    score:  { this.getScore(this.props.ctx.currentPlayer) }
                    G: {JSON.stringify(this.props.G)}
                </p>
                {Object.keys(this.props.G.players||{}).map((o,i)=>{
                    return <p key={i}>Player: {i} {o.score} {o.temp}</p>
                })}
                <button onClick={()=>this.roll()}>roll</button>
                <button onClick={()=>this.pass()}>{this.props.G.heldThisPhase ? 'Keep Score' : 'Pass'}</button>
                <div style={{flex: 1, flexDirection: 'row', maxWidth: 500, textAlign: 'center',justifyContent: 'space-between',display: 'flex'}}>
                {this.props && this.props.G && this.props.G.dice &&
                    this.props.G.dice.map((die, idx)=>(
                        <Die key={`${idx}${die}`} die={die} onClick={()=>this.hold(die)} />
                    ))
                }
                </div>
            </div>
        )
    }
}
