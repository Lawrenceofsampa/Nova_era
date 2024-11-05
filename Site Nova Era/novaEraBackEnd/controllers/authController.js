// controllers/authController.js
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
    try {
        await Usuario.criar(req.body);
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar usuário', error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const usuario = await Usuario.buscarPorEmail(email);

        if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login bem-sucedido', token });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login', error });
    }
};
