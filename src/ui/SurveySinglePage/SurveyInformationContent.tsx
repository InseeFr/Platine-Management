import Grid from "@mui/material/Grid";
import { APISchemas } from "../../types/api.ts";
import { SurveyDetailsCard } from "./SurveyDetailsCard/SurveyDetailsCard.tsx";

type Props = {
  survey: APISchemas["SurveyDto"] | undefined;
};

export const SurveyInformationContent = ({ survey }: Props) => {
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
      <SurveyDetailsCard survey={survey} />
    </Grid>
  );
};
