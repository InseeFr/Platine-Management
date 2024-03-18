import { Card, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { SurveyUnitSurveysTable } from "./SurveyUnitSurveysTable";

import useToggle from "react-use/lib/useToggle";
import { useFetchQuery } from "../../hooks/useFetchQuery";
import { APISchemas } from "../../types/api";
import { useState } from "react";
import { useDebouncedState } from "../../hooks/useDebouncedState";
import { Row } from "../Row";
import { Filters } from "../Contact/ContactSurveys";

type Props = {
  surveyUnit: APISchemas["SurveyUnitDto"];
};

export const SurveyUnitSurveys = ({ surveyUnit }: Props) => {
  const [isFilteredOpened, toggle] = useToggle(false);
  const [state, setState] = useState("");
  const [search, setSearch] = useDebouncedState("", 500);

  const { data: surveys } = useFetchQuery("/api/survey-units/{id}/partitionings", {
    urlParams: {
      id: surveyUnit.idSu,
    },
    query: {
      isFilteredOpened,
    },
  });

  const filteredSurveys = filterSurveys(surveys ?? [], { search, state });

  return (
    <Card sx={{ mx: 2, px: 6, py: 3 }} elevation={2}>
      <Row justifyContent={"space-between"} py={4}>
        <Filters onSearch={e => setSearch(e.target.value)} onSelect={e => setState(e.target.value)} />

        <ToggleButtonGroup value={isFilteredOpened} exclusive onChange={(_, v) => toggle(v)}>
          <ToggleButton value={false} aria-label="left aligned">
            En cours
          </ToggleButton>
          <ToggleButton value={true} aria-label="left aligned">
            Tout
          </ToggleButton>
        </ToggleButtonGroup>
      </Row>
      <SurveyUnitSurveysTable surveys={filteredSurveys} />
    </Card>
  );
};

function filterSurveys(
  surveys: Array<APISchemas["SurveyUnitPartitioning"]>,
  { search, state }: { search?: string; state?: string },
) {
  if (state && state !== "all") {
    surveys = surveys.filter(s => s.lastEvent === state);
  }

  if (search) {
    surveys = surveys.filter(
      item =>
        item.year?.toString().includes(search) ||
        item.campaignWording?.toLocaleLowerCase().includes(search.toLowerCase()) ||
        item.sourceWording?.toLocaleLowerCase().includes(search.toLowerCase()),
    );
  }
  return surveys;
}
