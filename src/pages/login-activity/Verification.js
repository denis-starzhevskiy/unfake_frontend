import React, {useEffect, useState} from 'react';
import {resendEmail} from "../../api/userAPI";
import {Button, Container, makeStyles, Typography, useMediaQuery} from "@material-ui/core";
import logo from "../../assets/logo.png";
import AlertMessage from "../../components/AlertMessage";
import {useLocation, useNavigate} from "react-router-dom";
import qs from "qs";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundImage: "radial-gradient(at 0% 0%, hsla(237,54%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(184,95%,52%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(156,100%,49%,1) 0, transparent 50%)",
        textAlign: 'center',
        width: '100%'
    },
    root: {
        transition: '0.8s',
        textAlign: 'start',
        margin: '10px',
        "& .MuiFormLabel-root": {
            paddingLeft: 3,
            margin: 0,
            color: "white",
        },
        "& .MuiOutlinedInput-notchedOutline": {
            border: `2px solid ${theme.palette.text.secondary}`
        },
        '& .PrivateNotchedOutline-legendLabelled-45 > span': {
            paddingLeft: '6px',
            paddingRight: 0
        },
        "& .MuiInputBase-input": {
            letterSpacing: '0.1rem',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.secondary.main
        }
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: '10px',
        flexWrap: 'wrap',
        margin: '30px',
        '&:hover': {
            cursor: 'pointer',
            //color: theme.palette.secondary.main
        },
        '@media(max-width: 750px)': {
            flexWrap: 'wrap'
        }
    },
    resetButton: {
        fontSize: '18px',
        '&:hover' : {
            backgroundColor: '#00bd6e',
        },
        '@media(max-width: 600px)': {
            width: '120px',
            height: '30px',
            fontSize: '12px'
        }
    },
    options: {
        position: 'relative',
        width: '90%',
        padding: '15px',
        border: `1px solid ${theme.palette.text.secondary}`,
        transition: '0.2s',
        '&:hover': {
            backgroundColor: theme.palette.background.hover
        }
    }
}))

const Verification = () => {
    const classes = useStyles()
    const [isVerified, setIsVerified] = useState(false)
    const [init, setInit] = useState(false)
    const [checkError, setCheckError] = useState(false)
    const [messageType, setMessageType] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()
    const { search } = useLocation()
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'))

    useEffect(() => {
        const { confirmed } = qs.parse(search.replace(/^\?/, ''))
        if(confirmed) {
            setIsVerified(true)
            //navigate("/success-register")
        }

        setInit(true)
    }, [])

    const handleLoginClick = () => {
        location.href = "/login"
    }

    return (
        <>
            {init && (
                <>
                    {isVerified ? (
                        <Container maxWidth={"100%"} className={classes.container}>
                            <Box style={{padding: '50px'}}>
                                <Typography variant={'h4'} style={{letterSpacing: '0.1rem', margin: '30px 0px', fontWeight: 300}}>Successfully verified</Typography>
                                <img src={logo} alt={"logo"}/>
                                <Typography variant={'h6'} style={{letterSpacing: '0.1rem', textAlign: 'center', fontWeight: 300, marginTop: lgUp ? '40px' : '15px'}}>
                                    In order to use Unfake.io, you must first create an organization.
                                    This allows us to better guard our community against spammers and bots.
                                </Typography>
                                {/*<Typography variant={'h6'} style={{letterSpacing: '0.1rem', fontWeight: 300, textAlign: 'start', marginTop: lgUp ? '30px' : '10px'}}>*/}
                                {/*    Select one of the ways:*/}
                                {/*</Typography>*/}
                                {/*<div className={classes.link}>*/}
                                {/*    <div className={classes.options} onClick={() =>*/}
                                {/*        navigate('/account-page/business-settings/setup')*/}
                                {/*    }>*/}
                                {/*        <Typography variant={'h6'} style={{letterSpacing: '0.1rem', fontWeight: 300}}>*/}
                                {/*            Create an organization*/}
                                {/*        </Typography>*/}
                                {/*        <ArrowForward style={{position: 'absolute', right: 5, top: '50%', transform: 'translate(-50%, -50%)'}}/>*/}
                                {/*    </div>*/}
                                {/*    <div className={classes.options}>*/}
                                {/*        <Typography variant={'h6'} style={{letterSpacing: '0.1rem', fontWeight: 300}}>*/}
                                {/*            Join an existing organization*/}
                                {/*        </Typography>*/}
                                {/*        <ArrowForward style={{position: 'absolute', right: 5, top: '50%', transform: 'translate(-50%, -50%)'}}/>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <Button type={'submit'} color="secondary" style={{margin: '30px 5px'}} onClick={handleLoginClick}>
                                    Accept
                                </Button>
                            </Box>
                            <AlertMessage close={() => {
                                setCheckError(false)
                                navigate('/')
                            }} errorMessage={errorMessage} type={messageType} visible={checkError} />
                        </Container>
                    ) : (
                        <Container className={classes.container}>
                            <Typography variant={'h4'} style={{letterSpacing: '0.1rem', margin: '30px 0px', fontWeight: 300}}>Confirm your email address</Typography>
                            <img src={logo} alt={"logo"} style={{marginBottom: '40px'}}/>
                            <Typography variant={'h5'} style={{letterSpacing: '0.1rem', fontWeight: 400}}>
                                We sent an email
                            </Typography>
                            <Typography variant={'h6'} style={{letterSpacing: '0.1rem', fontWeight: 300, marginTop: lgUp ? '40px' : '15px'}}>
                                Please confirm your email address by clicking the link we just sent to your inbox
                            </Typography>
                            <div className={classes.link}>
                                <Button className={classes.resetButton}
                                        color={"secondary"}
                                        onClick={() => {
                                            resendEmail(userEmail).then(() => {
                                                setCheckError(true)
                                                setErrorMessage("The letter was sent")
                                                setMessageType(true)
                                            }).catch(() => {
                                                setCheckError(true)
                                                setErrorMessage("Sorry, something went wrong. Please, try later.")
                                                setMessageType(false)
                                            })
                                        }}
                                >
                                    {lgUp ? "Resend verification email" : "Resend"}
                                </Button>
                            </div>
                            <AlertMessage close={() => {
                                setCheckError(false)
                            }} errorMessage={errorMessage} type={messageType} visible={checkError} />
                        </Container>
                    )}
                </>
            )}
        </>
    );
}

export default Verification;
