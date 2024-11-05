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

  const addToCart = async (itemId) => {
    if(!cartItem[itemId]) {
      setCartItem((prev)=> ({ ...prev, [itemId]: 1}))
    }
    else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1}))
    }
    //Make add to cart Api call
    if(token){
      const response = await axios.post(url + "/api/cart/add", {itemId}, {headers: {token}})
      
      if(!response.data.success) throw new Error(response.data.message)
      console.log("Item Added")
    }
  }


    const removeFromCart = async (itemId) => {
        setCartItem((prev) =>({...prev, [itemId] : prev[itemId] - 1}))

        //Make remove from cart APi Call
        if(token) {
          const response = await axios.post(url + "/api/cart/remove", { itemId }, {headers: {token}} )

          if(!response.data.success) throw new Error (response.data.message)
          console.log("Item Removed")
        }
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
    };


    const loadCartData = async (token) => {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        {headers: {token}}
      )
      setCartItem(response.data.cartData)
    }

    useEffect(() => {
      async function loadData() {
        await fetchFoodList();

        if(localStorage.getItem("token")) {
          setToken(localStorage.getItem("token"))
          //await loadCartData(localStorage.getItem("token"))
        }
      }
      loadData();
    }, []) //dependencies set to avoid warning in strict mode 
    
  


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