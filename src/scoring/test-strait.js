import test from 'tape'

import { scoreStrait, checkStrait } from './strait'

export default test('test straits', t=>{
	t.plan(2)
	t.test('test good checks', t=>{
		t.test('strait should return true', t=>{
			const roll = [1,2,3,4,5,6]
			const result = checkStrait(roll)
			t.ok(result)
			t.end()
		})
		t.end()
	})
	t.test('test bad checks', t=>{
		t.test('less than 6 dice should return false', t=>{
			t.plan(5)
			for(let i = 0; i < 5; i++){
				const roll = Array(i).fill(1)
				const result = checkStrait(roll)
				t.notOk(result)
			}
		})
		t.end()
	})
	t.end()
})
