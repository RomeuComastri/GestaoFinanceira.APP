import { HTTPClient } from "./Client";

const TransacaoApi = {
    async obterAsync(transacaoId) {
            const response = await HTTPClient.get(`/Transacao/Obter/${transacaoId}`);
            return response.data;
    },

    async listarAsync(ativos) {
        try {
            const response = await HTTPClient.get(`/Transacao/Listar?ativos=${ativos}`);
            return response.data;

        } catch (error) {
            console.error("Erro ao listar transações:", error);
            throw error;
        }
    },

    async criarAsync(valor, descricao, data, categoriaId) {
            const transacaoCriar = {
                valor: valor,
                descricao: descricao,
                data: data,
                categoriaId: categoriaId
            };
            const response = await HTTPClient.post('/Transacao/Criar', transacaoCriar);

            return response.data;
    },

    async AtualizarAsync(id, valor, descricao, data, categoriaId) {
            console.log("antes da api");
            const transacaoAtualizar = {
                id: id,
                valor: valor,
                descricao: descricao,
                data: data,
                categoriaId: categoriaId
            };
            const response = await HTTPClient.put('/Transacao/Atualizar', transacaoAtualizar);
            console.log("depois da api");
            return response.data;
    },

    async listarTipoTransacoesAsync() {
        const response = await HTTPClient.get(`/Transacao/ListarTipoTransacoes`);
        return response.data;

    },

    async deletarTransacaoAsync(transacaoId) {
            const response = await HTTPClient.delete(`/Transacao/Deletar/${transacaoId}`);
            return response.data;
    },
}

export default TransacaoApi;