import { APISchemas } from "../../types/api.ts";
import { SurveyUnitDetailsCard } from "./SurveyUnitDetailsCard.tsx";
import { Stack } from "@mui/system";
import { SurveyUnitCommentsCard } from "./SurveyUnitCommentsCard.tsx";

type Props = {
  surveyUnit: APISchemas["SurveyUnitDto"];
};

export const SurveyUnitInfos = ({ surveyUnit }: Props) => {
  return (
    <Stack px={3} gap={3}>
      <SurveyUnitDetailsCard surveyUnit={surveyUnit} />
      <SurveyUnitCommentsCard />
    </Stack>
  );
};
