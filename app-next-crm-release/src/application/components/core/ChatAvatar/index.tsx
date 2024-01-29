import {Box, createStyles} from '@mantine/core'
import {useEffect, useState} from 'react'


interface IChatAvatarProps {
    letter: string;
    size?: string;
}

const useStyles = createStyles((_) => ({
    avatar: {
        color: '#fff',
        borderRadius: '70%',
        borderColor: '#fff',
        padding: '6px 12px',
        fontSize: '20px',
    },
    small: {
        width: '30px',
        height: '30px',
        color: '#fff',
        borderColor: '#fff',
        fontSize: '12px',
        padding: '4px 10px',
    }
}))

enum Alphabet {
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D',
    E = 'E',
    F = 'F',
    G = 'G',
    H = 'H',
    I = 'I',
    J = 'J',
    K = 'K',
    L = 'L',
    M = 'M',
    N = 'N',
    O = 'O',
    P = 'P',
    Q = 'Q',
    R = 'R',
    S = 'S',
    T = 'T',
    U = 'U',
    V = 'V',
    W = 'W',
    X = 'X',
    Y = 'Y',
    Z = 'Z',
}

const randomColors = [
    '#2E4F4F',
    '#DF2E38',
    '#DF7857',
    '#FFACAC',
    '#F2AE1C',
    '#3A1078',
    '#9DC08B',
    '#FDD36A'
]

const colorMap: { [key in Alphabet]?: string } = {
    [Alphabet.A]: '#2E4F4F',
    [Alphabet.B]: '#DF2E38',
    [Alphabet.C]: '#DF7857',
    [Alphabet.D]: '#FFACAC',
    [Alphabet.E]: '#F2AE1C',
    [Alphabet.F]: '#3A1078',
    [Alphabet.G]: '#9DC08B',
    [Alphabet.H]: '#FDD36A',
    [Alphabet.I]: '#2E4F4F',
    [Alphabet.J]: '#3A1078',
    [Alphabet.K]: '#FFACAC',
    [Alphabet.L]: '#2E4F4F',
    [Alphabet.M]: '#FDD36A',
    [Alphabet.N]: '#3A1078',
    [Alphabet.O]: '#DF7857',
    [Alphabet.P]: '#FFACAC',
    [Alphabet.Q]: '#3A1078',
    [Alphabet.R]: '#9DC08B',
    [Alphabet.S]: '#DF7857',
    [Alphabet.T]: '#2E4F4F',
    [Alphabet.U]: '#FFACAC',
    [Alphabet.V]: '#DF7857',
    [Alphabet.W]: '#2E4F4F',
    [Alphabet.X]: '#FFACAC',
    [Alphabet.Y]: '#9DC08B',
    [Alphabet.Z]: '#FDD36A',
}


export default function ChatAvatar({letter, size}: IChatAvatarProps) {
    const {classes} = useStyles()
    const [randomColorIndex, setRandomColorIndex] = useState<number>(0)

    // console.log('size :>> ', size);

    useEffect(() => {
        setRandomColorIndex(Math.floor(Math.random() * randomColors.length))
    }, [letter])

    // const appliedClasses= [classes.avatar]
    return (
        <Box
            sx={{
                // background: randomColors[randomColorIndex],
                background: colorMap[letter as Alphabet] ?? colorMap.A,
            }}
            className={classes.avatar}
        >
            {letter?.toUpperCase() ?? 'U'}
        </Box>
    )
}
