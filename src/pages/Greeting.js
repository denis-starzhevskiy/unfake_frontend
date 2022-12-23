import React, {useState} from 'react';
import {
    Button,
    Container,
    Drawer,
    Grid,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    TextField,
    Typography,
    useMediaQuery
} from "@material-ui/core";
import logo from "../assets/logo.png";
import coins from "../assets/pictures/coins.png";
import nftImage from "../assets/pictures/NFT_image.png";
import MenuIcon from "@material-ui/icons/Menu";
import Login from "../components/Login";
import {useNavigate} from "react-router-dom";
import Box from "@material-ui/core/Box";
import CloseIcon from '@material-ui/icons/Clear';
import {object, string} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import AlertMessage from "../components/AlertMessage";
import Footer from "../components/Footer";


const useStyles = makeStyles(theme => ({
    appBar: {
        boxShadow: 'none',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'nowrap'
    },
    drawerPaper: {
        width: '70%',
        background: `linear-gradient(to right, rgb(16, 233, 249, .5) 40%, rgb(0, 250, 162, .5))` // #10e9f9 #00faa2
    },
    toolbar: {
        height: 90
    },
    logo: {
        width: 150,
        height: 100,
        objectFit: 'contain'
    },
    link: {
        color: theme.palette.text.primary,
        fontWeight: '300',
        fontSize: '20px',
        cursor: 'default',
        transition: 'all 0.5s',
        '&:hover' : {
            color: theme.palette.primary.light,
            cursor: 'pointer',
            textDecoration: 'none'
        },
    },
    activeLink: {
        color: theme.palette.primary.main,
    },
    menuIconButton: {
        color: '#ffffffff'
    },
    placeholder: {
        height: 90,
    },
    loginBtn: {
        width: '140',
        flex: '90% 0',
        fontWeight: 600,
        fontSize: '11px',
        borderRadius: '25px',
        backgroundColor: '#00faa2',
        color: 'black',
        '&:hover' : {
            backgroundColor: theme.palette.primary.light
        },
        '@media(max-width: 600px)': {
            flex: '20% 0'
        }
    },
    signUp: {
        '&:hover': {
            color: theme.palette.hover.extra,
            cursor: 'pointer'
        }
    },
    contactForm: {
        backgroundColor: theme.palette.background.secondary,
        textAlign: 'center',
        width: '100%',
        padding: '30px',
        borderRadius: '20px',
        '@media(max-width: 800px)' : {
            padding: '10px',
            marginTop: '20px'
        }
    },
    inputField: {
        backgroundColor: theme.palette.background.hover,
        '@media(max-width: 800px)' : {
            margin: '5px 0px'
        }
    },
    submitBtn: {
        width: '100%',
        border: '1px solid grey',
        borderRadius: '20px',
        fontWeight: '300'
    }
}))

const routes = [
    { to: '/about', name: 'About' },
    { to: '/manual', name: 'Manual' },
    { to: '/wallets', name: 'Wallets' }
]

const schema = object({
    email: string().required('Necessary filed').email("Email isn't correct"),
    message: string().required('Necessary filed')
})

const Greeting = ({login}) => {
    const classes = useStyles()
    const [loginFormOpen, setLoginFormOpen] = useState(login)
    const [photoLoaded, setPhotoLoaded] = useState(false)
    const [checkError, setCheckError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [type, setType] = useState(false) // success - true, error - false
    const mdUp = useMediaQuery('(min-width: 800px')

    const {
        formState: { errors },
        handleSubmit,
        register,
        getValues
    } = useForm({
        defaultValues: {
            email: '',
            message: ''
        },
        resolver: yupResolver(schema),
    })

    const handleLoginSubmit = async ({email, message}) => {
        setType(true)
        setCheckError(true)
        setErrorMessage(`Message was sent to ${getValues("email")}. Wait for our response as soon as possible!`)
    }

    return (
        <>
        <Container maxWidth="lg">
            <GradientHeader login={loginFormOpen}/>
            <Box component={"div"} style={{padding: '20px 40px', display: photoLoaded ? "block" : "none", transition: '0.5s'}}>
                <Grid>
                    <Grid item style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: mdUp ? "nowrap" : "wrap"}}>
                        <div style={{flex: '20% 0'}}>
                            <Typography variant={"h2"}>
                                Verify and guarantee
                            </Typography>
                            <Typography style={{marginTop: '20px', fontSize: '17px', color: '#a4aeb8'}}>
                                Counterfeit prevention made easy and reliable
                            </Typography>
                        </div>
                        {mdUp && (
                            <div style={{height: '300px'}}>
                                <img src={coins} alt={"coins"} style={{width: 600, display: photoLoaded ? "block" : 'none'}} onLoad={() => setPhotoLoaded(true)}/>
                            </div>
                        )}
                    </Grid>
                    <Grid item style={{display: 'flex', justifyContent: 'space-between', marginTop: '50px', flexWrap: mdUp ? "nowrap" : "wrap"}}>
                        <Button className={classes.loginBtn}
                                onClick={() => {
                                    setLoginFormOpen(true)
                                }}
                                style={{flex: mdUp ? '45% 0' : '100% 0', fontSize: '20px', height: '50px', backgroundColor: '#08f895'}}>
                            Login
                        </Button>
                        {mdUp && (
                            <Typography variant={"h6"} style={{fontWeight: 300}}>
                                or
                            </Typography>
                        )}
                        <Button className={classes.loginBtn}
                                onClick={() => {
                                    setLoginFormOpen(true)
                                }}
                                style={{flex: mdUp ? '45% 0' : '100% 0', fontSize: '20px', height: '50px', backgroundColor: '#08f895', marginTop: mdUp ? '0px' : '10px'}}>
                            Connect Wallet
                        </Button>
                    </Grid>
                    <Grid item style={{display: 'flex', justifyContent: mdUp ? 'space-between' : 'center', rowGap: mdUp ? 0 : '10px', marginTop: '50px', flexWrap: mdUp ? "nowrap" : "wrap"}}>
                        {mdUp && (
                            <img src={nftImage} style={{width: '45%'}} alt={"NFT Image"}/>
                        )}
                        {!mdUp && (
                            <Typography variant={"h3"}>
                                Feedback
                            </Typography>
                        )}
                        <form noValidate onSubmit={handleSubmit(handleLoginSubmit)} className={classes.contactForm} style={{flex: mdUp ? '45% 0' : '100% 0'}}>
                            <TextField
                                className={classes.inputField}
                                fullWidth
                                placeholder={"Email"}
                                {...register('email')}
                                error={!!errors?.text}
                                helperText={errors?.password?.message}
                            />
                            <TextField
                                className={classes.inputField}
                                fullWidth
                                placeholder={"Enter a message"}
                                {...register('message')}
                                error={!!errors?.text}
                                helperText={errors?.repeatPassword?.message}
                            />
                            <hr style={{color: 'white', margin: '20px 0px'}}/>
                            <Button type={'submit'} className={classes.submitBtn}>
                                Send Now
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </Box>
            <AlertMessage errorMessage={errorMessage} visible={checkError} close={() => {setCheckError(false)}} type={type}/>
        </Container>
        <Footer/>
    </>
    );
}

const GradientHeader = ({login}) => {
    const classes = useStyles()
    const mdUp = useMediaQuery(theme => theme.breakpoints.up("md"))
    const [open, setOpen] = React.useState(false)
    const [loginFormOpen, setLoginFormOpen] = React.useState(login)
    const navigate = useNavigate()

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = (to) => {
        navigate(to)
        setOpen(false)
    }

    return (
        <Box component={"header"} className={classes.appBar}>
            <div onClick={() => navigate('/')}>
                <img src={logo} alt="logo" className={classes.logo} />
            </div>
            {mdUp && (
                <>
                    <nav>
                        <List style={{display: 'flex', columnGap: '30px'}}>
                            {routes.map(({ to, name }) => (
                                <ListItem className={classes.link} style={{ whiteSpace: 'nowrap' }} key={name}>
                                    <ListItemText>
                                        <Link onClick={() => {alert(`This route ${to} is yet to be done ASAP`)}}
                                              className={classes.link}>
                                            {name}
                                        </Link>
                                    </ListItemText>
                                </ListItem>
                            ))}
                            <Button className={classes.loginBtn}
                                    onClick={() => {
                                        setLoginFormOpen(true)
                                    }}>
                                LOGIN
                            </Button>
                        </List>
                    </nav>
                </>
            )}
            {!mdUp && (
                <div>
                    <Button className={classes.loginBtn}
                            onClick={() => {
                                setLoginFormOpen(true)
                            }}>
                        LOGIN
                    </Button>
                    <IconButton
                        aria-label={'menu button'}
                        className={classes.menuIconButton}
                        color={'primary'}
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        anchor="right"
                        open={open}
                        onClose={handleDrawerClose}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div>
                            <CloseIcon style={{color:'white', margin: '5px 5px'}} fontSize={"large"} onClick={handleDrawerClose}/>
                        </div>
                        <nav style={{marginTop: '5px'}}>
                            <List>
                                {routes.map(({ to, name }) => (
                                    <ListItem key={name}>
                                        <ListItemText style={{ textAlign: 'right'}}>
                                            <Link
                                                onClick={() => {
                                                    handleDrawerClose(to)
                                                }}
                                                className={classes.link}
                                                style={{fontSize: '25px'}}
                                            >
                                                {name}
                                            </Link>
                                        </ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        </nav>
                    </Drawer>
                </div>
            )}
            <Login visible={loginFormOpen} close={() => {
                setLoginFormOpen(false)}
            }/>
        </Box>
    )
}

export default Greeting;
