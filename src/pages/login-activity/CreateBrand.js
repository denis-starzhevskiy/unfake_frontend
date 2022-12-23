import React, {useEffect, useState} from 'react';
import {
    Button,
    InputLabel,
    makeStyles, MenuItem,
    TextField,
    Typography
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {Controller, useForm} from "react-hook-form";
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import AlertMessage from "../../components/AlertMessage";
import classNames from "classnames";
import {object, string} from "yup";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {createBrand} from "../../api/brandAPI";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '30px'
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
    form: {
        "& .MuiFormControl-root": {}
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
    photoUploadBlock: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        margin: '10px',
        border: `2px solid ${theme.palette.text.secondary}`,
        borderRadius: '10px',
        width: '100%',
        padding: '10px'
    },
    inputFileLogo: {
        margin: '10px'
    },
    photo: {
        aspectRatio: 1,
        padding: '5px',
        border: '2px solid white',
        borderRadius: '10px',
        marginLeft: '50px',
        objectFit: 'contain',
        '@media(max-width: 1200px)': {
            marginLeft: '0px',
        }
    },
    submitBtn: {
        marginTop: '15px',
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
    labels: {
        marginRight: '10px',
        width: '20%',
        textAlign: 'center',
        color: 'white',
        '@media(max-width: 1200px)': {
            width: '100%'
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
    deleteBtn: {
        margin: '10px',
        backgroundColor: '#ff0202',
        color: '#000000',
        '&:hover': {
            backgroundColor: '#cd0000'
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
    brandName: string().required('Necessary filed'),
    description: string().required('Necessary filed'),
    role: string().notOneOf([''], 'Please, choose a role')
})

const CreateBrand = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const [checkError, setCheckError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [logoFile, setLogoFile] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [organizationRoles, setRoles] = useState([])
    const [type, setType] = useState(true)

    const {
        formState: { errors },
        handleSubmit,
        register,
        control
    } = useForm({
        defaultValues: {
            brandName: '',
            role: '',
            description: ''
        },
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        setRoles([
            {id: 1, name: 'Distributor'},
            {id: 2, name: 'Assembler'},
            {id: 3, name: 'Agency'},
            {id: 4, name: 'Owner'},
            {id: 5, name: 'Issuer'},
            {id: 6, name: 'Manufacturer'}])
    }, [])

    const handleUploadClick = event => {
        const file = event.target.files[0];
        setLogoFile(file);

        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = function() {
            setPreviewImage(reader.result)
        };
    };

    const handleChangesSubmit = ({brandName, role, description}) => {
        let formData = new FormData()
        formData.append('name', brandName)
        formData.append('description', description)
        formData.append('logo', logoFile)
        formData.append('organization_role', role)

        createBrand(formData).then(() => {
            setCheckError(true)
            setErrorMessage("Brand was created")
        }).catch(() => {
            setType(false)
            setCheckError(true)
            setErrorMessage("There are some troubles. Try later")
        })
    }

    return (
        <Box sx={{p: '20px'}} style={{textAlign: 'center', position: 'relative'}}>
            <div className={classes.link}>
                <Typography style={{letterSpacing: '0.1rem', fontWeight: 400, color: '#0e1731'}} onClick={() => navigate(-1)} >
                    GET BACK
                </Typography>
                <ArrowForwardIcon style={{color: '#0e1731'}}/>
            </div>
            <Typography variant={'h4'} style={{letterSpacing: '0.1rem', fontWeight: 300}}>
                Create Brand
            </Typography>
            <form noValidate onSubmit={handleSubmit(handleChangesSubmit)} className={classes.supportForm} autoComplete={'off'}>
                <TextField
                    className={classes.root}
                    label={"Brand Name"}
                    placeholder={"Brand Name"}
                    fullWidth
                    {...register('brandName')}
                    style={{ marginTop: '10px', height: '70px'}}
                    error={!!errors?.brandName}
                    helperText={errors?.brandName?.message}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Controller
                    render={({ field }) => <TextField
                        className={classNames(classes.root)}
                        style={{width: '100%'}}
                        select
                        label={"Organization Role"}
                        {...field}
                        error={!!errors?.role}
                        helperText={errors?.role?.message}
                        onChange={(event, child) => {
                            field.onChange(child.props.role.name)
                        }}
                        SelectProps={{
                            displayEmpty: true,
                            renderValue: (selected) => {
                                if (selected.length === 0) {
                                    return <Typography style={{color: 'grey'}}>Choose a role</Typography>;
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
                            Choose an organization role
                        </MenuItem>
                        {organizationRoles.map((role) => (
                            <MenuItem key={role.id}
                                      value={role.name}
                                      role={role}
                                      className={classes.menuItem}>
                                {role.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    }
                    control={control}
                    name="role"
                    defaultValue={''}
                />
                <div className={classes.photoUploadBlock}>
                    <InputLabel style={{backgroundColor: 'transparent', padding: '0px 5px', color: 'white', fontSize: '12px', position: 'absolute', top: -5, left: 10}}>Upload logo</InputLabel>
                    <InputLabel style={{marginLeft: '10px', color: 'grey', width: '40%', lineHeight: '20px'}}>
                        Choose an image to set a logo of organization
                    </InputLabel>
                    <input
                        type="file"
                        accept="image/*"
                        id="fileUpload"
                        style={{display: 'none'}}
                        multiple
                        onChange={handleUploadClick}
                    />
                    <label htmlFor="fileUpload">
                        <Fab component="span" className={classes.inputFileLogo}>
                            <AddPhotoAlternateIcon />
                        </Fab>
                    </label>
                    <img src={previewImage} width={'25%'} className={classes.photo}/>
                </div>
                <TextField
                    multiline rows={3}
                    className={classes.root}
                    label={"Description"}
                    placeholder={"Description"}
                    fullWidth
                    {...register('description')}
                    style={{ marginTop: '10px', height: '110px' }}
                    error={!!errors?.description}
                    helperText={errors?.description?.message}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button type={"submit"} style={{margin: '10px'}} color={"secondary"} size={"large"}>
                    SAVE
                </Button>
            </form>
            <AlertMessage errorMessage={errorMessage} visible={checkError} type={type} close={() => setCheckError(false)}/>
        </Box>
    );
}

export default CreateBrand;
