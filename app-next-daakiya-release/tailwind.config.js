/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/application/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      extend: {
         backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic':
               'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
         },
         colors: {
            primary: '#F2AE1C',
            'primary-600': '#F2AE1C99',
            'primary-gray': '#646466',
            'custom-yellow': '#F8BE58',
            muted: '#B6B6B6',
            'custom-green': '#97C99C',
            'light-blue': '#5E85BC',
            'dark-blue': '#05046A',
            'light-gray': '#DADADA',
            'light-grey': '#F9F9F9',
            'muted-grey': '#F1F2F3',
            pink: '#F27781',
            'custom-gray': '#D6D7E3',
         },
      },
   },
   plugins: [],
}
