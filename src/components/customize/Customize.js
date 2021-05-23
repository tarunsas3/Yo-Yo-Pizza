import React, { useState } from "react"
import { RiCloseCircleLine } from 'react-icons/ri';
import "./customize.css"

const Customize = ({ onCartDataAdd })=>{
    const [ pizzaBase, setPizzaBase ] = useState("Thin Crust")
    const [ pizzaSauce, setPizzaSauce ] = useState("Pesto")
    const [ pizzaCheese, setPizzaCheese ] = useState("Peri Peri Cheese")
    const [ vegToppings, setVegToppings ] = useState([])
    const [ nonVegToppings, setNonVegToppings ] = useState([])
    const [alert, setAlert] = useState(false)

    const onVegToppingsChange = (event)=>{
        setVegToppings([...vegToppings, event.target.value])
       
    }

    const onNonVegToppingsChange = (event)=>{
        setNonVegToppings([...nonVegToppings, event.target.value])
       
    }

    const onVegToppingRemoval = (topping)=>{
        setVegToppings(vegToppings.filter((data) =>{
            return data !== topping
        }))
    }

    const onNonVegToppingRemoval = (topping)=>{
        setNonVegToppings(nonVegToppings.filter((data) =>{
            return data !== topping
        }))
    }

    const renderVegToppings = ()=>{
        return vegToppings.map((topping, index)=>{
            return(
                <span key={index} className="tag">
                    <span>{topping}</span>
                    <RiCloseCircleLine onClick={() => onVegToppingRemoval(topping)} className='delete-icon'/>
                </span>
            )
        })
    }


  
    const renederPriceList = ()=>{
        const additionalPrice = (vegToppings.length > 3 ? (30 * (vegToppings.length - 3)) : 0) + (nonVegToppings.length > 1 ? (50 * (nonVegToppings.length - 1)) : 0)
        const totalPrice = 200 + additionalPrice
        return(
            <div>
                <p style={{ textTransform: "none", fontWeight:"bold"}}>BASE PRICE : Rs 200 <span style={{marginLeft:"30px"}}> {additionalPrice !== 0 ? `ADDITIONAL PRICE : Rs ${additionalPrice} ` : ""}</span></p>
               
                <p className="product-price" style={{ textTransform: "none", fontWeight:"150px"}}>TOTAL PRICE : Rs {totalPrice} </p>
            </div>
        )
    }


    const renderNonVegToppings = ()=>{
        return nonVegToppings.map((topping, index)=>{
            return(
                <span key={index} className="tag">
                    <span>{topping}</span>
                    <RiCloseCircleLine onClick={() => onNonVegToppingRemoval(topping)} className='delete-icon'/>
                </span>
            )
        })
    }

    const onSubmit = (event)=>{
        event.preventDefault()
        const additionalPrice = (vegToppings.length > 3 ? (30 * (vegToppings.length - 3)) : 0) + (nonVegToppings.length > 1 ? (50 * (nonVegToppings.length - 1)) : 0)
        const totalPrice = 200 + additionalPrice
        setTimeout(()=>{
            setAlert(false)
          }, 2000)
          setAlert(true)
        onCartDataAdd({name: "Customized Pizza", base: pizzaBase, cheese: pizzaCheese, sauce:pizzaSauce,
                      vegToppings:vegToppings, nonVegToppings:nonVegToppings, price: totalPrice, quantity: 1})
    }
    return(
        <div className="customize-container container-fluid">
            <div className="row">
                <div className="col-sm-12 col-md-6"></div>
                <div className="col-sm-12 col-md-6 customize-items">
                    <h3 className="customize-heading">
                        Customize your Pizza
                    </h3>
                    <form onSubmit={onSubmit}>
                    <div className="form-group ">
                        <label>Select base</label>
                        <select className="form-control" onChange={(e) => setPizzaBase(e.target.value)}>
                            <option value="Thin Crust">Thin Crust</option>
                            <option value="Thick Crust">Thick Crust</option>
                            <option value="Cheese Burst">Cheese Burst</option>
                            <option value="Deep Dish">Deep Dish</option>
                        </select>
                       
                    </div>
                    <div className="form-group ">
                        <label>Select sauce</label>
                        <select className="form-control" onChange={(e) => setPizzaSauce(e.target.value)}>
                            <option value="Pesto">Pesto</option>
                            <option value="White Garlic">White Garlic</option>
                            <option value="Mariana">Mariania</option>
                            <option value="Garlic Ranch">Garlic Ranch</option>
                        </select>
                    </div>
                    <div className="form-group ">
                        <label>Select Cheese</label>
                        <select className="form-control" onChange={(e) => setPizzaCheese(e.target.value)}>
                            <option value="Peri Peri Cheese">Peri Peri Cheese</option>
                            <option value="Chipotle Cheese">Chipotle Cheese</option>
                            <option value="Tandoori Cheese">Tandoori Cheese</option>
                            <option value="El-Clasico Cheese">El-Clasico Cheese</option>
                        </select>
                    </div>
                    <div className="form-group ">
                        <label>Select Veg Toppings</label>
                        <select className="form-control" onChange={(e)=>onVegToppingsChange(e)}>
                            <option value="">--Select Veg Toppings--</option>
                            <option value="Sweet Corn">Sweet Corn</option>
                            <option value="Cottage Cheese">Cottage Cheese</option>
                            <option value="Feta Cheese">Feta Cheese</option>
                            <option value="Onion">Onion</option>
                            <option value="Olives">Olives</option>
                            <option value="Mushroom">Mushroom</option>
                            <option value="Jalepeno">Jalepeno</option>
                            <option value="Bell Peppers">Bell Peppers</option>
                            <option value="Pineapple">Pineapple</option>
                            <option value="Basil">Basil</option>
                            <option value="Tomato">Tomato</option>
                        </select>
                        <div className="customize-span-div">                            
                            {renderVegToppings()}
                        </div>
                    </div>
                    <div className="form-group ">
                        <label>Select Non-Veg Toppings</label>
                        <select className="form-control" onChange={(e)=>onNonVegToppingsChange(e)}>
                            <option value="">--Select Non-Veg Toppings--</option>
                            <option value="Tandoori Chicken">Tandoori Chicken</option>
                            <option value="Chicken Tikka">Chicken Tikka</option>
                            <option value="Chicken Pepperoni">Chicken Peporoni</option>
                            <option value="Chicken Sausage">Chicken Sausage</option>
                            <option value="Chicken Meatballs">Chicken Meatballs</option>
                            <option value="Bacon">Bacon</option>
                            <option value="Ham">Ham</option>
                        </select>
                        <div className="customize-span-div">                            
                            {renderNonVegToppings()}
                        </div>
                    </div>
                    {renederPriceList()}
                    <button className="customize-button">Add to Cart</button>
                    </form>
                </div>
            </div>
            {alert ? <div role="alert" className="alert alert-success myAlert-bottom"><strong>Added to the Cart</strong></div> : null }
        </div>
    )
}

export default Customize