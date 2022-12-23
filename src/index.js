import {render} from "react-dom";
import React from 'react'
import App from "./App";
import { Provider } from 'react-redux'
import {BrowserRouter} from "react-router-dom";
import {createTheme, CssBaseline, MuiThemeProvider, responsiveFontSizes} from "@material-ui/core";
import {store} from "./store";

const globalTheme = createTheme({
    palette: {
        primary: { main: '#08091b', light: '#00ff97'},
        secondary: { main: '#00ff97'},
        hover: {main: '#00ff97', extra: '#bcc9de'},
        text: {primary: '#ffffff', secondary: '#97afd5'},
        background: {default: '#08091b', secondary: '#0a1227', hover: '#0e1731'}},
    typography: {
        fontFamily: '"Roboto", sans-serif',
        extraFontFamily: '"Quicksand", sans-serif',
        fontSize: 15,
        fontWeightRegular: '300',
        color: '#ffffff'
    },
})

const theme = responsiveFontSizes(
    createTheme({
        ...globalTheme,
        overrides: {
            MuiButton: {
                containedPrimary: {
                    color: 'white',
                    transition: '0.5s',
                    '&:hover': {
                        backgroundColor: globalTheme.palette.primary.main,
                    },
                },
                root: {
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    lineHeight: '24px',
                    borderRadius: '7px',
                },
            },
            MuiOutlinedInput: {
                root: {
                    borderRadius: '10px', //50rem
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: `2px solid ${globalTheme.palette.primary.light}`,
                    },
                    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                        '-webkit-appearance': 'none',
                        margin: 0,
                    },

                    '& input[type=number]': {
                        '-moz-appearance': 'textfield',
                    },
                },
            },
        },
        props: {
            MuiButtonBase: {
                disableRipple: true,
            },
            MuiTextField: {
                variant: 'outlined',
            },
            MuiButton: {
                size: 'large',
                color: 'primary',
                variant: 'contained',
            },
            MuiUseMediaQuery: {
                noSsr: true,
            },
        },
        list: {
            overflowY: "auto",
            margin: 0,
            padding: 0,
            listStyle: "none",
            height: "100%",
            '&::-webkit-scrollbar': {
                width: '0.4em'
            },
            '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,.1)',
                outline: '1px solid slategrey'
            }
        }
    })
)

render(
    <>
        <React.StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                    <MuiThemeProvider theme={theme}>
                        <CssBaseline />
                        <App/>
                    </MuiThemeProvider>
                </Provider>
            </BrowserRouter>
        </React.StrictMode>
    </>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
