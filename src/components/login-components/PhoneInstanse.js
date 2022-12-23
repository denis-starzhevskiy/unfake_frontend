import React from 'react';
import Box from "@material-ui/core/Box";
import {makeStyles, Typography} from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";
import {useWatch} from "react-hook-form";

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
        height: '100%',
        borderRadius: '20px',
        border: '2px solid white',
        padding: '20px'
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
        width: '60%',
        margin: '10px',
        marginLeft: 'auto',
        marginRight: 'auto',
        '@media(max-width: 1500px)': {
            width: '75%'
        },
        '@media(max-width: 800px)': {
            width: '100%'
        }
    },
    photoUploadBlock: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: '20px',
        border: `2px solid ${theme.palette.text.secondary}`,
        borderRadius: '10px',
        width: '100%',
        padding: '10px'
    },
    inputFileLogo: {
        margin: '10px'
    },
    accordion: {
        // backgroundColor: '#0d0d22',
        width: '100%',
        height: 'max-content',
        '.MuiAccordion-root.Mui-expanded': {
            margin: '17px 0'
        }
    },
    accordionDiv: {
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid white`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: '15px',
        height: '50px',
        letterSpacing: '0.1rem',
        color: 'white',
        marginBottom: '2px',
        '&:hover': {
            borderBottom: `2px solid white`
        }
    },
    removeBtn: {
        color: 'red',
        fontWeight: 300,
        border: '2px solid red',
        padding: '3px',
        borderRadius: '10px',
        transition: '0.8s',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#0b142d'
        }
    }
}))

const PhoneInstanse = ({control, currentContext, previewImage, socials}) => {
    const classes = useStyles()

    const title = useWatch({
        control,
        name: "title",
    });

    const description = useWatch({
        control,
        name: "description",
    });
    const authentic = useWatch({
        control,
        name: "authentic",
    });
    const unauthentic = useWatch({
        control,
        name: "unauthentic",
    });
    const expired = useWatch({
        control,
        name: "expired",
    });

    const details = useWatch({
        control,
        name: "details",
    });

    return (
        // <>
        //     {init && (
                <Box component={'div'} className={classes.instance}>
                    <Box component={'div'} style={{padding: '50px 0', display: 'flex', flex: '1 1 30%', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
                        <Typography variant={'h5'} style={{textAlign: 'center', textTransform: 'uppercase', width: '80%', fontWeight: 300, margin: '0px auto'}}>
                            {title !== '' ? title : (
                                <i style={{color: 'grey'}}>Title</i>
                            )}
                        </Typography>
                        <Typography variant={'h6'} style={{textAlign: 'center', fontWeight: 300, width: '80%'}}>
                            {description}
                        </Typography>
                    </Box>
                    <Box style={{flex: '1 1 30%'}}>
                        <>
                            {previewImage ? (
                                <img src={previewImage} style={{backgroundColor: 'grey', width: '70%', aspectRatio: 1}} alt=""/>
                            ) : (
                                <Typography variant={'h5'} style={{textAlign: 'center', width: '100%', fontWeight: 300, margin: '50px 0px'}}>
                                    <i style={{color: 'grey'}}>Image are not available</i>
                                </Typography>
                            )}
                        </>
                    </Box>
                    <Box style={{flex: '1 1 30%', margin: '30px'}}>
                        {currentContext === 'authentic' ? (
                            <>
                                <CheckCircleOutlineIcon style={{fontSize: '150px', fontWeight: 300}} color={'secondary'}/>
                                <Typography variant={'h6'}>
                                    {authentic}
                                </Typography>
                            </>
                        ) : null}
                        {currentContext === 'expired' ? (
                            <>
                                <CancelIcon style={{fontSize: '150px', fontWeight: 300}} color={'error'}/>
                                <Typography variant={'h6'}>
                                    {expired}
                                </Typography>
                            </>
                        ) : null}
                        {currentContext === 'unauthentic' ? (
                            <>
                                <CancelIcon style={{fontSize: '150px', fontWeight: 300}} color={'error'}/>
                                <Typography variant={'h6'}>
                                    {unauthentic}
                                </Typography>
                            </>
                        ) : null}
                    </Box>
                    <Box style={{flex: '1 1 30%', margin: '40px 0px'}}>
                        <Typography variant={'h6'} style={{fontWeight: 300}}>
                            {details !== '' ? details : "No product details available."}
                        </Typography>
                    </Box>
                    {socials ? (
                        <Box style={{flex: '1 1 30%', margin: '20px 0px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', flexWrap: 'wrap'}}>
                            {socials.map(social => {
                                const Icon = social.logo;

                                return (
                                    <span key={social.color}>
                                        <Icon style={{fontSize: `${social.size}`, color: `${social.color}`, margin: '0px 10px'}}/>
                                    </span>
                                )
                            })}
                        </Box>
                    ) : null}
                    <Typography variant={'caption'}
                                color={"textSecondary"}
                                style={{fontSize: 10, letterSpacing: '0.1rem',textAlign: 'center', flex: '0.1 0 30%', margin: '5px 0'}}>
                        Powered by Unafake.io
                    </Typography>
                </Box>
        //     )}
        // </>
    );
}

export default PhoneInstanse;
