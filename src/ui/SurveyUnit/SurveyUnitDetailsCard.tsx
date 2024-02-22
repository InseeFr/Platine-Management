import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import { CardtitleWithIcon } from "../CardtitleWithIcon.tsx";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import { Row } from "../Row";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

import { APISchemas } from "../../types/api.ts";
import { useToggle } from "react-use";
import { SurveyUnitFormDialog } from "./SurveyUnitFormDialog.tsx";
import { AddressInformations } from "../AddressInformations.tsx";

type Props = {
  surveyUnit: APISchemas["SurveyUnitDto"];
  onSave: () => void;
};

export const SurveyUnitDetailsCard = ({ surveyUnit, onSave }: Props) => {
  const [hasDialog, toggleDialog] = useToggle(false);

  const handleSave = () => {
    toggleDialog();
    onSave();
  };

  return (
    <Card sx={{ px: 6, py: 3 }} elevation={2}>
      <Stack spacing={4}>
        <Row justifyContent={"space-between"}>
          <CardtitleWithIcon IconComponent={AssignmentIndOutlinedIcon} title={"Informations"} />
          <IconButton onClick={toggleDialog} color="inherit">
            <BorderColorOutlinedIcon fontSize="small" />
          </IconButton>
        </Row>
        <Row spacing={8} alignItems={"flex-start"} justifyContent={"space-between"} pr={2}>
          <AddressInformations
            identificationName={surveyUnit.identificationName}
            address={surveyUnit.address}
          />
          <Stack spacing={1}>
            <TitleAndInformation title={"Siren"} value={"NO DATA"} />
            <TitleAndInformation title={"Groupe"} value={"NO DATA"} />
            <TitleAndInformation title={"Niveau de gestion"} value={"NO DATA"} />
            <TitleAndInformation title={"Qualité"} value={"NO DATA"} />
            <TitleAndInformation title={"Taille"} value={"NO DATA"} />
          </Stack>
        </Row>
      </Stack>
      <SurveyUnitFormDialog
        open={hasDialog}
        onClose={toggleDialog}
        onSave={handleSave}
        surveyUnit={surveyUnit}
      />
    </Card>
  );
};

const TitleAndInformation = ({ title, value }: { title: string; value: string }) => {
  return (
    <Row spacing={4}>
      <Typography component={"span"} width={"60px"} variant="itemSmall" color={"text.secondary"}>
        {title}
      </Typography>
      <Typography component={"span"} variant="titleSmall">
        {value}
      </Typography>
    </Row>
  );
};
