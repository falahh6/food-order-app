import './App.css';
import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';
import Cart from './Components/Cart/Cart';
import { useState } from 'react';
function App() {

  const [ cartActive , setCartActive] = useState(false);

  const cartOpenHandler = () => {
    setCartActive(true);
  }

  const cartCloseHandler = () => {
    setCartActive(false);
  }
  return (
    <div className="App">
      { cartActive && <Cart onClose={cartCloseHandler} />  }
     <Header onOpen={cartOpenHandler} />
     <Meals />  
    </div>
  );
}

export default App;
