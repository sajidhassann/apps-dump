import ChatwootComponent from "@/application/components/agent/Chatwoot";
import { Sales } from "@/application/components/agent/Sales";
import { ChatwootProvider } from "@/application/providers/ChatwootProvider";
import { NextPage } from "next";

const ChatwootPage: NextPage = () => (
    <ChatwootProvider>
        {(eventData) => <ChatwootComponent eventData={eventData} />}
    </ChatwootProvider>
)

export default ChatwootPage
