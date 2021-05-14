
document.addEventListener("DOMContentLoaded", function(event){
    const alertListagem = document.querySelector('#alertListagem');
    alertListagem.style.display = 'none';
    
    const alertCadastro = document.querySelector('#alertCadastro');
    alertCadastro.style.display = 'none';

    const frmCadastro = document.getElementById("frmCadastro");
    
    frmCadastro.onsubmit = (evt) => {
        evt.preventDefault();
    }
}); // End of DOMContentLoaded