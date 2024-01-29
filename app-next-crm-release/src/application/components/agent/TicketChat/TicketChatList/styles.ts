import { createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
    container: {
        backgroundColor: theme.white,
        border: `3px solid ${theme.colors.background[0]}`,
    },
    heading: {
        color: theme.black.at(0),
        fontSize: '1.2rem',
        fontWeight: 500,
        fontStyle: 'normal',
    },
    select: {
        color: theme.colors.secondary[1],
        fontSize: '.9rem',
        textDecoration: 'underline',
        cursor: 'pointer'
    },
    archive: {
        color: theme.colors.background[3],
        fontSize: '.9rem',
        fontWeight: 700,
        marginLeft: '0.5rem'

    },
    archiveContainer: {
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center'
    },
    selectedTickets: {
        color: theme.colors.background[3],
        fontSize: '14px',
        fontWeight: 500
    }
}))

export default useStyles