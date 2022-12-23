import React, {useEffect, useState} from 'react';
import {Button, List, ListItem, ListItemText, makeStyles, Typography, useMediaQuery, useTheme} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Verified from '@material-ui/icons/Check';
import NotVerified from '@material-ui/icons/Clear';
import {Link} from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import {getBrands} from "../../api/brandAPI";

const useStyles = makeStyles(theme => ({
    headerBox: {
        margin: '30px 0',
        width: '100%',
        display: 'flex',
        borderBottom: `2px solid ${theme.palette.secondary.main}`
    },
    pageListItem: {
        height: '100px'
    },
    pageItem: {
        height: '90px',
        margin: '10px 0',
        width: '100%',
        display: 'flex',
        backgroundColor: '#0a1227',
        '&:hover' : {
            backgroundColor: '#0e1731',
        }
    },
    containerBox: {
        padding: 50,
        textAlign: 'center',
        position: 'relative',
        '@media(max-width: 1200px)': {
            width: '100%'
        }
    }
}))

const Brands = () => {
    const classes = useStyles()
    const theme = useTheme()
    const downMd = useMediaQuery(theme.breakpoints.down('md'))
    const [brands, setBrands] = useState([])
    const [init, setInit] = useState(false)
    const [isAnyBrands, setIsAnyBrands] = useState(false)

    useEffect(() => {
        getBrands().then(response => {
            if(response.length > 0) {
                setBrands(response)
                setIsAnyBrands(true)
            }else{
                setIsAnyBrands(false)
            }
            setInit(true)
        }).catch(() => {
            setIsAnyBrands(false)
            setInit(true)
        })
    }, [])

    return (
        <>
            {init && (
                <Box sx={{p: '20px'}} style={{textAlign: 'center', position: 'relative', height: '100vh'}}>
                    {downMd === true ? (
                        <Link to={'create-brand'} style={{display: 'block'}}>
                            <AddIcon htmlColor={'white'} fontSize={'large'} style={{position: "absolute", right: 10, top: 15}}/>
                        </Link>
                    ) : (
                        <Link to={'create-brand'} style={{display: 'block'}}>
                            <Button color={'secondary'} style={{position: "absolute", right: 10, top: 15}}>
                                CREATE NEW BRAND
                            </Button>
                        </Link>
                    )}
                    <Typography variant={'h4'} style={{letterSpacing: '0.1rem', fontWeight: 300}}>
                        Manage Brands
                    </Typography>
                    <Box className={classes.headerBox}>
                        <div style={{flex: '1 1'}}>
                            <Typography variant={'h6'} style={{fontWeight: 300}}>
                                BRAND NAME
                            </Typography>
                        </div>
                        <Box component={"div"} style={{flex: '1.5 1'}}>
                            <Typography variant={'h6'} style={{fontWeight: 300}}>
                                ORGANIZATION'S ROLE
                            </Typography>
                        </Box>
                        <div style={{flex: '1 1'}}>
                            <Typography variant={'h6'} style={{fontWeight: 300}}>
                                VERIFIED STATUS
                            </Typography>
                        </div>
                    </Box>
                    <>
                        {isAnyBrands === true ? (
                            <Box>
                                <List>
                                    {brands.map((brand) => (
                                        <ListItem disableGutters className={classes.pageListItem} style={{ whiteSpace: 'nowrap' }} key={brand.brandName}>
                                            <ListItemText>
                                                <Link to={`manage-brand/${brand.id}`}
                                                      style={{display: 'block', textDecoration: 'none', color: 'white'}}>
                                                    <Box component={'div'} className={classes.pageItem}>
                                                        <div style={{flex: '1 1', textAlign: 'center', margin: 'auto 0'}}>
                                                            {brand.name}
                                                        </div>
                                                        <div style={{flex: '1.5 1', textAlign: 'center', margin: 'auto 0'}}>
                                                            {brand.organization_role}
                                                        </div>
                                                        <div style={{flex: '1 1', textAlign: 'center', margin: 'auto 0'}}>
                                                            {brand.logo ? (
                                                                <Verified color={'secondary'}/>
                                                            ) : (
                                                                <NotVerified color={'error'}/>
                                                            )}
                                                        </div>
                                                    </Box>
                                                </Link>
                                            </ListItemText>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        ) : (
                            <Typography style={{fontSize: '30px', fontWeight: 300}}>There is no brands in your account</Typography>
                        )}
                    </>
                </Box>
            )}
        </>
    );
}

export default Brands;
