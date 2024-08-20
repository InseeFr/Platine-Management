import Card from "@mui/material/Card";
import Stack, { StackProps } from "@mui/material/Stack";
import { CardtitleWithIcon } from "../CardtitleWithIcon.tsx";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import { Row } from "../Row.tsx";
import IconButton from "@mui/material/IconButton";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import Typography from "@mui/material/Typography";
import { theme } from "../../theme.tsx";
import { List } from "@mui/material";
import { useToggle } from "react-use";
import { CommentDialog } from "../CommentDialog.tsx";
import { useMaybeUser } from "../../hooks/useAuth.ts";
import { useFetchMutation } from "../../hooks/useFetchQuery.ts";
import { useQueryClient } from "@tanstack/react-query";
import { APISchemas } from "../../types/api.ts";

type Props = {
  surveyUnit: APISchemas["SurveyUnitDetailsDto"];
};

export const SurveyUnitCommentsCard = ({ surveyUnit }: Props) => {
  const user = useMaybeUser();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useFetchMutation("/api/survey-units/{id}/comment", "post");

  const [hasDialog, toggleDialog] = useToggle(false);

  const comments = surveyUnit.comments
    ? surveyUnit.comments.sort((a, b) => b.commentDate!.localeCompare(a.commentDate!))
    : [];

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const comment = formData.get("comment")?.toString();

    if (!comment) {
      return;
    }

    await mutateAsync({
      body: {
        comment,
        author: user?.preferred_username,
      },
      urlParams: { id: surveyUnit.idSu },
    });

    queryClient.invalidateQueries({ queryKey: ["/api/survey-units/{id}"] });

    toggleDialog();
  };

  return (
    <Card sx={{ p: 3, width: "50%", minWidth: "fit-content" }} elevation={2}>
      <Stack gap={2}>
        <Row gap={2} justifyContent={"space-between"}>
          <CardtitleWithIcon
            IconComponent={ModeCommentOutlinedIcon}
            title={"Commentaires sur l’unité enquêtée"}
          />
          <IconButton onClick={toggleDialog}>
            <AddCommentOutlinedIcon color="primary" fontSize="navigateIcon" />
          </IconButton>
        </Row>
        <CommentsList comments={comments} sx={{ pr: 3 }} />
      </Stack>
      <CommentDialog
        open={hasDialog}
        isPending={isPending}
        onCancel={toggleDialog}
        onSubmit={handleSave}
      />
    </Card>
  );
};

type CommentType = {
  comments: {
    comment?: string;
    author?: string;
    commentDate?: string;
  }[];
} & Pick<StackProps, "sx">;

export const CommentsList = ({ comments, sx }: CommentType) => {
  return (
    comments.length > 0 && (
      <List
        sx={{
          minHeight: "fit-content",
          maxHeight: "30vh",
          overflowY: "scroll",
          scrollbarColor: `${theme.palette.primary.main} ${theme.palette.border.default}`,
        }}
      >
        <Stack gap={1} sx={sx}>
          {comments.map(c => (
            <Card sx={{ pl: 2, py: 2, backgroundColor: "#EBEFF5" }} elevation={0} key={c.commentDate}>
              <Stack gap={1}>
                <Typography variant="titleSmall">{c.comment}</Typography>
                {c.commentDate ? (
                  <Typography variant="itemSmall">
                    {`${c.author} - ${new Date(Date.parse(c.commentDate)).toLocaleDateString()} `}
                  </Typography>
                ) : (
                  <Typography variant="itemSmall">{c.author}</Typography>
                )}
              </Stack>
            </Card>
          ))}
        </Stack>
      </List>
    )
  );
};
