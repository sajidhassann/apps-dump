import {useEffect} from 'react'
// import MixpanelEvents from '../events/MixpanelEvents'

type EventsProviderPropType = {
    children: any
}

const EventsProvider = (props: EventsProviderPropType): JSX.Element => {
    const {children} = props

    useEffect(() => {
        // MixpanelEvents.INIT()
    }, [])

    return (<>
        {children}
    </>)
}

export default EventsProvider