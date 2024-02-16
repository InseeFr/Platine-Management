import { Button, Card, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { APISchemas } from "../../types/api";
import { CardtitleWithIcon } from "../CardtitleWithIcon";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import { Field } from "../Form/Field";
import { Row } from "../Row";
import { z } from "zod";
import { useForm } from "../../hooks/useForm";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  survey: APISchemas["SurveyDto"] | undefined;
};

const schema = z.object({
  label: z.string(),
  year: z.string(),
  period: z.string(),
});

export const SurveyCreateCampaignCard = ({ survey }: Props) => {
  const { register, control, errors, handleSubmit } = useForm(schema, {
    defaultValues: {
      label: survey?.sourceId,
      year: survey?.year?.toString(),
      period: "",
    },
  });
  return (
    <Card sx={{ px: 6, py: 3 }} elevation={2}>
      <Stack spacing={4}>
        <CardtitleWithIcon
          IconComponent={AutorenewOutlinedIcon}
          title={"Création d'une nouvelle campagne"}
        />
        <Divider />
        <Typography>
          {
            "La sélection du libellé d'une année de référence, et d'une période de référence sont nécesaires pour la création d'une nouvelle campagne."
          }
        </Typography>
        <Row spacing={28}>
          <Field error={errors.label?.message} {...register("label")}></Field>
          <Field error={errors.year?.message} {...register("year")}></Field>
          <Field label=""></Field>
        </Row>
        <Button
          variant="contained"
          sx={{ typography: "bodyLarge" }}
          size={"small"}
          startIcon={<AddIcon />}
          //onClick={}
        >
          {"Créer une Nouvelle campagne"}
        </Button>
      </Stack>
    </Card>
  );
};
