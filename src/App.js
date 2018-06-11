import React, { Component } from 'react'
import { Client } from 'boardgame.io/react'
import { applyMiddleware, compose } from 'redux'
import logger  from 'redux-logger'

import game from './Game'
import Board from './Board'
import PickPlayerNum from './pick-player-num'
import { Row, Container } from './boot-strap'

class App extends Component {
  state = {
    numPlayers: 0
  }
  constructor(...props){
    super(...props)
  }
  reset = () =>{
    this.setState({numPlayers: 0})
  }
  setPlayers = players =>{
    console.log('calling setState players', players)
    this.setState({numPlayers:players})
  }
  render() {
    const GameClient = Client({game, board: Board, debug: false})
    return (
    this.state.numPlayers===0 && (
          <Container>
            <Row>
        <PickPlayerNum setPlayers={this.setPlayers} /> 
    </Row>
    </Container>
      ) || (
        <div>
        <GameClient reset={this.reset} />
        <button onClick={()=>this.reset()}>reset</button>
        </div>
    ))
  }
}

export default App;
