import { createTheme } from '@material-ui/core/styles'

const defaultTheme = createTheme({
  zIndex: {
    snackbar: 1500,
    tooltip: 1600,
  },
  palette: {
    primary: {
      main: '#005E47',
      light: '#00A77E',
    },
    secondary: {
      main: '#BE1D3F',
      light: '#EF4060',
    },
    background: {
      main: '#F4F6F7',
      light: '#FFFFFF',
      lightGrey: 'rgba(244, 246, 247, 1)',
    },
    accent: {
      darkGreen: '#00362F',
      paleGreen: '#8DD1C1',
      paleRed: '#F37E90',
      darkOrange: '#A45E0A',
      lightGrey: '#546366',

    },
    text: {
      primary: '#000000',
      secondary: '#FFFFFF',
    },
    action: {
      disabled: '#000000',
    },
    highlight: {
      primary: '#BAD7FB',
    },
    hover: {
      main: '#0C8671',
    },
    grey: {
      extraLight: '#E4E9EC',
      light: '#C5CED1',
      medium: '#546366',
      dark: '#2A393E',
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 14,
  },
})

const {
  breakpoints,
  palette,
  typography: { pxToRem },
} = defaultTheme

const theme = {
  ...defaultTheme,
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: palette.common.white,
        },
      },
    },
    // Style sheet name ⚛️
    MuiButton: {
      // Name of the rule
      root: {
        // Some CSS
        borderRadius: '2px',
        textTransform: 'none',
      },
      contained: {
        fontSize: pxToRem(14),
        fontWeight: 600,
        lineHeight: pxToRem(24),
        letterSpacing: 0.2,
        minHeight: 40,
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
      },
      outlined: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
      },
      text: {
        minHeight: 42,
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
      },
      containedPrimary: {
        //medium
        backgroundColor: palette.primary.main,
        color: palette.text.secondary,
        padding: '8px 16px',
        '&:hover': {
          backgroundColor: palette.hover.main,
          textDecoration: 'underline',
        },
      },
      containedSecondary: {
        //medium
        backgroundColor: '#337e6d',
        color: palette.text.secondary,
        '&:hover': {
          backgroundColor: palette.background.light,
          color: palette.hover.main,
          textDecoration: 'underline',
        },
      },
      containedSizeSmall: {
        fontSize: pxToRem(12),
        lineHeight: pxToRem(20),
        padding: '6px 12px',
      },
      containedSizeLarge: {
        fontSize: pxToRem(16),
        lineHeight: pxToRem(24),
        padding: '12px 24px',
      },
      outlinedPrimary: {
        //medium
        backgroundColor: palette.background.light,
        color: palette.text.primary,
        border: '2px solid rgba(0, 0, 0, 0.2)',
        padding: '6px 14px',
        '&:hover': {
          color: palette.text.secondary,
          backgroundColor: palette.hover.main,
          border: '2px solid',
          borderColor: palette.hover.main,
          textDecoration: 'underline',
        },
      },
      outlinedSecondary: {
        //medium
        backgroundColor: '#323232',
        color: palette.text.secondary,
        border: '2px solid rgba(255, 255, 255, 0.8)',
        padding: '6px 14px',
        '&:hover': {
          color: palette.text.secondary,
          backgroundColor: '#5b5b5b',
          border: '2px solid',
          borderColor: '#323232',
          textDecoration: 'underline',
        },
      },
      outlinedSizeSmall: {
        fontSize: pxToRem(12),
        lineHeight: pxToRem(20),
        padding: '4px 8px',
      },
      outlinedSizeLarge: {
        fontSize: pxToRem(16),
        lineHeight: pxToRem(24),
        padding: '11px 24px',
      },
      textPrimary: {
        backgroundColor: palette.common.white,
        color: palette.text.main,
        padding: '8px 16px',
        '&:hover': {
          backgroundColor: palette.hover.main,
          color: palette.text.secondary,
          textDecoration: 'underline',
          textDecorationColor: palette.accent.paleGreen,
          borderRadius: 4,
        },
      },
    },
    MuiIconButton: {
      root: {
        color: palette.common.black,
        padding: 0,
        '&:hover': {
          color: palette.hover.main,
          backgroundColor: 'transparent',
        },
      },
    },
    MuiChip: {
      colorPrimary: {
        backgroundColor: palette.accent.paleGreen,
        color: palette.text.primary,
      },
      colorSecondary: {
        backgroundColor: palette.grey.extraLight,
        borderRadius: '4px',
        color: palette.text.primary,
        height: '24px',
      },
      clickableColorPrimary: {
        backgroundColor: palette.accent.paleGreen,
        color: palette.text.primary,
        '&:hover': {
          backgroundColor: palette.hover.primary,
          color: palette.text.secondary,
          textDecoration: 'underline',
        },
        '&:focus': {
          backgroundColor: palette.hover.primary,
          color: palette.text.secondary,
          textDecoration: 'underline',
        },
      },
      clickableColorSecondary: {
        backgroundColor: palette.grey.extraLight,
        borderRadius: '100px',
        color: palette.text.primary,
        '&:hover': {
          backgroundColor: palette.grey.extraLight,
          textDecoration: 'underline',
        },
        '&:focus': {
          backgroundColor: palette.grey.extraLight,
          textDecoration: 'underline',
        },
      },
      deleteIconColorSecondary: {
        backgroundColor: 'inherit',
        color: palette.text.primary,
        height: '12px',
        width: '12px',
        paddingLeft: '1px',
        paddingRight: '1px',
      },
    },
    MuiTypography: {
      h1: {
        fontSize: pxToRem(34),
        fontWeight: 800,
        lineHeight: pxToRem(42),
        letterSpacing: 0.2,
        [breakpoints.up('md')]: {
          fontSize: pxToRem(40),
          lineHeight: pxToRem(50),
        },
      },
      h2: {
        fontSize: pxToRem(24),
        fontWeight: 800,
        lineHeight: pxToRem(34),
        letterSpacing: 0.2,
        [breakpoints.up('md')]: {
          fontSize: pxToRem(32),
          lineHeight: pxToRem(40),
        },
      },
      h3: {
        fontSize: pxToRem(20),
        fontWeight: 700,
        lineHeight: pxToRem(30),
        letterSpacing: 0.2,
        [breakpoints.up('md')]: {
          fontWeight: 800,
          fontSize: pxToRem(24),
          lineHeight: pxToRem(32),
        },
      },
      h4: {
        fontSize: pxToRem(16),
        fontWeight: 700,
        lineHeight: pxToRem(26),
        letterSpacing: 0.2,
        [breakpoints.up('md')]: {
          fontSize: pxToRem(20),
          lineHeight: pxToRem(28),
        },
      },
      h5: {
        fontSize: pxToRem(14),
        fontWeight: 700,
        lineHeight: pxToRem(21),
        letterSpacing: 0.2,
        [breakpoints.up('md')]: {
          fontSize: pxToRem(16),
          lineHeight: pxToRem(24),
        },
      },
      h6: {
        fontSize: pxToRem(12),
        fontWeight: 700,
        lineHeight: pxToRem(18),
        letterSpacing: 0.2,
        [breakpoints.up('md')]: {
          fontWeight: 600,
          fontSize: pxToRem(14),
          lineHeight: pxToRem(20),
        },
      },
      subtitle1: {
        fontSize: pxToRem(18),
        fontWeight: 400,
        lineHeight: pxToRem(30),
        letterSpacing: 0.2,
      },
      subtitle2: {
        fontSize: pxToRem(16),
        fontWeight: 400,
        lineHeight: pxToRem(26),
        letterSpacing: 0.2,
      },
      body1: {
        fontSize: pxToRem(18),
        fontWeight: 400,
        lineHeight: pxToRem(30),
        letterSpacing: 0.2,
      },
      body2: {
        fontSize: pxToRem(16),
        fontWeight: 400,
        lineHeight: pxToRem(26),
        letterSpacing: 0.2,
      },
      caption: {
        fontSize: pxToRem(12),
        lineHeight: pxToRem(20),
        letterSpacing: 0.2,
        fontWeight: 500,
      },
      overline: {
        fontSize: pxToRem(11),
        lineHeight: pxToRem(20),
        letterSpacing: 0.4,
        fontWeight: 500,
        textTransform: 'uppercase',
      },
    },
    MuiContainer: {
      maxWidthLg: {
        maxWidth: 1072,
        [breakpoints.up('md')]: {
          maxWidth: 1072,
        },
      },
    },
    MuiDrawer: {
      paperAnchorLeft: {
        [breakpoints.up('xs')]: {
          right: 0,
        },
        [breakpoints.up('sm')]: {
          right: 'initial',
        },
      },
    },
  },
}

export default theme
