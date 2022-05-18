//Login
var visibilityClick = false
function frg(){
    const eye = document.getElementById("eye")
    const input = document.getElementById("keyInput")
    if(visibilityClick == false){
        eye.innerHTML = "visibility_off"
        input.type = "text"
        visibilityClick = true
    }
    else{
        eye.innerHTML = "visibility"
        visibilityClick = false
        input.type = "password"
        console.log("invisible")
    }
}