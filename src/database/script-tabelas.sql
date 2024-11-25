CREATE DATABASE ProjetoIndividual;

USE ProjetoIndividual;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(45)
);

CREATE TABLE avaliacao(
idAvaliacao int primary key auto_increment,
nota varchar(45),
fkUsuario int unique,
foreign key (fkUsuario) references usuario(id) 
);

CREATE TABLE pontuacao(
idPontuacao int primary key auto_increment,
pontos varchar(45),
fkUsuario int,
foreign key (fkUsuario) references usuario(id)
);

select * from usuario;

SELECT id, nome, email FROM usuario WHERE email = 'gabriel@gmail.com' AND senha = 'gabriel1';

select* from pontuacao;


