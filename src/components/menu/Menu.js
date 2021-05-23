import React, { useState } from "react"

import "./menu.css"



const Menu = ({ productData, onCartDataAdd })=>{
    const [alert, setAlert] = useState(false)
    const onAddToCart = (value)=>{
        const addedPizza = productData.filter((data, index)=> value === index)[0]
        const object = {name: addedPizza.name, base: addedPizza.base, cheese: addedPizza.cheese, sauce:addedPizza.sauce,
          vegToppings:addedPizza.vegToppings, nonVegToppings:addedPizza.nonVegToppings, price: addedPizza.price, quantity: 1}
        setTimeout(()=>{
          setAlert(false)
        }, 2000)
        setAlert(true)
        onCartDataAdd(object)
        
    }
    const renderList = ()=>{
        return productData.map((product, index)=>{
            return(
                <div className="product-card" key={index}>
                    <img src={product.img} alt={product.alt} className="product-image"></img>
                    <div className="product-info">
                        <h2 className="product-title">{ product.name }</h2>
                        <div className="product-height">
                        <p className="product-desc">Pizza Base: { product.base }</p>
                        <p className="product-desc">Pizza Sauce: { product.sauce }</p>
                        <p className="product-desc">Pizza Cheese: { product.cheese }</p>
                        {product.vegToppings.length > 0 ?<p className="product-desc">Veg Toppings: { product.vegToppings.join(",") }</p> : null}
                        {product.nonVegToppings.length > 0 ? <p className="product-desc">Non-Veg Toppings: { product.nonVegToppings.join(",") }</p> : null}
                        </div>
                        <p className="product-price"  style={{ textTransform: "none", fontWeight:"150px"}}>Rs { product.price }</p>
                        <button className="product-button" onClick={()=>onAddToCart(index)}>Add to Cart</button>
                    </div>  
                </div>
            )
        })
    }

    return(
      <React.Fragment>
       <div className="product-container glbal-styles">
           <h1 className="product-heading">Choose your favorite</h1>
           <div className="product-wrapper">
                {renderList()}
            </div>
       </div>
       {alert ? <div role="alert" className="alert alert-success myAlert-bottom"><strong>Added to the Cart</strong></div> : null }
       </React.Fragment>
    )
}

export default Menu