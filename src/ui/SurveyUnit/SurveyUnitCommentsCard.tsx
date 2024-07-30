import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { CardtitleWithIcon } from "../CardtitleWithIcon.tsx";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import { Row } from "../Row.tsx";
import IconButton from "@mui/material/IconButton";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import { CardInner } from "../Contact/CardInner.tsx";
import Typography from "@mui/material/Typography";
import { theme } from "../../theme.tsx";
import { List } from "@mui/material";
import { useToggle } from "react-use";
import { CommentDialog } from "../CommentDialog.tsx";

const commentsMock = ["Comment 1", "Comment 2", "Comment 3", "Comment 4", "Comment 5"];

export const SurveyUnitCommentsCard = () => {
  const [hasDialog, toggleDialog] = useToggle(false);

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const comment = formData.get("comment");
    console.log(comment);
    toggleDialog();
  };

  return (
    <Card sx={{ p: 3, pt: 4, width: "50%", minWidth: "fit-content" }} elevation={2}>
      <Stack>
        <Row gap={2} justifyContent={"space-between"}>
          <CardtitleWithIcon
            IconComponent={ModeCommentOutlinedIcon}
            title={"Commentaires sur l’unité enquêtée"}
          />
          <IconButton onClick={toggleDialog}>
            <AddCommentOutlinedIcon color="primary" fontSize="navigateIcon" />
          </IconButton>
        </Row>
        {commentsMock.length > 0 && (
          <List
            sx={{
              mt: 2,
              minHeight: "fit-content",
              maxHeight: "30vh",
              overflowY: "scroll",
              scrollbarColor: `${theme.palette.primary.main} ${theme.palette.border.default}`,
            }}
          >
            <Stack gap={1} pr={3}>
              {/* Todo add real comments */}
              {commentsMock.map(comment => (
                <CardInner key={comment} content={<Typography>{comment}</Typography>} />
              ))}
            </Stack>
          </List>
        )}
      </Stack>
      <CommentDialog open={hasDialog} onCancel={toggleDialog} onSubmit={handleSave} />
    </Card>
  );
};
