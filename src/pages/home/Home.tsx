import { Header } from "../../ui/Header";
import { InputBase, Stack, Typography } from "@mui/material";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import { InfoBanner } from "./InfoBanner";
import { HomeCard } from "./HomeCard";
import Binoculars from "./Binoculars";

export function Home() {
  return (
    <>
      <Header />
      <InfoBanner />
      <Stack
        sx={{
          px: 6,
          py: 3,
          height: "115vh",
          backgroundImage: "linear-gradient(269deg, #21005D -3.71%, #9A82DB -3.7%, #E12358 88.74%)",
        }}
        alignItems="center"
      >
        <Stack
          sx={{
            px: 6,
            pt: 19,
          }}
          alignItems="center"
        >
          <Typography
            color="Surfaces.Secondary"
            fontWeight={700}
            fontSize={40}
            width={787}
            textAlign="left"
            sx={{ py: 4 }}
            lineHeight={"140%"}
          >
            Trouver un contact, une enquête ou une unité enquêtée
          </Typography>
          <InputBase
            sx={{
              px: 3.5,
              color: "primary",
              backgroundColor: "Surfaces.Secondary",
              width: "100%",
              borderRadius: "28px",
              height: 48,
            }}
            placeholder="Rechercher par nom, Idec, ID enquête, SIREN"
            inputProps={{
              "aria-label": "search",
            }}
            endAdornment={<SearchIcon />}
          />
        </Stack>

        <Stack
          direction="row"
          spacing={20}
          sx={{
            px: 6,
            pt: 19,
            pb: 6,
          }}
          alignItems="center"
        >
          <HomeCard IconComponent={PersonOutlineIcon} content="Voir mes contacts" />
          <HomeCard IconComponent={Binoculars} content="Voir mes enquêtes" />
          <HomeCard IconComponent={CorporateFareIcon} content="Voir mes unités enquêtées" />
        </Stack>
      </Stack>
    </>
  );
}
