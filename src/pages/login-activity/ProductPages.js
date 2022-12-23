import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {
    Button, Dialog, DialogContent, DialogTitle,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {deleteProduct, getProducts} from "../../api/productsAPI";

const useStyles = makeStyles(theme => ({
    searchInput: {
        margin: '20px auto',
        // border: '2px solid white',
        width: '80%',
        border: `2px solid ${theme.palette.text.secondary} !important`,
        borderRadius: '10px',
        '&:hover': {
            border: `2px solid ${theme.palette.secondary.main} !important`,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        }
    },
    headerBox: {
        margin: '30px 0',
        width: '100%',
        display: 'flex',
        borderBottom: `2px solid ${theme.palette.secondary.main}`
    },
    pageListItem: {
        position: 'relative',
        height: '100px',
        top: -30
    },
    pageWholeItem: {
        position: 'relative',
        width: '100%',
        height: '90px',
        margin: '10px 0',
        display: 'flex',
        '&:hover' : {
            '& > div' : {
                // width: '80%',
            },
            '& > span' : {
                flexGrow: 1
            }
        }
    },
    pageItem: {
        height: '100%',
        margin: '10px 0',
        // width: '100%',
        flex: '1',
        display: 'flex',
        backgroundColor: '#0a1227',
    },
    optionsItem: {
        overflow: 'hidden',
        height: '90px',
        margin: '10px 0',
        display: 'flex',
        width: 0,
        maxWidth: '20%',
        flex: '0',
        backgroundColor: '#0a1227',
        transition: 'flex-grow 441.233ms cubic-bezier(0.84, 0.01, 0.24, 1) 0ms',
        "@media(max-width: 600px)":{
            maxWidth: '40%',
        }
    },
    containerBox: {
        height: '100vh',
        padding: 50,
        textAlign: 'center',
        position: 'relative',
        '@media(max-width: 960px)': {
            padding: '50px 15px'
        }
    },
    optionItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flex: '1 1 33.3%',
        textAlign: 'center',
        textDecoration: 'none',
        color: theme.palette.background.default
    },
    loginMenu: {
        backgroundColor: '#0f1932 !important',
        color: theme.palette.text.secondary,
        borderRadius: '10px',
        // border: `2px solid ${theme.palette.secondary.main}`,
        fontFamily: theme.typography.fontFamily,
        width: '20%',
        '@media(max-width: 820px)': {
            width: '60%'
        }

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
    cancelBtn: {
        marginTop: '15px',
        marginBottom: '5px',
        color: theme.palette.primary.main,
        fontSize: '15px',
        width: '100px',
        backgroundColor: '#ec5555',
        '&:hover': {
            backgroundColor: '#ea3a3a',
        },
    },
    confirmBtn: {
        marginTop: '15px',
        marginBottom: '5px',
        marginLeft: '10px',
        color: theme.palette.primary.main,
        fontSize: '15px',
        width: '100px',
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: '#01ba74',
        },
    },
    icon: {
        fontSize: '30px'
    }
}))

const ProductPages = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const [openConfirm, setOpenConfirm] = useState(false)
    const theme = useTheme()
    const downMd = useMediaQuery(theme.breakpoints.down('md'));
    const [products, setProducts] = useState([])
    const [init, setInit] = useState(false)
    const [isAnyProducts, setIsAnyProducts] = useState(false)

    useEffect(() => {
        getProducts().then(response => {
            if(response.count > 0) {
                setProducts(response.results)
                setIsAnyProducts(true)
            }else{
                setIsAnyProducts(false)
            }
            setInit(true)
        }).catch(() => {
            setIsAnyProducts(false)
            setInit(true)
        })
    }, [])

    const handleDeleteProduct = (brandId, productId) => {
      deleteProduct(brandId, productId)
      close()
    }

    return (
        <>
            {init && (
                <Box className={classes.containerBox}>
                    {downMd === true ? (
                        <AddIcon onClick={() => {navigate('create-page')}}  htmlColor={'white'} fontSize={'large'} style={{position: "absolute", right: 10, top: 15}}/>
                    ) : (
                        <Button onClick={() => {navigate('create-page')}} color={'secondary'} style={{position: "absolute", right: 10, top: 15}}>
                            CREATE NEW ONE
                        </Button>
                    )}
                    <Typography variant={'h4'} style={{letterSpacing: '0.1rem', fontWeight: 300}}>
                        YOUR OWN PAGES
                    </Typography>
                    <TextField
                        type="text"
                        placeholder="Search.."
                        className={classes.searchInput}
                    />
                    <Box className={classes.headerBox}>
                        <div style={{flex: '1 1'}}>
                            <Typography variant={'h6'}>
                                TITLE
                            </Typography>
                        </div>
                        {downMd === false ? (
                            <>
                                <Box component={"div"} style={{flex: '1.5 1'}}>
                                    <Typography variant={'h6'}>
                                        DETAILS
                                    </Typography>
                                </Box>
                                <Box component={"div"} style={{flex: '1.8 1'}}>
                                    <Typography variant={'h6'}>
                                        BRAND NAME
                                    </Typography>
                                </Box>
                            </>
                        ) : null}
                        <div style={{flex: '1 1'}}>
                            <Typography variant={'h6'}>
                                NAME
                            </Typography>
                        </div>
                    </Box>
                    {isAnyProducts === true ? (
                        <Box>
                            <List>
                                {products.map((page) => (
                                    <ListItem disableGutters className={classes.pageListItem} style={{ whiteSpace: 'nowrap' }} key={page.title}>
                                        <ListItemText style={{position: 'relative', display: 'inline-block'}}>
                                            <div className={classes.pageWholeItem}>
                                                <Box component={'div'}
                                                     className={classes.pageItem}>
                                                    <div style={{flex: '1 1', textAlign: 'center', margin: 'auto 0'}}>
                                                        {page.title}
                                                    </div>
                                                    {downMd === false ? (
                                                        <>
                                                            <div style={{flex: '1.5 1', textAlign: 'center', margin: 'auto 0'}}>
                                                                {page.details}
                                                            </div>
                                                            <div style={{flex: '1.8 1', textAlign: 'center', margin: 'auto 0'}}>
                                                                {page.brand_name}
                                                            </div>
                                                        </>
                                                    ): null}
                                                    <div style={{flex: '1 1', textAlign: 'center', margin: 'auto 0'}}>
                                                        {page.name}
                                                    </div>
                                                </Box>
                                                <Box component={"span"} className={classes.optionsItem}>
                                                    <Link to={`edit-page/?page_id=${page.id}&brand_id=${page.brand_id}`} style={{backgroundColor: '#1393df', marginLeft: '5px'}} className={classes.optionItem}>
                                                        <EditIcon className={classes.icon}/>
                                                    </Link>
                                                    <Link to={`page-stats/?page_id=${page.id}&brand_id=${page.brand_id}`} style={{backgroundColor: '#74d16c'}} className={classes.optionItem}>
                                                        <EqualizerIcon className={classes.icon}/>
                                                    </Link>
                                                    <div onClick={() => {setOpenConfirm(true)}} style={{backgroundColor: '#fb5c5c'}} className={classes.optionItem}>
                                                        <DeleteForeverIcon className={classes.icon}/>
                                                    </div>
                                                    <Dialog open={openConfirm} onClose={() => {setOpenConfirm(false)}} transitionDuration={500} PaperProps={{classes: {root: classes.loginMenu}}}>
                                                        <DialogTitle style={{textAlign: 'center'}}>
                                                            <Typography classes={{root : classes.titleText}}>
                                                                Confirm
                                                            </Typography>
                                                        </DialogTitle>
                                                        <DialogContent style={{textAlign: 'center'}}>
                                                            <Typography style={{fontSize: '20px', textAlign: 'center', fontWeight: '300'}}>
                                                                Delete this page ?
                                                            </Typography>
                                                            <Button className={classes.cancelBtn} onClick={() => {setOpenConfirm(false)}}>
                                                                Cancel
                                                            </Button>
                                                            <Button className={classes.confirmBtn} onClick={() => handleDeleteProduct(page.brand_id, page.id)}>
                                                                Confirm
                                                            </Button>
                                                        </DialogContent>
                                                    </Dialog>
                                                </Box>
                                            </div>
                                        </ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    ) : (
                        <Typography style={{fontSize: '30px', fontWeight: 300}}>There is no product in your account</Typography>
                    )}
                </Box>
            )}
        </>
    );
}

export default ProductPages;
