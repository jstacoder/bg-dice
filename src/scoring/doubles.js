import { arrayHasHowMany, getArrayCounts } from './utils'

export const checkDoubles = dice =>{
  return (((dice.length<6) && false) || (arrayHasHowMany(getArrayCounts(dice), 2) >= 3))
}

export const scoreDoubles = dice =>{
  return checkDoubles(dice)  && 1000 || 0
}

export default scoreDoubles
