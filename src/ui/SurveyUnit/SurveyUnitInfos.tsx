import { CommentsCard } from "../../ui/Contact/CommentsCard";
import { APISchemas } from "../../types/api.ts";
import { SurveyUnitDetailsCard } from "./SurveyUnitDetailsCard.tsx";
import { Row } from "../Row.tsx";

type Props = {
  surveyUnit: APISchemas["SurveyUnitDto"];
  onSave: () => void;
};

export const SurveyUnitInfos = ({ surveyUnit, onSave }: Props) => {
  return (
    <Row px={3} gap={4} alignItems={"flex-start"}>
      <SurveyUnitDetailsCard surveyUnit={surveyUnit} onSave={onSave} />
      <CommentsCard />
    </Row>
  );
};
