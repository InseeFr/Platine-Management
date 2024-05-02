import { Box, CardActionArea, CircularProgress, Stack } from "@mui/material";
import { Row } from "../../ui/Row";
import { useInfiniteFetchQuery } from "../../hooks/useFetchQuery.ts";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { useState } from "react";
import { VisibilitySpy } from "../../ui/VisibilitySpy.tsx";
import { CardGrid } from "../../ui/Layout/CardGrid.tsx";
import { type APIResponse } from "../../types/api.ts";
import { type ItemOf } from "../../types/utils.ts";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useSearchFilterParams } from "../../hooks/useSearchFilter.ts";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";

const endpoint = "/api/survey-units/search" as const;
type Item = ItemOf<Required<APIResponse<typeof endpoint, "get">>["content"]>;

export const SearchSurveyUnits = () => {
  const {
    results: surveyUnits,
    hasNextPage,
    fetchNextPage,
    isLoading,
    count,
  } = useInfiniteFetchQuery(endpoint, {
    query: useSearchFilterParams("surveyUnits"),
  });

  const [tab, setTab] = useState("me");
  return (
    <Stack spacing={3} sx={{ minHeight: 0 }}>
      <Row justifyContent={"space-between"}>
        <ToggleButtonGroup value={tab} exclusive onChange={(_, v) => setTab(v)}>
          <ToggleButton value="me" aria-label="left aligned">
            Mes unités enquêtées
          </ToggleButton>
          <ToggleButton value="all" aria-label="left aligned">
            Tout
          </ToggleButton>
        </ToggleButtonGroup>
        {count && <Typography variant="titleSmall">résultat: {count} unité(s) enquêtée(s)</Typography>}
      </Row>
      {isLoading && (
        <Row justifyContent={"space-around"} height={"100%"}>
          <CircularProgress />
        </Row>
      )}
      {!isLoading && surveyUnits.length === 0 && (
        <Row justifyContent={"space-around"} height={"100%"}>
          <Typography variant="titleMedium">Aucun résultat</Typography>
        </Row>
      )}
      <CardGrid>
        {surveyUnits.map(su => (
          <div key={su.idSu}>
            {/* This div prevent card from behing resized by the grid */}
            <ItemCard surveyUnit={su} />
          </div>
        ))}
        {hasNextPage && <VisibilitySpy onVisible={fetchNextPage} />}
      </CardGrid>
    </Stack>
  );
};

export function ItemCard({ surveyUnit }: { surveyUnit: Item }) {
  const isDisabled = false; // TODO : calculated this value
  return (
    <Card elevation={2} variant={isDisabled ? "disabled" : undefined}>
      <CardActionArea component={Link} to={`/survey-units/${surveyUnit.idSu}`}>
        <Box px={3} py={2.5}>
          <Row gap={1} mb={5}>
            <CorporateFareIcon />
            <Typography variant="titleLarge" fontWeight={600} color="text.primary">
              {surveyUnit.identificationName}
            </Typography>
          </Row>
          <Box mb={2} typography="bodyMedium" fontWeight={600} color="text.secondary">
            ID unité enquêtée : {surveyUnit.idSu}
          </Box>
          <Box typography="bodyMedium" fontWeight={600} color="text.secondary">
            SIREN : {surveyUnit.identificationCode}
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}
