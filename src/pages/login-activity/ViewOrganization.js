import React, {useEffect, useState} from 'react';
import {Button, Container, InputLabel, makeStyles, MenuItem, TextField, Typography} from "@material-ui/core";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {object, string} from "yup";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/material.css'
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import classNames from "classnames";
import {getOrganization} from "../../api/organizationAPI";
import AlertMessage from "../../components/AlertMessage";

const useStyles = makeStyles(theme => ({
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
    selectPlaceholder: {
        '& .MuiOutlinedInput-root': {
            color: 'grey'
        }
    },
    phoneContainer: {
        margin: '10px',
        backgroundColor: theme.palette.background.default,
        border: `2px solid ${theme.palette.text.secondary}`,
        borderRadius: '10px',
        '&:hover':{
            border: `2px solid ${theme.palette.secondary.main}`
        },
        '&:active':{
            border: `2px solid ${theme.palette.secondary.main}` //TODO active input
        },
        //label class
        '& .special-label':{
            backgroundColor: theme.palette.background.default,
            left: '8px'
        },
        //input field class
        '& .form-control': {
            width: '95%',
            marginLeft: '5%',
            padding: 0,
            margin: 0,
            color: 'white',
            backgroundColor: theme.palette.background.default,
            height: '60px',
            border: 'none',
            '&:focus': {
                border: 'none',
                boxShadow: 'none'
            },
            '@media(max-width: 1200px)' : {
                marginLeft: '8%',
                width: '92%'
            },
            '@media(max-width: 615px)' : {
                marginLeft: '10%',
                width: '90%'
            }
        },
        //dropDown class
        '& .country-list': {
            backgroundColor: theme.palette.background.secondary,
            '& .country': {
                '&:hover':{
                    backgroundColor: theme.palette.background.hover
                }
            },
            '& .country.highlight': {
                backgroundColor: theme.palette.background.hover
            },
            '& .search' : {
                backgroundColor: 'inherit',
            },
            '& .search-box' : {
                backgroundColor: 'inherit',
                border: `2px solid ${theme.palette.text.secondary}`,
                borderRadius: '10px',
                color: 'white',
                '&:hover': {
                    border: `2px solid ${theme.palette.secondary.main}`,
                }
            }
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
    dropdownStyle: {
        marginTop: '50px',
        width: 'inherit',
        letterSpacing: '0.1rem',
        backgroundColor: theme.palette.background.secondary
    },
    icon: {
        color: theme.palette.secondary.main
    },
    gapItem: {
        height: '60px',
        width: '100%',
        borderRadius: '10px',
        margin: '6px',
        paddingRight: '15px',
        marginTop: '12px',
        marginBottom: '6px',
        border: `2px solid ${theme.palette.text.secondary}`,
        color: 'black',
        '&:hover': {
            border: `2px solid ${theme.palette.secondary.main}`
        }
    },
    // gap: {
    //     fontSize: '19px',
    //     // color: "black",
    //     color: '#f87f30',
    //     transform: 'translate(14px, -6px) scale(0.75)'
    // },
    menuItem: {
        // color: '#f87f30',
        backgroundColor: theme.palette.background.secondary,
        '&:hover': {
            backgroundColor: theme.palette.background.hover
        }
    },
    menuList: {
        maxHeight: '50vh',
        overflowY: 'auto',
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
    selectRoot: {
        color: 'white',
        // '&:focus':{
        //     backgroundColor:'white'
        // },
        '&:selected': {
            backgroundColor: 'orange'
        },
    },
    saveButton: {
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '15px'
    },
    selectedRoot: {
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        textAlign: 'start',
        display: 'block',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        color: 'white',
        '&$selectedMenuItem': {
            backgroundColor: theme.palette.background.hover
        },
    },
    selectedMenuItem: {
        '&:hover': {

        }
    },
}));

const schema = object({
    organizationName: string().required('Necessary filed'),
    description: string(),// string().required('Necessary filed'),
    registerNumber: string(),  //.required('Necessary filed'),
    country: string(), //.notOneOf([''], 'Please, choose a country'),
    organization_type: string(), //.notOneOf([''], 'Please, choose a role'),
    product_type: string(), //.notOneOf([''], 'Please, choose a type'),
    address: string(), //.required('Necessary filed'),
    phone: string(), //.required('Necessary field'),
    email: string(), //.required('Necessary filed').email("Email isn't correct"),
    website: string(), //.required('Necessary filed').matches(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/, "URL isn't correct, must be: https://")
})

const ViewOrganization = () => {
    const classes = useStyles()
    const [logoFile, setLogoFile] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [countries, setCountries] = useState([])
    const [organizationTypes, setTypes] = useState([])
    const [organizationRoles, setRoles] = useState([])
    const [getMessage, setGetMessage] = useState(false)
    const [message, setMessage] = useState('')
    const [init, setInit] = useState(false)

    const {
        formState: { errors },
        handleSubmit,
        register,
        control,
        setValue
    } = useForm({
        defaultValues: {
            organizationName: '',
            description: '',
            registerNumber: '',
            country: '',
            organization_type: '',
            product_type: '',
            address: '',
            email: '',
            website: ''
        },
        resolver: yupResolver(schema),
    })

    useEffect(() => {
        getOrganization().then(response => {
            setValue('organizationName', response.name)
            setValue('organization_type', response.organanization_type !== null ? response.organanization_type : '')
            setValue('description', response.description)
            setValue('registerNumber', response.registration_number)
            setValue('country', response.country !== null ? response.country : '')
            setValue('product_type', response.product_type !== null ? response.product_type : '')
            setValue('phone', response.phone)
            setValue('address', response.address)
            setValue('email', response.email)
            setValue('website', response.website)
            if(response.logo !== null) setPreviewImage(response.logo)

            setInit(true)
        })
    }, [])

    useEffect(() => {
        setCountries([{id: 1, name: 'Ukraine'}, {id: 2, name: 'USA'}, {id: 3, name: 'United Kingdom'}, {id: 4, name: 'Poland'}])
        setTypes([
            {id: 1, name: 'Distributor'},
            {id: 2, name: 'Assembler'},
            {id: 3, name: 'Agency'},
            {id: 4, name: 'Owner'},
            {id: 5, name: 'Issuer'},
            {id: 6, name: 'Manufacturer'}])
        setRoles([
            {id:1, name: 'Type 1'},
            {id: 2, name: 'Type 2'}])
    }, [])

    const handleUploadClick = event => {
        const file = event.target.files[0];
        setLogoFile(file);

        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = function() {
            console.log(reader.result)
            setPreviewImage(reader.result)
        };
    };

    const handleRegisterSubmit = ({organizationName, description, registerNumber, country, type, role, address, email, website}) => {
        let countryId = 0
        countries.forEach(value => {
            if(value.name === country){
                countryId = value.id
            }
        })
        let typeId = 0
        organizationTypes.forEach(value => {
            if(value.name === type){
                typeId = value.id
            }
        })
        let roleId = 0
        organizationRoles.forEach(value => {
            if(value.name === role){
                roleId = value.id
            }
        })
        console.group("Submit")
        console.log({organizationName, description, registerNumber, address, phoneNumber, selectedFile: logoFile, email, website, countryId, role, roleId, type, typeId})
        console.groupEnd()

        let formData = new FormData()
        formData.append('name', organizationName)
        formData.append('description', description)
        formData.append('logo', logoFile)
        formData.append('organization_type', typeId)
        formData.append('product_type', roleId)
        formData.append('registration_number', registerNumber)
        formData.append('website', website)
        formData.append('phone', phoneNumber)
        formData.append('country', countryId)
        formData.append('address', address)
        formData.append('email', email)

        if(changeOrganization(formData) === true){
            setGetMessage(true)
            setMessage("You've changed the information of organization")
        }else{
            setGetMessage(true)
            setMessage("Something went wrong. Please, try again")
        }
    }

    return (
        <>
            {init && (
                <Container>
                    <form noValidate
                          onSubmit={handleSubmit(handleRegisterSubmit)}
                          autoComplete={"off"}
                          style={{textAlign: 'center', marginTop: '20px', letterSpacing: '0.2rem'}}
                          className={classes.form}>
                        <Typography variant={'h4'} style={{letterSpacing: '0.1rem', fontWeight: 300}}>
                            Organization
                        </Typography>
                        <Typography variant={'h6'} style={{margin: '15px 0', letterSpacing: '0.1rem', fontWeight: 300, }}>
                            Details about your organization
                        </Typography>
                        <TextField
                            className={classes.root}
                            label={"Organization Name"}
                            placeholder={"Organization Name"}
                            fullWidth
                            {...register('organizationName')}
                            style={{ marginTop: '10px', height: '70px'}}
                            error={!!errors?.organizationName}
                            helperText={errors?.organizationName?.message}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
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
                        <div className={classes.photoUploadBlock}>
                            <InputLabel style={{backgroundColor: '#08091b', padding: '0px 5px', color: 'white', fontSize: '12px', position: 'absolute', top: -5, left: 10}}>Upload logo</InputLabel>
                            <InputLabel style={{backgroundColor: '#08091b', marginLeft: '10px', color: 'grey', width: '40%', lineHeight: '20px'}}>
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
                            className={classes.root}
                            label={"Registration Number"}
                            placeholder={"Official Registration number of this Business/Organization"}
                            fullWidth
                            {...register('registerNumber')}
                            style={{ marginTop: '10px', height: '70px' }}
                            error={!!errors?.registerNumber}
                            helperText={errors?.registerNumber?.message}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Controller
                            render={({ field }) => <TextField
                                className={classNames(classes.root)}
                                style={{width: '100%'}}
                                select
                                label={"Country"}
                                {...field}
                                error={!!errors?.country}
                                helperText={errors?.country?.message}
                                onChange={(event, child) => {
                                    field.onChange(child.props.country.name)
                                }}
                                SelectProps={{
                                    displayEmpty: true,
                                    renderValue: (selected) => {
                                        if (selected.length === 0) {
                                            return <Typography style={{color: 'grey'}}>Choose a country</Typography>;
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
                                <MenuItem value=''
                                          style={{backgroundColor: '#0a1227', color: 'grey'}}
                                          disabled
                                >
                                    Choose a country
                                </MenuItem>
                                {countries.map(country => (
                                    <MenuItem key={country.id}
                                              value={country.name}
                                              country={country}
                                              className={classes.menuItem}>
                                        {country.name}
                                    </MenuItem>
                                ))}</TextField>
                            }
                            control={control}
                            name="country"
                            defaultValue={''}
                        />
                        <Controller
                            render={({ field }) => <TextField
                                className={classNames(classes.root)}
                                style={{width: '100%'}}
                                select
                                label={"Organization Type"}
                                {...field}
                                error={!!errors?.organization_type}
                                helperText={errors?.organization_type?.message}
                                onChange={(event, child) => {
                                    field.onChange(child.props.type.name)
                                }}
                                SelectProps={{
                                    displayEmpty: true,
                                    renderValue: (selected) => {
                                        if (selected.length === 0) {
                                            return <Typography style={{color: 'grey'}}>Choose a type</Typography>;
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
                                    Choose an organization type
                                </MenuItem>
                                {organizationTypes.map((type) => (
                                    <MenuItem key={type.id}
                                              value={type.name}
                                              type={type}
                                              className={classes.menuItem}>
                                        {type.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            }
                            control={control}
                            name="organization_type"
                            defaultValue={''}
                        />
                        <Controller
                            render={({ field }) => <TextField
                                className={classNames(classes.root)}
                                style={{width: '100%'}}
                                select
                                label={"Organization Role"}
                                {...field}
                                error={!!errors?.product_type}
                                helperText={errors?.product_type?.message}
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
                            name="product_type"
                            defaultValue={''}
                        />
                        <TextField
                            className={classes.root}
                            label={"Address"}
                            placeholder={"Address"}
                            fullWidth
                            {...register('address')}
                            style={{ marginTop: '10px', height: '70px' }}
                            error={!!errors?.address}
                            helperText={errors?.address?.message}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <PhoneInput
                            component={TextField}
                            label={"Phone number"}
                            placeholder={"Phone number"}
                            containerClass={classes.phoneContainer}
                            defaultCountry='us'
                            regions={['europe', 'north-america']}
                            enableSearch={true}
                            // dropdownClass={classes.dropDown}
                            // searchClass={classes.searchField}
                            onChange={(val, country, e) => {
                                setPhoneNumber(e.target.value)
                            }}
                            // disableSearchIcon={true}
                            // InputLabelProps={{
                            //         shrink: true,
                            // }}
                        />
                        <TextField
                            className={classes.root}
                            label={"Email"}
                            placeholder={"Email"}
                            fullWidth
                            {...register('email')}
                            style={{ marginTop: '10px', height: '70px' }}
                            error={!!errors?.email}
                            helperText={errors?.email?.message}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            className={classes.root}
                            label={"Website"}
                            placeholder={"Website"}
                            fullWidth
                            {...register('website')}
                            style={{ marginTop: '10px', height: '70px' }}
                            error={!!errors?.website}
                            helperText={errors?.website?.message}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Button type={'submit'} className={classes.submitBtn}>
                            APPLY FOR VERIFIED STATUS
                        </Button>
                    </form>
                </Container>
            )}
            <AlertMessage visible={getMessage} errorMessage={message} type={true} close={() => setGetMessage(false)} />
        </>
    );
}

export default ViewOrganization;
