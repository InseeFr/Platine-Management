import { Card, IconButton, Stack, Tabs } from "@mui/material";
import { CardtitleWithIcon } from "../CardtitleWithIcon.tsx";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";

import { Row } from "../Row.tsx";
import { useToggle } from "react-use";
import { SyntheticEvent, useState } from "react";
import { PageTab } from "../PageTab.tsx";
import { theme } from "../../theme.tsx";
import { CommentsList } from "../SurveyUnit/SurveyUnitCommentsCard.tsx";
import { QuestioningCommentDialog } from "./QuestioningCommentDialog.tsx";
import { useFetchMutation } from "../../hooks/useFetchQuery.ts";
import { useQueryClient } from "@tanstack/react-query";
import { useMaybeUser } from "../../hooks/useAuth.ts";

type Props = {
  questioning: any;
};

enum Tab {
  Questioning = "Questioning",
  SurveyUnit = "SurveyUnit",
}

const TabNames = {
  [Tab.Questioning]: "Interrogation",
  [Tab.SurveyUnit]: "Unité enquêtée",
};

export const QuestioningCommentsCard = ({ questioning }: Props) => {
  const [hasDialog, toggleDialog] = useToggle(false);
  const [currentTab, setCurrentTab] = useState(Tab.Questioning);

  const user = useMaybeUser();
  const queryClient = useQueryClient();
  const { mutateAsync: mutateAsyncSurveyUnit, isPending: isPendingSU } = useFetchMutation(
    "/api/survey-units/{id}/comment",
    "post",
  );

  const handleChangeTab = (_: SyntheticEvent, newValue: Tab) => {
    setCurrentTab(newValue);
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const comment = formData.get("comment")?.toString();
    const category = formData.get("category");

    if (!comment) {
      return;
    }

    if (category === "SurveyUnit") {
      await mutateAsyncSurveyUnit({
        body: {
          comment,
          author: `${user?.given_name} ${user?.family_name}`,
        },
        urlParams: { id: questioning.idSu },
      });

      queryClient.invalidateQueries({ queryKey: ["/api/survey-units/{id}"] });
    }
    //  TODO: add api call for questioning comments and call invalidateQueries for getQuestioningById

    toggleDialog();
  };

  return (
    <Card sx={{ p: 3 }} elevation={2}>
      <Row gap={2} justifyContent={"space-between"}>
        <CardtitleWithIcon IconComponent={ModeCommentOutlinedIcon} title={"Commentaires"} />
        <IconButton onClick={toggleDialog}>
          <AddCommentOutlinedIcon color="primary" fontSize="navigateIcon" />
        </IconButton>
      </Row>
      <Stack sx={{ border: `1px solid ${theme.palette.border.default}`, borderRadius: "4px", mt: 2 }}>
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{ borderBottom: `1px solid ${theme.palette.border.default}` }}
        >
          {Object.keys(Tab).map(k => (
            <PageTab key={k} value={k} label={TabNames[k]} />
          ))}
        </Tabs>
        <Stack sx={{ py: 2, px: 1 }} gap={0.5}>
          {currentTab === Tab.Questioning && (
            <CommentsList comments={questioning.questioningComments} sx={{ px: 2.5 }} />
          )}
          {currentTab === Tab.SurveyUnit && (
            <CommentsList comments={questioning.surveyUnitComments} sx={{ px: 2.5 }} />
          )}
        </Stack>
      </Stack>
      <QuestioningCommentDialog
        open={hasDialog}
        defaultCategory={currentTab}
        // TODO: add isPendingQuestioning
        isPending={isPendingSU}
        onCancel={toggleDialog}
        onSubmit={handleSave}
      />
    </Card>
  );
};
