import { Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { theme } from "../../theme.tsx";
import { Breadcrumbs } from "../Breadcrumbs.tsx";
import { Row } from "../Row.tsx";

type Props = {
  tab: string;
  onChangeTab: (_: any, v: any) => void;
};

export const SearchSurveyUnitsHeader = ({ tab, onChangeTab }: Props) => {
  const breadcrumbs = [{ href: "/", title: "Accueil" }, "Unités enquêtées"];

  return (
    <Row
      justifyContent={"space-between"}
      px={6}
      py={3}
      sx={{ backgroundColor: theme.palette.Surfaces.Secondary }}
    >
      <Stack>
        <Breadcrumbs items={breadcrumbs} />
        <Typography variant="headlineLarge" component="h1">
          Rechercher une unité enquêtée par ID métier ou raison sociale
        </Typography>
      </Stack>
      <Row justifyContent={"space-between"} minWidth={"fit-content"}>
        <ToggleButtonGroup value={tab} exclusive onChange={onChangeTab}>
          <ToggleButton value="me" size="large">
            Mes unités enquêtées
          </ToggleButton>
          <ToggleButton value="all" size="large">
            Toutes les unités enquêtées
          </ToggleButton>
        </ToggleButtonGroup>
      </Row>
    </Row>
  );
};
