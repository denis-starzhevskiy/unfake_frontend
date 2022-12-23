import React, {useState} from 'react';
import {Button, List, makeStyles, TextField, Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import tagPhoto from '../../assets/pictures/tag.png';

const tags = [
    {tagName : 'NTAG 424 DNA Tag',
        tagPrice: 1.99,
        tagDescription: 'NTAG 424 DNA sets a new standard in secure NFC and IoT applications. The new chip generation offers state-of-the-art features for security and privacy protection, on attack-resistant certified silicon.',
        tagPhotoPath: tagPhoto},
    {tagName : 'NTAG 424 DNA Tag',
        tagPrice: 2.5,
        tagDescription: 'NTAG 424 DNA sets a new standard in secure NFC and IoT applications. The new chip generation offers state-of-the-art features for security and privacy protection, on attack-resistant certified silicon.',
        tagPhotoPath: tagPhoto},
]

const useStyles = makeStyles(() => ({
    tagItem: {
        borderRadius: '10px',
        border: '2px solid white'
    },
    tagItemBlock: {
        display: 'flex',
        '@media(max-width: 850px)': {
            flexDirection: 'column'
        }
    },
    purchaseForm: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginTop: '30px',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: '20px 0'
    },
    purchaseInput: {
        flex: '1 1 30%',
        marginRight: '20px'
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

const TagStore = () => {
    const classes = useStyles()
    const [tokensNumber, setTokenNumber] = useState(1)
    const numberRegex = /^[1-9]/

    const handleInputChange = (e) => {
        if(e.target.value < 1 && e.target.value !== '') setTokenNumber('')
        else if(numberRegex.test(e.target.value)) setTokenNumber(e.target.value)
        else setTokenNumber('')
    }

    return (
        <Box sx={{p: '20px'}} style={{textAlign: 'center'}}>
            <Typography variant={'h4'} style={{letterSpacing: '0.1rem', fontWeight: 300}}>
                Tag Store
            </Typography>
            <List>
                {tags.map((tag) => (
                    <Box component={'div'} sx={{m: '30px', p: '20px'}} className={classes.tagItem}>
                        <Typography variant={'h6'} style={{letterSpacing: '0.1rem', fontWeight: 300, marginBottom: '10px'}}>
                            {tag.tagName}
                        </Typography>
                        <Box component={'div'} className={classes.tagItemBlock}>
                            <img src={tag.tagPhotoPath} alt={"TAG PHOTO FAILED"} style={{flex: '1 0.5 40%', height: '50%'}}/>
                            <div style={{flex: '1 1 60%'}}>
                                <form noValidate className={classes.purchaseForm}>
                                    <div style={{width: '100%', display: 'flex'}}>
                                        <Typography variant={'h6'} style={{fontWeight: 300, flex: '1 1 50%', margin: 'auto 0', color: 'white', textAlign: 'center'}}>
                                            CREDITS
                                        </Typography>
                                        <Typography variant={'h6'} style={{fontWeight: 300, flex: '1 1 50%', margin: 'auto 0', color: 'white', textAlign: 'center'}}>
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
                                    <Typography style={{flex: '1 1 40%', margin: 'auto 0'}}>
                                        {(tokensNumber * tag.tagPrice).toLocaleString('en-IN', { maximumFractionDigits: 2 })} $
                                    </Typography>
                                    <Button color={'secondary'} style={{marginTop: '20px', width: '150px'}}>
                                        BUY NOW
                                    </Button>
                                </form>
                                <Typography style={{textAlign: 'left', letterSpacing: '0.1rem', fontWeight: 300}}>
                                    {tag.tagDescription}
                                </Typography>
                            </div>
                        </Box>
                    </Box>
                ))}
            </List>
        </Box>
    );
}

export default TagStore;
