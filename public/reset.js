//let url = "http://localhost:3001"
let url = "https://pizza-order-app-be.herokuapp.com"
let objectId = ""
function onLoad(){
    let resetURL = new URL(window.location.href)
    objectId = resetURL.searchParams.get("id");
    let randomString = resetURL.searchParams.get("rs");
    fetch(url + `/password-reset`, {
        method: "POST",
        body: JSON.stringify({
            objectId, randomString
        }),
        headers: {
            'Content-type': 'application/json'
        }
        })
        .then((resp) => resp.json())
        .then((data) => {
            let resetPage = document.getElementById("resetPageId")
            resetPage.setAttribute("class", "login-page")
            if (data.message !== 'Verification success'){                
                let resetDiv = document.getElementById("unauthFormDiv")
                resetDiv.setAttribute("class", "form")
                
            
            } 
            else{
                console.log("error")
                let resetDiv = document.getElementById("passFormDiv")
                resetDiv.setAttribute("class", "form")
            }
        })
        .catch((err)=>{
            
            let resetPage = document.getElementById("resetPageId")
            resetPage.setAttribute("class", "login-page")
            let resetDiv = document.getElementById("unauthFormDiv")
            resetDiv.setAttribute("class", "from")

        })
}

onLoad()


document.getElementById('passFormId').addEventListener('submit', function(e) {
    e.preventDefault(); //to prevent form submission
    onPasswordchange();
  });

function onPasswordchange(){
    let password = document.getElementById("resetPasswordId").value
    fetch(url + `/change-password/${objectId}`, {
        method: "PUT",
        body: JSON.stringify({
           password
        }),
        headers: {
            'Content-type': 'application/json'
        }
        })
        .then((resp) => resp.json())
        .then((data) => {
            let colDiv2 = document.getElementById("passFormId")
            let alertDiv = document.createElement("div")
            alertDiv.setAttribute("role", "alert")
            alertDiv.setAttribute("style", "margin-top: 50px")
            alertDiv.setAttribute("id", "resetPassSuccess")
            if (data.message === 'Password Changed Successfully'){
                alertDiv.setAttribute("class", "alert alert-success myAlert-bottom")
                alertDiv.innerHTML =  data.message
                colDiv2.appendChild(alertDiv)
                deleteAlert("resetPassSuccess")
            } 
            else{
                alertDiv.setAttribute("class", "alert alert-danger myAlert-bottom")
                alertDiv.innerHTML = "<strong>Failure!</strong> " + data.message
                colDiv2.appendChild(alertDiv)
                deleteAlert("resetPassSuccess")
            }
             
            
        })
        .catch((err)=>{
            console.log(err)
            let colDiv2 = document.getElementById("passFormId")
            let alertDiv = document.createElement("div")
            alertDiv.setAttribute("class", "alert alert-danger myAlert-bottom")
            alertDiv.setAttribute("role", "alert")
            alertDiv.setAttribute("style", "margin-top: 50px")
            alertDiv.setAttribute("id", "resetPassFailure")
            alertDiv.innerHTML = "<strong>Failure!</strong> Internal Server Error"
            colDiv2.appendChild(alertDiv)
            deleteAlert("resetPassFailure")
        })
}

function deleteAlert(elementId){
    setTimeout(function(){
        let node = document.getElementById(elementId)
        node.remove()
    }, 6000)
}