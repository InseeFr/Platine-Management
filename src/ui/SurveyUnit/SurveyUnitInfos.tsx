import { CommentsCard } from "../../ui/Contact/CommentsCard";
import { APISchemas } from "../../types/api.ts";

import Grid from "@mui/material/Grid";
import { SurveyUnitDetailsCard } from "./SurveyUnitDetailsCard.tsx";

type Props = {
  surveyUnit: APISchemas["SurveyUnitDto"];
  onSave: () => void;
};

export const SurveyUnitInfos = ({ surveyUnit, onSave }: Props) => {
  return (
    <Grid
      px={3}
      container
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(690px, 1fr))",
        columnGap: 4,
        rowGap: 3,
      }}
    >
      <SurveyUnitDetailsCard surveyUnit={surveyUnit} onSave={onSave} />
      <CommentsCard />
    </Grid>
  );
};
