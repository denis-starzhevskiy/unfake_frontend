import React from 'react';
import {Button, Dialog, DialogContent, DialogTitle, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    loginMenu: {
        backgroundColor: '#0f1932 !important',
        color: theme.palette.text.secondary,
        borderRadius: '10px',
        // border: `2px solid ${theme.palette.secondary.main}`,
        fontFamily: theme.typography.fontFamily,
        width: '30%',
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
    loginBtn: {
        marginTop: '15px',
        marginBottom: '5px',
        color: theme.palette.primary.main,
        fontSize: '15px',
        width: '100px',
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: '#01ba74',
        },
    }
}))

const AlertMessage = ({errorMessage, visible, close, type}) => {
    const classes = useStyles()

    return (
        <Dialog open={visible} onClose={close} transitionDuration={500} PaperProps={{classes: {root: classes.loginMenu}}}>
            <DialogTitle style={{textAlign: 'center'}}>
                <Typography classes={{root : classes.titleText}}>
                    {type ? 'Success' : 'Error'}
                </Typography>
            </DialogTitle>
            <DialogContent style={{textAlign: 'center'}}>
                <Typography style={{fontSize: '20px', textAlign: 'center', fontWeight: '300'}}>
                    {errorMessage}
                </Typography>
                <Button type={'submit'} className={classes.loginBtn} onClick={close}>
                    OK
                </Button>
            </DialogContent>
        </Dialog>
    );
}

export default AlertMessage;
