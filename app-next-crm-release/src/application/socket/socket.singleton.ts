import { CRM_API_URL } from '@/application/constants/urls'
import { io, Socket } from 'socket.io-client'

type Callback<T> = (...args: T[]) => void

class SocketSingleton {

    private constructor() {
        this._socket = io(CRM_API_URL, {
            autoConnect: true,
            path: '/socket.io',
            secure: true,
            transports: ['websocket'],
        })
    }

    private static _instance: SocketSingleton

    public static get instance(): SocketSingleton {
        console.log('socket=>>', SocketSingleton._instance)
        if (!SocketSingleton._instance)
            SocketSingleton._instance = new SocketSingleton()


        return SocketSingleton._instance
    }

    public static get newInstance(): SocketSingleton {
        SocketSingleton._instance = new SocketSingleton()
        return SocketSingleton._instance
    }

    private _socket: Socket
    
    public get socket(): Socket {
        return this._socket
    }

    public get connect() {
        this._socket = this._socket.connect()
        return this._socket
    }

    public get disconnect() {
        this._socket = this._socket.disconnect()
        return this._socket
    }

    public emit<T>(event: string, ...args: T[]) {
        this._socket = this._socket.emit(event, ...args)
    }

    public on<T>(event: string, cb: Callback<T>) {
        this._socket = this._socket.on(event, cb)

        return () => {
            this._socket.off(event, cb)
        }
    }
}

export default SocketSingleton
