import { Card, Stack } from "@mui/material";
import { CardtitleWithIcon } from "../CardtitleWithIcon.tsx";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { Row } from "../Row.tsx";
import { APISchemas } from "../../types/api.ts";
import { SurveyMetadataItem } from "./SurveyMetadataItem.tsx";

type Props = {
  survey: APISchemas["SurveyDto"] | undefined;
};

export const SurveyDetailsCard = ({ survey }: Props) => {
  return (
    <Card sx={{ px: 6, py: 3 }} elevation={2}>
      <Stack spacing={4}>
        <CardtitleWithIcon IconComponent={AssignmentOutlinedIcon} title={"Métadonnées de l'enquête"} />
        <Row spacing={8} justifyContent={"space-evenly"}>
          <Stack spacing={1} typography={"bodyMedium"}>
            <SurveyMetadataItem label="Identifiant" value={survey?.id} />
            <SurveyMetadataItem label="Année de collecte" value={survey?.year} />
            <SurveyMetadataItem label="Libellé long" value={survey?.shortWording} />
            <SurveyMetadataItem label="Libellé court" value={survey?.longWording} />
            <SurveyMetadataItem label="Objectif long" value={survey?.longObjectives} />
            <SurveyMetadataItem label="Date de début" value="not provided" />
            <SurveyMetadataItem label="Date de fin" value="not provided" />
          </Stack>
          <Stack spacing={1} typography={"bodyMedium"}>
            <SurveyMetadataItem label="Statut de l'enquête" value="not provided" />
            <SurveyMetadataItem label="Caractère obligatoire" value="not provided" />
            <SurveyMetadataItem label="Numéro de visa" value={survey?.visaNumber} />
            <SurveyMetadataItem label="Taille de l'échantillon" value={survey?.sampleSize} />
            <SurveyMetadataItem label="Communication" value={survey?.communication} />
            <SurveyMetadataItem label="URL diffusion" value={survey?.diffusionUrl} />
            <SurveyMetadataItem label="URL notice" value={survey?.noticeUrl} />
            <SurveyMetadataItem label="URL spécimen" value={survey?.specimenUrl} />
          </Stack>
        </Row>
      </Stack>
    </Card>
  );
};
