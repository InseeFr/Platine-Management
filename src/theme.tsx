import { createTheme, CssBaseline } from "@mui/material";
import { type PropsWithChildren, type CSSProperties } from "react";
import { ThemeProvider } from "@emotion/react";

declare module "@mui/material/styles" {
  interface Palette {
    red: string;
    Surfaces: {
      Secondary: string;
    };
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    red?: string;
    Surfaces?: {
      Secondary: string;
    };
  }

  interface TypographyVariants {
    displayLarge: CSSProperties,
    displayMedium: CSSProperties,
    displaySmall: CSSProperties,
    headlineLarge: CSSProperties,
    headlineMedium: CSSProperties,
    headlineSmall: CSSProperties,
    titleLarge: CSSProperties,
    titleMedium: CSSProperties,
    titleSmall: CSSProperties,
    labelMedium: CSSProperties,
    labelSmall: CSSProperties,
    bodyLarge: CSSProperties,
    bodyMedium: CSSProperties,
    bodySmall: CSSProperties,
  }

  interface TypographyVariantsOptions {
    displayLarge?: CSSProperties,
    displayMedium?: CSSProperties,
    displaySmall?: CSSProperties,
    headlineLarge?: CSSProperties,
    headlineMedium?: CSSProperties,
    headlineSmall?: CSSProperties,
    titleLarge?: CSSProperties,
    titleMedium?: CSSProperties,
    titleSmall?: CSSProperties,
    labelMedium?: CSSProperties,
    labelSmall?: CSSProperties,
    bodyLarge?: CSSProperties,
    bodyMedium?: CSSProperties,
    bodySmall?: CSSProperties,
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    displayLarge: true,
    displayMedium: true,
    displaySmall: true,
    headlineLarge: true,
    headlineMedium: true,
    headlineSmall: true,
    titleLarge: true,
    titleMedium: true,
    titleSmall: true,
    labelMedium: true,
    labelSmall: true,
    bodyLarge: true,
    bodyMedium: true,
    bodySmall: true,
  }
}

declare module '@mui/material/InputBase' {
  interface InputBasePropsSizeOverrides {
    hero: true
  }
}

declare module '@mui/material/Icon' {
  interface IconPropsSizeOverrides {
    cardMedia: true
  }
}

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    home: true
  }
}

let theme = createTheme({})
const colors = (c: string) => theme.palette.augmentColor({ color: { main: c } });
theme = createTheme(theme, {
  shadows: [
    'none',
    '0px 1px 4px 0px rgba(80, 76, 75, 0.80)',
    '0px 8px 16px 0px rgba(0, 0, 0, 0.10);',
    ...theme.shadows.slice(3),
  ],
  palette: {
    primary: colors("#6750A4"),
    red: colors("#ED1443"),
    black: colors("#0A192E"),
    light: colors("#49454F"),
    Surfaces: {
      Secondary: "#FFF",
    },
  },
  typography: {
    fontFamily: "Open Sans, sans-serif",
    displayLarge: {
      fontSize: 57,
      lineHeight: "64px",
      letterSpacing: -.25
    },
    displayMedium: {
      fontSize: 42,
      lineHeight: "52px",
    },
    displaySmall: {
      fontSize: 36,
      lineHeight: "44px",
    },
    headlineLarge: {
      fontSize: 32,
      lineHeight: "40px",
    },
    headlineMedium: {
      fontSize: 28,
      lineHeight: "36px",
    },
    headlineSmall: {
      fontSize: 24,
      lineHeight: "32px",
    },
    titleLarge: {
      fontSize: 22,
      lineHeight: "28px",
    },
    titleMedium: {
      fontSize: 16,
      lineHeight: "24px",
      fontWeight: 600,
      letterSpacing: .15
    },
    titleSmall: {
      fontSize: 14,
      lineHeight: "20px",
      fontWeight: 600,
      letterSpacing: .1
    },
    labelMedium: {
      fontSize: 12,
      lineHeight: "16px",
      fontWeight: 600,
      letterSpacing: .5
    },
    labelSmall: {
      fontSize: 11,
      lineHeight: "16px",
      fontWeight: 600,
      letterSpacing: .5
    },
    bodyLarge: {
      fontSize: 16,
      lineHeight: "24px",
      letterSpacing: .5
    },
    bodyMedium: {
      fontSize: 14,
      lineHeight: "20px",
      letterSpacing: .25
    },
    bodySmall: {
      fontSize: 12,
      lineHeight: "16px",
      letterSpacing: .4
    },
  },
});
theme = createTheme(theme, {
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          displayLarge: 'h1',
          displayMedium: 'h2',
          displaySmall: 'h3',
          headlineLarge: 'h1',
          headlineMedium: 'h2',
          headlineSmall: 'h3',
          titleLarge: 'h1',
          titleMedium: 'h2',
          titleSmall: 'h3',
          labelMedium: 'p',
          labelSmall: 'p',
          bodyLarge: 'p',
          bodyMedium: 'p',
          bodySmall: 'p',
        },
      },
    },
    MuiInputBase: {
      variants: [{
        props: {size: 'hero'},
        style: {
          paddingInline: 24,
          height: 56,
          borderRadius: 28,
          background: "#FFF",
          color: "#49454F",
        }
      }]
    },
    MuiSvgIcon: {
      variants: [{
        props: {fontSize: 'cardMedia'},
        style: {
          fontSize: 60,
        }
      }]
    },
    MuiPaper: {
      variants: [{
        props: {variant: 'home'},
        style: {
          boxShadow: theme.shadows[2],
          borderRadius: 16,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: "white",
          width: 164,
        }
      }]
    }
  }
});

export function PlatineTheme({ children }: PropsWithChildren) {
  return <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>;
}
