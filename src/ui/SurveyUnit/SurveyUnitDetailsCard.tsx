import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import { CardtitleWithIcon } from "../CardtitleWithIcon.tsx";
import { Row } from "../Row.tsx";
import { APISchemas } from "../../types/api.ts";
import { AddressInformations } from "../AddressInformations.tsx";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { styles } from "../Contact/ContactFormDialog.tsx";

type Props = {
  surveyUnit: APISchemas["SurveyUnitDto"];
};

export const SurveyUnitDetailsCard = ({ surveyUnit }: Props) => {
  return (
    <Card sx={{ p: 3, pt: 4 }} elevation={2}>
      <Stack gap={2}>
        <CardtitleWithIcon IconComponent={InfoOutlinedIcon} title={"Informations"} />
        <Box sx={styles.Grid}>
          <AddressInformations
            identificationName={surveyUnit.identificationName}
            address={surveyUnit.address}
          />
          <Divider orientation="vertical" variant="fullWidth" />
          <Stack spacing={1}>
            <TitleAndInformation title={"Siren"} value={surveyUnit.identificationCode} />
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
};

const TitleAndInformation = ({ title, value }: { title: string; value?: string }) => {
  return (
    <Row justifyContent={"space-between"}>
      <Typography component={"span"} variant="bodyMedium">
        {title}
      </Typography>
      <Typography component={"span"} variant="titleSmall">
        {value ?? "-"}
      </Typography>
    </Row>
  );
};
