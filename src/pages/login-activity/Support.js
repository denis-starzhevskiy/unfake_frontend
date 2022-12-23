import React, {useState} from 'react';
import {
    Button,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {useForm} from "react-hook-form";
import AlertMessage from "../../components/AlertMessage";

const useStyles = makeStyles((theme) => ({
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
    container: {
        margin: '30px',
        height: '100vh'
    },
    supportForm: {
        padding: '20px',
        // borderRadius: '15px',
        // border: `2px solid black`, //${theme.palette.text.secondary}
        marginTop: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        letterSpacing: '0.1rem'
        // justifyContent: 'flex-end'
    },
    inputBlock: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: '10px 0',
        '@media(max-width: 1200px)' : {
            flexDirection: 'column',
            justifyContent: 'center'
        }
    },
    inputs: {
        border: `2px solid ${theme.palette.text.secondary}`,
        borderRadius: '10px',
        '&:hover .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },
        '@media(max-width: 1200px)' : {
            margin: '10px 0'
        }
    },
    labels: {
        marginRight: '10px',
        width: '10%',
        textAlign: 'center',
        '@media(max-width: 1200px)': {
            width: '100%'
        }
    }
}))

const Support = () => {
    const classes = useStyles()
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [checkError, setCheckError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [type, setType] = useState(false) // success - true, error - false

    const {
        formState: { errors },
        handleSubmit,
        register,
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            message: ''
        }
    })

    const handleSupportSubmit = ({name, email, message}) => {
        setType(false)
        if(!name) setErrorMessage('Fill in a name')
        else if(!email) setErrorMessage('Fill in a email')
        else if(!message) setErrorMessage('Fill in a message')
        else if(!re.test(email)) setErrorMessage('Enter a correct email')
        else {
            setType(true)
            setErrorMessage('Success')
        }

        setCheckError(true)
        //TODO submit support sender form
    }

    const handleCloseError = () => {
        setCheckError(false)
    }

    return (
        <Box className={classes.container}>
            <Typography variant={'h4'} style={{fontWeight: 300, textAlign: 'center'}}>
                OUR TECHNICAL SUPPORT
            </Typography>
            <form noValidate onSubmit={handleSubmit(handleSupportSubmit)} className={classes.supportForm} autoComplete={'off'}>
                {/*<div className={classes.inputBlock}>*/}
                {/*    <InputLabel className={classes.labels}>Name</InputLabel>*/}
                {/*    <TextField*/}
                {/*        type="text"*/}
                {/*        size={'small'}*/}
                {/*        fullWidth*/}
                {/*        classes={{root: classes.inputs}}*/}
                {/*        {...register('name')}*/}
                {/*    />*/}
                {/*</div>*/}
                {/*<div className={classes.inputBlock}>*/}
                {/*    <InputLabel className={classes.labels}>Email</InputLabel>*/}
                {/*    <TextField*/}
                {/*        type="text"*/}
                {/*        size={'small'}*/}
                {/*        fullWidth*/}
                {/*        classes={{root: classes.inputs}}*/}
                {/*        {...register('email')}*/}
                {/*    />*/}
                {/*</div>*/}
                {/*<div className={classes.inputBlock}>*/}
                {/*    <InputLabel className={classes.labels}>Message</InputLabel>*/}
                {/*    <TextField*/}
                {/*        multiline*/}
                {/*        rows={3}*/}
                {/*        type="text"*/}
                {/*        size={'small'}*/}
                {/*        fullWidth*/}
                {/*        {...register('message')}*/}
                {/*        classes={{root: classes.inputs}}*/}
                {/*    />*/}
                {/*</div>*/}
                <TextField
                    className={classes.root}
                    label={"Name"}
                    placeholder={"Name"}
                    fullWidth
                    {...register('name')}
                    style={{ marginTop: '10px', height: '70px'}}
                    error={!!errors?.brandName}
                    helperText={errors?.brandName?.message}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    className={classes.root}
                    label={"Email"}
                    placeholder={"Email"}
                    fullWidth
                    {...register('email')}
                    style={{ marginTop: '10px', height: '70px'}}
                    error={!!errors?.brandName}
                    helperText={errors?.brandName?.message}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    className={classes.root}
                    label={"Message"}
                    placeholder={"Message"}
                    fullWidth
                    multiline
                    rows={3}
                    {...register('message')}
                    style={{ marginTop: '10px', height: '70px'}}
                    error={!!errors?.brandName}
                    helperText={errors?.brandName?.message}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button type={'submit'} style={{margin: '30px'}} color={"secondary"} size={"large"}>
                    SEND
                </Button>
            </form>
            <AlertMessage errorMessage={errorMessage} visible={checkError} close={handleCloseError} type={type}/>
        </Box>
    );
}

export default Support;
