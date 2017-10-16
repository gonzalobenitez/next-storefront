import { shallow } from 'enzyme'
import { IntlProvider } from 'react-intl'
import renderer from 'react-test-renderer'
import CartItem from '../../components/CartItem.js'
import products from '../../data/products.json'
import formats from '../../constants/formats'
import Store from '../../stores/store'

describe('CartItem Test', () => {
  let store = null
  beforeEach(() => {
    store = new Store(products)
  })

  it('shows item', () => {
    const product = store.products[0]
    const shallowComponent = shallow(
      <CartItem
        product={ product }
        quantity={ 1 }
        remove={() => store.removeFromCart(product.id, 1) }
        setQuantity={ (event) => store.setCartQuantity(product.id, event.target.value) }
      />
    )
    expect(shallowComponent.find('input').props().value).toEqual(1)
  })

  it('shows item in Snapshot Testing', () => {
    const product = store.products[0]
    const shallowComponent = renderer.create(
      <IntlProvider locale="en" formats={ formats } defaultFormats={ formats } >
        <CartItem
          product={ product }
          quantity={ 1 }
          remove={() => store.removeFromCart(product.id, 1) }
          setQuantity={ (event) => store.setCartQuantity(product.id, event.target.value) }
        />
      </IntlProvider>
    )
    const tree = shallowComponent.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
