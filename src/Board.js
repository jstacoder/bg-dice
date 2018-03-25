import React, { Component } from 'react'
import { 
    ListGroup, ListGroupItem, Container, 
    Row, Col as Column, Badge, Button, 
} from 'reactstrap'

import Die from './Die'
import { getHighestScore } from './utils';
// import { Container, Row, Column } from './boot-strap'


// const Button = props => <button className="btn btn-default" {...props} />

export default class Board extends Component{
    constructor(...props){
        super(...props)
        this.state = {
            rolling: false
        }
    }
    disableRoll = () =>{
        const { G, ctx, ...rest} = this.props
        console.log(G)
        console.log(ctx)
        console.log(rest)

        let disable = false
        if(this.state.rolling){
            disable = true
        }
        else if(!this.props.G.heldThisPhase&&!this.props.G.initialRoll){
            disable = true
        }
        if(disable && !this.state.rolling){
            return !this.rolledDoubles()
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
    reset = () =>{
        this.props.reset()
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


        const keepScoreStyle = {
            marginBottom: 10,
            marginTop: 10,
            visibility: (this.getScore(this.props.ctx.currentPlayer)>=1000 && this.props.G.dice.length>0 && this.props.G.heldThisPhase) ? 'visible' : 'hidden'
        }
        return (

          <Container>
            <Row>
                    <Column xs={"12"} sm={"12"} md={{size: 10, offset: 1}} lg={{size: 8, offset: 2}}>
        {this.props.ctx.gameover && (
            <div>
                <div>winner player: {(this.props.ctx.gameover*1)+1}</div>
                <Button color="danger" onClick={()=>this.props.reset()}> play again</Button>
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
                    <Column xs={"6"}>
                        <Button outline onClick={this.undo}>undo</Button>
                    </Column>
                    <Column xs={"6"}>
                        <Button outline onClick={this.redo}>redo</Button>
                    </Column>
                </Row>
                <ListGroup>
                {Object.keys(this.props.G.players||{}).map((o,i)=>{
                    const active = i == this.props.ctx.currentPlayer
                    return <ListGroupItem active={active}  key={i}><p>Player# {i+1}: <Badge pill className="float-right">{this.props.G.players[i]}</Badge></p></ListGroupItem>
                })}
                </ListGroup>
                <Row>
                {((((this.props.G.canHold||[]).length == 0) && this.props.G.dice[0]!==0) && !this.rolledDoubles()&& !this.state.rolling) && 
                (<Column xs={"12"} md={"12"}>
                <Button block outline color="danger" style={{marginTop: 15, marginBottom: 5}} onClick={()=>this.pass()}>end turn</Button> </Column>)|| 
                    (<Column xs={"12"} md={"12"}><Button style={{marginTop: 15, marginBottom: 5}} block disabled={disabled} onClick={()=>this.roll()}>roll</Button>
                    </Column>)
                }
                <Column xs={"12"} md={"12"}>
                    <Button 
                        style={keepScoreStyle}
                        block
                        color="primary"
                        outline
                        disabled={this.props.G.canHold.length==0||this.state.rolling} 
                        onClick={()=>this.pass()}>
                        Keep Score
                    </Button></Column> 
                </Row>
                <Row>
                    <Column xs="12">
                <div style={{flex: 1, flexDirection: 'row', textAlign: 'center',justifyContent: 'flex-start',display: 'flex'}}>
                {this.props && this.props.G && this.props.G.dice &&
                    this.props.G.dice.map((die, idx)=>(
                        <Die key={`${idx}${die}`} die={die} rolling={this.state.rolling} ctx={this.props.ctx} G={this.props.G} onClick={()=>this.hold(die)} />
                    ))
                }
                </div>
                </Column>
                </Row>
            </div>)}
            </Column>
            </Row>
            </Container>
        )
    }
}
