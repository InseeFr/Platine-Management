import { Grid } from "@mui/material";
import { APISchemas } from "../../types/api";
import { SurveyCalendarCard } from "../../ui/Survey/SurveyCalendarCard";

type Props = {
  survey: APISchemas["SurveyDto"];
};

export const SurveyCalendarTab = ({ survey }: Props) => {
  return (
    <Grid
      px={6}
      py={3}
      container
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(690px, 1fr))",
        columnGap: 4,
        rowGap: 3,
      }}
    >
      <SurveyCalendarCard survey={survey} />
    </Grid>
  );
};
