import React, { useState, useEffect } from "react";

import Header from "./Header"
import Home from "./home/Home"
import Customize from "./customize/Customize";
import Cart from "./cart/Cart"
import Login from "./login/Login"
import Menu from "./menu/Menu"
import Route from "../Route"
import nodeJS from "../apis/nodeJS"
import product1 from '../images/product-1.jpg';
import product2 from '../images/product-2.jpg';
import product3 from '../images/product-3.jpg';
import product4 from '../images/pizza-1.jpg';
import product5 from '../images/pizza-2.jpg';
import product6 from '../images/pizza-3.jpg';
const productData1 = [
    {
      img: product1,
      alt: 'Pizza',
      name: 'Supreme Pizza',
      base: 'Thin Crust',
        sauce: 'Pesto',
        cheese: 'El-Clasico Cheese',
        vegToppings: ['Mushroom', 'Cottage Cheese', 'Sweet Corn', 'Basil'],
        nonVegToppings: [],
        price: 300,
    },
    {
      img: product2,
      alt: 'Pizza',
      name: 'Hawaiian Paradise',
      base: 'Thin Crust',
      sauce: 'Pesto',
      cheese: 'El-Clasico Cheese',
      vegToppings: ['Mushroom'],
      nonVegToppings: ['Bacon', 'Chicken Sausage'],
      price: 550,
    },
    {
      img: product3,
      alt: 'Pizza',
      name: 'Veggie Overload',
      base: 'Thin Crust',
      sauce: 'Pesto',
      cheese: 'El-Clasico Cheese',
      vegToppings: ['Mushroom', 'Cottage Cheese', 'Sweet Corn', 'Jalepeno'],
      nonVegToppings: [],
      price: 450,
    },
    {
      img: product4,
      alt: 'Pizza',
      name: 'Margherita Pizza',
      base: 'Thin Crust',
      sauce: 'Pesto',
      cheese: 'El-Clasico Cheese',
      vegToppings: ['Feta Cheese'],
      nonVegToppings: [],
      price: 250,
    },
    {
      img: product5,
      alt: 'Pizza',
      name: 'Pepperoni Pizza',
      base: 'Thin Crust',
      sauce: 'Pesto',
      cheese: 'El-Clasico Cheese',
      vegToppings: ['Mushroom'],
      nonVegToppings: ['Chicken Pepperoni'],
      price: 350,
    },
    {
      img: product6,
      alt: 'Pizza',
      name: 'Veggie Overload',
      base: 'Thin Crust',
      sauce: 'Pesto',
      cheese: 'El-Clasico Cheese',
      vegToppings: ['Pineapple', 'Olives'],
      nonVegToppings: ['Chicken Meatballs'],
      price: 500,
    }
  ];



const App = ()=>{
    const [cartData, setCartData] = useState([])
    const [productData, setProductData] = useState(productData1)

    useEffect(()=>{
        const getData = async()=>{
            const response = await nodeJS.get("/get_menu", productData1)
            setProductData(response.data.data)
        }
        getData()
    }, [])
    const onCartDataAdd = (addedData) =>{
        setCartData([...cartData, addedData])
    }

    const onCartDataRemoval = (value) => {
        setCartData(cartData.filter((data, index)=>{
            return index !== value
        }))
    }
    const emptyCart = () => {
        setCartData([])
    }
   
    return(
        <div>
        <Header orders={cartData.length}/>
        <Route path="/">
            <Home  />
        </Route>
        <Route path="/menu">
            <Menu productData={productData} onCartDataAdd={onCartDataAdd} />
        </Route>
        <Route path="/customize">
            <Customize  onCartDataAdd={onCartDataAdd}/>
        </Route>
        <Route path="/cart">
            <Cart cartData={cartData} onCartDataRemoval={onCartDataRemoval} emptyCart={emptyCart}/>
        </Route>
        <Route path="/login">
            <Login />
        </Route>
    </div>
    )
}

export default App