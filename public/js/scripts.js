
// document.addEventListener("DOMContentLoaded", function(event){
//     // console.log("RUNNING CONTENTLOAD");
//     const alertListagem = document.querySelector('#alertListagem');
//     alertListagem.style.display = 'none';
    
//     const alertCadastro = document.querySelector('#alertCadastro');
//     alertCadastro.style.display = 'none';

//     const frmCadastro = document.getElementById("frmCadastro");
    
//     frmCadastro.onsubmit = (evt) => {
//         // evt.preventDefault();
//     }
// }); // End of DOMContentLoaded
// alert("TEST");
if(location.href.indexOf('delete=true') != -1){
    alert('Cliente excluído com sucesso!');
}
else if(location.href.indexOf('edit=true') != -1){
    alert('Cliente editado com sucesso!');
}
else if(location.href.indexOf('new=true') != -1){
    alert('Cliente cadastrado com sucesso!');
}
else if(location.href.indexOf('erro') != -1){
    alert('Ocorreu um erro!');
}