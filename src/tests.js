import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'


Enzyme.configure({
    adapter: new Adapter()
})

export * from './scoring/tests'
export * from './Dice.test'
export * from './Board.test'





