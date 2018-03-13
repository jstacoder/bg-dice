import React, { Component } from 'react'
import { Game, Random } from 'boardgame.io/core'

const resetTurnStats = ({rolls=0, holds=0}={}) =>({
    rolls,
    holds,
})

const resetG = (G, numPlayers) =>({
    ...G,
    turnStats: resetTurnStats({rolls: G.rolls, holds: G.holds}),
    holding: [],
    pass: G.pass || false,
    dice: Array(6).fill(0),
    heldThisPhase: false,
    scores: numPlayers ? Array(numPlayers).fill({
        score: 0,
        temp: 0,
        held: [],
    }) : [...G.scores]
})

const game = Game({
  setup: numPlayers=> resetG({}, numPlayers),
  flow: {
    onTurnEnd: (G, ctx)=>({
      ...G,
      dice: Array(6).fill(0),
      holding: [],
      turnStats: {
        ...resetTurnStats()
      }
    }),
    phases:[
      {
        name: "rolling",
        allowedMoves:["roll"]
      },
      {
       name: "holding",
       onPhaseEnd: (G, ctx)=>({...G, heldThisPhase: false}),
       allowedMoves: ["hold", "roll"]
      }
    ]
  },
  moves: {
    roll: (G, ctx)=>({
      ...G,
      turnStats: resetTurnStats({holds: G.turnStats.holds, rolls: G.turnStats.rolls+1}),
      dice: Random.D6(G.dice.length || 6)
    }),
    hold: (G, ctx, ...dies)=>{
      const heldThisRoll = G.turnStats.holds === G.turnStats.rolls
      const holding = G.holding.concat(dies)
      let dice = [...G.dice]
      dies.forEach(die=>{
        if(dice.indexOf(die)>-1){
          dice.splice(dice.indexOf(die),1)
        }
      })
      return {
        ...G,
        dice: [...dice],
        holding: [...holding],
        heldThisPhase: true,
        turnStats: resetTurnStats({holds: G.turnStats.holds+(!(heldThisRoll&&1)|| 0), rolls: G.turnStats.rolls}),
      }
    },
  }
})


export default game
