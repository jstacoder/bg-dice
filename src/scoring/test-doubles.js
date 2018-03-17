import test from 'tape'

import scoreDoubles, { checkDoubles } from './doubles'

const loadDoublesRoll = i => Array(2).fill(i).concat(Array(2).fill(i+1)).concat(Array(2).fill(i+2))

export default test('doubles',function(t){
	t.test('test good', t=>{
		t.test('when given doubles should return true', function(t){
			t.plan(4)
			for(let i = 1; i < 5; i++){
				const roll = loadDoublesRoll(i)
				const result = checkDoubles(roll)
			  t.ok(result)		
			}
		})
		t.test('test scoring is correct when given doubles',t=>{
			t.plan(5)
			for(let i = 1; i < 5; i++){
				const roll = loadDoublesRoll(i)
				const result = scoreDoubles(roll)
			  t.equals(result, 1000, `${roll} should get 1000`)		
			}
			t.equals(scoreDoubles([2,6,3,3,6,2]), 1000, 'this should work 2,6,3,3,6,2')
		})
	})
	t.test('test bad', t=>{
		t.test('when given less than 6 dice should return false', function(t){
			t.plan(5)
			for(let i = 0; i < 5; i++){
				const roll = Array(i).fill(1)
				const result = checkDoubles(roll)
				t.notOk(result)
			}
		})	
		t.test('when given 6 non doubles should return false', t=>{
			t.plan(6)
			for(let i = 1; i < 7; i++){
				const currentRoll = Array(5).fill(i).concat((i < 7 ? i+1 : 1))
				const currentResult = checkDoubles(currentRoll)
				t.notOk(currentResult, `${currentRoll} should fail`)				
			}
			t.end()
		})
		t.end()
	})
})
