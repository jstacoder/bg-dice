import React, { Component } from 'react'
import { Game, Random } from 'boardgame.io/core'

import { scoreRoll, pickDiceToHold } from './scoring/score-roll'
import { 
  resetTurnStats, keepScoreUpdate, 
  holdDieUpdate, resetTurnScore,
  saveScore,loadPlayers, resetG,
} from './utils'


const game = Game({
  setup: numPlayers=> resetG({}, numPlayers),
  flow: {
    onTurnEnd: (G, ctx)=>{
      return {
        ...G,
        turnScores: {...resetTurnScore()},
        dice: Array(6).fill(0),
        holding: [],
        turnStats: {
          ...resetTurnStats()
        }
      }
    },
    phases:[
      {
        name: "rolling",
        allowedMoves:["roll", "saveScore"],
        onMove: (G, ctx, {payload: { type }})=>{
          console.log(type)
          if(type=='roll'&&G.turnStats.rolls>1){
            return {
              ...G, 
              turnScores: {
                ...G.turnScores, 
                scores: [
                  ...G.turnScores.scores, 
                  {...G.turnScores.heldScore}
                ], 
                rollScore: {
                  held: [], 
                  score: 0
                }, 
                heldScore:{
                  held: [], 
                  score: 0
                }
              }, 
              diceHeldThisRoll: [], 
              holding: [],
              canHold: pickDiceToHold(G.dice),
            }
          }
          return {...G, canHold: pickDiceToHold(G.dice)}
        },
       // onTurnEnd:(G, ctx)=>({...G, diceHeldThisRoll: []})
      },
      {
       name: "holding",
       onPhaseEnd: (G, ctx)=>({...G, heldThisPhase: false}),
       allowedMoves: ["hold", "roll", "saveScore"]
      }
    ]
  },
  moves: {
    saveScore,
    roll: (G, ctx)=>({
      ...G,
      turnStats: resetTurnStats({holds: G.turnStats.holds, rolls: G.turnStats.rolls+1}),
      dice: ctx.random.D6(G.dice.length || 6),
    }),
    hold: (G, ctx, ...dies)=>{
      const heldThisRoll = G.turnStats.holds === G.turnStats.rolls
      const holding = G.holding.concat(dies)
      const diceHeldThisRoll = heldThisRoll && holding || dies
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
        diceHeldThisRoll,
        turnScores: holdDieUpdate(G, ctx, dies[0]),
        turnStats: resetTurnStats({holds: G.turnStats.holds+(!(heldThisRoll&&1)|| 0), rolls: G.turnStats.rolls}),
      }
    
    },
  }
})

export default game