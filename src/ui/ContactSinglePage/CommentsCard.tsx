import { Typography } from "@mui/material";
import { CardInner } from "./CardInner";
import { GeneralCardContent } from "./GeneralCardContent";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { CommentsDialog } from "./CommentsDialog";

type Props = {};

export const CommentsCard = ({}: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <GeneralCardContent
      TitleIconComponent={ModeCommentOutlinedIcon}
      title={"Commentaires"}
      ButtonStartIcon={<AddIcon />}
      buttonLabel={"Ajouter un commentaire"}
      CardDialog={<CommentsDialog open={open} handleClose={handleClose} />}
      CardContent={<CardInner content={<Typography>content</Typography>} />}
      seeMoreLabel="Voir plus de commentaires"
      seeMoreContent={<CardInner content={<Typography>autre content</Typography>} />}
      handleClickOpen={handleClickOpen}
    />
  );
};
