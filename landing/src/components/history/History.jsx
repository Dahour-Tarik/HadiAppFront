import React, {useEffect, useState} from 'react';
import NavBar from '../BoxNavBar';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, green } from '@material-ui/core/colors';

import '../users/Profil.css'

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

 

const History = (props) => {

    return (
        <>
        <NavBar/>
        </>
    )

};

export default History;
