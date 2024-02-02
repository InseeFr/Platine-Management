import { useState } from "react";
import { Typography } from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password";

import AddIcon from "@mui/icons-material/Add";
import { CardInner } from "./CardInner";
import { GeneralCardContent } from "./GeneralCardContent";
import { FormDialog } from "./FormDialog";


export const PasswordCard = () => {
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
      TitleIconComponent={PasswordIcon}
      title={"Mot de passe"}
      ButtonStartIcon={<AddIcon />}
      buttonLabel={"demande de réinitialisation"}
      CardContent={<CardInner content={<Typography>content</Typography>} />}
      CardDialog={
        <FormDialog
          open={open}
          handleClose={handleClose}
          onSubmit={onSubmit}
          title={"Réinitialisation du mot de passe"}
          form={<Typography>form</Typography>}
          primaryButtonLabel={"Envoyer"}
          secondaryButtonLabel={"Annuler"}
        />
      }
      handleClickOpen={handleClickOpen}
    />
  );
};
