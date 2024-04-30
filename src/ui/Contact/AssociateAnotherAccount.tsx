import TextField from "@mui/material/TextField";
import { APISchemas } from "../../types/api";
import { Row } from "../Row";
import { useState } from "react";
import { useFetchMutation, useFetchQuery } from "../../hooks/useFetchQuery";
import Button from "@mui/material/Button";
import { Alert, Stack, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

type Props = {
  contact: APISchemas["ContactFirstLoginDto"];
};

export const AssociateAnotherAccount = ({ contact }: Props) => {
  const [searchId, setSearchId] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  // TODO: use correct endpoint
  const { isSuccess } = useFetchQuery("/api/contacts/{id}", {
    urlParams: {
      id: searchId,
    },
  });

  // TODO: use correct endpoint
  const { isPending, isSuccess: isSuccessAssociate } = useFetchMutation("/api/contacts/{id}", "put");

  const [alertIsOpen, setAlertIsOpen] = useState(isSuccessAssociate);

  const onSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const id = data.get("id")?.toString();

    setSearchId(id!);
  };

  const onAssociate = async () => {
    // TODO: update account
    // await mutateAsync({
    //     body: { associateId: searchId },
    //     urlParams: { id: contact.identifier },
    //   });
  };

  return (
    <Stack spacing={3}>
      {alertIsOpen && (
        <Alert
          icon={<CheckCircleOutlineIcon fontSize="inherit" />}
          severity="success"
          onClose={() => {
            setAlertIsOpen(false);
          }}
        >
          Le compte {searchId} a bien été rattaché au compte {contact.identifier}
        </Alert>
      )}
      <form action="#" onSubmit={onSearch}>
        <Row spacing={5} alignItems={"flex-start"}>
          <TextField
            error={!isSuccess && searchId.length > 0}
            helperText={
              !isSuccess && searchId.length > 0 && "L’identifiant n’est pas correct/n’existe pas"
            }
            name="id"
            id="id"
            label="Identifiant à associer"
            variant="outlined"
            size="small"
            onChange={e => setIsDisabled(e.currentTarget.value.length === 0)}
          />
          <Button type="submit" variant="contained" disabled={isDisabled}>
            Rechercher
          </Button>
        </Row>
      </form>
      {isSuccess && searchId.length > 0 && (
        <Stack gap={4}>
          <Typography>
            Souhaitez-vous associer le compte {searchId} au compte {contact.identifier} ?
          </Typography>
          <Row gap={2}>
            <Button variant="outlined" onClick={() => setSearchId("")}>
              Annuler
            </Button>
            <Button variant="contained" onClick={onAssociate} disabled={isPending}>
              Associer
            </Button>
          </Row>
        </Stack>
      )}
    </Stack>
  );
};
