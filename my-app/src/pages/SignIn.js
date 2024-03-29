import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockIcon from "@material-ui/icons/Lock";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";


const getValueUser = (event) =>{
  event.preventDefault();
  global.email = event.target.value
 }
 
 const getValuePassword = (event) =>{
  event.preventDefault();
  global.password= event.target.value
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
 

const SignIn = ({onClick}) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inicio de Sesión
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
            name="contraseña"
            label="Contraseña"
            type="password"
            id="contraseña"
            autoComplete="contraseña-actual"
            onChange = {getValuePassword} 
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recordar mi usuario"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick= {onClick}
         
          >
            Ingresar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="./reiniciar-contraseña" variant="body2">
                ¿Olvidó su contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link href="./Nuevo-Usuario" variant="body2">
                {"¿No tienes una cuenta? Crea una"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignIn