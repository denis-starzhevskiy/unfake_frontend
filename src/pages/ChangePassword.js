import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {
    Button,
    Checkbox,
    CircularProgress,
    Container,
    FormControlLabel,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import AlertMessage from "../components/AlertMessage";
import {changePassword} from "../api/userAPI";
import logo from "../assets/logo.png"

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '50px auto',
        textAlign: 'center',
        width: '60%',
        '@media(max-width: 750px)': {
            width: '90%'
        },
        // '@media(min-width: 700px)': {
        //     border: '1px solid white',
        //     backgroundColor: theme.palette.background.secondary,
        // },
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
    changeLabel: {
        letterSpacing: '0.1rem',
        fontWeight: 300,
        transition: '0.4s',
        display: 'flex',
        alignItems: 'center',
        columnGap: '10px',
        textAlign: 'center',
        '&:hover': {
            cursor: 'pointer',
            color: theme.palette.secondary.main
        },
    },
    logo: {
        margin: '5%'
    }
}))

const ChangePassword = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const [openInput, setOpenInput] = useState(false)
    const [openChangePassword, setOpenChangePassword] = useState(true)
    const [checkError, setCheckError] = useState(false)
    const [messageType, setMessageType] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const passwordRef = useRef()
    const passwordRepeat = useRef()
    const [loading, setLoading] = useState(false);
    const [viewPassword, setViewPassword] = useState(false);
    const [inputsType, setInputsType] = useState("password")

    const handleChangePassword = () => {
        if (!loading) {
            setOpenChangePassword(false)
            setLoading(true);
            window.setTimeout(() => {
                setOpenInput(true)
                setLoading(false);
            }, 1000);
        }
    }

    const handleCommit = () => {
          if(passwordRef.current.value !== passwordRepeat.current.value){
              setCheckError(true)
              setErrorMessage("Passwords must be the same")
              setMessageType(false)
              return
          }

          const email = localStorage.getItem("email")
          localStorage.removeItem("email")

          changePassword(email, passwordRef.current.value, passwordRepeat.current.value).then(() => {
                            setCheckError(true)
                            setErrorMessage("Your password was changed")
                            setMessageType(true)
                        }).catch((err) => {
                              setMessageType(false)
                              setCheckError(true)
                              if(err.message?.data?.errors.error || err.response?.data?.errors.error){
                                  setErrorMessage("The password is too common. Use upper and lower letter and numbers.")
                              }else{
                                  setErrorMessage("Sorry, something went wrong. Try later please")
                              }})
    }

    return (
        <Container className={classes.container}>
            <Typography variant={'h4'} style={{letterSpacing: '0.1rem', margin: '30px 0px', fontWeight: 300}}>Reestablish passport</Typography>
            <img src={logo} alt={"logo"} className={classes.logo}/>
            <Typography variant={'h6'} style={{letterSpacing: '0.1rem', fontWeight: 300}}>
                Now you need to create a new password to your account and then you'll be able to reauthorize
                using new credentials.
            </Typography>
            <div className={classes.link}>
                {loading && (
                    <CircularProgress color={"secondary"} style={{zIndex: 3}}/>
                )}
                {openInput && (
                    <>
                        <TextField
                            type={inputsType}
                            className={classes.root}
                            label={"Password"}
                            placeholder={"Enter a new password"}
                            fullWidth
                            inputRef={passwordRef}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            type={inputsType}
                            className={classes.root}
                            label={"Password"}
                            placeholder={"Repeat a new password"}
                            fullWidth
                            inputRef={passwordRepeat}
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
                        <Button color={'secondary'} onClick={handleCommit}>
                            Commit
                        </Button>
                    </>
                )}
                {openChangePassword && (
                    <div className={classes.changeLabel}>
                        <Typography onClick={handleChangePassword}
                                    variant={'h5'}>
                            Change password
                        </Typography>
                        <ArrowForwardIcon/>
                    </div>
                )}
            </div>
            <AlertMessage close={() => {
                setCheckError(false)
                if(messageType) {
                    navigate("/")
                }
            }} errorMessage={errorMessage} type={messageType} visible={checkError} />
        </Container>
    );
}

export default ChangePassword;
