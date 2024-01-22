import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { SearchPanel } from "./SearchPanel";
import { Box } from "@mui/material";
import { ContactsList } from "./contacts/ContactList";

interface SearchProps {
  children?: React.ReactNode;
  tab: number;
}

export function SearchPage(props: SearchProps) {
  const { tab } = props;
  return (
    <Box
      className="Body"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          py: 2,
          display: "flex",
          width: "100%",
          height: "24px",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
        className="Custom-page-heading"
      >
        <Box
          className="Ariane"
          sx={{
            alignSelf: "stretch",
            pl: 6,
            alignItems: "flex-start",
            display: "flex",
          }}
        >
          <Box
            sx={{
              flex: "1 1 0",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 1,
              display: "flex",
            }}
            className="Ariane2"
          >
            <Breadcrumbs
              aria-label="breadcrumb"
              className="Breadcrumbs"
              sx={{ alignItems: "center", display: "flex" }}
            >
              <Box
                className="Link"
                style={{ justifyContent: "flex-start", alignItems: "center", gap: 8, display: "flex" }}
              >
                <Link
                  underline="hover"
                  color="text.secondary"
                  href="/"
                  style={{
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    display: "inline-flex",
                  }}
                >
                  <Typography
                    style={{
                      color: "rgba(0, 0, 0, 0.60)",
                      fontSize: 16,
                      fontFamily: "Roboto",
                      fontWeight: "400",
                      lineHeight: "24px",
                      letterSpacing: 0.15,
                      wordWrap: "break-word",
                    }}
                  >
                    Accueil
                  </Typography>
                </Link>
              </Box>
              <Typography
                color="text.primary"
                style={{
                  color: "rgba(0, 0, 0, 0.87)",
                  fontSize: 16,
                  fontFamily: "Roboto",
                  fontWeight: "400",
                  lineHeight: "24px",
                  letterSpacing: 0.15,
                  wordWrap: "break-word",
                }}
              >
                recherche avancée
              </Typography>
            </Breadcrumbs>
          </Box>
        </Box>
      </Box>
      <Box className="Content" style={{ width: "95%", height: "100%" }}>
        <Box
          style={{
            paddingLeft: 6,
            paddingRight: 6,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "48px",
            display: "inline-flex",
          }}
          className="Recherche"
        >
          <SearchPanel tab={tab} />
          <ContactsList />
        </Box>
      </Box>
    </Box>
  );
}
