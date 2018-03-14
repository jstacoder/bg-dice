import { scoreStrait } from './strait'
import { scoreDoubles } from './doubles'
import { scoreThreeOrMoreFuncs } from './three-or-more'
import { scoreOnes, scoreFives } from './singles'

export const scoreRoll = (roll) =>{
  let rtn = 0
  const highScoreFuncs = [scoreStrait, scoreDoubles]
  highScoreFuncs.forEach(func=>{
    const result = func(roll)
    if(result){
      return result
    }
  })
  scoreThreeOrMoreFuncs.concat([scoreOnes, scoreFives]).forEach(func=>{
    rtn += func(roll)
  })
  return rtn
}