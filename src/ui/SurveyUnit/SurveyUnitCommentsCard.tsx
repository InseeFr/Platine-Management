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

export const SurveyUnitCommentsCard = () => {
  return (
    <Card sx={{ p: 3, pt: 4, width: "50%" }} elevation={2}>
      <Stack gap={2}>
        <Row justifyContent={"space-between"}>
          <CardtitleWithIcon
            IconComponent={ModeCommentOutlinedIcon}
            title={"Commentaires sur l’unité enquêtée"}
          />
          <IconButton>
            <AddCommentOutlinedIcon color="primary" fontSize="navigateIcon" />
          </IconButton>
        </Row>
        <List
          sx={{
            height: "30vh",
            overflowY: "scroll",
            scrollbarColor: `${theme.palette.primary.main} ${theme.palette.border.default}`,
          }}
        >
          <Stack gap={1} pr={3}>
            {/* Todo use real comments */}
            <CardInner content={<Typography>Comment 1</Typography>} />
            <CardInner content={<Typography>Comment 2</Typography>} />
            <CardInner content={<Typography>Comment 3</Typography>} />
            <CardInner content={<Typography>Comment 4</Typography>} />
            <CardInner content={<Typography>Comment 5</Typography>} />
          </Stack>
        </List>
      </Stack>
    </Card>
  );
};
