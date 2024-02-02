import { Typography } from "@mui/material";
import { CardInner } from "./CardInner";
import { GeneralCardContent } from "./GeneralCardContent";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { FormDialog } from "./FormDialog";

export const CommentsCard = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    console.log(formJson);
    handleClose();
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
      handleClickOpen={handleClickOpen}
      CardDialog={
        <FormDialog
          open={open}
          handleClose={handleClose}
          onSubmit={onSubmit}
          title={"Ajouter un commentaire"}
          form={<Typography>form</Typography>}
          primaryButtonLabel={"Ajouter"}
          secondaryButtonLabel={"Annuler"}
        />
      }
    />
  );
};
