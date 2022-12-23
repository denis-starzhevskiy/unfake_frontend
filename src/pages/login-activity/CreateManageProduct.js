import React, {useEffect, useState} from 'react';
import {Button, Grid, makeStyles, MenuItem, TextField, Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {Controller, FormProvider, useForm} from "react-hook-form";
import {object, string} from "yup";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {changeProduct, createProduct, getProduct} from "../../api/productsAPI";
import PhoneInstanse from "../../components/login-components/PhoneInstanse";
import classNames from "classnames";
import AlertMessage from "../../components/AlertMessage";
import isURL from 'validator/lib/isURL'
import YouTubeIcon from '@material-ui/icons/YouTube';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TelegramIcon from '@material-ui/icons/Telegram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import LinkIcon from '@material-ui/icons/Link';
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import {useNavigate} from "react-router-dom";
import ProductAccordion from "../../components/login-components/ProductAccordion";

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'start',
        margin: '20px',
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
        width: '40%',
        textAlign: 'center',
        '@media(max-width: 1200px)': {
            width: '100%'
        }
    },
    editor: {
        marginTop: '20px',
        width: '100%',
        height: 'max-content',
        borderRadius: '20px',
        border: '2px solid white',
        padding: '20px',
        display: 'flex'
    },
    editorNav: {
        height: '100%'
    },
    instance: {
        boxShadow: 'rgba(250, 250, 250, 0.3) 0px 5px 15px',
        borderRadius: '20px',
        border: '2px solid white',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '60%',
        margin: '10px',
        marginLeft: 'auto',
        marginRight: 'auto',
        '@media(max-width: 1500px)': {
            width: '80%'
        },
        '@media(max-width: 800px)': {
            width: '100%'
        }
    },
    submitBtn: {
        marginTop: '50px',
        marginBottom: '5px',
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.main,
        letterSpacing: '0.1rem',
        fontSize: '15px',
        '&:hover': {
            backgroundColor: '#01ba74',
        },
        '@media(max-width: 900px)': {
            marginBottom: '50px'
        }
    },
    menuItem: {
        // color: '#f87f30',
        backgroundColor: theme.palette.background.secondary,
        '&:hover': {
            backgroundColor: theme.palette.background.hover
        }
    },
    list: {
        color: 'white',
        '& .MuiList-padding': {
            padding: 0,
            height: 'auto',
            overflow: 'scroll'
        },
        '& .MuiPaper-rounded': {
            borderRadius: '10px'
        },
        '& .MuiListItem-root.Mui-selected':{
            backgroundColor: theme.palette.background.hover,
        },
        '& .MuiListItem-root.Mui-disabled': {
            opacity: 1
        }
    },
    link: {
        position: "absolute",
        right: 10,
        top: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
            cursor: 'pointer',
            color: theme.palette.secondary.main
        }
    }
}))

const schema = object({
    name: string().required('Necessary filed'),
    brandId: string().required('Necessary filed'),
    title: string().required('Necessary filed'),
    description: string(),
    authentic: string(),
    expired: string(),
    unauthentic: string(),
    details: string()
})

const CreateManageProduct = ({edit}) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const [checkError, setCheckError] = useState(false)
    const [messageType, setMessageType] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [currentContext, setCurrentContext] = useState("authentic")
    const [brands, setBrands] = useState([])
    const [socials, setSocials] = useState([]);
    const [init, setInit] = useState(false)

    const methods = useForm({
        defaultValues: {
            name: '',
            brandId: '',
            title: '',
            description: '',
            authentic: '',
            expired: '',
            unauthentic: '',
            details: '',
        },
        resolver: yupResolver(schema),
    })

    useEffect(() => {
        setBrands([
            {id: 1, name: 'Brand 1'},
            {id: 2, name: 'Brand 2'},
            {id: 3, name: 'Brand 3'}
        ])
    }, [])

    useEffect(() => {
        const pageId = new URLSearchParams(location.search).get('page_id');
        const brandId = new URLSearchParams(location.search).get('brand_id');

        if(pageId){
            getProduct(pageId, brandId).then((product) => {
                methods.setValue("name", product.name)
                methods.setValue("title", product.title)
                methods.setValue("description", product.pageDescription)
                methods.setValue("authentic", product.authentic)
                methods.setValue("expired", product.expired_url)
                methods.setValue("unauthentic", product.inauthentic)
                methods.setValue("details", product.details)
                if(product.image !== null) setPreviewImage(product.image)
                if(product.socials) {
                    product.socials.forEach(elem => getSocialLink(elem.link))
                }
                setInit(true)
            })
        }else{
            setInit(true)
        }
    }, [])

    function extractedPreview(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = function () {
            setPreviewImage(reader.result)
        };
    }

    const handleUploadClick = event => {
        const file = event.target.files[0];
        setSelectedFile(file);
        extractedPreview(file);
    };

    const handleRemoveClick = () => {
        setSelectedFile(null)
        setPreviewImage(null)
    }

    const handleRemoveLink = (link) => {
        setSocials(socials.filter(elem => elem.link !== link))
    }

    function getSocialLink(link) {
        if (isURL(link)) {
            if (link.includes('youtube')) {
                setSocials(previewState => [...previewState, {
                    link: link,
                    logo: YouTubeIcon,
                    color: 'white',
                    size: '50px'
                }])
            } else if (link.includes('facebook')) {
                setSocials(previewState => [...previewState, {
                    link: link,
                    logo: FacebookIcon,
                    color: 'white',
                    size: '30px'
                }])
            } else if (link.includes('instagram')) {
                setSocials(previewState => [...previewState, {
                    link: link.value,
                    logo: InstagramIcon,
                    color: 'white',
                    size: '40px'
                }])
            } else if (link.includes('telegram')) {
                setSocials(previewState => [...previewState, {
                    link: link,
                    logo: TelegramIcon,
                    color: 'white',
                    size: '30px'
                }])
            } else if (link.includes('linkedin')) {
                setSocials(previewState => [...previewState, {
                    link: link,
                    logo: LinkedInIcon,
                    color: 'white',
                    size: '30px'
                }])
            } else if (link.value.includes('whatsapp')) {
                setSocials(previewState => [...previewState, {
                    link: link.value,
                    logo: WhatsAppIcon,
                    color: 'white',
                    size: '30px'
                }])
            } else {
                setSocials(previewState => [...previewState, {
                    link: link,
                    logo: LinkIcon,
                    color: 'white',
                    size: '30px'

                }])
            }
        }
    }

    const handleProductSubmit = ({name, brandId, title, authentic, expired, unauthentic, details}) => {
        const socialsData = socials.map(elem => {
            return {link: elem.link}
        })

        let formData = new FormData()
        formData.append('name', name)
        formData.append('title', title)
        formData.append('authentic', authentic)
        formData.append('expired_url', expired)
        formData.append('inauthentic', unauthentic)
        formData.append('details', details)
        formData.append('image', selectedFile)
        formData.append('socials', JSON.stringify(socialsData))

        if(edit){
            const pageId = new URLSearchParams(location.search).get('page_id');
            const brandId = new URLSearchParams(location.search).get('brand_id');

            changeProduct(pageId, brandId, formData).then(() => {
                setMessageType(true)
                setCheckError(true)
                setErrorMessage("The product was changed")
            }).catch(() => {
                setMessageType(false)
                setCheckError(true)
                setErrorMessage("Something went wrong. Try again.")
            })
        }else{
            let brand = 0
            brands.forEach(value => {
                if(value.name === brandId){
                    brand = value.id
                }
            })

            createProduct(brand, formData).then(() => {
                setCheckError(true)
                setErrorMessage("Information about product was saved")
            }).catch(() => {
                setCheckError(true)
                setErrorMessage("There are some troubles. Try later")
            })
        }
    }

    return (
        <>
            {init && (
                <>
                    <Box sx={{p: '20px'}} style={{textAlign: 'center', height: 'max-content', position: 'relative'}}>
                        <div className={classes.link}>
                            <Typography style={{letterSpacing: '0.1rem', fontWeight: 400, color: '#0e1731'}} onClick={() => navigate(-1)} >
                                GET BACK
                            </Typography>
                            <ArrowForwardIcon style={{color: '#0e1731'}}/>
                        </div>
                        <Typography variant={'h4'} style={{letterSpacing: '0.1rem', fontWeight: 300}}>
                            { edit ? "Manage page" : "Create page"}
                        </Typography>
                        <Grid container className={classes.editor}>
                            <FormProvider {...methods}>
                                <form noValidate onSubmit={methods.handleSubmit(handleProductSubmit)} style={{height: '100%', display: 'flex', flexWrap: 'wrap'}} autoComplete={'off'}>
                                    <Grid xs={12} sm={6} item className={classes.editorNav}>
                                        <Box className={classes.supportForm}>
                                            <TextField
                                                className={classes.root}
                                                label={"Name"}
                                                placeholder={"Name"}
                                                fullWidth
                                                {...methods.register('name')}
                                                style={{ marginTop: '10px', height: '70px'}}
                                                error={!!methods.formState.errors?.brandName}
                                                helperText={methods.formState.errors?.brandName?.message}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                            {!edit && (
                                                <Controller
                                                    render={({ field }) => <TextField
                                                        className={classNames(classes.root)}
                                                        style={{width: '100%'}}
                                                        select
                                                        label={"Brand"}
                                                        {...field}
                                                        error={!!methods.formState.errors?.brandId}
                                                        helperText={methods.formState.errors?.brandId?.message}
                                                        onChange={(event, child) => {
                                                            field.onChange(child.props.type.name)
                                                        }}
                                                        SelectProps={{
                                                            displayEmpty: true,
                                                            renderValue: (selected) => {
                                                                if (selected.length === 0) {
                                                                    return <Typography style={{color: 'grey'}}>Choose a brand</Typography>;
                                                                }
                                                                return selected
                                                            },
                                                            MenuProps: {
                                                                className: classes.list
                                                            }
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    >
                                                        <MenuItem value={''}
                                                                  style={{backgroundColor: '#0a1227', color: 'grey'}}
                                                                  disabled
                                                                  hidden>
                                                            Choose a brand
                                                        </MenuItem>
                                                        {brands.map((type) => (
                                                            <MenuItem key={type.id}
                                                                      value={type.name}
                                                                      type={type}
                                                                      className={classes.menuItem}>
                                                                {type.name}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                    }
                                                    control={methods.control}
                                                    name="brandId"
                                                    defaultValue={''}
                                                />
                                            )}
                                            <ProductAccordion addImage={handleUploadClick}
                                                              removeImage={handleRemoveClick}
                                                              socials={socials}
                                                              setContext={setCurrentContext}
                                                              transformLink={getSocialLink}
                                                              removeLink={handleRemoveLink}/>
                                            <Button type={'submit'} className={classes.submitBtn}>
                                                {edit ? "CHANGE" : "CREATE"}
                                            </Button>
                                        </Box>
                                    </Grid>
                                    <Grid xs={12} sm={6} xsitem>
                                        <PhoneInstanse control={methods.control} currentContext={currentContext} previewImage={previewImage} selectedImage={previewImage} socials={socials}/>
                                    </Grid>
                                </form>
                            </FormProvider>
                        </Grid>
                        <AlertMessage close={() => setCheckError(false)} errorMessage={errorMessage} type={messageType} visible={checkError} />
                    </Box>
                </>
            )}
        </>
    );
}

export default CreateManageProduct;
