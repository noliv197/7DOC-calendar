const limpaFormulario = (inputNome,inputData,foco=false) => {
    inputNome.value = '';
    inputData.value = '';
    if(foco){
        inputNome.focus();   
    }
}
const limpaAviso = () => {
    const aviso = document.querySelector('#mensagemView')
    if(aviso.innerHTML != ''){
        setTimeout(function() {aviso.innerHTML = ''}, 3000)
    } 
}
const exibeValor = (inputNome,inputData,nome,data) => {
    inputNome.value = nome;
    inputData.value = data;
    inputNome.focus();   
}

const geraKey = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const  utils = {limpaFormulario,limpaAviso,exibeValor,geraKey}
export default utils

