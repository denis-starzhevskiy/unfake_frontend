import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles((theme) => ({
    addCreditsMenu: {
        backgroundColor: '#0f1932 !important',
        color: theme.palette.text.secondary,
        borderRadius: '10px',
        // border: `2px solid ${theme.palette.secondary.main}`,
        fontFamily: theme.typography.fontFamily
    },
    purchaseForm: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    purchaseInput: {
        flex: '1 1 30%',
        marginRight: '20px',
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
    counterButtons: {
        flex: '1 1 10%',
        display: 'flex',
        flexWrap: 'wrap',
        '& svg': {
            flex: '1 1 100%'
        }
    }
}))

const Credits = () => {
    const classes = useStyles()
    const [openAddCredits, setOpenAddCredits] = useState(false)
    const [tokensNumber, setTokenNumber] = useState(1)
    const numberRegex = /^[1-9]/

    const handleInputChange = (e) => {
        if(e.target.value < 1 && e.target.value !== '') setTokenNumber('')
        else if(numberRegex.test(e.target.value)) setTokenNumber(e.target.value)
        else setTokenNumber('')
    }


    return (
        <Box sx={{p: '20px'}} style={{textAlign: 'center', height: '100vh'}}>
            <Typography variant={'h4'} style={{letterSpacing: '0.1rem', fontWeight: 300}}>
                CREDITS
            </Typography>
            <Typography variant={'h6'} style={{letterSpacing: '0.1rem', fontWeight: 300, marginTop: '20px'}}>
                YOUR CURRENT NUMBER: {Math.round(Math.random() * 100)}
            </Typography>
            <Button onClick={() => {setOpenAddCredits(true)}} color={'secondary'} style={{width: '200px', marginTop: '50px'}}>
                ADD CREDITS
            </Button>
            <Dialog open={openAddCredits}
                    onClose={() => {setOpenAddCredits(false)}}
                    transitionDuration={500}
                    maxWidth={'xs'}
                    PaperProps={{classes: {root: classes.addCreditsMenu}}}>
                <DialogTitle>
                    <Typography variant={'h5'} style={{letterSpacing: '0.1rem', fontWeight: 300, textAlign: 'center'}}>ADD CREDITS</Typography>
                </DialogTitle>
                <DialogContent>
                    <form noValidate className={classes.purchaseForm}>
                        <div style={{width: '100%', display: 'flex'}}>
                            <Typography style={{flex: '1 1 55%', margin: 'auto 0', color: 'white', textAlign: 'center'}}>
                                CREDITS
                            </Typography>
                            <Typography style={{flex: '1 1 45%', margin: 'auto 0', color: 'white', textAlign: 'center'}}>
                                TOTAL
                            </Typography>
                        </div>
                        <TextField
                            // className={classes.root}
                            type={"number"}
                            min="0"
                            placeholder={"Number"}
                            className={classes.purchaseInput}
                            value={tokensNumber}
                            onChange={handleInputChange}
                        />
                        <div className={classes.counterButtons}>
                            <ArrowDropUpIcon onClick={() => {
                                setTokenNumber(Number(tokensNumber) + 1)}
                            }/>
                            <ArrowDropDownIcon onClick={() => {
                                if(tokensNumber !== 1) setTokenNumber(Number(tokensNumber) - 1)}
                            }/>
                        </div>
                        <Typography style={{flex: '1 1 40%', margin: 'auto 0', color: 'white', textAlign: 'center', borderBottom: '1px solid white'}}>
                            {(tokensNumber * 1.99).toLocaleString('en-IN', { maximumFractionDigits: 2 })} $
                        </Typography>
                        <Button color={'secondary'} style={{margin: '20px 0', width: '150px'}}>
                            BUY NOW
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default Credits;
