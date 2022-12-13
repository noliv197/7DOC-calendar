import {View} from './view.js'
import { Aniversario } from '../model/aniversario.js';

export class AniversariosView extends View {
    constructor(elemento) {
        super(elemento);
    }
    
    template(model) {
        return `
            <table class="tabela">
            <thead>
                <tr>
                    <th class="coluna__nome">Nome</th>
                    <th class="coluna__data">Data de Aniversário</th>
                    <th class="coluna__acao">Ações</th>
                </tr>
            </thead>
            <tbody>
                ${model.aniversarios.map(n => `
                <tr data-id='${model.aniversarios.indexOf(n)}' data-key='${n.key}'>
                    <td>${n.nome}</td>
                    <td>${Aniversario.dataParaTexto(n.data)}</td>
                    <td><button class="btn__acao btn--edicao">Editar</button> <button class="btn__acao btn--deletar">Deletar</button></td>
                </tr>
                `).join('')}
            </tbody>
        </table>               
        `
    }
}
