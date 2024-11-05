// config/db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./nova_era.db');

db.serialize(() => {
    // Criar tabela de usuários
    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cpf TEXT UNIQUE NOT NULL,
            nome_completo TEXT NOT NULL,
            data_nascimento TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            telefone TEXT,
            senha TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS cursos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL
        )
    `);

    // Criar tabela de disciplinas
    db.run(`
        CREATE TABLE IF NOT EXISTS disciplinas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            curso_id INTEGER,
            FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE SET NULL
        )
    `);

    // Criar tabela de matrículas
    db.run(`
        CREATE TABLE IF NOT EXISTS matriculas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario_id INTEGER,
            disciplina_id INTEGER,
            data_matricula TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
            FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE CASCADE
        )
    `);
});

module.exports = db;
