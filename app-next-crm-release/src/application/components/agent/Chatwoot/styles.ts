import { createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
    card: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    phoneNumber: {
        color: theme.colors.secondary[1],
        fontSize: '14px',
        fontWeight: 600
    },
    name: {
        fontSize: '1.2rem',
        color: '#000'
    },
    salesButton: {
        border: `1px solid ${theme.colors.primary[0]}`,
        color: theme.colors.background[3]
    }
}))

export default useStyles