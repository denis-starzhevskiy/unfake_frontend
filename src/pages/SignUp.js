import React, {useState} from 'react';
import {
    Button,
    Checkbox,
    CircularProgress,
    Container,
    FormControlLabel,
    Link,
    makeStyles,
    TextField,
    Typography,
    useMediaQuery
} from "@material-ui/core";
import {object, string} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {registerUser} from "../api/userAPI";
import AlertMessage from "../components/AlertMessage";
import {useNavigate} from "react-router-dom";
import logo from "../assets/pictures/logo.png";
import Box from "@material-ui/core/Box";
import FacebookIcon from '@material-ui/icons/Facebook';
import GoogleIcon from '../assets/pictures/googleIcon.png'
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const useStyles = makeStyles(theme => ({
    root: {
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
    createCard: {
        ///margin: '50px auto',
        marginBottom: '20px',
        textAlign: 'center',
        width: '40%',
        borderRadius: '5px',
        '@media(max-width: 750px)': {
            width: '90%'
        },
        // '@media(min-width: 700px)': {
        //     border: '1px solid white',
        //     backgroundColor: theme.palette.background.secondary,
        // },
    },
    form: {
        marginTop: '20px',
        letterSpacing: '0.1rem',
        padding: '0 10px',
        '@media(max-width: 800px)': {
            textAlign: 'center'
        }
    },
    labels: {
        marginLeft: '5px',
        '@media(max-width: 800px)': {
            marginLeft: '0px'
        }
    },
    submitBtn: {
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '20px',
        marginBottom: '15px',
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: '#01ba74',
        },
    },
    logo: {
        width: 100,
        height: 75,
        objectFit: 'contain',
        marginTop: 10
    },
    mailButton: {
        position: 'relative',
        transition: 'all 0.1s',
        fontSize: '18px',
        letterSpacing: '0.1rem',
        fontWeight: 400,
        '& > span > #arrow' : {
            transition: 'all 0.1s',
            display: 'none',
            position: 'absolute',
            right: 3
        },
        '&:hover' : {
            backgroundColor: '#54ffb7',
            '& > span > #arrow' : {
                display: 'inline-block'
            },
        },
        '@media(min-width: 1500px)' : {
            fontSize: '22px',
            height: '60px'
        }
    },
    usualButton: {
        position: 'relative',
        transition: 'all 0.1s',
        fontSize: '18px',
        letterSpacing: '0.1rem',
        fontWeight: 400,
        backgroundColor: theme.palette.background.secondary,
        border: `1px solid ${theme.palette.hover.extra}`,
        '& > span > #arrow' : {
            transition: 'all 0.1s',
            display: 'none',
            position: 'absolute',
            color: theme.palette.primary.main,
            right: 3
        },
        '&:hover' : {
            // backgroundColor: theme.palette.background.hover,
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
            '& > span > #arrow' : {
                display: 'inline-block'
            },
        },
        '@media(min-width: 1500px)' : {
            fontSize: '22px',
            height: '60px'
        }
    },
}));

const schema = object({
    email: string().required('Necessary filed').email("Email isn't correct"),
    username: string().required('Necessary filed'),
    password: string().required('Necessary filed').min(8, "Password must be 8 or longer")
})

const SignUp = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const [checkError, setCheckError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [type, setType] = useState(false) // success - true, error - false
    const [viewPassword, setViewPassword] = useState(false);
    const [inputsType, setInputsType] = useState("password")
    const [isStartPage, setIsStartPage] = useState(true)
    const [isLoading, setIsLoading] = useState(false);
    const [signUpMethod, setSignUpMethod] = useState("Sign Up with Email")
    const xlUp = useMediaQuery((theme => theme.breakpoints.down('xl')))

    const {
        formState: { errors },
        handleSubmit,
        register
    } = useForm({
        defaultValues: {
            email: '',
            username: '',
            password: '',
        },
        resolver: yupResolver(schema)
    })

    const handleRegisterSubmit = ({email, username, password}) => {
        registerUser(email, username, password).then(() => {
            setType(true)
            setCheckError(true)
            setErrorMessage("You've successfully registered. Veritify your email ")
        }).catch((err) => {
            setType(false)
            setCheckError(true)
            if(err.message?.data?.errors.email || err.response?.data?.errors.email) {
                setErrorMessage("Sorry, that email address is already associated with an account.")
            }else if(err.message?.data?.errors.username || err.response?.data?.errors.username) {
                setErrorMessage("Sorry, that username is already associated with an account.")
            } else if(err.message?.data?.errors.error || err.response?.data?.errors.error){
                setErrorMessage("The password is too common. Use upper and lower letter and numbers.")
            }else{
                setErrorMessage("Sorry, something went wrong. Try later please")
            }
        })
    }

    const handleClose = () => {
        setCheckError(false)
        if(type) navigate('/verification-page')
    }

    return (
        <>
            <Box component={"header"} style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'nowrap'}}>
                <div onClick={() => navigate('/')}>
                    <img src={logo} alt="logo" className={classes.logo} />
                </div>
                <Typography style={{letterSpacing: '0.1rem'}}>
                    Already have an account ?
                    <Link to={'/'}
                          style={{color: 'white', textDecoration: 'underline', cursor: 'pointer', marginLeft: '3px'}}
                          onClick={() => {
                              navigate('/login')
                          }}
                    >Sign in</Link>
                </Typography>
            </Box>
            <Container className={classes.createCard}>
                {isStartPage ? (
                    <>
                        {isLoading ? (
                            <CircularProgress color={"secondary"} style={{zIndex: 3}}/>
                        ) : (
                            <>
                                <Typography variant={xlUp ? 'h5' : 'h6'} style={{letterSpacing: '0.1rem', margin: '30px 0px', fontWeight: 300}}>
                                    Create your account
                                </Typography>
                                <Typography variant={xlUp ? 'h6' : 'inherit'} style={{letterSpacing: '0.1rem', margin: '15px 0px', fontWeight: 200}}>
                                    Start spending more time on your projects and less time proving of originality.
                                </Typography>
                                <div style={{margin: '30px 20px', display:'flex', flexWrap: 'wrap', rowGap: '10px'}}>
                                    <Button className={classes.mailButton}
                                            fullWidth
                                            color={"secondary"}
                                            onClick={() => {
                                                setIsLoading(true)
                                                setSignUpMethod("Sign Up with Email")
                                                window.setTimeout(() => {
                                                    setIsStartPage(false)
                                                    setIsLoading(false);
                                                }, 1000);
                                            }}>
                                        Sign Up with Email
                                        <ArrowForwardIcon id={'arrow'}/>
                                    </Button>
                                    <Button className={classes.usualButton}
                                            fullWidth
                                            onClick={() => {
                                                setIsLoading(true)
                                                setSignUpMethod("Sign Up with Google")
                                                window.setTimeout(() => {
                                                    setIsStartPage(false)
                                                    setIsLoading(false);
                                                }, 1000);
                                            }}>
                                        <img src={GoogleIcon} alt="" width={20} height={20} style={{margin: '3px'}}/>
                                        Sign Up with Google
                                        <ArrowForwardIcon id={'arrow'}/>
                                    </Button>
                                    <Button className={classes.usualButton}
                                            fullWidth
                                            onClick={() => {
                                                setIsLoading(true)
                                                setSignUpMethod("Sign Up with Facebook")
                                                window.setTimeout(() => {
                                                    setIsStartPage(false)
                                                    setIsLoading(false);
                                                }, 1000);
                                            }}>
                                        <FacebookIcon color={"inherit"} style={{margin: '3px'}}/>
                                        Sign Up with Facebook
                                        <ArrowForwardIcon id={'arrow'}/>
                                    </Button>
                                </div>
                            </>
                        )}

                    </>
                ) : (
                    <>
                        <Typography style={{letterSpacing: '0.1rem', margin: '20px 0px', fontWeight: 300, fontSize: xlUp ? '1.7rem' : '1.1rem'}}>
                            {signUpMethod}
                        </Typography>
                        <Typography style={{letterSpacing: '0.1rem', margin: '15px 0px', fontWeight: 300}}>
                            Fill in the required fields to register your account
                        </Typography>
                        <form noValidate
                            onSubmit={handleSubmit(handleRegisterSubmit)}
                            autoComplete={"off"}
                            className={classes.form}>
                            <TextField
                                className={classes.root}
                                fullWidth
                                placeholder={"Username"}
                                {...register('username')}
                                error={!!errors?.username}
                                helperText={errors?.username?.message}
                                label={"Username"}
                                style={{ marginTop: '10px', height: '70px'}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                className={classes.root}
                                fullWidth
                                placeholder={"Email"}
                                {...register('email')}
                                error={!!errors?.email}
                                helperText={errors?.email?.message}
                                label={"Email"}
                                style={{ marginTop: '10px', height: '70px'}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                className={classes.root}
                                fullWidth
                                type={inputsType}
                                placeholder={"Password"}
                                {...register('password')}
                                error={!!errors?.password}
                                helperText={errors?.password?.message}
                                label={"Password"}
                                style={{ marginTop: '10px', height: '70px'}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        <FormControlLabel
                            style={{width: '100%', marginLeft: '10px'}}
                            control={<Checkbox checked={viewPassword} onChange={() => {
                                setInputsType(inputsType === "password" ? "text" : "password")
                                setViewPassword(!viewPassword)
                            }} name="viewPasswordChecked" />}
                            label={<Typography style={{fontSize: '0.9rem'}}>Show password</Typography>}
                        />
                            <Button type={'submit'} className={classes.submitBtn}>
                                Sign Up
                            </Button>
                        </form>
                        <AlertMessage errorMessage={errorMessage} visible={checkError} close={handleClose} type={type}/>
                    </>
                )}
            </Container>
            <Typography style={{textAlign: 'center', marginBottom: '20px'}}>
                By signing up you agree to the
                <Link to={'/'}
                      style={{color: 'white', textDecoration: 'underline', cursor: 'pointer', marginLeft: '3px'}}
                      onClick={() => {
                          alert("This link is yet to be done")
                          // navigate('/')
                      }}
                >Terms of Service</Link> and
                <Link to={'/'}
                      style={{color: 'white', textDecoration: 'underline', cursor: 'pointer', marginLeft: '3px'}}
                      onClick={() => {
                          alert("This link is yet to be done")
                          // navigate('/privacy-policy')
                      }}
                >Privacy Policy</Link>
            </Typography>
        </>
    );
}

export default SignUp;
