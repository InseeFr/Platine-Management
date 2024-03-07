import { Card } from "@mui/material";
import { SurveyUnitSurveysTable } from "./SurveyUnitSurveysTable";

import useToggle from "react-use/lib/useToggle";
import { useFetchQuery } from "../../hooks/useFetchQuery";
import { APISchemas } from "../../types/api";

type Props = {
  surveyUnit: APISchemas["SurveyUnitDto"];
};

export const SurveyUnitSurveys = ({ surveyUnit }: Props) => {
  const [isFilteredOpened, toggle] = useToggle(false);

  const { data: surveys } = useFetchQuery("/api/survey-units/{id}/partitionings", {
    urlParams: {
      id: surveyUnit.idSu,
    },
    query: {
      isFilteredOpened,
    },
  });

  return (
    <Card sx={{ mx: 2, px: 6, py: 3 }} elevation={2}>
      {/* TODO: add filters */}

      <SurveyUnitSurveysTable surveys={surveys} />
    </Card>
  );
};
