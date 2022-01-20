import { extendTheme } from '@chakra-ui/react';
const theme = extendTheme({
  fontSizes: {
    lg: '18px',
  },
  fonts: {
    heading: 'Montserrat',
    body: 'Montserrat',
  },
  styles: {
    global: (props) => ({
      "html, body": {
        fontSize: "sm",
        lineHeight: "tall",
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
      sizes: {
        xl: {
          h: '56px',
          fontSize: 'sm',
          px: '13px',
        },
      },
      variants: {
        'with-shadow': {
          bg: '#2c5282',
        },
        solid: props => ({
          bg: props.colorMode === 'dark' ? '#2c5282' : '#2c5282',
        }),
      },
    },
  },
});
export default theme;