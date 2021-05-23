import React, { useState } from "react"
import "./login.css"
import nodeJS from "../../apis/nodeJS"

const Login = ()=>{
    const [loginClass, setLoginClass] = useState("")
    const [resetClass, setResetClass] = useState("d-none")
    const [signUpClass, setSignUpClass] = useState("d-none")
    const [alert, setAlert] = useState(false)
    const [alertFailure, setAlertFailure] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    

    const onSignIn = ()=>{
        setResetClass("d-none")
        setLoginClass("")
    }

    const onCreateAccount = ()=>{
        setSignUpClass("")
        setLoginClass("d-none")
        
    }

    const onResetPassword = ()=>{
        setResetClass("")
        setLoginClass("d-none")
    }

    const onAlreadyRegistered = ()=>{
        setLoginClass("")
        setSignUpClass("d-none")
    }

    const createUser = async(event)=>{
        event.preventDefault()
        const returnObject = {
            email: email,
            password: password,
            role: role,
            isActivated: "false"
        }
        try{
            const response = await nodeJS.post("/register", returnObject)
            if(response.data.message === "Activation mail sent"){
                setTimeout(()=>{
                    setAlert(false)
                  }, 2000)
                  setAlert(true)
            }
            else{
                setTimeout(()=>{
                    setAlertFailure(false)
                  }, 2000)
                  setAlertFailure(true)
            }
        }
        catch(err){
            setTimeout(()=>{
                setAlertFailure(false)
              }, 2000)
              setAlertFailure(true)
        }

       
    }

    const lognIn = async (event) => {
        event.preventDefault()
        const returnObject = {
            email: email,
            password: password,
        }
        try{
            const response = await nodeJS.post("/login", returnObject)
            if(response.data.message === "Login success"){
                setTimeout(()=>{
                    setAlert(false)
                  }, 2000)  
                  setAlert(true)
            }
            else{
                setTimeout(()=>{
                    setAlertFailure(false)
                  }, 2000)
                  setAlertFailure(true)
            }
        }
        catch(err){
            console.log(err)
            setTimeout(()=>{
                setAlertFailure(false)
              }, 2000)
              setAlertFailure(true)
        }
        
    }
    
    const resetPassword = async (event) => {
        event.preventDefault()

        const returnObject = {
            email: email
        }
        try{
            const response = await nodeJS.put("/reset-password", returnObject)
            if(response.data.message === "Verification mail sent"){
                setTimeout(()=>{
                    setAlert(false)
                  }, 2000)
                  setAlert(true)
            }
            else{
                setTimeout(()=>{
                    setAlertFailure(false)
                  }, 2000)
                  setAlertFailure(true)
            }
        }
        catch(err){
            setTimeout(()=>{
                setAlertFailure(false)
              }, 2000)
              setAlertFailure(true)
        }
        
    }
    return(
        <div className="login-page" >
            <div className="form">
              <form  className={signUpClass} onSubmit={(e) => createUser(e)}>
                <h1 style={{marginBottom: "30px",color:  "#FFFF"}}><b>Sign Up</b></h1>

                <select name="Role" id="role" required onChange={e => setRole(e.target.value)}>
                  <option value="">--Select Role--</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
                <input type="text" placeholder="email address" onChange={e => setEmail(e.target.value)}  required/>
                <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} required/>
                <button>create</button>
                <p className="message">Already registered? <a href="#!" onClick={onAlreadyRegistered}>Sign In</a></p>
              </form>
              <form  className={loginClass} onSubmit={(e) => lognIn(e)}>
                <h1 style={{marginBottom: "30px",color:  "#FFFF"}}><b>Log In</b></h1>
                <input type="text" placeholder="username" onChange={e => setEmail(e.target.value)} required/>
                <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} required/>
                <p className="message" style={{marginTop: "10px"}}>Forgot password? <a href="#!" onClick={onResetPassword}>Reset password</a></p>
                <button style={{marginTop: "10px"}} >login</button>
                <p className="message">Not registered? <a href="#!" onClick={onCreateAccount}>Create an account</a></p>
              </form>
              <form  className={resetClass} onSubmit={(e) => resetPassword(e)}>
                <h3 style={{marginBottom: "30px",color:  "#FFFF"}}><b>Password Reset</b></h3>
                <input type="text" placeholder="username" onChange={e => setEmail(e.target.value)} required/>
                <button style={{marginTop: "10px"}} >Reset</button>
                <p className="message">Want to sign in? <a href="#!" onClick={onSignIn}>Sign In</a></p>
              </form>
            </div>
            {alert ? <div role="alert" className="alert alert-success myAlert-bottom"><strong>Success</strong></div> : null }
            {alertFailure ? <div role="alert" className="alert alert-danger myAlert-bottom"><strong>Request Failed</strong></div> : null }
          </div>
    )
}

export default Login