import { createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
    container: {
        height: "80vh",
        display: "flex",
        marginInline: "auto",
        justifyContent: "center",
        alignItems: "center",
    },
    text: { 
        fontSize: "1rem",
        fontWeight: 700,
        marginTop: "1rem",
        textAlign: 'center'    
    }
}))

export default useStyles

