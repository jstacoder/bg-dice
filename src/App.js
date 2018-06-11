import React, { Component } from 'react'
import { Client } from 'boardgame.io/react'

import game from './Game'
import Board from './Board'

class App extends Component {
  constructor(...props){
    super(...props)
  }
  render() {
    const GameClient = Client({game, board: Board, debug: false})
    return (
      <GameClient />
    )
  }
}

export default App;
