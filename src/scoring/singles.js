import { arrayHasHowMany, getArrayCounts } from './utils'

const checkSingle = (array,n) => arrayHasHowMany(array, n)
const checkFives = array => checkSingle(array, 5)
const checkOnes = array => checkSingle(array, 1)

const bases = {1: 100, 5: 50}
const checkFuncs = {1: checkOnes, 5: checkFives}

const scoreSingle = (array, n) =>{
  const x = checkFuncs[n](array)
  if((3>x) && (x>0)){
    return bases[n]*x
  }
  return 0
}

export const scoreFives = array => scoreSingle(array, 5)
export const scoreOnes = array => scoreSingle(array, 1)
