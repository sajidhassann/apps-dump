import TicketChat from '@/application/components/agent/TicketChat'
import { LayoutProvider } from '@/application/providers/LayoutProvider'
import { NextPage } from 'next'

const Chat: NextPage = () => {

    return (
        <LayoutProvider>
            <main>
                <TicketChat/>
            </main>
        </LayoutProvider>
    )
}

export default Chat
