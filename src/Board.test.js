import React from 'react'
import ReactDOM from 'react-dom'

import { shallow, mount } from 'enzyme'
import tape from 'tape'

import Board from './Board'

tape('test board component', t=>{
    t.test('make sure it renders dice', t=>{
        const wrapper = mount(<Board G={{scores: [{score:0,held:[],temp:0}], dice: []}} moves={[]} events={[]} ctx={{currentPlayer:0}} />)
        const currentPlayerInDOM = wrapper.text()[wrapper.text().search('#') + 1]
        const currentPlayerInCtx = wrapper.find('.player').text()
        t.equals(currentPlayerInDOM, currentPlayerInCtx, 'context and dom should agree on current player')
        t.end()
    })
    t.end()
})
