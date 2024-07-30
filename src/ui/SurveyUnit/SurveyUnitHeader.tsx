import { Row } from "../Row.tsx";
import { APISchemas } from "../../types/api.ts";
import { Button, Stack, Typography } from "@mui/material";
import { Breadcrumbs } from "../Breadcrumbs.tsx";
import { theme } from "../../theme.tsx";

type Props = {
  surveyUnit: APISchemas["SurveyUnitDto"];
};

export const SurveyUnitHeader = ({ surveyUnit }: Props) => {
  const breadcrumbs = [
    { href: "/", title: "Accueil" },
    { href: "/survey-units", title: "Unités enquêtées" },
    `${surveyUnit.identificationName ?? ""}`,
  ];

  return (
    <Stack px={6} py={3} sx={{ backgroundColor: theme.palette.Surfaces.Secondary }}>
      <Breadcrumbs items={breadcrumbs} />
      <Typography component={"span"} variant="headlineLarge" fontWeight={600}>
        {surveyUnit.identificationName}
      </Typography>
      <Row justifyContent={"space-between"} pt={1}>
        <Typography component={"span"} variant="bodyMedium">
          {`ID métier : ${surveyUnit.identificationCode}`}
          <Typography component={"span"} variant="bodyMedium" sx={{ px: 1 }}>
            |
          </Typography>
          {`ID technique : ${surveyUnit.idSu}`}
        </Typography>
        <Button
          variant="contained"
          size="large"
          // TODO: remove disabled when get pages
          disabled
        >
          Voir ses interrogations
        </Button>
      </Row>
    </Stack>
  );
};
