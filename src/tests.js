import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

global.document = require('jsdom').jsdom('<body></body>')
global.window = document.defaultView
global.navigator = global.window.navigator

Enzyme.configure({
    adapter: new Adapter()
})

export * from './scoring/tests'
export * from './Dice.test'
export * from './Board.test'





