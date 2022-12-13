export class MensagemErro{
    constructor(){
        
        this._tiposErro = [
            'valueMissing',
            'patternMismatch',
            'tooShort'
        ];
        
        this._mensagemErro = {
            nome:{
                valueMissing: 'Campo não pode estar vazio ',
                patternMismatch: 'O nome precisa ter no mínimo 3 letras e no máximo 50 letras e não pode conter números',
                tooShort: 'O nome precisa ter no mínimo 3 letras'
            },
            data:{
                valueMissing: 'Campo não pode estar vazio ',
                patternMismatch: 'Data deve estar no formato DD/MM/AAAA',
            },
        };
    }

    mostraErro(campo,tipoCampo){
        let mensagem = '';
        this._tiposErro.forEach(erro => {
            if(campo.validity[erro]){
                mensagem = this._mensagemErro[tipoCampo][erro];
            }
        });

        return mensagem;
    }   
}

export class Validacao{
    constructor(){
        this._inputs = document.querySelectorAll('.input__formulario')
        this._regex = {
            nome: '^([A-Z]*[a-z]*[á-ú]*[Á-Ú]*\\s*){2,75}$',
            data: '^([0-2][0-9]|(3)[0-1])(\\/)(((0)[0-9])|((1)[0-2]))(\\/)\\d{4}$',
        }
    }
    
    validaCampo(campo){
        const tipoCampo = campo.dataset.tipo;
        //validação de Pattern
        if(this._regex[tipoCampo]){
            campo.pattern = this._regex[tipoCampo]
        }
        
        //mensagem de erro
        if(campo.validity.valid){
            campo.classList.remove('input__invalido')
            campo.nextElementSibling.classList.remove("texto__erro")
            campo.nextElementSibling.innerHTML = ""
        }else{
            campo.classList.add('input__invalido')
            campo.nextElementSibling.classList.add("texto__erro")
            campo.nextElementSibling.innerHTML = new MensagemErro().mostraErro(campo, tipoCampo)
        }
    } 

    aplicaValidacao(){
        this._inputs.forEach(input => {
            input.addEventListener('blur', (evento) =>{
                this.validaCampo(evento.target)
            })
        });
    }
}

