import { Validacao } from "./validate.js"
import {AniversarioController} from './aniversarioController.js'

const formulario = document.querySelector('[data-form]')
const tabela = document.querySelector('#tabelaView')
const controller = new AniversarioController()
formulario.addEventListener('submit', evento => {
    evento.preventDefault()
    controller.acao(evento)
})
if(tabela){
    tabela.addEventListener('click', evento =>{
        controller.acaoBotoes(evento)
    })
}
new Validacao().aplicaValidacao()

