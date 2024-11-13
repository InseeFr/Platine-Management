import { Button, Card, Chip, IconButton, Stack, Typography } from "@mui/material";
import { Row } from "../Row.tsx";
import { getCollectStateChipColor } from "./SearchQuestioningTable.tsx";
import AddIcon from "@mui/icons-material/Add";
import { StatusHistory } from "./StatusHistory.tsx";
import { useFetchMutation } from "../../hooks/useFetchQuery.ts";
import { useState } from "react";
import { AddStatusDialog } from "./AddStatusDialog.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { collectStatus } from "../../constants/collectStatus.ts";
import { LastCommunicationHistory } from "./LastComunicationHistory.tsx";

type Props = {
  questioning: any;
};

export const StatesCard = ({ questioning }: Props) => {
  const [openedDialog, toggleDialog] = useState<
    "statusHistory" | "lastCommunicationHistory" | "addStatus" | undefined
  >(undefined);

  const { mutateAsync } = useFetchMutation("/api/questionings/questioning-events", "post");

  const queryClient = useQueryClient();

  const onClose = () => {
    toggleDialog(undefined);
  };

  const onSelectStatus = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const status = formData.get("status")?.toString();

    if (!status) {
      toggleDialog(undefined);
      return;
    }

    await mutateAsync({
      query: {
        id: parseInt(questioning.id),
      },
      body: {
        questioningId: parseInt(questioning.id),
        eventDate: new Date().toISOString(),
        type: status,
        payload: { "source": "platine-gestion" },
      },
    });

    queryClient.invalidateQueries({ queryKey: ["/api/questionings/{id}/questioning-events"] });
    toggleDialog(undefined);
  };

  return (
    <Card sx={{ p: 3 }} elevation={2}>
      <Stack gap={3}>
        <Typography variant={"headlineSmall"} component="h2">
          États
        </Typography>
        <Stack gap={2}>
          <Row justifyContent={"space-between"}>
            <Typography variant="titleSmall" component="h3">
              Statut
            </Typography>
            <Button
              variant="text"
              sx={{ typography: "titleSmall" }}
              onClick={() => toggleDialog("statusHistory")}
            >
              Voir l'historique
            </Button>
          </Row>
          <Row justifyContent={"space-between"}>
            <Row gap={2}>
              {questioning.lastEvent && (
                <Chip
                  sx={{
                    typography: "titleSmall",
                    maxWidth: "14vw",
                    textOverflow: "ellipsis",
                  }}
                  label={
                    collectStatus.find(state => state.value === questioning.lastEvent)?.label ??
                    "Aucun état"
                  }
                  color={getCollectStateChipColor(questioning.lastEvent)}
                />
              )}
              <IconButton
                aria-label="add status"
                color="primary"
                variant="outlined"
                onClick={() => toggleDialog("addStatus")}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Row>
            <Typography variant="bodyMedium">TODO DATA</Typography>
          </Row>
        </Stack>
        {questioning.lastCommunication && (
          <Stack gap={2}>
            <Row justifyContent={"space-between"}>
              <Typography variant="titleSmall" component="h3">
                Dernière communication
              </Typography>
              <Button
                variant="text"
                sx={{ typography: "titleSmall" }}
                onClick={() => toggleDialog("lastCommunicationHistory")}
              >
                Voir l'historique
              </Button>
            </Row>

            <Row justifyContent={"space-between"}>
              <Chip
                sx={{
                  typography: "titleSmall",
                  maxWidth: "14vw",
                  textOverflow: "ellipsis",
                }}
                label={
                  collectStatus.find(state => state.value === questioning.lastCommunication)?.label ??
                  "Aucun état"
                }
                color={getCollectStateChipColor(questioning.lastCommunication)}
              />

              <Typography variant="bodyMedium">TODO DATA</Typography>
            </Row>
          </Stack>
        )}
      </Stack>
      <StatusHistory
        onClose={onClose}
        open={openedDialog === "statusHistory"}
        questioningId={questioning.questioningId}
      />
      <AddStatusDialog onClose={onClose} open={openedDialog === "addStatus"} onSubmit={onSelectStatus} />
      <LastCommunicationHistory onClose={onClose} open={openedDialog === "lastCommunicationHistory"} />
    </Card>
  );
};
