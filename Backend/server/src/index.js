//Se utilizan los siguientes modulos para su posterior uso
/*Uso de express como framework y mysql para las funciones necesarias
de la base de datos 
Se utiliza body parser para tener acceso a body y para hacer uso de post
*/
const bodyP = require('body-parser');
const exp=require('express')
const mysql=require('mysql')
const cors=require('cors')
const app=exp()
app.use(cors());
app.use(exp.json());


//Se creo conexion de base de datos
const base_datos=mysql.createPool({
    host:"localhost",               //Host de alojamiento de base de datos
    user:"root",                    //Usuario de host
    password:"",                    //Contraseña
    database:"portal_estudiantil"   //Nombre de la base de datos
});

//Ruta por defecto de servidor
app.get('/',(req,res)=>{
    console.log("Servidor Node JS")
    res.send("Servidor Node JS")
});

//Haciendo uso de body-parser
app.use(bodyP.urlencoded({
    extended:true
}));

/*Se añade funcion post que obtendra parametros de componentes del lado del cliente
(React JS)
*/
app.post('/registrar_alumno',(req,res)=>{
    const txt_carnet=req.body.carnet_get;   //Se obtiene los valores de componentes de React
    const txt_nombre=req.body.nombre_get;
    const txt_apellidos=req.body.apellidos_get;
    const txt_contrasena=req.body.constrasena_get;
    const txt_correo=req.body.correo_get;
    //Se insertan los datos en base de datos 
    //Usando misma estructura que el formato sql
    const insertrar_registro_sql="INSERT INTO registro (carnet,nombres,apellidos,contrasena,correo) VALUES (?,?,?,?,?);"
    //Se obtienene los valores de las constantes declaradas al inicio de la función post
    base_datos.query(insertrar_registro_sql,[txt_carnet,txt_nombre,txt_apellidos,txt_contrasena,txt_correo],(err,result)=>{
    //Se envia mensaje de registro exitoso
    res.send("Se registro con éxito el alumno.");
    console.log("Se registro con éxito el alumno.");
    console.log(res)
    })
}); 


//Mostrar Comentarios
app.post('/Comentarios',(req,res)=>{
    const publicacionid_comentarios=req.body.publicacionid_comentarios_get;
    const selector_ComentariosSQL='SELECT*FROM comentarios WHERE id_publicacion=?'

    base_datos.query(selector_ComentariosSQL,[publicacionid_comentarios],(err,result)=>{
        console.log(result)
        console.log('colsulta  exitosa')
        res.send(result)
    })
});

//Ver comentarioss
app.get('/ver_coemntarios',(req,res)=>{
    const publicacionid_comentarios=req.body.publicacionid_comentarios_get;
    const selector_ComentariosSQL='SELECT*FROM comentarios WHERE id_publicacion=?'

    base_datos.query(selector_ComentariosSQL,[publicacionid_comentarios],(err,result)=>{
        console.log(result)
        console.log('colsulta  exitosa')
        res.send(result)
    })
});


//Realizar el login del usuario registrado
app.post('/login',(req,res)=>{
    const txt_login_usuario=req.body.carnet_login_get;
    const txt_login_contrasena=req.body.constrasena_login_get;
    //Se verifican que valores de los componentes deben coincidir
    if(txt_login_usuario&&txt_login_contrasena){
        /*Se seleccionan los datos que se validaran de la base de datos, en este caso es
        carnet y contraseña*/
        const validar_autenticacion_sql="SELECT*FROM registro WHERE carnet=? AND contrasena=?";
        //Se verifican los valores existentes y si coinciden
        base_datos.query(validar_autenticacion_sql,[txt_login_usuario,txt_login_contrasena],(err,result)=>{
        //Se verifica la longitud de la respuesta si es mayor y si es correcta
        if(result.length>0){
            //Se manda mensaje en consola
            res.send(result);
            console.log(result.length);
            console.log("Se autentiasdasdco con exito");
           
        }else{
            console.log(result.length);
            res.send(result);
            console.log("Error, usuario o contraseña incorrecto");
        }
        //Finaliza respuesta
        res.end();
        })
    }
});



//Recuperación de contraseña olvidada
app.post('/recuperar_password',(req,res)=>{
    //Valores de componentes de React sobre contraseña olvidada
    const txt_carnet_recuperarcontrasena=req.body.carnet_recuperarcontrasena_get;
    const txt_correo_recuperarcontrasena=req.body.correo_recuperarcontrasena_get;
    //Verificar datos que deben coincidir
    if(txt_carnet_recuperarcontrasena&&txt_correo_recuperarcontrasena){
        //Se selecciona contraseña verificando si el usuario y contraseña coincide
        const recuperarcontra_sql="SELECT contrasena FROM registro WHERE carnet=? AND correo=?";   
        //Se realiza la consulta
        base_datos.query(recuperarcontra_sql,[txt_carnet_recuperarcontrasena,txt_correo_recuperarcontrasena],(err,result)=>{
        //Se verifica si es mayor y si es correcto
        if(result.length>0){
            //Se muestra la contraseña
            res.send(result);
            console.log(result);
            console.log('Recuperar contrasena exitoso')
        }else{
            res.send("Error, no coinciden los datos ingresados");
            console.log("Error, no coinciden los datos ingresados")
        }
        //Se finaliza la respuesta
        res.end();
        })
    }
});

app.get('/mostrar_estudiantes',(req,res)=>{
    const mEstudiantes="SELECT*FROM registro;"
    base_datos.query(mEstudiantes,(err,result)=>{
        console.log(result);
        res.send(result)
    })
});

//Creacion de publicacion 
// ACTUALIZADO
app.post('/crear_publicacion',(req,res)=>{
    const tipo_publicacion=req.body.tipo_publicacion_get;
    const mensaje_publicacion=req.body.mensaje_publicacion_get;
    const carnet_publicacion=req.body.carnet_publicacion_get;
    const sujeto_publicacion=req.body.sujeto_publicacion_get; 
    //Se descarta ID y fecha porque se ingresan automaticamente
    const crear_publicacionSQL='INSERT INTO publicacion (title,description,Registro,Sujeto) VALUES (?,?,?,?);'
    base_datos.query(crear_publicacionSQL,[tipo_publicacion,mensaje_publicacion,carnet_publicacion,sujeto_publicacion],(err,result)=>{
        console.log(result)
        console.log('creacion  exitosa')
        res.send(result)
    })
});

//Ver publicacion
app.get('/ver_publicacion',(req,res)=>{
    //Se descarta ID y fecha porque se ingresan automaticamente
    const ver_publicacionSQL='SELECT*FROM publicacion'
    base_datos.query(ver_publicacionSQL,(err,result)=>{
        console.log(result)
        res.send(result)
    })
});

//Suma de creditos
app.post('/suma_cursosaprobados',(req,res)=>{
    const txt_login_usuario=req.body.carnet_login_get;
    //Se selecciona carnet si lo solicitado es igual
    const suma_cursosSQL='SELECT SUM(creditos) AS Creditos FROM cursos_aprobados WHERE carnet=?'
    base_datos.query(suma_cursosSQL,[txt_login_usuario],(err,result)=>{
        console.log(result)
        res.send(result)
    })
});




app.get('/lista_cursosdtt',(req,res)=>{
    const cursos_completosSQL='SELECT*FROM cursos'
    base_datos.query(cursos_completosSQL,(err,result)=>{
        console.log(result)
        res.send(result)
    })
});

//INSERT INTO comentariostemp (id_publicacion,Registro,Descripcion) VALUES  (11,202000119,'si hazlo compa');
//Mandar datos a comentatios
app.post('/crear_comentario',(req,res)=>{
    const id_publicacion=req.body.id_publicacion;
    const carnet_comentario=req.body.Registro;
    const descripcion_comentario=req.body.Descripcion;
    //Se selecciona carnet si lo solicitado es igual
    const comentarios_SQL='INSERT INTO comentariostemp (id_publicacion,Registro,Descripcion) VALUES (?,?,?);'
    base_datos.query(comentarios_SQL,[id_publicacion,carnet_comentario,descripcion_comentario],(err,result)=>{
        console.log(result)
        res.send(result)
    })
});

//Mostrar Comentarios Temporales
app.get('/mostrar_comentarios',(req,res)=>{
    const comentarios_MosSQL='SELECT*FROM comentariosTemp'
    base_datos.query(comentarios_MosSQL,(err,result)=>{
        console.log(result)
        res.send(result)
    })
});


//Mostrar comentario segun id de publicacion
app.get('/ver_comentarios_publicacion/:id_publicacion',(req,res)=>{
    const id_publicacion=req.params.id_publicacion
    const vercomentarioid_SQL='SELECT * FROM comentariostemp WHERE id_publicacion=?;' 
    base_datos.query(vercomentarioid_SQL,[id_publicacion],(err,result)=>{
        res.send(result)
        console.log(result)
    })
});


//Get columnas de curso
app.get('/select_cursos',(req,res)=>{
    const selector_cursosSQL='SELECT nombre_curso FROM cursos;'
    base_datos.query(selector_cursosSQL,(err,result)=>{
        console.log(result)
        res.send(result)
    })
});



//Get columnas de profesor
app.get('/select_profesor',(req,res)=>{
    const selector_profesorSQL='SELECT profesor FROM cursos;'
    base_datos.query(selector_profesorSQL,(err,result)=>{
        console.log(result)
        res.send(result)
    })
});


//Eliminar comentario
app.post('/eliminar_comentario',(req,res)=>{
    const id_publicacion_temporal=req.body.id_publicaciontemporal_get;
    const del_comentarioSQL='DELETE FROM comentariosTemp WHERE id_publicacion=?'
    base_datos.query(del_comentarioSQL,[id_publicacion_temporal],(err,result)=>{
        console.log(result)
        res.send(result)
    })

});
//--------------------------------------------------------------



//Ver publicacion Porfesores
app.get('/ver_publicacionProfesores',(req,res)=>{
    //Se descarta ID y fecha porque se ingresan automaticamente
    const ver_publicacionSQL='SELECT * FROM publicacion WHERE title="Profesor"'
    base_datos.query(ver_publicacionSQL,(err,result)=>{
        console.log(result)
        res.send(result)
    })
});

//Ver publicacion Crusos
app.get('/ver_publicacionCrusos',(req,res)=>{
    //Se descarta ID y fecha porque se ingresan automaticamente
    const ver_publicacionSQL='SELECT * FROM publicacion WHERE title="Curso"'
    base_datos.query(ver_publicacionSQL,(err,result)=>{
        console.log(result)
        res.send(result)
    })
});

//Ver publicacion segun profesor y sujeto 0-1
app.get('/verpublicacion_profesor/:sujeto',(req,res)=>{
    const sujeto=req.params.sujeto;
    const verpublicacion_profesorSQL='SELECT*FROM publicacion WHERE title="Profesor" AND Sujeto=?'
    base_datos.query(verpublicacion_profesorSQL,[sujeto],(err,result)=>{
        res.send(result)
        console.log(result)
    })
});


//Ver publicacion segun curso y sujeto 0-1
app.get('/verpublicacion_Curso/:sujeto',(req,res)=>{
   const sujeto=req.params.sujeto;
   const verpublicacion_cursoSQL='SELECT * FROM publicacion WHERE title="Curso" AND Sujeto=?'
   base_datos.query(verpublicacion_cursoSQL,[sujeto],(err,result)=>{
        res.send(result)
        console.log(result)
   })
});



//-------------------------------------------------------------------------
//Busqueda de perfil USuario
app.post('/BusquedaUsuario',(req,res)=>{
    const txt_login_usuario=req.body.carnet_login_get;
   
    if(txt_login_usuario){
        const validar_autenticacion_sql="SELECT*FROM registro WHERE carnet=? ";
        //Se verifican los valores existentes y si coinciden
        base_datos.query(validar_autenticacion_sql,[txt_login_usuario],(err,result)=>{
        //Se verifica la longitud de la respuesta si es mayor y si es correcta
        if(result.length>0){
            //Se manda mensaje en consola
            res.send(result);
            console.log(result.length);
            console.log("Se encontro con exito");
           
        }else{
            console.log(result.length);
            res.send(result);
            console.log("Error, usuario  incorrecto");
        }
        //Finaliza respuesta
        res.end();
        })
    }
});


//Busqueda de los cursos ganados 
app.post('/BusquedaUsuarioCursos',(req,res)=>{
    const txt_login_usuario=req.body.carnet_login_get;
   
    if(txt_login_usuario){
        const validar_autenticacion_sql="SELECT * FROM cursos_aprobados WHERE carnet=? ";
        //Se verifican los valores existentes y si coinciden
        base_datos.query(validar_autenticacion_sql,[txt_login_usuario],(err,result)=>{
        //Se verifica la longitud de la respuesta si es mayor y si es correcta
        if(result.length>0){
            //Se manda mensaje en consola
            res.send(result);
            console.log(result.length);
            console.log("Se encontro con exito");
           
        }else{
            console.log(result.length);
            res.send(result);
            console.log("Error, usuario  incorrecto");
        }
        //Finaliza respuesta
        res.end();
        })
    }
});



//Asignar cursos
app.post('/Asignar_cursos',(req,res)=>{
    const id_publicacion=req.body.id_curso;
    const carnet_comentario=req.body.carnet;
    const descripcion_comentario=req.body.nombre_curso;
    const descripcion_crediitos=req.body.creditos;
    //Se selecciona carnet si lo solicitado es igual
    const comentarios_SQL='INSERT INTO cursos_aprobados (id_curso,carnet,nombre_curso,creditos) VALUES (?,?,?,?);'
    base_datos.query(comentarios_SQL,[id_publicacion,carnet_comentario,descripcion_comentario,descripcion_crediitos],(err,result)=>{
        console.log(result)
        res.send(result)
    })
});

//======================================

//Ingresar cursos apobados 
app.get('/BuscarAsignarCursos/:nombre_curso',(req,res)=>{
    const txt_login_usuario=req.params.nombre_curso;
    const validar_autenticacion_sql='SELECT * FROM cursos WHERE nombre_curso = ? ';
        base_datos.query(validar_autenticacion_sql,[txt_login_usuario],(err,result)=>{
         
            res.send(result);
            console.log(result.length);
        })
});

//----------------------------------------------
//----------------------------------------
//Ingresar cursos apobados 
app.get('/AsignarCursos',(req,res)=>{
    const txt_login_usuario=req.body.carnet_login_get;
   
    if(txt_login_usuario){
        const validar_autenticacion_sql="SELECT * FROM cursos_aprobados WHERE carnet=? ";
        //Se verifican los valores existentes y si coinciden
        base_datos.query(validar_autenticacion_sql,[txt_login_usuario],(err,result)=>{
        //Se verifica la longitud de la respuesta si es mayor y si es correcta
        if(result.length>0){
            //Se manda mensaje en consola
            res.send(result);
            console.log(result.length);
            console.log("Se encontro con exito");
           
        }else{
            console.log(result.length);
            res.send(result);
            console.log("Error, usuario  incorrecto");
        }
        //Finaliza respuesta
        res.end();
        })
    }
});
//Update registto============================================
//UPDATE registro SET nombres='' WHERE registro=20202022;

app.post('/ActialiarUsuario',(req,res)=>{
    const carnet=req.body.carnet;
    const nombres=req.body.nombres;
    const apellidos=req.body.apellidos;
    const contrasena=req.body.contrasena;
    const correo=req.body.correo;
    //Se selecciona carnet si lo solicitado es igual
    const comentarios_SQL='UPDATE registro SET nombres=?,apellidos=?,contrasena=?,correo=? WHERE carnet=?;'
    base_datos.query(comentarios_SQL,[nombres,apellidos,contrasena,correo,carnet],(err,result)=>{
        console.log(result)
        res.send(result)
    })
});



//========================================================
//----------------------------------------------
//UPDATE cursos_aprobados SET carnet=202000119 WHERE carnet='201901000'
//Insertar cursos fanados
//---------------------------------------------------------------------
//Puerto en donde sera ejecutado
app.listen(3001,()=>{
    console.log('Servidor corriendo')
});

