import { Typography } from "@mui/material";
import { CardInner } from "./CardInner";
import { GeneralCardContent } from "./GeneralCardContent";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { CommentDialog } from "./CommentDialog";

export const CommentsCard = () => {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const comment = formData.get("comment");
    console.log(comment);
    onClose();
  };

  return (
    <GeneralCardContent
      TitleIconComponent={ModeCommentOutlinedIcon}
      title={"Commentaires"}
      ButtonStartIcon={<AddIcon />}
      buttonLabel={"Ajouter un commentaire"}
      CardContent={<CardInner content={<Typography>content</Typography>} hasAction={true} />}
      seeMoreLabel="Voir plus de commentaires"
      seeMoreContent={<CardInner content={<Typography>autre content</Typography>} hasAction={true} />}
      handleClickOpen={onOpen}
      CardDialog={<CommentDialog open={open} onCancel={onClose} onSubmit={onSubmit} />}
    />
  );
};
