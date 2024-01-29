import { useCallback, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { CRM_API_URL } from '@/application/constants/urls'

// type SocketHook = [ (event: string, cb: (...args: any[]) => void) => () => void, Socket]
let socketIo
const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null)

    const on = useCallback((event: string, cb: (...args: any[]) => void): () => void => {
        socket?.on(event, cb)

        return () => {
            socket?.off(event, cb)
        }
    }, [socket])

    useEffect(() => {

        socketIo = io(CRM_API_URL, {
            path: '/socket.io',
            secure: true,
            transports: ['websocket'],
        })

        setSocket(socketIo)

    }, [])

    useEffect(()=>{
        return on('disconnect', ()=>{
            socket?.connect()
        })
    },[on, socket])

    // useEffect(() => {
    //
    //     return () => {
    //         socket?.disconnect()
    //         socket?.close()
    //     }
    // }, [socket])

    return { on, emit: socket?.emit, socket }
}

export default useSocket
