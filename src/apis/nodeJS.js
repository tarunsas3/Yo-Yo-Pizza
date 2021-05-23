import axios from "axios"
let url = "https://pizza-order-app-be.herokuapp.com"
//let url = "http://localhost:3001"
export default axios.create({
    baseURL: url,

})