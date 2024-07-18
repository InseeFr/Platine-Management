import Stack from "@mui/material/Stack";
import { useFetchQuery } from "../../hooks/useFetchQuery.ts";
import { APISchemas } from "../../types/api.ts";
import { EmptyState } from "../TableComponents.tsx";
import { SurveyUnitContactTable } from "./SurveyUnitContactTable.tsx";

type Props = {
  surveyUnit: APISchemas["SurveyUnitDto"];
};

export const SurveyUnitContacts = ({ surveyUnit }: Props) => {
  const { data: contacts, isLoading } = useFetchQuery("/api/survey-units/{id}/contacts", {
    urlParams: {
      id: surveyUnit.idSu,
    },
  });

  const hasNoContact = !isLoading && (contacts === undefined || contacts.length === 0);

  return (
    <Stack py={3} px={2}>
      {hasNoContact ? (
        <EmptyState isFiltered={false} text={"Aucun contact trouvé."} />
      ) : (
        <SurveyUnitContactTable contacts={contacts} isLoading={isLoading} />
      )}
    </Stack>
  );
};
