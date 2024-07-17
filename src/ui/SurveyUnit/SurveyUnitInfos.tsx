import { CommentsCard } from "../../ui/Contact/CommentsCard.tsx";
import { APISchemas } from "../../types/api.ts";
import { SurveyUnitDetailsCard } from "./SurveyUnitDetailsCard.tsx";
import { Stack } from "@mui/system";

type Props = {
  surveyUnit: APISchemas["SurveyUnitDto"];
};

export const SurveyUnitInfos = ({ surveyUnit }: Props) => {
  return (
    <Stack px={3} gap={3}>
      <SurveyUnitDetailsCard surveyUnit={surveyUnit} />
      <CommentsCard />
    </Stack>
  );
};
