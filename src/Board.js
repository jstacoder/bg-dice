import React, { Component } from 'react'

import Die from './Die'
import { getHighestScore } from './utils';
import { Container, Row, Column } from './boot-strap'


const Button = props => <button className="btn btn-default" {...props} />

export default class Board extends Component{
    constructor(...props){
        super(...props)
        this.state = {
            rolling: false
        }
    }
    disableRoll = () =>{
        let disable = false
        if(this.state.rolling){
            disable = true
        }
        else if(!this.props.G.heldThisPhase&&!this.props.G.initialRoll){
            disable = true
        }
        return disable
    }
    roll = () =>{
        console.log(this.props.G)
        if(this.props.ctx.phase === 'holding'){
            this.props.events.endPhase()
        }
        this.setState({rolling: true})
        const clearId = setInterval(()=>this.props.moves.roll(), 75)
        setTimeout(()=> {
            clearInterval(clearId)
            this.props.moves.roll()
            this.props.events.endPhase()
            this.setState({rolling: false})
        }, 1200)
    }
    hold = die =>{
        if((this.props.G.canHold||[]).indexOf(die)> -1){
            this.props.moves.hold(die)
        }
    }
    pass = () =>{
        if(this.props.G.heldThisPhase){
            const tmpScore = this.getTempScore()
            console.log('saving ', tmpScore)
            this.props.moves.saveScore(tmpScore)
        }
        this.props.moves.setEnding()
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
    undo = () =>{
        this.props.events.undo()
    }
    redo = () =>{
        this.props.events.redo()
    }
    canRoll = () =>{
        return !this.props.G.heldThisPhase || this.props.G.canHold.length > 0
    }
    rolledDoubles = () =>{
        const { props: { G: { dice }}} = this
        if(dice.length !== 2){
            return false
        }
        const [die1, die2] = dice
        return die1 === die2
    }
    reset = () =>{}
    render(){
        const disabled = this.disableRoll()
        return (
                    <Column xs={12} sm={12} md={6}>
        {this.props.ctx.gameover && (
            <div>
                <div>winner player: {(this.props.ctx.gameover*1)+1}</div>
                <button className="btn btn-default" onClick={this.reset}> play again</button>
            </div>
        ) || (
            <div style={{padding: 50}}>
                {this.props.G.finalRound && <div ><h2>final round</h2><p>{(this.props.G.finalRoundPlayer*1)+1} is winning</p></div>||<p>{(this.props.G.highestScore*1)+1}</p> }
                <p className="lead">
                    current player is {' '}
                        <span className="small">player#{' '}
                            <span className="player">
                                { (this.props.ctx.currentPlayer*1)+1 }
                            </span>
                        </span> 
                </p>
                <p>
                    running score:  { this.getScore(this.props.ctx.currentPlayer) }
                </p>
                <Row>
                    <Column xs={6}>
                        <Button onClick={this.undo}>undo</Button>
                    </Column>
                    <Column xs={6}>
                        <Button onClick={this.redo}>redo</Button>
                    </Column>
                </Row>
                {Object.keys(this.props.G.players||{}).map((o,i)=>{
                    return <p key={i}>Player# {i+1}: {this.props.G.players[i]}</p>
                })}
                <Row>
                {((((this.props.G.canHold||[]).length == 0) && this.props.G.dice[0]!==0) && !this.rolledDoubles()&& !this.state.rolling) && 
                (<Column xs={6} md={4}>
                <Button className="btn btn-default btn-lg" onClick={()=>this.pass()}>end turn</Button> </Column>)|| 
                    (<Column xs={6} md={2}><Button className="btn btn-default btn-lg" disabled={disabled} onClick={()=>this.roll()}>roll</Button>
                    </Column>)
                }
                {(this.getScore(this.props.ctx.currentPlayer)>=1000 && this.props.G.dice.length>0 && this.props.G.heldThisPhase && !this.state.rolling)&&
                <Column xs={6} md={6}>
                    <Button 
                        className="btn btn-default btn-lg"
                        disabled={this.props.G.canHold.length==0} 
                        onClick={()=>this.pass()}>
                        Keep Score
                    </Button></Column> || null}
                </Row>
                <div style={{flex: 1, flexDirection: 'row', maxWidth: 500, textAlign: 'center',justifyContent: 'flex-start',display: 'flex'}}>
                {this.props && this.props.G && this.props.G.dice &&
                    this.props.G.dice.map((die, idx)=>(
                        <Die key={`${idx}${die}`} die={die} ctx={this.props.ctx} G={this.props.G} onClick={()=>this.hold(die)} />
                    ))
                }
                </div>
            </div>)}
            </Column>
        )
    }
}
