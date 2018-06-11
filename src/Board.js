import React, { Component } from 'react'

import Die from './Die'

const Button = props => <button className="btn btn-default" {...props} />

export default class Board extends Component{
    constructor(...props){
        super(...props)
        this.state = {
            rolling: false
        }
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
        if(this.props.G.canHold.indexOf(die)>-1){
            this.props.moves.hold(die)
        }
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
    render(){
        return (
            <div>
            <div className="Board" style={{padding: 50}}>
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
                {Object.keys(this.props.G.players||{}).map((o,i)=>{
                    return <p key={i}>Player# {i+1}: {this.props.G.players[i]}</p>
                })}
                {(this.getScore(this.props.ctx.currentPlayer)>=1000 && (this.props.G.dice||[]).length>0 && this.props.G.heldThisPhase && !this.state.rolling)&&
                    <Button 
                        className="keep-score"
                        disabled={this.props.G.canHold.length==0} 
                        onClick={()=>this.pass()}>
                        Keep Score
                    </Button> || null}
                {((((this.props.G.canHold||[]).length == 0) && this.props.G.dice[0]!==0) && !this.rolledDoubles()&& !this.state.rolling) && 
                    <Button className="end-turn" onClick={()=>this.pass()}>end turn</Button> || 
                    <Button className="roll" disabled={this.state.rolling} onClick={()=>this.roll()}>roll</Button>
                }
                <div className="dice" style={{flex: 1, flexDirection: 'row', maxWidth: 500, textAlign: 'center',justifyContent: 'flex-start',display: 'flex'}}>
                {this.props && this.props.G && this.props.G.dice &&
                    this.props.G.dice.map((die, idx)=>(
                        <Die className={`die-${die}`}  key={`${idx}${die}`} die={die} ctx={this.props.ctx} G={this.props.G} onClick={()=>this.hold(die)} />
                    ))
                }
                </div>
</div>
            </div>
        )
    }
}
