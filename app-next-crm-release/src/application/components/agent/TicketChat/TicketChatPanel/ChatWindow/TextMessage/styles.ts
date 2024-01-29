import { createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  userMessage: {
    color: '#000',
    fontSize: '12px',
  },
  userMessageContainer: {
    fontSize: '12px',
    paddingInline: '10px',
    paddingTop: '8px',
    paddingBottom: '16px',
    borderRadius: '10px',
    width: 'fit-content',
    maxWidth: '362px',
    backgroundColor: '#fff',
    whiteSpace: 'pre-line',
  },
  timestamp: {
    fontSize: '10px',
    color: theme.colors.background[4],
    transform: 'translateY(-10px)',
  },
  agentOutlineContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
  },
  agentMessageContainer: {
    fontSize: '12px',
    paddingInline: '10px',
    paddingTop: '8px',
    paddingBottom: '16px',
    borderRadius: '10px',
    width: 'fit-content',
    maxWidth: '362px',
    backgroundColor: theme.colors.secondary[1],
    whiteSpace: 'pre-line',
    color: '#fff',
  },
  agentMessage: {
    fontSize: '12px',
  },
  agent: {
    marginTop: '0.4rem',
    fontSize: '12px',
    textAlign: 'end',
  },
  agentTimestamp: {
    fontSize: '10px',
    color: theme.colors.background[4],
    marginTop: '0.2rem',
  },
  image: {
    width: '100%',
    borderRadius: '8px',
    cursor: 'pointer',
    maxHeight: '300px',
    objectFit: 'cover',
    overflow: 'hidden'
  },
  video: {
    width: '100%',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  imageContainer: { maxHeight: '500px', overflow: 'hidden' },
  videoContainer: { overflow: 'hidden' },
}))

export default useStyles
