import { Dao } from "./dao.js";
import { ConnectionFactory } from "./factoy.js";

export class Service{
    cadastra(aniversario) {
        return ConnectionFactory
            .getConnection()
            .then(conexao => new Dao(conexao))
            .then(dao => dao.adiciona(aniversario))
            .then(() => 'Aniversário adicionado com sucesso')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível fazer o cadastro')
            });
    }

    lista() {
        return ConnectionFactory
            .getConnection()
            .then(conexao => new Dao(conexao))
            .then(dao => dao.listaTodos())
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter a lista de aniversários')
            })
    }

    apaga(chave) {
        return ConnectionFactory
            .getConnection()
            .then(conexao => new Dao(conexao))
            .then(dao => dao.apagaItem(chave))
            .then(() => 'Aniversário apagado com sucesso')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível apagar o aniversário')
            })

    }
    atualiza(nome,data,chave) {
        return ConnectionFactory
            .getConnection()
            .then(conexao => new Dao(conexao))
            .then(dao => dao.atualizaItem(nome,data,chave))
            .then(() => 'Dados do aniversário atualizados com sucesso')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível atualizar os dados do aniversário')
            })

    }
}