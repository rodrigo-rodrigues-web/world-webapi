
document.addEventListener("DOMContentLoaded", function(event){
    if(location.href.indexOf('delete=true') != -1){
        displayMessage("alertListagem", "Country deleted sucessfully");
    }
    else if(location.href.indexOf('edit=true') != -1){
        displayMessage("alertListagem", "Country edited sucessfully");
    }
    else if(location.href.indexOf('new=true') != -1){
        displayMessage("alertListagem", "Country added sucessfully");
    }
    else if(location.href.indexOf('erro') != -1){    
        displayMessage("alertCadastro", "There was an error!");
    }
}); // End of DOMContentLoaded


function displayMessage(selector, msg) {
    let display = document.getElementById(selector);
    display.innerText = msg;
    display.style.display = 'block';
    setTimeout(() => {
        display.style.display = 'none';
    }, 2000);
}