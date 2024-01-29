//import '@/styles/globals.scss'
import { loadConfig } from '@application/configs'
// import { AuthProvider } from '@/application/providers/AuthProvider'
import { AuthProvider } from '@application/providers/authProvider'
import store from '@application/redux'
import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { FC, ReactNode, useEffect } from 'react'
import { Provider } from 'react-redux'
// import global.scss
import '@src/styles/globals.scss'
// import 'katex/dist/katex.min.css'

const SafeHydrate: FC<{ children: ReactNode }> = (props) => {
   /*
	 * ---------- WARNING: THIS WILL DISABLE SSR AND THE NEXT.JS DYNAMIC ROUTING FEATURE ----------
	 *
	 * This is a wrapper to be used in case SSR is desired to be disabled within an application
	 * Wrap your pages/_app.tx within this component to disable SSR
	 *
	 * After that, add the following code to your next.config.js file:
	 module.exports = {
	 target: "serverless",
	 async rewrites() {
	 return [
	 // Rewrite everything to `pages/index`
	 {
	 source: "/:any*",
	 destination: "/",
	 },
	 ];
	 },
	 };
	 *
	 * ---------- WARNING: THIS WILL DISABLE SSR AND THE NEXT.JS DYNAMIC ROUTING FEATURE ----------
	 */

   const { children } = props
   return (
      <div suppressHydrationWarning>
         {typeof window === 'undefined' ? null : children}
      </div>
   )
}

const App = ({ Component, pageProps }: AppProps) => {
   useEffect(() => {
      loadConfig()
   }, [])

   return (
      <SafeHydrate>
         <Provider store={store}>
            <MantineProvider
               withGlobalStyles
               withNormalizeCSS
               theme={{
                  fontFamily: 'Poppins, sans-serif',
                  // fontSizes: {
                  //     xs: '0.6rem',
                  //     sm: '0.75rem',
                  //     md: '0.9rem',
                  //     lg: '1rem',
                  //     xl: '1.2rem',
                  // },
                  colors: {
                     primary: ['#f2ae1c'],
                     secondary: ['#05046a', '#5e85bc'],
                     accent: ['#f27781'],
                     background: [
                        '#f5f5f5',
                        '#f2f2f2',
                        '#b6b6b6',
                        '#646466',
                        '#333333',
                     ],
                     lightBlue: ['#5e85bc'],
                  },
                  primaryColor: 'primary',
                  globalStyles: (theme) => ({
                     '*, *::before, *::after': {
                        boxSizing: 'border-box',
                        margin: 0,
                        padding: 0,
                     },
                     body: {
                        fontFamily: 'Poppins, sans-serif',
                     },

                     '.pointer': {
                        cursor: 'pointer',
                     },
                     // '.text-secondary-500': {
                     // 	color: theme.colors.secondary[1]
                     // },
                     // '.text-light-300': {
                     // 	color: theme.colors.background[3]
                     // }
                  }),
               }}
            >
               <AuthProvider>
                  <Component {...pageProps} />
               </AuthProvider>
            </MantineProvider>
         </Provider>
      </SafeHydrate>
   )
}

export default dynamic(() => Promise.resolve(App), { ssr: false })
