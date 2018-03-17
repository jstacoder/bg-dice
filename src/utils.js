import { scoreRoll } from './scoring/score-roll'

export const resetTurnStats = ({rolls=0, holds=0}={}) =>({
    rolls,
    holds,
})

export const resetTurnScore = () =>({
  scores:[],
  rollScore:{held:[], score:0},
  heldScore:{held:[], score:0},
})

export const holdDieUpdate = (G, ctx, die) =>{
  let turnScores = {...G.turnScores}
  let heldScore = {...turnScores.heldScore}
  let {held, score} = heldScore
  let scores = [...turnScores.scores.filter(score=> score.held != held)]
  heldScore = { held: [...held, die], score: scoreRoll([...held, die]) }
  turnScores = {rollScore: heldScore, heldScore, scores: [...scores]}
  // return {...G, turnScores: {...turnScores}}
  return turnScores
}

export const keepScoreUpdate = (G, ctx) =>{
  let scores = [...G.scores]
  const currentScore = scores[ctx.currentPlayer]
  const newScore = G.turnScores.scores.reduce((prev, curr)=> prev + curr.score, currentScore)
  scores[ctx.currentPlayer] = newScore
  return {...G, scores: [...scores], turnScores: resetTurnScore() }
}
