import { createStyles } from '@mantine/core'

// const useStyles = createStyles((theme) => ({
//     card: {
//         display: 'flex',
//         justifyContent: '',
//         alignItems: 'center',
//         paddingInline: '1rem',
//     },
//     cardTitle: {
//         fontSize: '.8rem',
//         fontWeight: 600,
//         fontFamily: 'Poppins, sans-serif'
//     },
//     cardTimestamp: {
//         fontSize: '.6rem',
//         color: theme.colors.background[3]
//     },
//     cardMessage: {
//         fontSize: '.7rem',
//         color: theme.colors.background[3]
//     },
//     cardBadge: {
//         color: '#fff',
//         borderRadius: '50px',
//         backgroundColor: theme.colors.primary,
//         width: '20px',
//         height: '20px',
//         textAlign: 'center',
//         fontSize: '.8rem',
//     },
//     cardEmail: {
//         fontSize: '.7rem',
//         color: theme.colors.secondary[1],
//         ':hover': {
//             cursor: 'pointer',
//             textDecoration: 'underline'
//         }
//     }
// }))
const useStyles = createStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginInline: 'auto',
        padding: '2px',
    },
    card: {
        padding: '1.2rem !important',
        cursor: 'pointer',
        marginTop: '.5rem',
        minHeight: '3.5rem'
    },
    message: {
        fontSize: '12px',
        color: theme.colors.background[3],
    },
    timestamp: {
        fontSize: '.8rem',
        color: theme.colors.background[3],
        marginLeft: 'auto',
    },
    email: {
        color: theme.colors.secondary[1],
        fontWeight: 400,
        fontSize: '.7rem'
    },
    userName: {
        fontSize: '.9rem',
        fontWeight:'bold',
    },
    badge: {
        color: 'white',
        fontWeight: 700,
        padding: 6,
        fontSize: '0.7rem'
    }
}))
export default useStyles