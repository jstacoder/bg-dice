import test from 'tape'

import scoreDoubles, { checkDoubles } from './doubles'

export default test('doubles',function(t){
	t.test('test good', t=>{
		t.test('when given doubles should return true', function(t){
			const roll = [1,1,2,2,3,3]
			const result = checkDoubles(roll)
			t.ok(result)		
			t.end()
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
			const roll = [1,1,2,2,3,4]
			const result = checkDoubles(roll)
			t.notOk(result)
			t.end()
		})
		t.end()
	})
})
