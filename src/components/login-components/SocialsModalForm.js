import React, {useRef, useState} from 'react';
import {Button, Dialog, DialogContent, DialogTitle, makeStyles, TextField, Typography} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddSocials from "@material-ui/icons/AddCircleOutline";

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
    addSocialsMenu: {
        backgroundColor: '#0f1932 !important',
        color: theme.palette.text.secondary,
        borderRadius: '10px',
        fontFamily: theme.typography.fontFamily,
        textAlign: 'center',
        width: '100%'
    },
    socialLink: {
        display: 'flex',
        alignItems: 'center',
        margin: '30px 0px',
    },
    socialLinkText: {
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        display: 'block',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        flex: '1 1 80%',
        textAlign: 'start',
        padding: '0px 5px',
        // borderBottom: `2px solid ${theme.palette.secondary.main}`,
        '&:hover': {
            color: '#bfbfbf'
        }
    },
    deleteLink: {
        flex: '1 1 20%',
        '&:hover': {
            color: '#d90606'
        }
    }
}))

const SocialsModalForm = ({socials, getSocialLink, handleRemoveLink}) => {
    const classes = useStyles()
    const [openModal, setOpenModal] = useState(false)
    const socialLink = useRef(null);

    const handleSocialsAdd = () => {
        let socialInput = socialLink.current
        getSocialLink(socialInput.value);
        setOpenModal(false);
    }

    return (
        <>
            {socials.length !== 0 ? (
                <>
                    {socials.map((social) => (
                        <div className={classes.socialLink}>
                            <Typography className={classes.socialLinkText}>
                                {social.link}
                            </Typography>
                            <DeleteIcon onClick={handleRemoveLink(social.link)} className={classes.deleteLink}/>
                        </div>
                    ))}
                </>
            ) : (
                <Typography style={{margin: '20px', letterSpacing: '0.1rem', fontWeight: 300}}>Add new link</Typography>
            )}
            <AddSocials htmlColor={"white"} fontSize={"large"} onClick={() => setOpenModal(true)}/>
            <Dialog open={openModal}
                    onClose={() => {setOpenModal(false)}}
                    transitionDuration={500}
                    maxWidth={'xs'}
                    PaperProps={{classes: {root: classes.addSocialsMenu}}}>
                <DialogTitle>
                    <Typography variant={'h5'} style={{letterSpacing: '0.1rem', fontWeight: 300, textAlign: 'center'}}>ADD SOCIAL</Typography>
                </DialogTitle>
                <DialogContent>
                    <div style={{width: '100%', display: 'flex'}}>
                        <Typography style={{flex: '1 1 45%', margin: 'auto 0', color: 'white', textAlign: 'center'}}>
                            Enter a link of your social and logo will appear on the screen.
                        </Typography>
                    </div>
                    <TextField
                        type={"text"}
                        fullWidth
                        style={{margin: '10px 0px'}}
                        placeholder={"https://youtube.com/your_channel"}
                        className={classes.root}
                        inputRef={socialLink}
                    />
                    <Button onClick={handleSocialsAdd} color={'secondary'} style={{margin: '20px 0', width: '150px'}}>
                        ADD
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default SocialsModalForm;
