import utils from "../utils/utils.js"

export class Aniversario{
    constructor(nome,data,chave){
        this._nome = nome
        this._data = new Date(data).toUTCString()
        this.chave = chave
    }

    get nome(){
        return this._nome
    }
    get data(){
        return new Date(this._data)
    }
    get key(){
        return this.chave
    }


    static dataParaTexto(data) {
        return `${data.getUTCDate()}/${data.getUTCMonth()+1}/${data.getUTCFullYear()}`;
    }
    static textoParaData(texto) {
        const dataArray = texto.split('/').reverse()
        if(dataArray[1].length == 1){
            dataArray[1] = '0' + dataArray[1]
        }
        if(dataArray[2].length == 1){
            dataArray[2] = '0' + dataArray[2]
        }
        return dataArray.join('-')
    }
}

export class ListaAniversarios {
    constructor() {
        this._aniversarios = [];
    }

    get aniversarios() {
        return [].concat(this._aniversarios);
    }

    adiciona(aniversario) {
        this._aniversarios.push(aniversario);
    }
    edita(id,nome,data){
        this._aniversarios[id]._nome = nome
        this._aniversarios[id]._data = data
    }
    deleta(id) {
        this._aniversarios.splice(id,1)
    } 
}