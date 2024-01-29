import {AgentNetworkManager} from './agent'
import { MacrosNetworkManager } from './macro.manager'


export class NetworkingManger {
    static readonly agent = AgentNetworkManager
    static readonly macros = MacrosNetworkManager
}