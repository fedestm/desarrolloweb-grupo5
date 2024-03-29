import React from 'react'
import ExercisesForm from '../components/ExerciseForm'
import Card from '../components/Card'

class ExercisesNew extends React.Component{

  
    state = {
        form:{
            title: '',
            description: '',
            Registro: '', 
            Sujeto: '',
            Fecha: '' 
        },
        envio:{
            tipo_publicacion_get: '',
            mensaje_publicacion_get: '',
            carnet_publicacion_get: '', 
            sujeto_publicacion_get: '',
        }
    }

    hadleChange = e => {
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }
    
    handleSubmit = async e => {
     
        this.state.envio.tipo_publicacion_get = this.state.form.title;
        this.state.envio.mensaje_publicacion_get = this.state.form.description;
        this.state.envio.carnet_publicacion_get = this.state.form.Registro;
        this.state.envio.sujeto_publicacion_get = this.state.form.Sujeto;
        console.log(this.state.envio)
        try{
                let result = await fetch('http://localhost:3001/crear_publicacion',{
                method: 'post',
                headers: {
                    'Accept':'application/json',
                    'Content-type': 'application/json',
                },
                    body: JSON.stringify(this.state.envio)
                }); 
                    console.log('que paso:',result)
           }catch (error){
                console.log('eerroor')
           }
     }
    


    render(){
        return (
            <div className="row">
                <Card {...this.state.form}/>
                <div className="col-sm">
                    <ExercisesForm
                    onChange={this.hadleChange}
                    onSubmit={this.handleSubmit}
                    form={this.state.form}
                    value={this.state.value}
                    />
                </div>
            </div>
        )
    }
}

export default ExercisesNew