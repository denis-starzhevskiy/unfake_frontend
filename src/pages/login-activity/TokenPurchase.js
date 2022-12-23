import React, {useState} from 'react';
import {Button, makeStyles, TextField, Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
    purchaseForm: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginTop: '30px',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: '0 20%'
    },
    purchaseInput: {
        flex: '1 1 60%',
        marginRight: '20px',
        '@media(max-width: 550px)' : {
            flex: '1 1 25%'
        },
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
    counterButtons: {
        flex: '1 1 10%',
        display: 'flex',
        flexWrap: 'wrap',
        '& svg': {
            flex: '1 1 100%'
        }
    },
    tokenSum: {
        flex: '1 1 20%',
        margin: 'auto 0',
        '@media(max-width: 550px)' : {
            flex: '1 1 25%'
        }
    }
}))

const TokenPurchase = () => {
    const classes = useStyles()
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
                Purchase tokens
            </Typography>
            <Typography variant={'h5'} style={{letterSpacing: '0.1rem', fontWeight: 300, marginTop: '20px'}}>
                Enter a number of token that you want to but or choose one of the options
            </Typography>
            <form noValidate className={classes.purchaseForm}>
                <div style={{width: '100%', display: 'flex'}}>
                    <Typography variant={'h6'} style={{fontWeight: 300, flex: '1 1 75%', margin: 'auto 0', color: 'white', textAlign: 'center'}}>
                        CREDITS
                    </Typography>
                    <Typography variant={'h6'} style={{fontWeight: 300, flex: '1 1 25%', margin: 'auto 0', color: 'white', textAlign: 'center'}}>
                        TOTAL
                    </Typography>
                </div>
                <TextField
                    // className={classes.root}
                    type={"number"}
                    min="0"
                    placeholder={"Number of tokens"}
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
                <Typography className={classes.tokenSum}>
                    {(tokensNumber * 1.99).toLocaleString('en-IN', { maximumFractionDigits: 2 })} $
                </Typography>
                <Button color={'secondary'} size={'large'} style={{marginTop: '20px'}}>
                    PURCHASE
                </Button>
            </form>
        </Box>
    );
}

export default TokenPurchase;
