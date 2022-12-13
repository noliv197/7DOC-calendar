import {Aniversario, ListaAniversarios} from "./model/aniversario.js"
import {MensagemView} from "./view/mensagemView.js"
import {AniversariosView} from "./view/aniversariosView.js"
import {Service} from "./service/service.js"
import { Bind } from "./service/proxy.js";
import { Mensagem } from "./model/mensagem.js";
import utils from "./utils/utils.js";


export class AniversarioController{
    constructor(){
        let $ = document.querySelector.bind(document);

        this._inputNome = $('#nome');
        this._inputData = $('#data');
        this._titulo = $('.titulo')
        this._botao = $('.btn')
        this._tr
        this._id
        this._key
        this._inputNomeEdicao
        this._inputDataEdicao
  
        this._listaAniversarios = new Bind(
            new ListaAniversarios(),
            new AniversariosView($('#tabelaView')),
            'adiciona','edita', 'deleta'
        )
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto'
        ) 

        this._service = new Service()
        this._init()
    }

    acao(evento){
        if(this._titulo.innerText == 'Cadastro'){
            this._adiciona(evento)
        }else{
            this._edita(evento)
        }
    }
    acaoBotoes(evento){
        let ehBotaoEdita = evento.target.className === 'btn__acao btn--edicao'
        let ehBotaoDeleta = evento.target.className === 'btn__acao btn--deletar'
        if(ehBotaoEdita){
            this._pegaKey(evento)
            this._pegaId(evento)
            this._pegaDados()
        }
        else if(ehBotaoDeleta){
            this._pegaKey(evento)
            this._pegaId(evento)
            this._deleta()
        }
    }
    
    _init(){
        this._service
        .lista()
        .then(aniversarios => 
            aniversarios.forEach(aniversario => 
                this._listaAniversarios.adiciona(aniversario)))
        .catch(erro => this._mensagem.texto = erro);   
    }

    _adiciona(evento) {
        evento.preventDefault();
        let aniversario = this._criaAniversario();
        
        this._service
            .cadastra(aniversario)
            .then(mensagem => {
                this._listaAniversarios.adiciona(aniversario);
                this._mensagem.texto = mensagem;
                utils.limpaFormulario(this._inputNome,this._inputData)
                utils.limpaAviso()
            })
            .catch(erro => this._mensagem.texto = erro);
    }
    _deleta(){
        this._service
            .apaga(this._key)
            .then(mensagem=>{
                this._listaAniversarios.deleta(this._id)
                this._mensagem.texto = mensagem;
                utils.limpaAviso()
            })
    }
    _edita(evento){
        evento.preventDefault()
        this._titulo.innerText = 'Cadastro'
        this._botao.innerText = 'Salvar'

        this._service   
            .atualiza(
                this._inputNome.value,
                this._inputData.value,
                this._key
            )
            .then(mensagem=>{
                this._mensagem.texto = mensagem
                  this._listaAniversarios.edita(
                        this._id,
                        this._inputNome.value,
                        this._inputData.value,
                    )
                utils.limpaFormulario(this._inputNome,this._inputData)
                utils.limpaAviso()
            })
    }

    _criaAniversario() {
        return new Aniversario(
            this._inputNome.value,
            this._inputData.value,
            utils.geraKey(6)
        )
    }
    _pegaId(evento){
        this._tr = evento.target.closest('[data-id]')
        this._id = this._tr.dataset.id
    }
    _pegaKey(evento){
        this._tr = evento.target.closest('[data-key]')
        this._key = this._tr.dataset.key
    }
    _pegaDados(){
        this._titulo.innerText = 'Edição'
        this._botao.innerText = 'Salvar alterações'
        
        this._inputNomeEdicao = this._tr.children[0].innerText
        this._inputDataEdicao = Aniversario.textoParaData(this._tr.children[1].innerText)
        
        utils.exibeValor(
            this._inputNome,
            this._inputData,
            this._inputNomeEdicao,
            this._inputDataEdicao
        )
    }

}