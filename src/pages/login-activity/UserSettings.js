import React, {useEffect, useState} from 'react';
import {Button, makeStyles, TextField, Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {object, string} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {changeUserData, getUserInfo, resetPassword} from "../../api/userAPI";
import AlertMessage from "../../components/AlertMessage";
import {useSelector} from "react-redux";

const useStyles = makeStyles(theme => ({
    formBlock: {
        padding: '20px 0',
        textAlign: 'center',
        marginTop: '20px',
        letterSpacing: '0.1rem',
        width: '80%',
        margin: 'auto'
    },
    form: {
        padding: '10px'
    },
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
    submitBtn: {
        marginTop: '15px',
        marginBottom: '5px',
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: '#01ba74',
        },
    },
    resetPasswordBlock: {
        margin: '30px 0px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: `2px dashed ${theme.palette.secondary.main}`,
        borderBottom: `2px dashed ${theme.palette.secondary.main}`,
        padding: '20px'
    }
}));

const schema = object({
    email: string().required('Necessary filed').email("Email isn't correct"),
    username: string().required('Necessary filed'),
    firstName: string().required('Necessary filed'),
    lastName: string().required('Necessary filed'),
    registerDate: string().required('Necessary filed')
})

const UserSettings = () => {
    const classes = useStyles()
    const [init, setInit] = useState(false)
    const [alertVisible, setAlertVisible] = useState(false)
    const [messageType, setMessageType] = useState(true)
    const [message, setMessage] = useState("")
    const userEmail = useSelector(state => state.user.email)

    const {
        formState: { errors },
        handleSubmit,
        register,
        setValue,
        getValues
    } = useForm({
        defaultValues: {
            email: '',
            username: '',
            firstName: '',
            lastName: '',
            registerDate: ''
        },
        resolver: yupResolver(schema),
    })


    useEffect(() => {
        getUserInfo().then(response => {
            setValue('email',response.email)
            setValue('username', response.username)
            setValue('firstName', response.first_name)
            setValue('lastName', response.last_name)
            let date = new Date(response.date_joined)
            setValue('registerDate', date.toLocaleDateString())

            setInit(true)
        })
    }, [])

    const handleChangeSubmit = ({username, name, lastName}) => {
        changeUserData(username, name, lastName).then(() => {
            setAlertVisible(true)
            setMessage("You've successfully changed your personal information")
        }).catch(() => {
            setAlertVisible(true)
            setMessageType(false)
            setMessage("There are some troubles. Try later")
        })
    }

    const handlePasswordReset = () => {
        localStorage.setItem("email", userEmail)

        resetPassword(getValues("email")).then(() => {
            setAlertVisible(true)
            setMessage("The letter was sent on your email. Check it")
        }).catch(() => {
            setAlertVisible(true)
            setMessageType(false)
            setMessage("This email isn't verified. Please, verify your account.")
        })
    }

    return (
        <>
            {init && (
                <Box sx={{p: '20px'}} style={{textAlign: 'center'}}>
                    <Typography variant={'h4'} style={{letterSpacing: '0.1rem', fontWeight: 300}}>
                        USER SETTINGS
                    </Typography>
                    <Typography variant={'h6'} style={{margin: '10px 0', fontWeight: 300}}>
                        Change your personal information
                    </Typography>
                    <Box className={classes.formBlock}>
                        <form noValidate
                              onSubmit={handleSubmit(handleChangeSubmit)}
                              className={classes.form}>
                            <TextField
                                className={classes.root}
                                label={"Email"}
                                fullWidth
                                {...register('email')}
                                error={!!errors?.email}
                                helperText={errors?.email?.message}
                                inputProps={
                                    {readOnly: true}
                                }
                                style={{ marginTop: '10px', height: '60px' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                className={classes.root}
                                label={"Username"}
                                fullWidth
                                placeholder={"Enter your username"}
                                {...register('username')}
                                error={!!errors?.username}
                                helperText={errors?.email?.username}
                                style={{ marginTop: '10px', height: '60px' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                className={classes.root}
                                label={"First Name"}
                                fullWidth
                                placeholder={"Enter your name"}
                                {...register('firstName')}
                                error={!!errors?.name}
                                helperText={errors?.email?.name}
                                style={{ marginTop: '10px', height: '60px' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                className={classes.root}
                                label={"Last Name"}
                                {...register('lastName')}
                                placeholder={"Enter your last name"}
                                error={!!errors?.lastName}
                                helperText={errors?.email?.lastName}
                                fullWidth
                                style={{ marginTop: '10px', height: '60px' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                className={classes.root}
                                label={"Register date"}
                                {...register('registerDate')}
                                error={!!errors?.registerDate}
                                helperText={errors?.email?.registerDate}
                                fullWidth
                                inputProps={
                                    {readOnly: true}
                                }
                                style={{ marginTop: '10px', height: '60px' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Button type={'submit'} className={classes.submitBtn}>
                                Change information
                            </Button>
                        </form>
                        <div className={classes.resetPasswordBlock}>
                            <label>Reset password</label>
                            <Button color={'secondary'} onClick={handlePasswordReset}>Reset</Button>
                        </div>
                    </Box>
                </Box>
            )}
            <AlertMessage visible={alertVisible}
                          errorMessage={message}
                          type={messageType}
                          close={() => setAlertVisible(false)} />
        </>
    )
}

export default UserSettings;
