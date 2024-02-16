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
import { useFetchQuery } from "../../hooks/useFetchQuery";

type Props = {
  survey: APISchemas["SurveyDto"];
};

const schema = z.object({
  label: z.string(),
  year: z.string(),
  period: z.string(),
});

export const SurveyCreateCampaignCard = ({ survey }: Props) => {
  const { data: periods } = useFetchQuery("/api/periods");
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
        <Typography variant="itemSmall">
          {
            "La sélection du libellé d'une année de référence, et d'une période de référence sont nécessaires pour la création d'une nouvelle campagne."
          }
        </Typography>
        <Row justifyContent={"space-between"}>
          <Typography>{survey.sourceId}</Typography>
          <Typography>{survey.year}</Typography>
          <Field
            sx={{ width: "120px" }}
            type="select"
            selectoptions={periods?.sort((a, b) => (a.label! > b.label! ? 1 : -1)).map(p => p.label!)}
            error={errors.period?.message}
            {...register("period")}
          ></Field>
        </Row>
        <Row justifyContent={"right"}>
          <Button
            variant="contained"
            sx={{ typography: "bodyLarge" }}
            size={"medium"}
            startIcon={<AddIcon />}
            //onClick={}
          >
            {"Créer une Nouvelle campagne"}
          </Button>
        </Row>
      </Stack>
    </Card>
  );
};
