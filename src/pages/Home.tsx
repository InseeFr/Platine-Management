import { InputBase, Typography } from "@mui/material";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import { InfoBanner } from "../ui/InfoBanner.tsx";
import { HomeCard } from "../ui/Card/HomeCard.tsx";
import { BinocularIcon } from "../ui/Icon/BinocularIcon.tsx";
import Stack from "@mui/material/Stack";
import { Row } from "../ui/Row.tsx";
import { theme } from "../theme.tsx";

const styles = {
  inputHero: {
    paddingInline: 3,
    height: 56,
    borderRadius: 28,
    background: "#FFF",
    color: theme.palette.text.primary,
  },
};

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
        height="calc(100vh - 230px)"
      >
        <Stack gap={3} sx={{ maxWidth }} my="auto">
          <Typography variant="displayMedium" fontWeight={700} color="white">
            Trouver un contact, une enquête ou une unité enquêtée
          </Typography>
          <InputBase
            sx={styles.inputHero}
            placeholder="Rechercher par nom, Idec, ID enquête, SIREN"
            inputProps={{
              "aria-label": "search",
            }}
            endAdornment={<SearchIcon />}
          />
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
            to="/search/campaigns"
          />
          <HomeCard
            IconComponent={BinocularIcon}
            content="Voir mes enquêtes"
            color="#C34A8E"
            to="/search/campaigns"
          />
          <HomeCard
            IconComponent={CorporateFareIcon}
            content="Voir mes unités enquêtées"
            color="#AC69B9"
            to="/search/survey-units"
          />
        </Row>
      </Stack>
    </>
  );
}
