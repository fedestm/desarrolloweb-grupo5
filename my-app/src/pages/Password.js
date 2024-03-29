import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

global.emailContrasena='';
global.CarnetContrasena='';




const getValueUser = (event) =>{
  event.preventDefault();
  global.CarnetContrasena = event.target.value
 }
 
 const getValueCorreo = (event) =>{
  event.preventDefault();
  global.emailContrasena= event.target.value

 }

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ResetPassword = ({onClick}) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VpnKeyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">

        Reiniciar Contraseña

        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="registroAcademico"
            label="Registro Académico"
            name="registroAcademico"
            autoComplete="registroAca"
            autoFocus
            onChange = {getValueUser} 
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="correoElectronico"
            label="Correo Electrónico"
            name="correoElectronico"
            autoComplete="correoElectronico"
            type="email"
            onChange = {getValueCorreo} 
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick= {onClick}
          >
            Reiniciar
          </Button>
          <Grid container justify="flex-end">
            <Grid item>


              <Link href="./Registro" variant="body2">
              Inicio de Sesión

              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
export default ResetPassword