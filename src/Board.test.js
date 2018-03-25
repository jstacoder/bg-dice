import React from 'react'
import ReactDOM from 'react-dom'

import { shallow, mount } from 'enzyme'
import tape from 'tape'

import Board from './Board'
import Die from './Die'


tape('test board component', t=>{
    t.test('make sure it renders dice', t=>{
        const wrapper = mount(<Board G={{scores: [{score:0,held:[],temp:0}], dice: [0,0,0,0,0,0]}} moves={[]} events={[]} ctx={{currentPlayer:0}} />)
        const board = wrapper.find(Board)

        const currentPlayerInDOM = (wrapper.text()[wrapper.text().search('#') + 2]*1)-1
        const currentPlayerInCtx = board.props().ctx.currentPlayer//wrapper.find('.player').text()
        t.equals(currentPlayerInCtx, currentPlayerInDOM, `context and dom should agree on current player ${JSON.stringify(board.props())}`)
        const dice = wrapper.find(Die)
        t.equals(dice.length, 6, 'should have 6 dice')

        t.end()
    })
    t.end()
})
