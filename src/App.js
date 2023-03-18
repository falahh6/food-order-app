import './App.css';
import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';
import Cart from './Components/Cart/Cart';
import { useState } from 'react';
import CartProvider from './store/CartProvider';
function App() {

  const [ cartActive , setCartActive] = useState(false);

  const cartOpenHandler = () => {
    setCartActive(true);
  }

  const cartCloseHandler = () => {
    setCartActive(false);
  }
  return (
    <CartProvider>
      { cartActive && <Cart onClose={cartCloseHandler} />  }
     <Header onOpen={cartOpenHandler} />
     <Meals />  
    </CartProvider>
  );
}

export default App;
