import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import tape from 'tape'

import Die from './Die'

export default tape('test <Die/>', t=>{
    Enzyme.configure({adapter: new Adapter()})
    t.test('test numbers are right', t=>{
        t.plan(6)
        for(let i=1; i < 7; i++){
            const die = shallow(<Die die={ i } />)
            const num = die.text()
            t.equals(num, `${i}`, `testing <Die die={${i}}/> s/b ${num}`)
        }       
    })
    t.end()
})
