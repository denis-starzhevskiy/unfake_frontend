import React, {useState} from 'react';
import {Button, Checkbox, Container, FormControlLabel, makeStyles, TextField, Typography} from "@material-ui/core";
import {object, string} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {login, registerUser} from "../api/userAPI";
import AlertMessage from "../components/AlertMessage";
import {useNavigate} from "react-router-dom";
import {authenticateAction} from "../store/slices/userSlice";

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
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '15px',
        marginBottom: '5px',
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: '#01ba74',
        },
    },
    field: {
        margin: '10px 0',
    },
}));

const schema = object({
    email: string().required('Necessary filed').email("Email isn't correct"),
    username: string().required('Necessary filed'),
    firstName: string(),
    lastName: string(),
    password: string().required('Necessary filed').min(8, "Password must be 8 or longer"),
    repeatPassword: string().required('Necessary filed').min(8, "Password must be 8 or longer")
})

const Register = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const [checkError, setCheckError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [type, setType] = useState(false) // success - true, error - false
    const [viewPassword, setViewPassword] = useState(false);
    const [inputsType, setInputsType] = useState("password")

    const {
        formState: { errors },
        handleSubmit,
        register,
        reset,
        getValues
    } = useForm({
        defaultValues: {
            email: '',
            username: '',
            firstName: '',
            lastName: '',
            password: '',
            repeatPassword: ''
        },
        resolver: yupResolver(schema)
    })

    const handleRegisterSubmit = ({email, username, firstName, lastName, password, repeatPassword}) => {
        if(password !== repeatPassword) {
            setType(false)
            setCheckError(true)
            setErrorMessage("Passwords don't match")
        }
        else {
            registerUser(email, username, password).then(response => {
                if(response.email){
                    setType(true)
                    setCheckError(true)
                    setErrorMessage("You've successfully registered. Veritify your email ")
                    reset()
                    navigate('/')
                }else{
                    setType(false)
                    setCheckError(true)
                    setErrorMessage("You've not registered. Something went wrong. Try  again")
                }
            }).catch((err) => {
                setType(false)
                setCheckError(true)
                if(err.message?.data?.errors.email || err.response?.data?.errors.email) {
                    setErrorMessage("Sorry, that email address is already associated with an account.")
                }else if(err.message?.data?.errors.error || err.response?.data?.errors.error){
                    setErrorMessage("The password is too common. Use upper and lower letter and numbers.")
                }else{
                    setErrorMessage("Sorry, something went wrong. Try later please")
                }
            })
        }
    }

    const handleCloseError = () => {
        setCheckError(false)
        login(getValues('email'), getValues('password').then(response => {
            const userId = response.user.pk
            const username = response.user.fist_name
            const accessToken = response.access_token
            const isAuth = true
            dispatch(authenticateAction({userId, username, accessToken, isAuth}))
        }).then(() => navigate('/veritification-page')))
    }

    return (
        <Container style={{marginTop: '100px'}}>
            <form noValidate
                  onSubmit={handleSubmit(handleRegisterSubmit)}
                  autoComplete={"off"}
                  className={classes.form}>
                <Typography variant={'h6'} style={{textAlign: 'center'}}>
                    SIGN UP NEW ACCOUNT
                </Typography>
                <Typography style={{textAlign: 'center', marginBottom: '20px'}}>
                    Fill in the required fields to register your account
                </Typography>
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
                    placeholder={"Username"}
                    {...register('username')}
                    error={!!errors?.text}
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
                    placeholder={"First name"}
                    {...register('firstName')}
                    error={!!errors?.text}
                    helperText={errors?.firstName?.message}
                    label={"First name"}
                    style={{ marginTop: '10px', height: '70px'}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    className={classes.root}
                    fullWidth
                    placeholder={"Last name"}
                    {...register('lastName')}
                    error={!!errors?.text}
                    helperText={errors?.lastName?.message}
                    label={"Last name"}
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
                    error={!!errors?.text}
                    helperText={errors?.password?.message}
                    label={"Password"}
                    style={{ marginTop: '10px', height: '70px'}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    className={classes.root}
                    fullWidth
                    type={inputsType}
                    placeholder={"Repeat password"}
                    {...register('repeatPassword')}
                    error={!!errors?.text}
                    helperText={errors?.repeatPassword?.message}
                    label={"Repeat password"}
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
                    Create new account
                </Button>
            </form>
            <AlertMessage errorMessage={errorMessage} visible={checkError} close={handleCloseError} type={type}/>
        </Container>
    );
}

export default Register;
