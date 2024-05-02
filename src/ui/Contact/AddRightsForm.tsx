import { useState } from "react";
import { Row } from "../Row";
import TextField from "@mui/material/TextField";
import { SelectWithOptions } from "../Form/SelectWithOptions";
import Button from "@mui/material/Button";
import { Alert, Stack, Typography } from "@mui/material";
import { useFetchMutation } from "../../hooks/useFetchQuery";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { APISchemas } from "../../types/api";

type Props = {
  contact: APISchemas["ContactFirstLoginDto"];
};

export const AddRightsForm = ({ contact }: Props) => {
  const [fieldsData, setFieldsData] = useState<{
    id?: string;
    idSource?: string;
    year?: string;
    periodicity?: string;
  }>({
    id: undefined,
    idSource: undefined,
    year: undefined,
    periodicity: undefined,
  });

  // TODO: use another endpoint
  const { isPending, isSuccess, isError } = useFetchMutation("/api/contacts/{id}", "put");

  const [successAlertIsOpen, setSuccessAlertIsOpen] = useState(isSuccess);

  const buttonIsDisabled =
    !fieldsData.id ||
    fieldsData.id?.length === 0 ||
    !fieldsData.idSource ||
    !fieldsData.periodicity ||
    !fieldsData.year;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // await mutateAsync({
    //   body: {  },
    //   urlParams: { id: "" },
    // });
  };
  return (
    <Stack gap={2}>
      {successAlertIsOpen && (
        <Alert
          icon={<CheckCircleOutlineIcon fontSize="inherit" />}
          severity="success"
          onClose={() => {
            setSuccessAlertIsOpen(false);
          }}
        >
          Vous pouvez maintenant répondre à l’enquête TODO DATA pour l’unité enquêtée TODO DATA à partir
          du compte {contact.identifier}
        </Alert>
      )}
      {isError && <Alert severity="error">Un contact principal existe déjà pour ce contact</Alert>}
      <Row spacing={1} pt={1}>
        <InfoOutlinedIcon fontSize="smallIcon" />
        <Typography variant="bodyMedium">
          La sélection de l’identifiant, d’une source, d’un millésime et d’une période est nécessaire
          pour l’ajout de droits
        </Typography>
      </Row>
      <form action="#" onSubmit={onSubmit}>
        <Stack gap={3}>
          <Row gap={8} alignItems={"space-between"}>
            <TextField
              sx={{ minWidth: "260px" }}
              name="id"
              id="id"
              label="Identifiant de l’unité enquêtée"
              variant="outlined"
              size="small"
              onChange={e => setFieldsData({ ...fieldsData, id: e.target.value })}
            />

            <SelectWithOptions
              options={[]}
              value={fieldsData.idSource}
              label={"Source"}
              name={"idSource"}
              onChange={e => setFieldsData({ ...fieldsData, idSource: e.target.value })}
            />
            <SelectWithOptions
              options={[]}
              value={fieldsData.year}
              label={"Millésime"}
              name={"year"}
              onChange={e => setFieldsData({ ...fieldsData, year: e.target.value })}
            />
            <SelectWithOptions
              options={[]}
              value={fieldsData.periodicity}
              label={"Période"}
              name={"periodicity"}
              onChange={e => setFieldsData({ ...fieldsData, periodicity: e.target.value })}
            />
          </Row>
          <Button
            type="submit"
            variant="contained"
            disabled={buttonIsDisabled || isPending}
            sx={{ alignSelf: "flex-end" }}
          >
            Ajouter des droits
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
