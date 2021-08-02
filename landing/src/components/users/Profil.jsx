import React, {useEffect, useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { Container, Grid,Typography  } from '@material-ui/core';
import Textfield from '../FormUI/Textfield';
import DateTimePicker from '../FormUI/DataTimePicker';
import { classes } from 'istanbul-lib-coverage';
import NavBar from '../NavBarBox';
import Button from '../FormUI/Button';
import Select from '../FormUI/Select';
import formejuridiques from '../users/data/formesJuridique.json'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, green } from '@material-ui/core/colors';
import AssignmentIcon from '@material-ui/icons/Assignment';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {useDispatch, useSelector} from "react-redux";
import {uploadImage} from "../actions/uploadActions";
import Card from "@material-ui/core/Card/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

import './Profil.css'

let change = false;
const useStyles = makeStyles((theme) => ({
    contai:{
        marginTop: "20px",
    },
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(18),
      height: theme.spacing(18),
      borderRadius: "50%",
    },
    square: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        marginTop: theme.spacing(1),
        marginLeft: "20px"
      },
    rounded: {
        color: '#fff',
        backgroundColor: green[500],
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(3)
      },
    line: {
        display: "inline"
      },
    input: {
        display: 'none',
    },
    but:{
        marginBottom: "20px"
    }
  }));

 function activateLasers(){
    console.log("Ok")
 }

const Profil = (props) => {

    const [dataForm, setDataForm] = useState();
    const [dataAdresse, setDataAdresse] = useState();
    const [dataFormJuridique, setDataFormJuridique] = useState();
    const dispatch = useDispatch();
    const [imagePreview, setImagePreview] = useState(null);
    const [imageData, setImageData] = useState(null);
    const {image} = useSelector(state => state.upload);

    const handleUploadClick = event => {
        let file = event.target.files[0];
        console.log(file);
        const imageData = new FormData();
        imageData.append('imageFile', file);
        setImageData(imageData);
        setImagePreview(URL.createObjectURL(file));
        let idUser = "1" // TODO: change by id current User
        dispatch(uploadImage(imageData, idUser ));
    };


    useEffect(() => {
        
        fetch("http://localhost:28080/1")
        .then(response => response.json())
        .then(result => {
            console.log(result);
            setDataForm(result);
            setImagePreview(URL.createObjectURL(new File([result.image], "1",{
                type: "image/jpeg"
            })))
            var blob = new File([result.image],"imageName",{type: "image/jpeg"}),
            url = URL.createObjectURL(blob),
            img = new Image();
            console.log(blob);

            img.src = url; 
            setImagePreview(img.src);

        });
        
        fetch("http://localhost:28080/AdresseUser/1")
        .then(response => response.json())
        .then(result => {
            console.log(result);
            setDataAdresse(result)
        });

        fetch("http://localhost:28080/FormeJuridique/1")
        .then(response => response.json())
        .then(result => {
            console.log(result);
            setDataFormJuridique(result)
        });
        
    }, []);

    const classes = useStyles();

    return (
        <>
        <NavBar/>
        <Grid container>
            <Grid item xs={12}>
                <Container maxWidth="md">
                    <div className={classes.formWrapper}>
                <Formik
                enableReinitialize={true}
                initialValues={{
                    obj: {
                        user: dataForm,
                        adresse: dataAdresse,
                        f: dataFormJuridique,
                    }
                }}
                validate={values => {
                    const errors = {};
                    console.log(values.obj.user.email);
                    console.log(errors);
                    if (!values.obj.user.email) {
                    errors.email = 'Obligatoire';
                    } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.obj.user.email)
                    ) {
                    errors.email = 'Adresse email incorrect';
                    }
                    if(!values.obj.user.nomEntreprise){
                        errors.nomEntreprise = 'Obligatoire';
                    }
                    if(!values.obj.adresse.adresse){
                        errors.adresse = 'Obligatoire';
                    }
                    if(!values.obj.user.telephone){
                        errors.telephone = 'Obligatoire';
                    }else if(values.obj.user.telephone.length < 10 && Number.isInteger(values.obj.user.telephone)){
                        errors.email = 'Numero incorrect';
                    }
                    return errors;
                }}
                onSubmit={values => {
                    console.log(values.obj);
                    setDataForm(values.obj.user);
                    setDataAdresse(values.obj.adresse);
                    setDataFormJuridique(values.obj.f);
                    /*
                    {
                        id: values.id,
                        userName: values.userName,
                        password: values.password,
                        email: values.email,
                        active: values.active,
                        image: values.image,
                        nomEntreprise: values.nomEntreprise,
                        dateNaissance: values.dateNaissance,
                        situationDossier: values.situationDossier,
                        adresse: values.adresse,
                        compementAdresse: values.compementAdresse,
                        ville: values.ville,
                        codePostal: values.codePostal,
                        emailEntreprise: values.emailEntreprise,
                        emailUtilisateurs: values.emailUtilisateurs,
                        telephone: values.telephone,
                        lienSite: values.lienSite,
                        codeApe: values.codeApe,
                        numTvaIntracommunautaire: values.numTvaIntracommunautaire,
                        formeJuridique: values.formeJuridique,
                        numSiret: values.numSiret,
                        numSiren: values.numSiren,
                        capitalSocial: values.capitalSocial,
                        codeRcs: values.codeRcs,
                        immatriculationAuRcs: values.immatriculationAuRcs,
                        dateImmatriculation: values.dateImmatriculation,
                        dateDebutActiviteKbis: values.dateDebutActiviteKbis,
                        activiteKbis: values.activiteKbis,
                        dateCotureExerciceSocial: values.dateCotureExerciceSocial,
                        roles: values.roles
                    }
                    */
                    axios.put("http://localhost:28080/updateUser",values.obj.user)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                    });

                    axios.put("http://localhost:28080/updateAdresse",values.obj.adresse)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                    });

                    console.log(change);

                    if(values.obj.f.formeJuridique!=null && change){
                        axios.put("http://localhost:28080/updateForm/"+values.obj.user.id+"/"+values.obj.f.formeJuridique)
                        .then((response) => {
                            change=false;
                        })
                        .catch(error => {
                            console.error('There was an error!', error);
                        });
    
                    }

                    }
                    
                }
                >
                {({ isSubmitting,values,onChange }) => (
                    <Form>
                        <Grid xs={12} container className={classes.contai}>
                            <Grid container xs={3} className={classes.line}>
                                 <Grid item xs={12} className={classes.but}>
                                    <Typography>
                                        Logo d'entreprise
                                    </Typography>
                                </Grid>
                                 <Grid item >
                                 <Card alt="Avatar" className={classes.large}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            image={
                                                imagePreview !== null ?
                                                    imagePreview :
                                                    "https://picsum.photos/500"}
                                        />
                                    </CardActionArea>
                                </Card>                                 
                                </Grid>
                                 <Grid container direction="row">
                                 <Grid item >
                                    <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handleUploadClick}/>
                                    <label htmlFor="icon-button-file">
                                        <IconButton color="primary" aria-label="upload picture" component="span" className={classes.rounded}>
                                        <ImageIcon />
                                        </IconButton>
                                    </label>
                                </Grid>
                                <Grid item >
                                    <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                                    <label htmlFor="icon-button-file">
                                        <IconButton color="primary" aria-label="upload picture" component="span" className={classes.square}>
                                        <DeleteForeverIcon />
                                        </IconButton>
                                    </label>
                                </Grid>
                                </Grid>
                            </Grid>
                            <Grid xs={9} container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography>
                                        Coordonnées
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Textfield 
                                    id="standard-full-width"
                                    name="obj.user.userName"
                                    label="Nom"
                                    style={{ margin: 8 }}
                                    placeholder="Nom"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <Textfield 
                                    disabled 
                                    id="standard-full-width"
                                    name="Etat"
                                    defaultValue="Active"
                                    label="Situation dossier"
                                    style={{ margin: 8 }}
                                    placeholder="Active"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <Textfield 
                                    id="standard-full-width"
                                    name="obj.user.email"
                                    label="Email"
                                    style={{ margin: 8 }}
                                    placeholder="Email"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <Textfield 
                                    id="standard-full-width"
                                    name="obj.user.emailEntreprise"
                                    label="Email Entreprise"
                                    style={{ margin: 8 }}
                                    placeholder="Email Entreprise"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <Textfield 
                                    id="standard-full-width"
                                    name="obj.user.lienSite"
                                    label="Link(site web ou facebook)"
                                    style={{ margin: 8 }}
                                    placeholder="Link"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <Textfield 
                                    id="standard-full-width"
                                    name="obj.user.telephone"
                                    label="telephone"
                                    style={{ margin: 8 }}
                                    placeholder="telephone"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Textfield 
                                    id="standard-full-width"
                                    name="obj.adresse.adresse"
                                    label="Adresse"
                                    style={{ margin: 8 }}
                                    placeholder="adresse"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <Textfield 
                                    id="standard-full-width"
                                    name="obj.adresse.compementAdresse"
                                    label="Complément d'adresse(optionnel)"
                                    style={{ margin: 8 }}
                                    placeholder=""
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <Select 
                                    name="obj.f.formeJuridique"
                                    label="Forme Juridique"
                                    options={formejuridiques}
                                    style={{ margin: 8 }}
                                    placeholder=""
                                    onChange={
                                        change = true
                                    }
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Textfield 
                                    id="standard-full-width"
                                    name="obj.adresse.ville"
                                    label="Ville"
                                    style={{ margin: 8 }}
                                    placeholder="ville"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}/>
                                </Grid>
                                <Grid item xs={3}>
                                    <Textfield 
                                    id="standard-full-width"
                                    name="obj.adresse.codePostal"
                                    label="Code Postal"
                                    style={{ margin: 8 }}
                                    placeholder="Code Postal"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <DateTimePicker 
                                    name="obj.user.dateNaissance"
                                    type="date"
                                    label="Date de naissance"
                                    style={{ margin: 8 }}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}/>
                                </Grid>
                                <Grid item xs={4}>
                                    <Textfield 
                                    id="standard-full-width"
                                    name="obj.user.codeApe"
                                    label="Code APE"
                                    style={{ margin: 8 }}
                                    placeholder="Code APE"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}/>
                                </Grid>
                                <Grid item xs={4}>
                                    <Textfield 
                                    id="standard-full-width"
                                    name="obj.user.codeApe"
                                    label="Code APE"
                                    style={{ margin: 8 }}
                                    placeholder="Code APE"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}/>
                                </Grid>
                                <Grid item xs={4}>
                                    <Textfield 
                                    id="standard-full-width"
                                    name="obj.user.numTvaIntracommunautaire"
                                    label="Numéro de TVA Intracommunautaire"
                                    style={{ margin: 8 }}
                                    placeholder="Numéro de TVA Intracommunautaire"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}/>
                                </Grid>
                                <Grid item xs={4}>
                                    <Textfield 
                                    id="standard-full-width"
                                    name="obj.user.numTvaIntracommunautaire"
                                    label="Numéro de TVA Intracommunautaire"
                                    style={{ margin: 8 }}
                                    placeholder="Numéro de TVA Intracommunautaire"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}/>
                                </Grid>
                                <Grid item xs={4}>
                                    <Textfield 
                                    id="standard-full-width"
                                    name="obj.user.numSiret"
                                    label="Numéro de SIRET"
                                    style={{ margin: 8 }}
                                    placeholder="Numéro de SIRET"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}/>
                                </Grid>
                                <Grid item xs={4}>
                                    <Textfield 
                                    id="standard-full-width"
                                    disabled
                                    name="obj.user.numSiren"
                                    label="Numéro SIREN"
                                    style={{ margin: 8 }}
                                    placeholder="Numéro SIREN"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}/>
                                </Grid>
                                <Grid item xs={4}>
                                    <Textfield 
                                    id="standard-full-width"
                                    name="obj.user.capitalSocial"
                                    label="Capital Social"
                                    style={{ margin: 8 }}
                                    placeholder="Capital Social"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}/>
                                </Grid>
                                <Grid item xs={4}>
                                    <Textfield 
                                    id="standard-full-width"
                                    name="obj.user.codeRcs"
                                    label="Code RCS"
                                    style={{ margin: 8 }}
                                    placeholder="Code RCS"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}/>
                                </Grid>
                                <Grid item xs={4}>
                                    <Textfield 
                                    id="standard-full-width"
                                    disabled
                                    name="obj.user.immatriculationAuRcs"
                                    label="Immatriculation au RCS de"
                                    style={{ margin: 8 }}
                                    placeholder="Immatriculation au RCS de"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}/>
                                </Grid>
                                <Grid item xs={4}>
                                    <DateTimePicker 
                                    name="obj.user.dateNaissance"
                                    disabled
                                    type="date"
                                    label="Date d'immatriculation"
                                    style={{ margin: 8 }}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}/>
                                </Grid>
                                <Grid item xs={4}>
                                    <DateTimePicker 
                                    name="obj.user.dateNaissance"
                                    disabled
                                    type="date"
                                    label="Date début d'actvité KBIS"
                                    style={{ margin: 8 }}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}/>
                                </Grid>
                                <Grid item xs={4}>
                                    <Textfield 
                                    id="standard-full-width"
                                    name="obj.user.activiteKbis"
                                    label="Activité principale selon KBIS"
                                    style={{ margin: 8 }}
                                    placeholder="Activité principale selon KBIS"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}/>
                                </Grid>
                                <Grid item xs={4}>
                                    <DateTimePicker 
                                    name="obj.user.dateNaissance"
                                    disabled
                                    type="date"
                                    label="Date de clôture de l'exercice social"
                                    style={{ margin: 8 }}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}/>
                                </Grid>
                                <Grid item xs={12}>
                                <Button>
                                    Modifier
                                </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Form>
                )}
                </Formik>
     </div>
     </Container>
</Grid>
</Grid>
</>
    )
};

export default Profil;
