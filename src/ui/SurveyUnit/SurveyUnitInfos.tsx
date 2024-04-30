import { CommentsCard } from "../../ui/Contact/CommentsCard";
import { APISchemas } from "../../types/api.ts";
import { SurveyUnitDetailsCard } from "./SurveyUnitDetailsCard.tsx";

import Grid from "@mui/material/Grid";

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
        gridTemplateColumns: "1fr 1fr",
        columnGap: 4,
        rowGap: 3,
      }}
    >
      <SurveyUnitDetailsCard surveyUnit={surveyUnit} onSave={onSave} />
      <CommentsCard />
    </Grid>
  );
};
