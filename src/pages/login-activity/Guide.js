import React from 'react';
import {Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";

const Guide = () => {
    return (
        <Box sx={{pt: '20px', pl: '20px'}} style={{textAlign: 'center', height: 'max-content'}}>
            <Typography variant={'h4'} style={{letterSpacing: '0.1rem', fontWeight: 300, borderBottom: '1px solid white', paddingBottom: '15px'}}>
                GETTING STARTED
            </Typography>
            {/*<Typography style={{letterSpacing: '0.1rem', fontWeight: 300, marginTop: '10px'}}>*/}
            {/*    This document will show you how to create a product page and have its authenticity digitially verified.*/}
            {/*</Typography>*/}
            {/*<Typography variant={'h4'} style={{letterSpacing: '0.1rem', fontWeight: 300, textAlign: 'left', margin: '30px 0'}}>*/}
            {/*    The Context:*/}
            {/*</Typography>*/}
            <Typography style={{fontWeight: 300, textAlign: 'left', margin: '30px 30px'}}>
                We use NXP's NTAG 424 DNA NFC tags to securely verify your product's authenticity.
                NFC stands for "Near Field Communication" which is in the most basic terms, a method
                for devices, such as a smart phones, to communicate with NFC tags by just tapping it.
                They're typically used to share contact information, product information, links to apps
                or website, etc. There are over 2 billion NFC capable smart phone in use right now, and
                support for NFC capabilities are on an upward trend espically due to digital wallets like apple pay & google pay.<br/><br/>
                The NTAG 424 DNA NFC tag is a lot different from most other NFC tags. Every time the tag is
                read, it will generate new data. Although the data appears to be random, it's not. It is an
                encrypted message that contains a unique identifier along with a counter that increases by 1
                on every scan ( ENC( UID + CTR ) ). The only person who can decrypt this data is the person
                who holds the tags' encryption keys (us). We generate unique 16 byte encryption keys for every
                tag and store them in one of our highly secure databases. The tags are then encrypted with
                another randomly generated 16 byte key and stored within the tag's url. This is called the
                ETRNL code. The ETRNL code adds another layer of security so that if our servers were to
                ever get compromised, the attacker would still need access to all the individual tags if
                they wanted to steal the keys. <br/><br/>
                This may sound very complex, but no need to worry because we
                make programming and managing these tags extremely simple and painless.
                <Typography variant={'h6'} style={{marginTop: '10px'}}>What you need:</Typography>
                <ul>
                    <li>A working computer</li>
                    <li>An NTAG 424 DNA tag</li>
                    <li>An ASC ACR122U tag reader/writer</li>
                    <li>At least 1 site credit (25 free credits are provided on account creation)</li>
                </ul>
                <Typography variant={'h6'} style={{marginTop: '10px'}}>Steps:</Typography>
                <ul>
                    <li>Crete an account</li>
                    <li>Create an organization</li>
                    <li>Create a secure product page</li>
                    <li>Add content to your page</li>
                    <li>Download & install our programmer</li>
                    <li>Program your tag</li>
                    <li>Try it out</li>
                </ul>
            </Typography>
        </Box>
    );
}

export default Guide;
