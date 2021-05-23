import React from "react"
import "./home.css"



const Home = ()=>{
    return(
        <div className="menu-container global-styles">
            <div>
                <div className="menu-items">
                    <h1 className="menu-heading">
                        Best Pizza in Town
                    </h1>
                    <p className="menu-paragraph">
                        Ready in 2 mins
                    </p>
                    <a href="/menu">
                        <button className="menu-button">
                            Place Order
                        </button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Home