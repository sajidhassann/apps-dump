import { createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
    messageInput: {
        // border: `0px solid ${theme.colors.secondary[1]}`
    },
    container: {
        position: 'relative',
        // bottom: '0',
        // width: '100%'
    },
    macroBox: {
        borderRadius: '0.5rem',
        width: '100%',
        // borderBottom: '1px solid black',
        // '&:last-child' : {
        //   borderBottom: 0
        // },
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'lightgrey'
        }

    },
    reload: {
        float: 'right',
        cursor: 'pointer',
    },
    card: {
        backgroundColor: 'white',
        position: 'absolute',
        transform: 'translateY(-100%)',
        width: '100%',
        maxHeight: '20rem',
        overflow: 'scroll',
        '& *': {
            border: 1
        }
    },
    description: {
        overflow: 'hidden',
        maxHeight: '1rem',
        textOverflow: 'ellipsis',
        msTextOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }
}))

export default useStyles