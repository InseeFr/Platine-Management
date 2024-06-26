import { createTheme, CssBaseline } from "@mui/material";
import { type CSSProperties, type PropsWithChildren } from "react";
import { ThemeProvider } from "@emotion/react";

declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    "text.hint": true;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    red: string;
    Surfaces: {
      Secondary: string;
    };
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    red: { main: string };
    black: { main: string };
    light: { main: string };
    Surfaces?: {
      Secondary: string;
    };
  }

  interface TypeText {
    primary: string;
    secondary: string;
    tertiary: string;
    hint: string;
  }

  interface TypographyVariants {
    displayLarge: CSSProperties;
    displayMedium: CSSProperties;
    displaySmall: CSSProperties;
    headlineLarge: CSSProperties;
    headlineMedium: CSSProperties;
    headlineSmall: CSSProperties;
    titleLarge: CSSProperties;
    titleMedium: CSSProperties;
    titleSmall: CSSProperties;
    itemSmall: CSSProperties;
    labelMedium: CSSProperties;
    labelSmall: CSSProperties;
    bodyLarge: CSSProperties;
    bodyMedium: CSSProperties;
    bodySmall: CSSProperties;
  }

  interface TypographyVariantsOptions {
    displayLarge?: CSSProperties;
    displayMedium?: CSSProperties;
    displaySmall?: CSSProperties;
    headlineLarge?: CSSProperties;
    headlineMedium?: CSSProperties;
    headlineSmall?: CSSProperties;
    titleLarge?: CSSProperties;
    titleMedium?: CSSProperties;
    titleSmall?: CSSProperties;
    itemSmall?: CSSProperties;
    labelMedium?: CSSProperties;
    labelSmall?: CSSProperties;
    bodyLarge?: CSSProperties;
    bodyMedium?: CSSProperties;
    bodySmall?: CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    displayLarge: true;
    displayMedium: true;
    displaySmall: true;
    headlineLarge: true;
    headlineMedium: true;
    headlineSmall: true;
    titleLarge: true;
    titleMedium: true;
    titleSmall: true;
    itemSmall: true;
    labelMedium: true;
    labelSmall: true;
    bodyLarge: true;
    bodyMedium: true;
    bodySmall: true;
  }
}

declare module "@mui/material/InputBase" {
  interface InputBasePropsSizeOverrides {
    hero: true;
    search: true;
  }
}

declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsSizeOverrides {
    cardMedia: true;
    tabTitle: true;
    headerSinglePage: true;
    cardTitle: true;
    smallIcon: true;
  }
  interface SvgIconPropsColorOverrides {
    yellow: true;
  }
}

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    home: true;
    disabled: true;
  }
}

declare module "@mui/material/Tab" {
  interface TabPropsClassesOverrides {
    search: true;
  }
}

declare module "@mui/material/TextField" {
  interface TextFieldPropsSizeOverrides {
    search: true;
  }
}

const baseTheme = createTheme({});
const colors = (c: string) => baseTheme.palette.augmentColor({ color: { main: c } });
const typography = {
  fontFamily: "Open Sans, sans-serif",
  displayLarge: {
    fontSize: 57,
    lineHeight: "64px",
    letterSpacing: -0.25,
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
    letterSpacing: 0.15,
  },
  titleSmall: {
    fontSize: 14,
    lineHeight: "20px",
    fontWeight: 600,
    letterSpacing: 0.1,
  },
  itemSmall: {
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: 400,
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: 600,
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontSize: 11,
    lineHeight: "16px",
    fontWeight: 600,
    letterSpacing: 0.5,
  },
  bodyLarge: {
    fontSize: 16,
    lineHeight: "24px",
    letterSpacing: 0.5,
  },
  bodyMedium: {
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontSize: 12,
    lineHeight: "16px",
    letterSpacing: 0.4,
  },
};
const palette = {
  background: {
    default: "#F5F7FA",
  },
  text: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "#49454F",
    tertiary: "#797676",
    hint: "#BCC2CC",
  },
  primary: {
    main: "#6750A4",
    light: "#EAE5FE",
    dark: "rgb(72, 56, 114)",
    contrastText: "#fff",
  },
  red: colors("#ED1443"),
  blue: colors("#286AC7"),
  yellow: colors("#F3EE67"),
  black: colors("#0A192E"),
  light: colors("#49454F"),
  Surfaces: {
    Secondary: "#FFF",
  },
};
const shadows = [
  "none",
  "0px 1px 4px 0px rgba(80, 76, 75, 0.80)",
  "0px 8px 16px 0px rgba(0, 0, 0, 0.10);",
  ...baseTheme.shadows.slice(3),
] as typeof baseTheme.shadows;
export const theme = createTheme({
  shadows,
  palette,
  typography,
  components: {
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          ...typography.bodyLarge,
          color: palette.text.secondary,
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          displayLarge: "h1",
          displayMedium: "h2",
          displaySmall: "h3",
          headlineLarge: "h1",
          headlineMedium: "h2",
          headlineSmall: "h3",
          titleLarge: "h1",
          titleMedium: "h2",
          titleSmall: "h3",
          labelMedium: "p",
          labelSmall: "p",
          bodyLarge: "p",
          bodyMedium: "p",
          bodySmall: "p",
        },
      },
    },
    MuiSvgIcon: {
      variants: [
        {
          props: { fontSize: "cardMedia" },
          style: {
            fontSize: 60,
          },
        },
        {
          props: { fontSize: "tabTitle" },
          style: {
            fontSize: 28,
            marginBottom: "0px !important",
          },
        },
        {
          props: { fontSize: "headerSinglePage" },
          style: {
            fontSize: 48,
          },
        },
        {
          props: { fontSize: "cardTitle" },
          style: {
            fontSize: 24,
          },
        },
        {
          props: { fontSize: "smallIcon" },
          style: {
            fontSize: 20,
          },
        },
      ],
    },
    MuiTab: {
      variants: [
        {
          props: { classes: "search" },
          style: {
            fontSize: "12px",
            fontWeight: 600,
            lineHeight: "16px",
            textTransform: "none",
            color: palette.text.tertiary,
            padding: 8,
            minHeight: 54,
            whiteSpace: "nowrap",

            "&.Mui-selected": {
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              backgroundColor: palette.primary.light,
            },
            "&>.MuiTab-iconWrapper": {
              margin: 0,
            },
          },
        },
      ],
    },
    MuiPaper: {
      variants: [
        {
          props: { variant: "home" },
          style: {
            boxShadow: shadows[2],
            borderRadius: 16,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "white",
            width: 164,
          },
        },
        {
          props: { variant: "disabled" },
          style: {
            boxShadow: shadows[3],
            backgroundColor: "rgba(126, 126, 126, 0.06)",
          },
        },
      ],
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: `inset 0 0 0 1px ${palette.text.tertiary}`,
          ".MuiToggleButtonGroup-grouped.Mui-selected": {
            position: "relative",
            zIndex: 2,
          },
          ".MuiToggleButtonGroup-grouped:not(:first-of-type)": {
            marginLeft: -12,
            zIndex: 1,
            paddingLeft: 24,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "none",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          paddingInline: 24,
          border: "none",
          ...typography.bodyMedium,
          textTransform: "none",
          "&.Mui-selected, &.Mui-selected:hover": {
            borderRadius: "24px!important",
            background: palette.primary.main,
            color: "white",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        sizeSmall: {
          ...typography.bodyMedium,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          background: "#FFF",
        },
        sizeSmall: {
          ...typography.bodyMedium,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          ...typography.titleMedium,
          fontSize: "20px",
          lineHeight: "32px",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "24px",
        },
      },
    },
    MuiFormGroup: {
      styleOverrides: {
        root: {
          "& .MuiSvgIcon-root": {
            fontSize: 14,
          },
          ".MuiTypography-root": {
            ...typography.bodyMedium,
          },
          ".MuiFormControlLabel-root": {
            gap: "8px",
          },
          gap: "24px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        colorError: {
          backgroundColor: "#FDDBC3",
          color: "#C71A01",
          ".MuiChip-deleteIcon": {
            color: "#C71A01",
          },
          "&:hover": {
            backgroundColor: "#F9C3AF",
          },
        },
        colorSuccess: {
          backgroundColor: "#D0E6D4",
          color: "#057345",
          ".MuiChip-deleteIcon": {
            color: "#057345",
          },
          "&:hover": {
            backgroundColor: "#A9C6AF",
          },
        },
        root: {
          ".MuiChip-deleteIcon": {
            color: palette.text.primary,
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        standardSuccess: {
          color: "#2E7D32",
        },
      },
    },
  },
});

export function PlatineTheme({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
