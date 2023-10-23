import { InputBase, Typography, Grid, Box } from "@mui/material";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import { InfoBanner } from "./InfoBanner";
import { HomeCard } from "./HomeCard";
import Binoculars from "./Binoculars";

export function Home() {
  return (
    <>
      <Box
        sx={{
          pt: 1.125,
          pb: 1.375,
          background: "#6750A4",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          alignSelf: "stretch",
          height: "28px",
        }}
        className="Info"
      >
        <InfoBanner />
      </Box>
      <Box
        sx={{
          height: "697px",
          px: 6,
          py: 3,
          background: "linear-gradient(270deg, #21005D 0%, #9A82DB 0%, #E12358 90%)",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          display: "flex",
          alignSelf: "stretch",
          flexShrink: 0,
        }}
        className="Content"
      >
        <Box
          sx={{
            flexDirection: "column",
            flex: "1 0 0",
            alignItems: "center",
            gap: "24px",
            display: "flex",
            pt: 19.75,
            alignSelf: "stretch",
          }}
          className="Recherche"
        >
          <Typography
            sx={{
              width: "787px",
              color: "#FFF",

              fontSize: "40px",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "56px",
              letterSpacing: "-0.25px",
            }}
          >
            Trouver un contact, une enquête ou une unité enquêtée
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              gap: 2,
            }}
          >
            <InputBase
              sx={{
                display: "flex",
                width: "784px",
                height: "56px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                borderRadius: "28px",
                background: "#FFF",
                px: 3,
                fontSize: "16px",
                fontFamily: "Open Sans",
                fontWeight: "400",
                lineHeight: 24,
                letterSpacing: 0.5,

                color: "#49454F",
              }}
              placeholder="Rechercher par nom, Idec, ID enquête, SIREN"
              inputProps={{
                "aria-label": "search",
              }}
              endAdornment={<SearchIcon />}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          width: "795px",
          justifyContent: "space-between",
          alignItems: "flex-start",
          alignContent: "flex-start",
          rowGap: "96px",
          flexWrap: "wrap",
          position: "absolute",
          left: "357px",
          bottom: "127px",
          top: "676px",
          right: "360px",
        }}
        className="Actions"
      >
        <Box
          sx={{
            display: "flex",
            width: "164px",
            height: "179px",

            justifyContent: "center",
            alignItems: "flex-end",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          <HomeCard
            IconComponent={PersonOutlineIcon}
            content="Voir mes contacts"
            color="#D6326D"
            to={{ pathname: "/recherche", tab: 0 }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "164px",
            height: "179px",

            justifyContent: "center",
            alignItems: "flex-end",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          <HomeCard
            IconComponent={Binoculars}
            content="Voir mes enquêtes"
            color="#C34A8E"
            to={{ pathname: "/recherche", tab: 1 }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "164px",
            height: "179px",

            justifyContent: "center",
            alignItems: "flex-end",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          <HomeCard
            IconComponent={CorporateFareIcon}
            content="Voir mes unités enquêtées"
            color="#AC69B9"
            to={{ pathname: "/recherche", tab: 2 }}
          />
        </Box>
      </Box>
    </>
  );
}
