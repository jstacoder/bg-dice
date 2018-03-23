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
   const enhancer = applyMiddleware(logger)
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || (()=>{})
    //)
  
    const GameClient = Client({game, debug: false, board: Board, numPlayers: this.state.numPlayers, enhancer})
    return (
          <Container>
            <Row>
    {this.state.numPlayers===0 && (
        <PickPlayerNum setPlayers={this.setPlayers} /> 
      ) || (
        <GameClient reset={this.reset} />
    )}
    </Row>
    </Container>
    )}
}

export default App;
