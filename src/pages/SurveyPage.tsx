import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { SurveyPanel } from "./SurveyPanel";
import { useParams } from "react-router-dom";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import PersonOutline from "@mui/icons-material/PersonOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export function SurveyPage() {
  const { idSurvey } = useParams();
  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: 40,

          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-end",
          gap: 1.25,
          display: "inline-flex",
        }}
        className="Ariane"
      >
        <Breadcrumbs aria-label="breadcrumb" sx={{ px: 2, pt: 1 }}>
          <Link underline="hover" color="inherit" href="/">
            Accueil
          </Link>
          <Link underline="hover" color="inherit" href="/recherche">
            Recherche
          </Link>
          <Typography color="text.primary">fiche enquête</Typography>
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
          width: "100vw",
          height: 103,

          background: "white",
          borderBottom: "0.20px #666666 solid",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 1.25,
          display: "inline-flex",
        }}
        className="infos-fixe-contact"
      >
        <Box
          sx={{
            width: 253,
            height: 87,
            py: 1,
            pl: 2,
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 0.5,
            display: "inline-flex",
          }}
          className="BlocInfos"
        >
          <NavigateBeforeRoundedIcon />
          <Box
            sx={{
              width: 165,
              height: 71,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: 1,
              pl: 4,
              display: "inline-flex",
            }}
          >
            <Box
              sx={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: 1,
                display: "inline-flex",
              }}
            >
              <PersonOutline
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "inline-flex",
                }}
              />
              <Typography
                sx={{
                  color: "black",
                  fontSize: 20,
                  fontWeight: "700",
                  wordWrap: "break-word",
                }}
              >
                Enquête {idSurvey?.toUpperCase()}
              </Typography>
            </Box>
            <Box
              sx={{
                width: 102,
                height: 36,
                px: 1,
                borderRadius: 0.5,
                border: "1px #BCC2CC solid",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 3.5,
                display: "inline-flex",
              }}
            >
              <Typography
                sx={{
                  color: "#828282",
                  fontSize: 14,
                  fontFamily: "Open Sans",
                  fontWeight: "600",
                  lineHeight: 36,
                  wordWrap: "break-word",
                }}
              >
                2023
              </Typography>
              <KeyboardArrowDownIcon />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <SurveyPanel />
      </Box>
    </>
  );
}
