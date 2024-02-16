import Grid from "@mui/material/Grid";
import { APISchemas } from "../../types/api.ts";
import { SurveyDetailsCard } from "../../ui/Survey/SurveyDetailsCard.tsx";
import { HistoryActionsCard } from "../../ui/Contact/HistoryActionsCard.tsx";
import { CommentsCard } from "../../ui/Contact/CommentsCard.tsx";

type Props = {
  survey: APISchemas["SurveyDto"] | undefined;
};

export const SurveyInfosTab = ({ survey }: Props) => {
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
      <Grid item container spacing={3} xs={12}>
        <Grid item xs={6}>
          <HistoryActionsCard />
        </Grid>
        <Grid item xs={6}>
          <CommentsCard />
        </Grid>
      </Grid>
    </Grid>
  );
};
