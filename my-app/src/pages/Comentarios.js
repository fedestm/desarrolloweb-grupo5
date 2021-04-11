import React from 'react';
import {TableContainer,Table,TableHead,TableBody,TableRow,TableCell} from '@material-ui/core';
import Card from '../components/Card'
import axios from 'axios'
import Globales from '../components/globales'
function obtener(id){

    global.setID=id
console.log(global.setID)
}



class ExerciseList extends React.Component{
    state = {
        data:
        [{Descripcion: "Buen catedratico",
        Registro: 202000119,
        id_publicacion: 1}]
    }
    
    componentDidMount() {
        console.log('aq')
        console.log(global.idComentario)
       
        axios
          .get("http://localhost:3001/ver_coemntarios")
          .then((response) => {
            console.log(response);
            this.setState({ nombre_curso: response.data });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    render(){ 
     
console.log(Card.datos)

    
    return(
        <div>
            <TableContainer>
                <Table> 
                    <TableHead>
                        <TableRow>
                            <TableCell>Usuario</TableCell>
                            <TableCell>Comentario</TableCell>
                        </TableRow>
                    </TableHead> 

                    <TableBody>
                    {this.state.data.map((data)=>(
                        <TableRow>
                        <TableCell>{data.Registro}</TableCell>
                        <TableCell>{data.Descripcion}</TableCell>
                        </TableRow>
                    ))} 

                    </TableBody>
                </Table>
            </TableContainer>


        </div>
    )
}}

export default ExerciseList
