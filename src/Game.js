import React, { Component } from 'react'
import { Game, Random } from 'boardgame.io/core'

import { scoreRoll, pickDiceToHold } from './scoring/score-roll'
import { 
  resetTurnStats, keepScoreUpdate, 
  holdDieUpdate, resetTurnScore,
  saveScore,loadPlayers, resetG,
  endGameIf, getHighestScore,
} from './utils'


const game = Game({
  setup: numPlayers=> resetG({}, numPlayers),
  flow: {
    // undo: true,
    undoableMoves:['hold'],
    endGameIf,
    onTurnBegin:(G, ctx)=>({...G, ending: false}),
    onTurnEnd: (G, ctx)=>{
      let initialFinalRound = false, finalRoundScore = G.finalRoundScore, finalRoundPlayer = G.finalRoundPlayer
      const finalRound = G.finalRound||G.players[ctx.currentPlayer]>=3000
      if(finalRound&&!G.finalRound){
        initialFinalRound = true
        finalRoundScore = G.players[ctx.currentPlayer]
        finalRoundPlayer = ctx.currentPlayer
      }
      return {
        ...G,
        highestScore: getHighestScore(G, ctx),
        finalRound,
        finalRoundScore,
        finalRoundPlayer,
        initialFinalRound,
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
        allowedMoves:["roll", "saveScore", "setEnding"],
        onPhaseEnd:(G, ctx)=>({...G, canHold: pickDiceToHold(G.dice)}),
        onMove: (G, ctx, {payload: { type }})=>{
          console.log(type)
          if(type=='roll'&&G.turnStats.rolls>1&&G.turnScores.heldScore.score>0){
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
              highestScore: getHighestScore(G, ctx),
              canHold: pickDiceToHold(G.dice),
            }
          }
          return {...G, canHold: pickDiceToHold(G.dice), highestScore: getHighestScore(G, ctx), }
        },
       // onTurnEnd:(G, ctx)=>({...G, diceHeldThisRoll: []})
      },
      {
       name: "holding",
       onPhaseEnd: (G, ctx)=>({...G, heldThisPhase: false}),
       allowedMoves: ["hold", "roll", "saveScore", "setEnding"]
      }
    ]
  },
  moves: {
    saveScore,
    setEnding: (G, ctx)=>({...G, initialRoll: true, ending: true}),
    roll: (G, ctx)=>({
      ...G,
      turnStats: resetTurnStats({holds: G.turnStats.holds, rolls: G.turnStats.rolls+1}),
      dice: ctx.random.D6(G.dice.length || 6),
      highestScore: getHighestScore(G, ctx),
      initialRoll:false,
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
        highestScore: getHighestScore(G, ctx),
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