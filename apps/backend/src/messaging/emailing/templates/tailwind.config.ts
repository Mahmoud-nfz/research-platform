import { TailwindProps } from '@react-email/tailwind';

const tailwindConfig: TailwindProps['config'] = {
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        'primary-background': '#21C5FB',
        'primary-text': '#004059',
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
