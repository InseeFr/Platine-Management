import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    inseeRed: string;
    inseePurple?: string;
    Surfaces: {
      Secondary: string;
    };
  }
  // allow configuration using `createTheme`
  interface PaletteOptions {
    inseeRed?: string;
    inseePurple?: string;
    Surfaces?: {
      Secondary: string;
    };
  }

  interface TypographyVariants {
    logo: {
      fontSize: number;
      fontFamily: string;
      fontWeight: number;
    };
  }

  interface TypographyVariantsOptions {
    logo?: {
      fontSize: number;
      fontFamily: string;
      fontWeight: number;
    };
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    logo: true;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0A192E",
    },
    inseeRed: "#ED1443",
    inseePurple: "#6750A4",
    Surfaces: {
      Secondary: "#FFF",
    },
  },
  typography: {
    fontFamily: "Open Sans, sans-serif",
    logo: {
      fontSize: 28,
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 600,
    },
  },
});
