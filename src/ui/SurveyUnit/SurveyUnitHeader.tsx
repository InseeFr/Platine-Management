import { Row } from "../Row.tsx";
import { APISchemas } from "../../types/api.ts";
import { Button, Stack, Typography } from "@mui/material";
import { Breadcrumbs } from "../Breadcrumbs.tsx";
import { theme } from "../../theme.tsx";
import { Link } from "../Link.tsx";
import { useSetSearchFilter } from "../../hooks/useSearchFilter.ts";

type Props = {
  surveyUnit: APISchemas["SurveyUnitDetailsDto"];
};

export const SurveyUnitHeader = ({ surveyUnit }: Props) => {
  const setFilter = useSetSearchFilter();

  const breadcrumbs = [
    { href: "/", title: "Accueil" },
    { href: "/survey-units", title: "Unités enquêtées" },
    `${surveyUnit.identificationName ?? ""}`,
  ];

  const searchValue = surveyUnit.identificationName ?? surveyUnit.identificationCode ?? "";

  return (
    <Stack px={6} py={3} sx={{ backgroundColor: theme.palette.Surfaces.Secondary }}>
      <Breadcrumbs items={breadcrumbs} />
      <Typography component={"span"} variant="headlineLarge">
        {surveyUnit.identificationName}
      </Typography>
      <Row justifyContent={"space-between"} pt={1}>
        {surveyUnit.identificationCode ? (
          <Typography component={"span"} variant="bodyMedium">
            {`ID métier : ${surveyUnit.identificationCode}`}
            <Typography component={"span"} variant="bodyMedium" sx={{ px: 1 }}>
              |
            </Typography>
            {`ID technique : ${surveyUnit.idSu}`}
          </Typography>
        ) : (
          surveyUnit.idSu && (
            <Typography component={"span"} variant="bodyMedium">
              {`ID technique : ${surveyUnit.idSu}`}
            </Typography>
          )
        )}
        <Button
          variant="contained"
          size="large"
          component={Link}
          to={`/questionings`}
          onClick={() => {
            return setFilter("questionings", { searchValue: searchValue });
          }}
          disabled={!surveyUnit.hasQuestionings}
        >
          Voir ses interrogations
        </Button>
      </Row>
    </Stack>
  );
};
