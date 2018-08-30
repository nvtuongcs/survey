import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Payments extends React.Component {
  render() {
    return (
      <StripeCheckout
        name="Emaily"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
      >
        <button className='btn'>Add Credits</button>
      </StripeCheckout>
    )
  }
}

export default connect(null, actions)(Payments)
