import tape from 'tape'

import * as threeOrMore from './three-or-more'

const multiplyBy2 = (num, times=1)=>{
  const origNum = num * 2
  while (times>1){
    num = origNum * 2
    --times
  }
  return num
}

tape.test('Test three-or-more.js', t=>{
  t.test('test success checks', t=>{
    t.test('test ([3,3,3],3) works as args for checkForThreeOrMoreNum',t=>{
      const roll = [3,3,3]
      const num = 3
      const result = threeOrMore.checkForThreeOrMoreNum(roll, num)
      t.ok(result, 'should work')
      t.end()
    })
    t.test('test ([4,4,4],4) works as args for checkForThreeOrMoreNum',t=>{
      const roll = [4,4,4]
      const num = 4
      const result = threeOrMore.checkForThreeOrMoreNum(roll, num)
      t.ok(result, 'should work')
      t.end()
    })
    t.test('test ([i,i,i],i) works as args for checkThreeOrMoreFuncs[i]',t=>{
      t.plan(6)
      for(let i = 1; i < 7; i++){
        const roll = Array(3).fill(i)
        const checkFunc = threeOrMore.checkThreeOrMoreFuncs[i-1]
        const result = checkFunc(roll)
        t.ok(result,`checking ([${i},${i},${i}],${i}) as args for checkThreeOrMoreFuncs[${i}]`)
      }
      t.end()
    })
    t.test('test ([i,i,i],i) gets correct score for scoreThreeOrMoreFuncs[i]',t=>{
      t.plan(6)
      for(let i = 1; i < 7; i++){
        const roll = Array(3).fill(i)
        const checkFunc = threeOrMore.scoreThreeOrMoreFuncs[i-1]
        const result = checkFunc(roll)
        t.equals(result,i > 1 ? i*100 : 1000,`checking ([${i},${i},${i}],${i}) as args for checkThreeOrMoreFuncs[${i}]`)
      }
      t.end()
    })
    t.test('test ([i,i,i,i,i]) gets correct score for scoreThreeOrMoreFuncs[i]',t=>{
      t.plan(6)
      for(let i = 1; i < 7; i++){
        const roll = Array(5).fill(i)
        const checkFunc = threeOrMore.scoreThreeOrMoreFuncs[i-1]
        const result = checkFunc(roll)
        const currentScore = multiplyBy2((i > 1 ? i*100 : 1000),5)
        t.equals(result,currentScore,`checking ([${i},${i},${i},${i},${i}]) as args for scoreThreeOrMoreFuncs[${i}] s/b ${currentScore}`)
      }
      t.end()
    })
    t.end()
  })
  t.end()
})