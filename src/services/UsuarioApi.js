import { HTTPClient } from "./Client";

const UsuarioApi = {
    async obterAsync(usuarioId) {
            const response = await HTTPClient.get(`/Usuario/Obter/${usuarioId}`);
            return response.data;
    },

    async verificarLogin(email, senha) {
        const usuario = {
            Email: email,
            Senha: senha
        }

        const response = await HTTPClient.post(`Usuario/VerificarLogin`, usuario);
        return response.data;
    },

    async criarAsync(nome, email, senha) {

        const usuarioCriar = {
            nome: nome,
            email: email,
            senha: senha
        };

        const response = await HTTPClient.post('/Usuario/Criar', usuarioCriar);

        return response.data;
    },

    async atualizarAsync(id, nome, email) {
        const usuarioAtualizar = {
            id: id,
            nome: nome,
            email: email
        };

        const response = await HTTPClient.put('/Usuario/Atualizar', usuarioAtualizar);
        return response.data;
    },

    async alterarSenhaAsync(id, senha, senhaAntiga) {
        const usuarioAlterarSenha = {
            id: id,
            senha: senha,
            senhaAntiga: senhaAntiga
        };

        const response = await HTTPClient.put('/Usuario/AlterarSenha', usuarioAlterarSenha);
        return response.data;
    },

    async listarAsync(ativos) {
        try {
            const response = await HTTPClient.get(`/Usuario/Listar?ativos=${ativos}`);
            return response.data;

        } catch (error) {
            console.error("Erro ao listar usuários:", error);
            throw error;
        }
    },
}

export default UsuarioApi;