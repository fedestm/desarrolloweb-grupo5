CREATE DATABASE PORTAL_ESTUDIANTIL;		/*Creacion de Base de Datos*/
					/*Usar Base de Datos*/	

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

/*Tabla Crear publicación de Catedrático*/
CREATE TABLE publicacion_catedratico(
	carnet INT NOT NULL,
    catedratico VARCHAR(50) NOT NULL,
    mensaje VARCHAR(255) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP, /*Generar fecha y hora automaticamente*/
    PRIMARY KEY (carnet)
);

/*Ejemplo*/
/*Insertar datos a Publicación de Catedrático*/
/*No se coloca fecha porque esta se generar automaticamente por medio de TIMESTAMP*/
INSERT INTO publicacion_catedratico (carnet,catedratico,mensaje) VALUES (201902000,'Herman Veliz','Buen catedratico');
INSERT INTO publicacion_catedratico (carnet,catedratico,mensaje) VALUES (201902002,'Herman Veliz','Imparte clases en el curso de Prácticas Iniciales del cuarto semestre');

SELECT*FROM publicacion_catedratico;


/*Filtrar por curso*/
SELECT*FROM publicacion_curso;

/*Filtrar por Catedrático*/
SELECT*FROM publicacion_catedratico;

/*Filtrar por Nombre de Curso*/
/*Ejemplo Curso Introducción a la Programación y Computación 2*/
SELECT carnet,curso,mensaje,fecha FROM publicacion_curso WHERE curso="Introduccion a la Programacion y Computacion 2";

/*Filtrar por Nombre de Catedrático*/
SELECT carnet,catedratico,mensaje,fecha FROM publicacion_catedratico WHERE catedratico="Herman Veliz";


