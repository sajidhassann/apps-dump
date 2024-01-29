import { createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
    selectLabel: {
        marginRight: '12px',
        fontWeight: 500,
        fontSize: 14,
    },
    headerContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: '18px',
        fontFamily: 'Poppins, sans-serif',
        marginLeft: '-50px'
    },
    loadMore: {
        border: `1px solid ${theme.colors.primary[0]}`,
        color: theme.colors.background[3]
    }
}))

export default useStyles