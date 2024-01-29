import { createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
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
    }
}))

export default useStyles