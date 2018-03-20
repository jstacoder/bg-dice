import { scoreStrait, checkStrait } from './strait'
import { scoreDoubles, checkDoubles } from './doubles'
import { scoreThreeOrMoreFuncs, checkThreeOrMoreFuncs } from './three-or-more'
import { scoreOnes, scoreFives, checkFuncs } from './singles'

const processSingle = (n, roll) =>{
  if(checkFuncs[`${n}`](roll)){
    return roll.filter(num=>num===n)
  }
  return []
}
export const pickDiceToHold = roll =>{
  let rtn = []
  if(checkDoubles(roll) || checkStrait(roll)){
    return roll
  }
  let newRoll = [...roll]
  for(let i = 0; i < 6; i++){
    const curr = checkThreeOrMoreFuncs[i]
    if(curr(newRoll)){
      const currNum = i+1
      const count = newRoll.reduce((prev, curr)=> curr == currNum && prev+1 || prev, 0)
      newRoll = newRoll.filter(n => n != currNum)
      for(let i = 0; i < count; i++){
        rtn.push(currNum)
      }
    }
  }
  if(newRoll.length){
    const singles = [1,5]
    singles.forEach(n=> {
        rtn = rtn.concat([...processSingle(n, newRoll)])
      }
    )
}
  return rtn
}

export const scoreRoll = roll =>{
  let rtn = 0
  const highScoreFuncs = [scoreStrait, scoreDoubles]
  highScoreFuncs.forEach(func=>{
    const result =  func(roll)
    if(result > 0){
      rtn = result
    }
  })
  if(rtn == 0){
    scoreThreeOrMoreFuncs.concat([scoreOnes, scoreFives]).forEach(func=>{
      rtn += func(roll)
    })
  }
  return rtn
}