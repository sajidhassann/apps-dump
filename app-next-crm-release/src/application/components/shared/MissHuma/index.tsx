import { Box, Image, Text } from "@mantine/core";
import useStyles from "./styles";

export default function MissHuma() {

    const { classes } = useStyles();

    return (
        <Box className={classes.container}>
            <Box>
                <Box mt='lg'>
                    <Image
                        src="/assets/svgs/avatars/miss-huma.svg"
                        alt="Miss Huma Parveen"
                        width="200px"
                        height="180px"
                    />
                </Box>
                <Text className={classes.text}>Click on any of the chats to start</Text>
            </Box>
        </Box>
    );
    
}
