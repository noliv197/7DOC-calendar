import { Aniversario } from "../model/aniversario.js";

export class Dao {
    constructor(connection) {
        this._connection = connection;
        this._store = 'storage';
    }

    adiciona(aniversario) {
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(aniversario);

            request.onsuccess = e => {
                resolve();
            };
            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível adicionar a negociação');
            };
        });
    }

    listaTodos() {
        return new Promise((resolve, reject) => {
            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            let aniversarios = [];

            cursor.onsuccess = e => {
                let atual = e.target.result;
                if(atual) {
                    let dado = atual.value;
                    aniversarios.push(new Aniversario(
                        dado._nome, 
                        dado._data,
                        dado.chave
                    ));
                    atual.continue();

                } else {
                    resolve(aniversarios);
                }
            };
            cursor.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível listar os aniversários');
            };
        });
    }

    apagaItem(chave) {
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .delete(chave);
 
            request.onsuccess = e => resolve('Aniversário apagado com sucesso');
            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível apagar o aniversário');
            };
        });

    } 
    atualizaItem(nome,data,chave) {
        return new Promise((resolve, reject) => {
            let store = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)

            let request = store.get(chave)
            request.onsuccess = () =>{

                const aniversario = request.result
                const aniversarioEditado = new Aniversario(
                    nome, 
                    data,
                    aniversario.chave
                )
                
                let update = store.put(aniversarioEditado)
                update.onsuccess = () =>resolve('Aniversário atualizado com sucesso');
                update.onerror= e => {
                    console.log(e.target.error);
                    reject('Não foi possível atualizar o aniversário');
                };
            }               
            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível atualizar o aniversário');
            };
        });

    } 
}