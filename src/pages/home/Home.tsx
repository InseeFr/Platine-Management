import { InputBase, Typography } from "@mui/material";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import { InfoBanner } from "./InfoBanner";
import { HomeCard } from "./HomeCard";
import Binoculars from "./Binoculars";
import Stack from "@mui/material/Stack";
import { Row } from "../../ui/Row.tsx";

export function Home() {
  const maxWidth = 800;
  return (
    <>
      <InfoBanner />
      <Stack
        position="relative"
        sx={{
          background: "linear-gradient(270deg, #21005D 0%, #9A82DB 0%, #E12358 90%)",
        }}
        justifyContent="center"
        alignItems="center"
        minHeight={500}
        height="calc(100vh - 230px)">
        <Stack gap={3} sx={{ maxWidth }} my="auto">
          <Typography variant="displayMedium" fontWeight={700} color="white">
            Trouver un contact, une enquête ou une unité enquêtée
          </Typography>
          <InputBase size="hero"
                     placeholder="Rechercher par nom, Idec, ID enquête, SIREN"
                     inputProps={{
                       "aria-label": "search",
                     }}
                     endAdornment={<SearchIcon />} />
        </Stack>
        <Row
          position="relative"
          bottom={-30}
          justifyContent="space-between"
          width={1}
          maxWidth={maxWidth}
        >
          <HomeCard
            IconComponent={PersonOutlineIcon}
            content="Voir mes contacts"
            color="#D6326D"
            to={{ pathname: "/recherche", tab: 0 }}
          />
          <HomeCard
            IconComponent={Binoculars}
            content="Voir mes enquêtes"
            color="#C34A8E"
            to={{ pathname: "/recherche", tab: 1 }}
          />
          <HomeCard
            IconComponent={CorporateFareIcon}
            content="Voir mes unités enquêtées"
            color="#AC69B9"
            to={{ pathname: "/recherche", tab: 2 }}
          />
        </Row>
      </Stack>
    </>
  );
}
