import { HTTPClient } from "./Client";

const RelatorioApi = {
    async obterSaldoTotalAsync(usuarioId, tipo = null, categoriaId = null, dataInicio = null, dataFim = null) {
        const parametro = {
            UsuarioId: usuarioId,
            DataInicio: dataInicio,
            DataFim: dataFim,
            CategoriaId: categoriaId,
            Tipo: tipo,
        };

        const response = await HTTPClient.get('/Relatorio/ObterSaldoTotal', { params: parametro });
        return response.data;
    },

    async obterTransacoesComFiltroAsync(usuarioId, tipo = null, categoriaId = null, dataInicio = null, dataFim = null) {

        const parametros = {
            UsuarioId: usuarioId,
            Tipo: tipo,
            CategoriaId: categoriaId,
            DataInicio: dataInicio,
            DataFim: dataFim
        };

        const response = await HTTPClient.get('/Relatorio/ObterTransacoesFiltradas', { params: parametros });
        return response.data;

    }
}

export default RelatorioApi;
