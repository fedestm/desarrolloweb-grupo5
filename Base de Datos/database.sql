CREATE DATABASE PORTAL_ESTUDIANTIL;		/*Creacion de Base de Datos*/
USE PORTAL_ESTUDIANTIL;					/*Usar Base de Datos*/	

/*Creación de tabla*/
CREATE TABLE registro(
	carnet INT NOT NULL,
	nombres VARCHAR(50) NOT NULL,
	apellidos VARCHAR(50) NOT NULL,
	contrasena VARCHAR(50) NOT NULL,
	correo VARCHAR(50) NOT NULL,
	PRIMARY KEY (carnet)
);

/*Seleccionar valores de tabla registro*/
SELECT*FROM registro;

/*Buscar contraseña olvidada, muestra valor de la contraseña al 
verificar si correo y carnet son iguales*/
SELECT contrasena FROM registro WHERE carnet=201902000 AND correo="user2@example.com";

/*Tabla Crear publicación de Curso*/
CREATE TABLE publicacion_curso(
	carnet INT NOT NULL,
    curso VARCHAR(150) NOT NULL,
    mensaje VARCHAR(510) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (carnet)
);

INSERT INTO publicacion_curso (carnet,curso,mensaje) VALUES (201901000,'Introducción a la Programación y Computación 2','El segundo curso de programación');
SELECT *FROM publicacion_curso;


