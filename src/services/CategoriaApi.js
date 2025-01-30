import { HTTPClient } from "./Client";

const CategoriaApi = {
    async obterAsync(categoriaId) {
            console.log("antes da api");
            const response = await HTTPClient.get(`/Categoria/Obter/${categoriaId}`);
            console.log("depois da api");
            return response.data;
    },

    async listarAsync(usuarioId, ativo) {
            const response = await HTTPClient.get(`/Categoria/Listar/${usuarioId}/${ativo}`);
            return response.data;
    },

    async AtualizarAsync(id, nome) {
            const categoriaAtualizar = {
                id: id,
                nome:nome
            };
            const response = await HTTPClient.put('/Categoria/Atualizar', categoriaAtualizar);
         
            return response.data;
    },

    async deletarCategoriaAsync(categoriaId) {
            const response = await HTTPClient.delete(`/Categoria/Deletar/${categoriaId}`);
            return response.data;
    },

    async criarAsync(tipoTransacaoId, nome, usuarioId) {
            const categoriaCriar = {
                tipo: Number(tipoTransacaoId),
                nome: nome,
                usuarioId: usuarioId
            };

            const response = await HTTPClient.post('/Categoria/Criar', categoriaCriar);

            return response.data;
    },
}

export default CategoriaApi;