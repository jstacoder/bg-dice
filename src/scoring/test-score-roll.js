import tape from 'tape'

import { scoreRoll } from './score-roll'

const holdDie = (scoreObj, n) =>({
  ...scoreObj,
  held: [
    ...scoreObj.held, n
  ],
  score: scoreRoll([...scoreObj.held, n]),
})

export default tape('test score roll', t=>{
  t.test('test holdDie', t=>{
    const scoreObj = {
      held: [],
      score: 0
    }
    // for(let i = 0; i < 10; i++){
      // const nextScore = 
    // }
    const newScores = Array(10).fill(0).reduce((_,i,idx,arr)=>(
      holdDie(_,idx<7?idx:idx-5)
    ),scoreObj)
    console.log(newScores)
    t.end()
  })
  t.test('test [1,1,3,4,5,1]', t=>{
    const roll = [1,1,3,4,5,1]
    const result = scoreRoll(roll)
    t.equals(result, 1050, 'sb 1050')
    t.end()
  })
  t.test('test [1,1,3,1]', t=>{
    const roll = [1,1,3,1]
    const result = scoreRoll(roll)
    t.equals(result, 1000, 'sb 1000')
    t.end()
  })
  t.test('test [5,1,3,1,3,3]', t=>{
    const roll = [5,1,3,1,3,3]
    const result = scoreRoll(roll)
    t.equals(result, 550, 'sb 550')
    t.end()
  })
  t.test('test [3,3,3,3,1,2]', t=>{
    const roll = [3,3,3,3,1,2]
    const result = scoreRoll(roll)
    t.equals(result, 700, 'sb 700')
    t.end()
  })
  t.test('test [2,2,2,1,6,6]', t=>{
    const roll = [2,2,2,1,6,6]
    const result = scoreRoll(roll)
    t.equals(result, 300, 'sb 300')
    t.end()
  })
  t.test('test [5,5,5]', t=>{
    const roll = [5,5,5]
    const result = scoreRoll(roll)
    t.equals(result, 500, 'sb 500')
    t.end()
  })
  t.test('test [5,5,5,5,5]', t=>{
    const roll = [5,5,5,5,5]
    const result = scoreRoll(roll)
    t.equals(result, 2000, 'sb 2000')
    t.end()
  })
  t.end()
})