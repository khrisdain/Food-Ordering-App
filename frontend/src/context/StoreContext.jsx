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
    try{
      if(!cartItem[itemId]) {
        setCartItem((prev) => ({...prev, [itemId]: 1}))
      } else {
        setCartItem((prev) => ({...prev, [itemId]: prev[itemId] + 1}))
      }

      //Make Api call
      const response = await axios.post(
        url+ "/api/cart/add",
        {itemId},
        {headers: {Authorization: `Bearer ${token}`}}
      );

      if(!response.data.success) throw new Error(response.data.message)
      console.log("Item added successfully")
    } catch(error) {
      console.error(error)
      alert(error.response?.data?.message)
    }
  };


    const removeFromCart = async (itemId) => {
        setCartItem((prev) =>({...prev, [itemId] : prev[itemId] - 1}))

        //Make APi Call
        const response = await axios.post(
          url + "/api/cart/remove",
          {itemId},
          {headers: {Authorization: `Bearer ${token}`}}
        );

        if(!response.data.success) throw new Error(response.data.message)
        console.log("item removed")
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


    const loadCartData = async () => {
      try {
        if (!token) {
          console.error("No token found, unable to load cart data.");
          return;
        }
    
        const response = await axios.post(
          `${url}/api/cart/get`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
    
        if (response.status === 200) {
          setCartItem(response.data.CartData);
        } else {
          throw new Error("Failed to load cart data.");
        }
      } catch (error) {
        console.error("Error loading cart data:", error);
        alert(error.response?.data?.message || "Unauthorized access");
      }
    };
    
    useEffect(() => {
      async function loadData() {
        await fetchFoodList();
        if (localStorage.getItem("token")) {
          setToken(localStorage.getItem("token"));
          await loadCartData(localStorage.getItem("token"))
        }
      }
      loadData();
    }, [])

    /*useEffect(() => {
      async function loadData(){
        try {
          //Fetch the list of food items
          const foods = await fetchFoodList();
          setFoodList(foods)

          //Get current token from localStorage
          const currentToken = localStorage.getItem("token");
          if (currentToken) setToken(currentToken);

          //Load CartData if token exists
          const cartData = await loadCartData(currentToken);
          setCartItem(cartData);
        }
        catch(error){
          console.log('Error loading data:', error)
        }
      }
      loadData();
    }, [])*/

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