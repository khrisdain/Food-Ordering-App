import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

/*CreateContext facilitates the passing of data through the component tree without 
having to pass props down manually */
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const[cartItem, setCartItem] = useState({})

    const addToCart = (itemId) => {
        //on first addition to cart 
      if(!cartItem[itemId]) {
        setCartItem((prev) => ({...prev, [itemId]:1}))
      }
      else{
        setCartItem((prev) => ({...prev, [itemId] : prev[itemId] + 1}))
      }
    }
    

    const removeFromCart = (itemId) => {
        setCartItem((prev) =>({...prev, [itemId] : prev[itemId] - 1}))
    }

    useEffect(() => { 
      console.log({cartItem})
    }, [cartItem])

    const contextValue = {
    food_list,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider; 