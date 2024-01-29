import { Center } from '@mantine/core'
import { ReactNode, useEffect, useState } from 'react'

type ChatwootProviderProps = {
    children: ( data: any ) => ReactNode
}
export const ChatwootProvider = (props: ChatwootProviderProps) => {
    const { children } = props
    const [ eventData, setEventData ] = useState<any>(null)

    useEffect(() => {
        window.parent.postMessage('chatwoot-dashboard-app:fetch-info', '*')
        //     console.log('Use Effect Called')
        // Function to check if JSON is valid
        const isJSONValid = (json: string) => {
            try {
                JSON.parse(json)
                return true
            } catch (e) {
                return false
            }
        }
        // Event listener function
        const handleMessage = (event: MessageEvent) => {
            if (!isJSONValid(event.data) || (eventData != null) )
                return

            const data = JSON.parse(event.data)
            console.log('Event Data:', data)
            if (data != undefined)
                setEventData(data)

        }
        // Add event listener when the component mounts
        window.addEventListener('message', handleMessage)
        // Cleanup function: remove event listener when the component unmounts
        return () => {
            window.removeEventListener('message', handleMessage)
        }
    })

    return (<>
        {(eventData == undefined || eventData == null) && <Center>
            {<p>
                Open this windows in chatwoot!
            </p>}
        </Center>}
        { (eventData != undefined || eventData != null) && children(eventData)}
    </>)
}
