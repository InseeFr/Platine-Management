import { Card } from "@mui/material";
import { SurveyUnitSurveysTable } from "./SurveyUnitSurveysTable";

export const SurveyUnitSurveys = () => {
  return (
    <Card sx={{ mx: 2, px: 6, py: 3 }} elevation={2}>
      {/* TODO: add filters */}
      <SurveyUnitSurveysTable />
    </Card>
  );
};
