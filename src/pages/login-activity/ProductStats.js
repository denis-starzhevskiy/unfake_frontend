import React, {useEffect, useState} from 'react';
import {makeStyles, Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import product1Logo from "../../assets/pictures/logo.png";
import product2Logo from "../../assets/pictures/tag.png";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';

const pages = [
    {
        pageTitle: 'Test',
        pageDescription: 'By test',
        pageAuthenticMessage: 'Authentic!',
        pageErrorMessage: 'Unauthentic',
        pageDetails: 'This product is secured',
        pageLogo: product1Logo,
        authenticNumber: 30,
        errorNumber: 50
    },
    {
        pageTitle: 'Test2',
        pageDescription: 'By instance',
        pageAuthenticMessage: 'Success',
        pageErrorMessage: 'Error',
        pageDetails: 'This product is ours',
        pageLogo: product2Logo,
        authenticNumber: 60,
        errorNumber: 90
    },
]

const data = [
    {
        name: 'Page A',
        Unathenticated: 4000,
        Authenticated: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        Unathenticated: 3000,
        Authenticated: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        Unathenticated: 2000,
        Authenticated: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        Unathenticated: 2780,
        Authenticated: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        Unathenticated: 1890,
        Authenticated: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        Unathenticated: 2390,
        Authenticated: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        Unathenticated: 3490,
        Authenticated: 4300,
        amt: 2100,
    },
];

const useStyles = makeStyles(() => ({
    titleBox: {
        flex: '2',
        '@media(max-width: 960px)': {
            flex: '1'
        }
    }
}))

const ProductStats= () => {
    const [page, setPage] = useState(null)

    useEffect(() => {
        const pageName = new URLSearchParams(location.search).get('page_name');
        if(pageName) {
            pages.forEach((item) => {
                if (item.pageTitle === pageName) {
                    setPage(item)
                }
            })
        }
    }, [])

    return (
        <Box sx={{p: '20px'}} style={{textAlign: 'center', height: '100vh'}}>
            <Typography variant={'h4'} style={{letterSpacing: '0.1rem', fontWeight: 300}}>
                Page stats
            </Typography>
            {/*<Box style={{display: 'flex', margin: '0 20px', marginTop: '50px', padding: '0 20px'}}>*/}
            {/*    <div className={classes.titleBox}>*/}
            {/*        {downMd !== true ? (*/}
            {/*            <Typography variant={'h6'} style={{fontWeight: 300}}>*/}
            {/*                PAGE TITLE*/}
            {/*            </Typography>*/}
            {/*        ): (*/}
            {/*            <Typography style={{fontWeight: 300}}>*/}
            {/*                TITLE*/}
            {/*            </Typography>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*    <Box component={"div"} style={{flex: '0.5'}}>*/}
            {/*        {downMd !== true ? (*/}
            {/*            <Typography variant={'h6'} style={{fontWeight: 300}}>*/}
            {/*                AUTHENTIC*/}
            {/*            </Typography>*/}
            {/*        ): (*/}
            {/*            <Typography style={{fontWeight: 300}}>*/}
            {/*                AUTH*/}
            {/*            </Typography>*/}
            {/*        )}*/}
            {/*    </Box>*/}
            {/*    <div style={{flex: '0.5'}}>*/}
            {/*        {downMd !== true ? (*/}
            {/*            <Typography variant={'h6'} style={{fontWeight: 300}}>*/}
            {/*                UNAUTHENTIC*/}
            {/*            </Typography>*/}
            {/*        ): (*/}
            {/*            <Typography style={{fontWeight: 300}}>*/}
            {/*                UNAUTH*/}
            {/*            </Typography>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*</Box>*/}
            {/*{page && (*/}
            {/*    <Box component={'div'} style={{display: 'flex', margin: '20px', padding: '20px', border: '2px solid white', borderRadius: '20px'}}>*/}
            {/*        <Typography variant={'h5'} style={{letterSpacing: '0.1rem', fontWeight: 300, borderRight: '2px solid white'}} className={classes.titleBox}>*/}
            {/*            {page.pageTitle}*/}
            {/*        </Typography>*/}
            {/*        <Typography variant={'h5'} style={{letterSpacing: '0.1rem', fontWeight: 300, flex: '0.5', borderRight: '2px solid white'}}>*/}
            {/*            {page.authenticNumber}*/}
            {/*        </Typography>*/}
            {/*        <Typography variant={'h5'} style={{letterSpacing: '0.1rem', fontWeight: 300, flex: '0.5'}}>*/}
            {/*            {page.errorNumber}*/}
            {/*        </Typography>*/}
            {/*    </Box>*/}
            {/*)}*/}
            <Box style={{paddingLeft: '10%', margin: 10}}>
                <LineChart width={730} height={250} data={data}
                           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Authenticated" stroke="#8884d8" />
                    <Line type="monotone" dataKey="Unathenticated" stroke="#82ca9d" />
                </LineChart>
            </Box>
        </Box>
    );
}

export default ProductStats;
