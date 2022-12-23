import React from 'react';
import {Box, Grid, List, ListItem, ListItemText, makeStyles, Typography, useMediaQuery} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    optionsText: {
        fontSize: 12,
        letterSpacing: '0.1rem',
        transition: 'all 0.5s',
        '&:hover' : {
            color: theme.palette.primary.light,
            cursor: 'pointer'
        },
        '@media(max-width: 800px)': {
            fontSize: 10
        }
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 'auto',
        minHeight: '20px'
    },
}))

const Footer = () => {
    const classes = useStyles()
    // const xsMatch = useMediaQuery(theme => theme.breakpoints.down('xs'))
    const smMatch = useMediaQuery(theme => theme.breakpoints.down('sm'))

    return (
        <Box
            component={'footer'}
            p={4}
            pt={11}
            className={classes.footer}
        >
            <Grid container {...(smMatch && { wrap: 'wrap-reverse', justifyContent: 'center'})} spacing={2}>
                <Grid
                    item
                    xs={12}
                    md={6}
                    style={{ ...(smMatch && { display: 'flex', justifyContent: 'center' }) }}
                >
                    <Typography variant={'caption'} style={{color: 'white'}}>
                        <strong style={{fontWeight: 500}}> &copy; Unfake.io, {new Date().getFullYear()}. </strong>All right are secured.
                    </Typography>
                </Grid>
                <Grid item sm={12} md={6}>
                    <nav>
                        <List
                            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: smMatch ? 'center' : 'end', padding: 0, width: '100%'}}
                        >
                            {[
                                { to: '/terms', name: 'TERMS OF SALES' },
                                { to: '/policy', name: 'PRIVACY POLICY' }
                            ].map(({ to, name }, i) => (
                                <ListItem key={i} style={{ width: 'auto', paddingTop: 0, paddingBottom: 0 }}>
                                    <ListItemText onClick={() => {
                                        //navigate(to)
                                        alert('This route is yet to be done ASAP')
                                    }}>
                                        <Typography variant={'caption'}
                                                    color={"textSecondary"}
                                                    className={classes.optionsText}>
                                            {name}
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </nav>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Footer;
