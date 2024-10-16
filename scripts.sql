CREATE DATABASE IF NOT EXISTS school_management;

USE school_management;

CREATE TABLE salas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(10) NOT NULL,
  nome VARCHAR(50) NOT NULL,
  exclusao TINYINT DEFAULT 0
);

CREATE TABLE materias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(10) NOT NULL,
  nome VARCHAR(50) NOT NULL,
  exclusao TINYINT DEFAULT 0
);

CREATE TABLE turmas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(10) NOT NULL,
  nome VARCHAR(50) NOT NULL,
  serie INT NOT NULL,
  periodo INT NOT NULL,
  dia_semana INT NOT NULL ,
  qtd_alunos INT NOT NULL,
  materia_id INT,
  sala_id INT,
  exclusao TINYINT DEFAULT 0,
  FOREIGN KEY (materia_id) REFERENCES materias(id),
  FOREIGN KEY (sala_id) REFERENCES salas(id)
);

CREATE TABLE alunos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(10) NOT NULL,
  nome VARCHAR(50) NOT NULL,
  cpf VARCHAR(11) NOT NULL,
  data_nascimento DATE NOT NULL,
  email VARCHAR(50),
  telefone VARCHAR(15),
  endereco VARCHAR(100),
  turma_id INT,
  exclusao TINYINT DEFAULT 0,
  FOREIGN KEY (turma_id) REFERENCES turmas(id)
);
