import React from 'react';
import {Container, Typography, useMediaQuery} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import logo from "../../assets/logo.png";

const Main = () => {
    const mdUp = useMediaQuery((theme => theme.breakpoints.up('md')))
    // function getCookie(name) {
    //     let matches = document.cookie.match(new RegExp(
    //         "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    //     ));
    //     return matches ? decodeURIComponent(matches[1]) : undefined;
    // }
    //
    // console.log(getCookie("refresh_token"))

    return (
        <Container style={{height: '100vh'}}>
            <Box sx={{pt: '30px'}} style={{textAlign: 'center'}}>
                <Typography variant={'h4'} style={{textAlign: 'center', letterSpacing: '0.1rem', fontWeight: 300}}>
                    WELCOME TO
                </Typography>
                <Typography variant={'h3'} style={{textAlign: 'center', letterSpacing: '0.1rem', fontWeight: 400, marginTop: '20px'}}>
                    UNFAKE ADMIN PANEL
                </Typography>
                <img src={logo} width={mdUp ? "400px" : "300px"} alt="logo" style={{marginTop: mdUp ? '100px' : '50px'}}/>
            </Box>
        </Container>
    );
}

export default Main;
