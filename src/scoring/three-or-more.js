import { arrayHasHowMany, getArrayCounts } from './utils'

export const checkForThreeOrMoreNum = (array, num) =>(
  getArrayCounts(array)[num-1] >= 3
)

export const checkThreeOrMoreFuncs = [1,2,3,4,5,6].map(
  n=> array => checkForThreeOrMoreNum(array, n)
)

export const scoreThreeOrMoreNum = (array, num) =>{
  const base = (num === 1 ? 1000 : (num*100))
  return checkForThreeOrMoreNum(array, num) && 
    (
      (Array(arrayHasHowMany(array, num)-2).fill(0)).reduce((c,n,i)=> (
        i && (c*2) || base
      )  ,base)
    ) || 0
}

export const scoreThreeOrMoreFuncs = [1,2,3,4,5,6].map(
  n=> array => scoreThreeOrMoreNum(array, n)
)