import { arrayHasHowMany, getArrayCounts } from './utils'

const checkDoubles = dice =>{
  return (((dice.length<6) && false) || (arrayHasHowMany(getArrayCounts(dice), 2) >= 3))
}

export default scoreDoubles = dice =>{
  return checkDoubles(dice)  && 1000 || 0
}