import { Button, Card, Chip, IconButton, Stack, Typography } from "@mui/material";
import { Row } from "../Row.tsx";
import { getCollectStateChipColor } from "./SearchQuestioningTable.tsx";
import AddIcon from "@mui/icons-material/Add";
import { StatusHistory } from "./StatusHistory.tsx";
import { useFetchMutation } from "../../hooks/useFetchQuery.ts";
import { useState } from "react";
import { AddStatusDialog } from "./AddStatusDialog.tsx";
import { collectStatus } from "../../constants/collectStatus.ts";
import { LastCommunicationHistory } from "./LastComunicationHistory.tsx";
import { APISchemas } from "../../types/api.ts";
import { communicationsList } from "../../constants/communications.ts";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import { CardtitleWithIcon } from "../CardtitleWithIcon.tsx";

type Props = {
  questioning: APISchemas["QuestioningDetailsDto"];
  refetch: () => void;
};

export const StatesCard = ({ questioning, refetch }: Props) => {
  const [openedDialog, toggleDialog] = useState<
    "statusHistory" | "lastCommunicationHistory" | "addStatus" | "closed"
  >("closed");

  const { mutateAsync } = useFetchMutation("/api/questionings/questioning-events", "post");

  const onClose = () => {
    toggleDialog("closed");
  };

  const onSelectStatus = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const status = formData.get("status")?.toString();

    if (!status) {
      toggleDialog("closed");
      return;
    }

    await mutateAsync({
      query: {
        id: questioning.questioningId!,
      },
      body: {
        questioningId: questioning.questioningId,
        eventDate: new Date().toISOString(),
        type: status,
        payload: { "source": "platine-gestion" },
      },
    });
    refetch();
    toggleDialog("closed");
  };

  return (
    <Card sx={{ p: 3 }} elevation={2}>
      <Stack gap={3}>
        <CardtitleWithIcon IconComponent={LabelOutlinedIcon} title={"États"} />
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
            {questioning.dateLastEvent && <FormattedDate date={questioning.dateLastEvent} />}
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
                  communicationsList.find(com => com.value === questioning.lastCommunication)?.label ??
                  "Aucun état"
                }
              />
              {questioning.dateLastCommunication && (
                <FormattedDate date={questioning.dateLastCommunication} />
              )}
            </Row>
          </Stack>
        )}
      </Stack>
      <StatusHistory
        onClose={onClose}
        open={openedDialog === "statusHistory"}
        questioning={questioning}
      />
      <AddStatusDialog onClose={onClose} open={openedDialog === "addStatus"} onSubmit={onSelectStatus} />
      <LastCommunicationHistory
        onClose={onClose}
        open={openedDialog === "lastCommunicationHistory"}
        questioning={questioning}
      />
    </Card>
  );
};

const FormattedDate = ({ date }: { date: string }) => {
  return <Typography variant="bodyMedium">{new Date(Date.parse(date)).toLocaleDateString()}</Typography>;
};
