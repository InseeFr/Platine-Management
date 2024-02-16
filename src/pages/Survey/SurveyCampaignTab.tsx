import { Grid } from "@mui/material";
import { APISchemas } from "../../types/api";
import { SurveyCreateCampaignCard } from "../../ui/Survey/SurveyCreateCampaignCard";

type Props = {
  survey: APISchemas["SurveyDto"] | undefined;
};

export const SurveyCampaignTab = ({ survey }: Props) => {
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
      <SurveyCreateCampaignCard survey={survey} />
    </Grid>
  );
};
