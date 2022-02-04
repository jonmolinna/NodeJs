import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import "bootswatch/dist/lux/bootstrap.min.css";
import axios from 'axios';

const stripePromise = loadStripe("pk_test_51Hei49LoD7pxih2RS0N9pHVGFctJGyTiN83pFWaNE7q3SJrG4rToSKANl8M0End8Q9K4Rlg6mCIFNDFsDesd8tpK00q7eFMiYb")

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    setLoading(true);

    if (!error) {
      // console.log(paymentMethod);
      const { id } = paymentMethod;

      try {
        const { data } = await axios.post('http://localhost:9000/api/checkout', {
          id,
          amount: 1000, // si es 10 dolares multiplica por 100 => 1000
        });
  
        console.log(data);
        
        elements.getElement(CardElement).clear();
        
      } catch (err) {
        console.log(error);
      }

      setLoading(false);
    };
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <img
        src="https://m.media-amazon.com/images/I/51ApN5cmxGL._AC_SY450_.jpg"
        alt="phone"
        className='img-fluid'
      />
      <h3 className='text-center mt-1'>Price: 10$</h3>
      <div className='form-group'>
        <CardElement className='form-control' />
      </div>
      <button className='btn btn-success' disabled={!stripe}>
        {
          loading? (
            <div className='spinner-border text-light' role="status">
              <span className='sr-only'></span>
            </div>
          ) : (
            "Buy"
          )
        }
      </button>
    </form>
  )
};

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className='container p-4'>
        <div className='row'>
          <div className='col-12 col-md-5 offset-md-3'>
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default App;
