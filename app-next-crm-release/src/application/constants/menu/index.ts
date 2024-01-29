import {MAIN_MENU} from './admin/main.menu'
import {FOOTER_MENU} from './footer.menu'
import {MAIN_MENU_AGENT} from "@/application/constants/menu/agent/main.menu";

export const Menu = {
    admin: {
        main: MAIN_MENU,
        footer: FOOTER_MENU,

    },
    agent: {
        main: MAIN_MENU_AGENT,
        footer: FOOTER_MENU,
    },
}