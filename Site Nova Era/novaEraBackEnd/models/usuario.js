const db = require('../config/db');
const bcrypt = require('bcryptjs');

class Usuario {
    static async criar(dados) {
        const senhaCriptografada = await bcrypt.hash(dados.senha, 8);
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO usuarios (cpf, nome_completo, data_nascimento, email, telefone, senha)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [dados.cpf, dados.nome_completo, dados.data_nascimento, dados.email, dados.telefone, senhaCriptografada],
                function (err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(this.lastID); // Retorna o ID do usuário criado
                }
            );
        });
    }

    static async buscarPorEmail(email) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM usuarios WHERE email = ?`, [email], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });
    }
}

module.exports = Usuario;
