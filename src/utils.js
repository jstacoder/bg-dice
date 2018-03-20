import { scoreRoll } from './scoring/score-roll'

export const getHighestScore = (G, ctx)=>{ 
  let winner = {score:0, playerNum:0};
  
  for(let playerNum in G.players){
    const playerScore = G.players[playerNum]
    if(playerScore>winner.score){
      winner = { score: playerScore, playerNum}
    }
  }
  return winner.playerNum
  // Object.keys(G.players).reduce(
  //   (prev,curr)=>{
  //     const c = G.players[curr]
  //     return c > G.players[prev] ? curr : prev
  //   },0
  // )
}

export const endGameIf = (G, ctx)=> {
    if(
        G.finalRound&&
        Object.keys(G.players).length-1==
        ctx.currentPlayer
    ){
      return getHighestScore(G, ctx)
    }
}

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
  const newHeld = [...held, die]
  const newScore = scoreRoll(newHeld)
  heldScore = { held: newHeld, score: newScore }
  turnScores = {rollScore: heldScore, heldScore, scores: [...scores]}
  return turnScores
}

export const keepScoreUpdate = (G, ctx) =>{
  let scores = [...G.scores]
  const currentScore = scores[ctx.currentPlayer]
  const newScore = G.turnScores.scores.reduce((prev, curr)=> prev + curr.score, currentScore)
  scores[ctx.currentPlayer] = newScore
  return {...G, scores: [...scores], turnScores: resetTurnScore() }
}

export const saveScore =  (G, ctx, score)=>({
  ...G,
  diceHeldThisRoll:[],
  heldThisPhase: false,
  players: {
    ...G.players,
    [ctx.currentPlayer]: G.players[ctx.currentPlayer]+score
  }
})

export const loadPlayers = numPlayers =>{
  let players = {}
  for(let i = 0; i < numPlayers; i++){
    players[`${i}`] = 0
  }
  return players
}

export const resetG = (G, {numPlayers}) =>{

  return {
    canHold: [],
    finalRound: false,
    highestScore:0,
    turnStats: resetTurnStats(),
    turnScores: resetTurnScore(),
    diceHeldThisRoll: [],
    holding: [],
    pass: false,
    dice: Array(6).fill(0),
    heldThisPhase: false,
    players:loadPlayers(numPlayers)
  }
}