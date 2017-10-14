import { IntlProvider } from 'react-intl'
import { Provider } from 'mobx-react'
import { withRouter } from 'next/router'
import formats from '../constants/formats'
import withStore from '../enhancers/withStore'

export default withStore(withRouter(({ children, store, router, href }) => (
  <Provider store={store} router={router} >
  	<IntlProvider locale='en' formats={ formats } defaultFormats={ formats }> 
    	{ children }
    </IntlProvider>
  </Provider>
)))
