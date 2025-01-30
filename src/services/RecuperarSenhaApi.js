import { HTTPClient } from "./Client";

const RecuperarSenhaApi = {
    async enviarEmailAsync(email) {
        const objeto = {
            Email: email
        }
        const response = await HTTPClient.post(`/RecuperarSenha/EnviarEmail`, objeto);
        return response.data;
    },

    async enviarCodigoAsync(email, codigo) {
        const objeto = {
            Email: email,
            Codigo: codigo
        }
        const response = await HTTPClient.post(`/RecuperarSenha/EnviarCodigo`, objeto);
        return response.data;
    },

    async AlterarSenhaAsync(email, senha) {
        const objeto = {
            Email: email,
            NovaSenha: senha
        }
        const response = await HTTPClient.post(`/RecuperarSenha/AlterarSenha`, objeto);
        return response.data;
    }
}

export default RecuperarSenhaApi;