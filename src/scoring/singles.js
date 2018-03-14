import { arrayHasHowMany, getArrayCounts } from './utils'

const checkSingle = (array,n) => arrayHasHowMany(array, n)
const checkNumberOfFives = array => checkSingle(array, 5)
const checkNumberOfOnes = array => checkSingle(array, 1)

const bases = {1: 100, 5: 50}
const baseCheckFuncs = {
  '1' : array=> checkNumberOfOnes(array),
  '5' : array=> checkNumberOfFives(array),
}
export const checkFuncs = {
  '1': array=> [1,2].includes(baseCheckFuncs['1'](array)),
  '5': array=> [1,2].includes(baseCheckFuncs['5'](array)),
}


const scoreSingle = (array, n) => checkFuncs[n](array) ? bases[n]*baseCheckFuncs[n](array) : 0

export const scoreFives = array => scoreSingle(array, 5)
export const scoreOnes = array => scoreSingle(array, 1)
