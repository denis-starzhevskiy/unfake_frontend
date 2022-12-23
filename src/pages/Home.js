import React, {useEffect} from 'react';
import {
    Box,
    Button,
    Grid,
    makeStyles, TextField,
    Typography, useMediaQuery
} from "@material-ui/core";
import logo from '../assets/pictures/logo.png'
import googlePlay from '../assets/pictures/google-play.png'
import applePay from '../assets/pictures/apple-pay.png'
import Login from "../components/Login";
import qs from "qs";
import {useLocation} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        "& .MuiFormLabel-root": {
            paddingLeft: '10px',
            color: "white",
            "&:focused": {}
        }
    },
    container: {
        marginTop: '100px',
        textAlign: 'center',
        width: '100%',
        marginBottom: '70px'
    },
    textAlign: {
        paddingTop: '30px'
    },
    list: {
        textAlign: 'start',
        listStyleType: 'none',
        transition: '0.9s',
        marginLeft: '5%',
        '& li' : {
            '&::before' : {
                content: "'\\2022'",
                color: theme.palette.primary.light,
                fontWeight: 'bold',
                display: 'inline-block',
                width: '1em',
                marginLeft: '3em',
                '@media(max-width: 600px)': {
                    marginLeft: '-1em',
                }
            },
            '&:hover' : {
                cursor: 'pointer',
                color: '#cdc5c5'
            }
        }
    },
    buttonsContainer: {
        width: '50%',
        marginTop: '50px',
        display: 'flex',
        justifyContent: 'space-around'
    },
    darkButton: {
        transition: 'all 0.5s',
        width: '200px',
        height: '65px',
        fontSize: '18px',
        border: `2px solid ${theme.palette.secondary.main}`,
        '&:hover' : {
            backgroundColor: theme.palette.secondary.main
        },
        '@media(max-width: 600px)': {
            width: '140px',
            height: '45px',
            fontSize: '12px'
        }
    },
    lightButton: {
        transition: 'all 0.5s',
        width: '200px',
        height: '65px',
        fontSize: '18px',
        '&:hover' : {
            backgroundColor: 'white',
            color: theme.palette.secondary.main
        },
        '@media(max-width: 600px)': {
            width: '140px',
            height: '45px',
            fontSize: '12px'
        }
    },
    mobileBlock: {
        height: 'max-content',
        width: '100%',
        paddingTop: '50px',
        backgroundColor: theme.palette.text.secondary,
        textAlign: 'center',
        '@media(max-width: 800px)': {
            //height: '600px',
            padding: '30px'
        }
    },
    sendBlock: {
        padding: '80px',
        '@media(max-width: 800px)': {
            padding: '30px',
            paddingLeft: '20px'
        }
    },
    envelopeSend: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '50px',
        marginBottom: '15px',
        justifyContent: 'space-around',
        '@media(max-width: 800px)': {
            width: '100%',
            display: 'block'
        }
    },
    envelopeItem: {
        width: '30%',
        border: `2px solid #646464`,
        borderRadius: '10px',
        marginTop: '20px',
        margin: '10px 30px',
        '&:hover .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },
        '@media(max-width: 800px)': {
            width: '90%',
            margin: '10px 5%'
        }
    },
    listContainer: {
        marginTop: '1rem',
        display: 'flex',
        margin: 'auto 0',
        '@media(max-width: 600px)': {
            display: 'block'
        }
    }
}))

const Home = ({login}) => {
    const classes = useStyles()
    const [loginFormOpen, setLoginFormOpen] = React.useState(login)
    const lgMatches = useMediaQuery('(min-width: 1250px)')
    const mdMatches = useMediaQuery('(min-width: 950px)')
    const xsMatches = useMediaQuery('(max-width: 450px')
    const { search } = useLocation()

    useEffect(() => {
        const { login } = qs.parse(search.replace(/^\?/, ''))
        if(login) {
            setLoginFormOpen(true)
        }
    }, [])

    return (
        <>
            {/*overflowX: 'hidden'*/}
        <Box>
            <Box className={classes.container}>
                <img src={logo} alt="logo" />
                <Box className={classes.textAlign}>
                    <Typography variant={xsMatches ? "h6" : 'h4'} style={{marginBottom: '15px', letterSpacing: '0.1rem'}}>
                        PRODUCT AUTHENTICATION FOR CONSUMERS
                    </Typography>
                    <Typography color={"textSecondary"} style={{padding: `10px ${xsMatches ? '1%' : '5%'}`, letterSpacing: '0.1rem', fontSize: lgMatches ? '1.2rem' : '1rem'}}>
                        Our QRCode and NFC Security Tag secures authentic products in BlockChain.
                    </Typography>
                    <Grid container spacing={2} style={{ marginBottom: '1rem', marginTop: '1rem' }}>
                        <Grid item xs={mdMatches ? 6 : 12}>
                            <Typography style={{textAlign: 'center', fontSize: xsMatches ? '1rem' : lgMatches ? '1.7rem' : '1.16rem'}}>
                                Customer's opportunities:
                            </Typography>
                            <Typography style={{fontSize: xsMatches ? '1rem' : lgMatches ? '1.7rem' : '1.16rem'}}>
                                <ul className={classes.list}>
                                    <li>Install our free mobile app</li>
                                    <li>Scan Products with Security Tag</li>
                                    <li>Our app checks for Authenticity</li>
                                    <li>Product Details Displayed</li>
                                    <li>Connect to Product Manufacturer Easily</li>
                                </ul>
                            </Typography>
                        </Grid>
                        <Grid item xs={mdMatches ? 6 : 12}>
                            <Typography style={{textAlign: 'center', fontSize: xsMatches ? '1rem' : lgMatches ? '1.7rem' : '1.16rem'}}>
                                Product owner's opportunities:
                            </Typography>
                            <Typography style={{fontSize: xsMatches ? '1rem' : lgMatches ? '1.7rem' : '1.16rem'}}>
                                <ul className={classes.list}>
                                    <li>Login to Self-Service-Portal</li>
                                    <li>Setup Product Details</li>
                                    <li>Generate Security Tags</li>
                                    <li>Secure Your Products</li>
                                    <li>Engage with your customers</li>
                                </ul>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={xsMatches ? 3 : 10} justifyContent={'center'} wrap={'wrap'}>
                        <Grid item>
                            <Button className={classes.lightButton}
                                    color={"secondary"}>
                                LEARN MORE
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button className={classes.darkButton}
                                    onClick={() => {setLoginFormOpen(true)}}>
                                GET STARTED
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box className={classes.mobileBlock}>
                <Typography variant={xsMatches ? 'h6' : 'h4'} color={'primary'} style={{letterSpacing: '0.1rem'}}>
                    Verify Authentic Products with our Free Mobile App
                </Typography>
                <Typography style={{marginTop: '10px', color: '#151636', letterSpacing: '0.1rem', fontSize: xsMatches ? '1rem' : lgMatches ? '1.7rem' : '1.16rem'}}>
                    Using our free mobile app, consumers can authenticate any products
                </Typography>
                <Grid container spacing={xsMatches ? 4 : 10} justifyContent={'center'} wrap={'wrap'} style={{ marginTop: '3rem'}}>
                    <Grid item>
                        <img src={googlePlay} alt={"Download"} width={xsMatches ? "220px" : "300px" } height={xsMatches ? "60px" :"80px"} style={{borderRadius: '20px'}}/>
                    </Grid>
                    <Grid item>
                        <img src={applePay} alt={"Download"} width={xsMatches ? "220px" : "300px" } height={xsMatches ? "60px" :"80px"} style={{borderRadius: '20px'}}/>
                    </Grid>
                </Grid>
            </Box>
            <Box className={classes.sendBlock}>
                <Box style={{textAlign: 'center'}}>
                    <Typography variant={xsMatches ? 'h6' : 'h4'} style={{letterSpacing: '0.1rem', marginBottom: '20px'}}>
                        CONTACT US
                    </Typography>
                    <Typography style={{letterSpacing: '0.1rem', padding: `5px ${xsMatches ? '1%' : '5%'}`, textAlign: 'center', fontSize: xsMatches ? '0.8rem' : lgMatches ? '1.5rem' : '1.16rem'}}>
                        We are always open and we welcome and questions you have for our team.
                        If you wish to get in touch, please fill out the form below. Someone
                        from our team will get back to you shortly.
                    </Typography>
                    <form>
                        {/*<div className={classes.envelopeSend}>*/}
                        <Grid container spacing={1} style={{marginTop: '10px'}}>
                            <Grid item xs={12}>
                                <TextField placeholder={"Introduce yourself"}
                                           className={classes.envelopeItem}/>
                                <TextField placeholder={"Your email"}
                                           autoComplete={"off"}
                                           className={classes.envelopeItem}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField multiline rows={2}
                                           placeholder={xsMatches ? "Leave your question here" : "Leave your question or comment here"}
                                           className={classes.envelopeItem}
                                           style={{width: mdMatches ? '40%' : null}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button size={'large'} className={classes.darkButton} style={{marginTop: '40px'}}>
                                    SEND
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Box>
        </Box>
        <Login visible={loginFormOpen} close={() => {setLoginFormOpen(false)}}/>
        </>
    );
}

export default Home;
