import React, {useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary} from "./Accordion";
import OpenIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/ExpandLess";
import {InputLabel, makeStyles, TextField, Typography} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import SocialsModalForm from "./SocialsModalForm";
import {useFormContext} from "react-hook-form";

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
        width: '100%',
        height: 'max-content',
        '.MuiAccordion-root.Mui-expanded': {
            margin: '17px 0'
        }
    },
    accordionDiv: {
        // backgroundColor: theme.palette.background.default,
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
    },
}))

const ProductAccordion = ({addImage, removeImage, socials, setContext, transformLink, removeLink}) => {
    const classes = useStyles()
    const [expanded, setExpanded] = useState('false');
    const {
        formState: { errors },
        register,
    } = useFormContext()

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : 'false');
    };

    return (
        <>
            <Accordion
                expanded={expanded === "content"}
                onChange={handleChange("content")}
                classes={{root: classes.accordion}}>
                <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                    classes={{root: classes.accordionDiv}}>
                    Content
                    {expanded !== 'content' ?
                        <OpenIcon style={{position: 'absolute', right: '5'}}/> :
                        <CloseIcon style={{position: 'absolute', right: '5'}}/>
                    }
                </AccordionSummary>
                <AccordionDetails>
                    <TextField
                        className={classes.root}
                        label={"Title"}
                        placeholder={"Title"}
                        fullWidth
                        {...register('title')}
                        error={!!errors?.brandName}
                        helperText={errors?.brandName?.message}
                        inputProps={{
                            maxLength: 20,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        className={classes.root}
                        label={"Description"}
                        placeholder={"Description"}
                        fullWidth
                        multiline
                        rows={3}
                        {...register('description')}
                        style={{ marginTop: '10px', height: '70px'}}
                        error={!!errors?.brandName}
                        helperText={errors?.brandName?.message}
                        inputProps={{
                            maxLength: 30,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <div className={classes.photoUploadBlock}>
                        <InputLabel style={{backgroundColor: '#08091b', padding: '0px 5px', color: 'white', fontSize: '12px', position: 'absolute', top: -5, left: 10}}>Upload logo</InputLabel>
                        <input
                            type="file"
                            accept="image/*"
                            id="fileUpload"
                            style={{display: 'none'}}
                            multiple
                            onChange={addImage}
                        />
                        <label htmlFor="fileUpload">
                            <Fab component="span" className={classes.inputFileLogo}>
                                <AddPhotoAlternateIcon />
                            </Fab>
                        </label>
                        <Typography className={classes.removeBtn} onClick={removeImage}>Remove photo</Typography>
                    </div>
                </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === "Security message"}
                    onChange={handleChange("Security message")}
                    classes={{root: classes.accordion}}>
                    <AccordionSummary
                        aria-controls="panel1d-content"
                        id="panel1d-header"
                        classes={{root: classes.accordionDiv}}>
                        Security messages
                        {expanded !== 'Security message' ?
                            <OpenIcon style={{position: 'absolute', right: '5'}}/> :
                            <CloseIcon style={{position: 'absolute', right: '5'}}/>
                        }
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextField
                            className={classes.root}
                            label={"Authentic message"}
                            placeholder={"Authentic message"}
                            fullWidth
                            {...register('authentic',{
                                onChange: () => setContext('authentic')
                            })}
                            error={!!errors?.brandName}
                            helperText={errors?.brandName?.message}
                            inputProps={{
                                maxLength: 20,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            className={classes.root}
                            label={"Expired URL"}
                            placeholder={"Expired URL"}
                            fullWidth
                            {...register('expired',{
                                onChange: () => setContext('expired')
                            })}
                            style={{ marginTop: '10px', height: '70px'}}
                            error={!!errors?.brandName}
                            helperText={errors?.brandName?.message}
                            inputProps={{
                                maxLength: 20,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            className={classes.root}
                            label={"Unauthentic message"}
                            placeholder={"Unauthentic message"}
                            fullWidth
                            {...register('unauthentic',{
                                onChange: () => setContext('unauthentic')
                            })}
                            style={{ marginTop: '10px', height: '70px'}}
                            error={!!errors?.brandName}
                            helperText={errors?.brandName?.message}
                            inputProps={{
                                maxLength: 20,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            className={classes.root}
                            label={"Details"}
                            placeholder={"Details"}
                            fullWidth
                            multiline
                            rows={3}
                            {...register('details')}
                            style={{ marginTop: '10px'}}
                            error={!!errors?.brandName}
                            helperText={errors?.brandName?.message}
                            inputProps={{
                                maxLength: 30,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === "Socials"}
                    onChange={handleChange("Socials")}
                    classes={{root: classes.accordion}}>
                    <AccordionSummary
                        aria-controls="panel1d-content"
                        id="panel1d-header"
                        classes={{root: classes.accordionDiv}}>
                        Socials
                        {expanded !== 'Socials' ?
                            <OpenIcon style={{position: 'absolute', right: '5'}}/> :
                            <CloseIcon style={{position: 'absolute', right: '5'}}/>
                        }
                    </AccordionSummary>
                    <AccordionDetails style={{display: 'block', justifyContent: 'center', alignItems: 'center'}}>
                        <SocialsModalForm socials={socials} getSocialLink={transformLink} handleRemoveLink={removeLink}/>
                    </AccordionDetails>
                </Accordion>
        </>
    );
}

export default ProductAccordion;
