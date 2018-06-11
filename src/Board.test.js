import React from 'react'
import ReactDOM from 'react-dom'

import sinon from 'sinon'
import { shallow, mount } from 'enzyme'
import tape from 'tape'

import Board from './Board'
import App from './App'
import { resetG } from './utils'
import Die from './Die'

tape('test board component', t=>{
    t.test('----> make sure it renders dice', t=>{
        const wrapper = mount(<App/>)
        const board = wrapper.find(Board)
        console.log('board: ',board.props())
        console.log('board.G: ',board.props().G)
        console.log('board.ctx: ',board.props().ctx)
        t.test('====> ----> make sure we start with an empty dice array', t=>{
            const { dice } = board.props().G
            t.equal([0,0,0,0,0,0].length, dice.length, wrapper.html())
            t.end()
        })
        t.test('test numbers changed when rolled', t=>{
            const rollButton = board.find('.roll')
            rollButton.map(itm=>{
                t.test('test current bnutton', t=>{
                    const { dice } = board.props().G
                    itm.simulate('click')
                    t.notEqual([0,0,0,0,0,0],dice, 'should not be the dame')
                    t.end()
                })
            })
            //rollButton.simulate('click')
        })
    })
})


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
