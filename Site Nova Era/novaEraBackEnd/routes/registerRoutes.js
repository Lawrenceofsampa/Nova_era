const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../config/db");

const router = express.Router();

// Rota para cadastro de usuários
router.post("/cadastrar", async (req, res) => {
    const { cpf, nome_completo, data_nascimento, email, telefone, senha } = req.body;

    try {
        // Criptografar a senha
        const senhaCriptografada = await bcrypt.hash(senha, 8);

        // Inserir o novo usuário no banco de dados
        db.run(
            `INSERT INTO usuarios (cpf, nome_completo, data_nascimento, email, telefone, senha) VALUES (?, ?, ?, ?, ?, ?)`,
            [cpf, nome_completo, data_nascimento, email, telefone, senhaCriptografada],
            function (err) {
                if (err) {
                    // Verifica se o erro é devido a um CPF ou e-mail duplicado
                    if (err.message.includes("UNIQUE constraint")) {
                        return res.status(400).json({ error: "CPF ou e-mail já cadastrado" });
                    }
                    return res.status(500).json({ error: "Erro ao salvar o usuário" });
                }
                res.json({ message: "Usuário cadastrado com sucesso!" });
            }
        );
    } catch (error) {
        res.status(500).json({ error: "Erro ao processar o cadastro" });
    }
});

module.exports = router;
