import { createContext, useEffect, useState } from "react";
import axios from 'axios';
/*CreateContext facilitates the passing of data through the component tree without 
having to pass props down manually */
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000"
  const[cartItem, setCartItem] = useState({})
  const [token, setToken] = useState("")

  /*Fetch data from database */
  const [food_list, setFoodList] = useState([]);

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

    const getTotalCartAmount = () => {
      let totalAmount = 0;

      for(const item in cartItem) {
        if(cartItem[item] > 0) {
          let itemInfo = food_list.find((product) => product._id === item)
          totalAmount += itemInfo.price * cartItem[item]
        }
      }
      return totalAmount;
    }

    //pick food data from the backend api
    const fetchFoodList = async() => {
      const response = await axios.get(url + "/api/food/list")
      setFoodList(response.data.data)
    }

    useEffect(() => {
      async function loadData() {
        await fetchFoodList();
        //get the current token from localstorage
        const currentToken = localStorage.getItem('token');
        if (currentToken) {
          setToken(currentToken)
        }
      }
      loadData();
    },[]) //empty dependency array: once on mount

    const contextValue = {
    food_list,
    cartItem,
    getTotalCartAmount,
    setCartItem,
    addToCart,
    removeFromCart,
    url,
    token,
    setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider; 