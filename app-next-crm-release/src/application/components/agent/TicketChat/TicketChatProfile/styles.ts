import { createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
    selectLabel: {
        marginRight: '12px',
        fontWeight: 500,
        fontSize: 14,
    },
    headerContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: '18px',
        fontFamily: 'Poppins, sans-serif',
        marginLeft: '-50px'
    },
    ticket: {
        fontSize: '15px',
        fontWeight: 'bold'
    },
    selectBox: {
        border: 'none',
        outline: 'none',
        background: 'transparent',
        fontSize: 14,
        padding: '10px',
        flex: 1,
    },
    selectContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: '14px',
        color: '#646466',
    },
    tags: { 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        cursor: 'pointer',
    }
}))

export default useStyles