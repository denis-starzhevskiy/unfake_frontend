import React from 'react';
import {Container, makeStyles, Typography} from "@material-ui/core";
import {useNavigate} from "react-router-dom";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme) => ({
    link: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '30px',
        '&:hover': {
            cursor: 'pointer',
            color: theme.palette.secondary.main
        }
    }
}))

const SuccessRegister = () => {
    const classes = useStyles()
    const navigate = useNavigate()

    return (
        <Container style={{margin: '50px auto', textAlign: 'center', width: '60%'}}>
            <Typography variant={'h4'} style={{letterSpacing: '0.1rem', margin: '10px 0px', fontWeight: 300}}>SUCCESS !</Typography>
            <Typography variant={'h6'} style={{letterSpacing: '0.1rem', fontWeight: 300}}>
                You have successfully verified your account. First of all you need to create your
                own organization or join an already created organization.
            </Typography>
            <div className={classes.link}>
                <Typography style={{letterSpacing: '0.1rem', fontWeight: 300,}} onClick={() => navigate('/login')} variant={'h5'}>
                    Let's go
                </Typography>
                <ArrowForwardIcon/>
            </div>
        </Container>
    );
}

export default SuccessRegister;
