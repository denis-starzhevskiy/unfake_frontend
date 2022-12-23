import { yupResolver } from '@hookform/resolvers/yup'
import React, {useEffect, useState} from 'react';
import {
    Button, Checkbox,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Link,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import { object, string } from 'yup'
import { useForm } from 'react-hook-form'
import classNames from "classnames";
import {useDispatch} from "react-redux";
import {authenticateAction} from "../store/slices/userSlice";
import {useNavigate} from "react-router-dom"
import {login, resetPassword} from "../api/userAPI";
import AlertMessage from "./AlertMessage";

const useStyles = makeStyles(theme => ({
    loginMenu: {
        backgroundColor: '#0f1932 !important',
        color: theme.palette.text.secondary,
        borderRadius: '10px',
        // border: `2px solid ${theme.palette.secondary.main}`,
        fontFamily: theme.typography.fontFamily
    },
    loginContent: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    loginForm: {
        textAlign: 'center',
        width: '100%'
    },
    titleText: {
        textAlign: 'center',
        fontWeight: 200,
        color :'white',
        fontSize: '30px'
    },
    loginBtn: {
        marginTop: '15px',
        marginBottom: '5px',
        color: theme.palette.primary.main,
        fontSize: '12px',
        width: '150px',
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: '#01ba74',
        },
        '@media(max-width: 450px)': {
            width: '120px'
        }
    },
    facebookBtn: {
        backgroundColor: '#3b5998',
        '&:hover' : {
            backgroundColor: '#2f4779',
            color: 'white'
        }
    },
    googleBtn: {
        backgroundColor: '#d85040',
        '&:hover' : {
            backgroundColor: '#af3f34',
            color: 'white'
        }
    },
    inscriptionBlock: {
        width: '100%',
        textAlign: 'center',
        margin: '10px 0'
    },
    inscription: {
        cursor: 'pointer',
        transition: '0.5s',
        '&:hover': {
            color: theme.palette.hover.extra
        },
        '@media(max-width: 800px)': {
            fontSize: '14px',
            width: 'max-content'
        }
    }
}))

const schema = object({
    email: string().required('Necessary filed').email("Email isn't correct"),
    password: string().required('Necessary filed')
})

function Login({visible, close}) {
    const classes = useStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [forgetPassword, setForgetPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false);
    const [wrongCredentials, setWrongCredentials] = useState(false)

    const {
        formState: { errors },
        handleSubmit,
        register,
        reset,
        setValue
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(schema),
    })

    const handleRememberMeCheck = () => {
      setRememberMe(!rememberMe)
    }

    useEffect(() => {
        if(localStorage.getItem("item")){
            let user = JSON.parse(localStorage.getItem("item"))
            setValue('email', user.email)
            setValue('password', user.password)
            setRememberMe(true)
        }
    }, [])

    const handleLoginSubmit = async ({email, password}) => {
        setWrongCredentials(false)
        localStorage.removeItem("csrftoken")
        await login(email, password)
            .then(response => {
                    if (rememberMe === true) {
                        const item = {
                            email: email,
                            password: password
                        }
                        localStorage.setItem('item', JSON.stringify(item))
                    }
                    const userId = response.user.pk
                    const username = response.user.fist_name
                    const accessToken = response.access_token
                    const isAuth = true
                    dispatch(authenticateAction({userId, username, accessToken, isAuth}))
                    navigate('/account-page')
                }
            ).catch(() => {setWrongCredentials(true)})
    }

    return (
        <>
            <Dialog open={visible}
                    onClose={() => {
                            setWrongCredentials(false)
                            close()
                            reset()
                    }}
                    transitionDuration={500} maxWidth={'xs'} PaperProps={{classes: {root: classes.loginMenu}}}>
                <DialogTitle variant={"h4"}><Typography classes={{root : classes.titleText}}>Sing in</Typography></DialogTitle>
                <DialogContent className={classes.loginContent}>
                    <form noValidate onSubmit={handleSubmit(handleLoginSubmit)} className={classes.loginForm}>
                        <TextField
                            type="text"
                            placeholder="Email"
                            fullWidth
                            {...register('email')}
                            style={{ marginTop: '10px'}}
                            error={!!errors?.email}
                            helperText={errors?.email?.message}
                        />
                        <TextField
                            type="password"
                            placeholder="Password"
                            fullWidth
                            {...register('password')}
                            style={{ marginTop: '10px' }}
                            error={!!errors?.password}
                            helperText={errors?.password?.message}
                        />
                        {wrongCredentials === true ? (<Typography style={{textAlign: 'center', marginTop: '10px', letterSpacing: '0.1rem', fontWeight: 400}} color={"error"}>Please, check you credentials</Typography>) : null}
                        <div style={{marginTop: '5px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <FormControlLabel
                                control={<Checkbox checked={rememberMe} onChange={handleRememberMeCheck} name="rememberMeChecked" />}
                                label={<Typography className={classes.inscription}>Remember me</Typography>}
                            />
                            <Typography
                                onClick={() => {
                                    close()
                                    reset()
                                    setForgetPassword(true)
                                }}
                                color={"textSecondary"}
                                className={classes.inscription}>
                                Forgot password ?
                            </Typography>
                        </div>
                        <Button type={'submit'} className={classes.loginBtn}> {/*onClick={() => {location.href = '/account-page'}}*/}
                            LOGIN
                        </Button>
                        <div style={{width: '100%', height: '10px', borderBottom: '1px solid white', textAlign: 'center', margin: '15px 0'}}>
                          <span style={{fontSize: '16px', padding: '0 20px', backgroundColor:'#0f1932'}}>
                            OR SIGN IN WITH
                          </span>
                        </div>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', margin: '15px 0'}}>
                            <Button className={classNames(classes.loginBtn, classes.facebookBtn)}>
                                FACEBOOK
                            </Button>
                            <Button className={classNames(classes.loginBtn, classes.googleBtn)}>
                                GOOGLE
                            </Button>
                        </div>
                    </form>
                    <div className={classes.inscriptionBlock}>
                        <Link href={"/sign-up"}>
                            <Typography color={"textSecondary"}>
                                Don’t have an account? <strong className={classes.inscription}>Sign up here</strong>
                            </Typography>
                        </Link>
                    </div>
                </DialogContent>
            </Dialog>
            <RegisterForm open={forgetPassword} onClose={() => {setForgetPassword(false)}}/>
        </>
    );
}

export default Login;

const RegisterForm = ({open, onClose}) => {
    const classes = useStyles()
    const [isAlert, setIsAlert] = useState(false)
    const [messageAlert, setMessageAlert] = useState("")
    const [type, setType] = useState(true)

    const {
        formState: { errors },
        handleSubmit,
        register,
    } = useForm({
        defaultValues: {
            email: ''
        },
        resolver: yupResolver(object({
            email: string().required('Necessary filed').email("Email isn't correct")
        })),
    })

    const handleResetSubmit = ({email}) => {
       resetPassword(email).then(() => {
           setMessageAlert("We sent a letter on your email. Check!")
           setIsAlert(true)
           setType(true)
           close()
       }).catch((err) => {
           if(err?.response.data?.errors.email.code === "email_not_exist"){
               setMessageAlert("Current email isn't registered")
               setIsAlert(true)
               setType(false)
           }else if(err?.message.data?.errors.email.code === "email_not_exist"){
               setMessageAlert("Current email isn't registered")
               setIsAlert(true)
               setType(true)
           }else{
               setMessageAlert("Something went wrong.Try it later!")
               setIsAlert(true)
               setType(false)
           }
       })
    }

    return (
        <>
            <Dialog open={open} onClose={onClose} transitionDuration={500} PaperProps={{classes: {root: classes.loginMenu}}}>
                <DialogTitle style={{textAlign: 'center'}}>
                    <Typography classes={{root : classes.titleText}}>
                        Password Reset
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography style={{fontSize: '15px', textAlign: 'center'}}>
                        Enter your registered email address and click <br/> a reset link
                    </Typography>
                    <form noValidate
                          onSubmit={handleSubmit(handleResetSubmit)}
                          className={classes.loginForm}>
                        <TextField
                            type="text"
                            placeholder="Email"
                            fullWidth
                            {...register('email')}
                            style={{ marginTop: '10px'}}
                            error={!!errors?.email}
                            helperText={errors?.email?.message}
                        />
                        <Button type={'submit'} className={classes.loginBtn}>
                            SEND
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
            <AlertMessage errorMessage={messageAlert} visible={isAlert} close={() => {
                setIsAlert(false)
                if(type){
                    onClose()
                }
            }} type={type}/>
        </>
    )
}
