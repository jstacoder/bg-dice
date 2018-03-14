import tape from 'tape'

import { scoreFives, scoreOnes } from './singles'

export default tape('test single checks', t=>{
  t.test('test successes', t=>{
    t.test('test 2 ones', t=>{
      t.equals(scoreOnes([1,1]), 200, '[1,1] s/b 200')
      t.end()
    })
    t.test('test 2 fives', t=>{
      t.equals(scoreFives([5,5]), 100, '[5,5] s/b 100')
      t.end()
    })
  })
})