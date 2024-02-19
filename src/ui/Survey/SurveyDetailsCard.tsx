import { Card, Divider, IconButton, Stack } from "@mui/material";
import { CardtitleWithIcon } from "../CardtitleWithIcon.tsx";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { Row } from "../Row.tsx";
import { APISchemas } from "../../types/api.ts";
import { SurveyMetadataItem, SurveyMetadataItems } from "./SurveyMetadataItem.tsx";
import { useToggle } from "react-use";
import { SurveyFormDialog } from "./SurveyFormDialog.tsx";

type Props = {
  survey: APISchemas["SurveyDto"];
  onSave: () => void;
};

export const SurveyDetailsCard = ({ survey, onSave }: Props) => {
  const [hasDialog, toggleDialog] = useToggle(false);

  const handleSave = () => {
    toggleDialog();
    onSave();
  };
  return (
    <Card sx={{ px: 6, py: 3 }} elevation={2}>
      <Stack spacing={4}>
        <Row justifyContent={"space-between"}>
          <CardtitleWithIcon IconComponent={AssignmentOutlinedIcon} title={"Métadonnées de l'enquête"} />
          <IconButton onClick={toggleDialog} color="inherit">
            <BorderColorOutlinedIcon fontSize="small" />
          </IconButton>
        </Row>
        <Divider variant="fullWidth" />
        <Row spacing={8} typography={"bodyMedium"}>
          <SurveyMetadataItems>
            <SurveyMetadataItem label="Identifiant" value={survey?.id} />
            <SurveyMetadataItem label="Année de collecte" value={survey?.year} />
            <SurveyMetadataItem label="Libellé long" value={survey?.shortWording} />
            <SurveyMetadataItem label="Libellé court" value={survey?.longWording} />
            <SurveyMetadataItem label="Objectif long" value={survey?.longObjectives} />
            <SurveyMetadataItem label="Date de début" value="not provided" />
            <SurveyMetadataItem label="Date de fin" value="not provided" />
          </SurveyMetadataItems>
          <SurveyMetadataItems>
            <SurveyMetadataItem label="Statut de l'enquête" value="not provided" />
            <SurveyMetadataItem label="Caractère obligatoire" value="not provided" />
            <SurveyMetadataItem label="Numéro de visa" value={survey?.visaNumber} />
            <SurveyMetadataItem label="Taille de l'échantillon" value={survey?.sampleSize} />
            <SurveyMetadataItem label="Communication" value={survey?.communication} />
            <SurveyMetadataItem label="URL diffusion" value={survey?.diffusionUrl} />
            <SurveyMetadataItem label="URL notice" value={survey?.noticeUrl} />
            <SurveyMetadataItem label="URL spécimen" value={survey?.specimenUrl} />
          </SurveyMetadataItems>
        </Row>
      </Stack>
      <SurveyFormDialog open={hasDialog} onClose={toggleDialog} onSave={handleSave} survey={survey} />
    </Card>
  );
};
