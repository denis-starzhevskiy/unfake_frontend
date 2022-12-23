import {withStyles} from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";

export const Accordion = withStyles(() => ({
    root: {
        backgroundColor: 'transparent',//theme.palette.background.default,
        boxShadow: 'none',
        padding: 0,
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
}))(MuiAccordion);

export const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'transparent',// '#0a1227',
        borderBottom: '1px solid #0a1227',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        width: '100%',
        justifyContent: 'center',
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

export const AccordionDetails = withStyles(() => ({
    root: {
        padding: 0,
        width: '100%',
        flexWrap: 'wrap'
    },
}))(MuiAccordionDetails);
