import { useState } from "react";
import { Typography } from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password";

import AddIcon from "@mui/icons-material/Add";
import { PasswordDialog } from "./PasswordDialog";
import { CardInner } from "./CardInner";
import { GeneralCardContent } from "./GeneralCardContent";

type Props = {};

export const PasswordCard = ({}: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <GeneralCardContent
      TitleIconComponent={PasswordIcon}
      title={"Mot de passe"}
      ButtonStartIcon={<AddIcon />}
      buttonLabel={"demande de réinitialisation"}
      CardContent={<CardInner content={<Typography>content</Typography>} />}
      CardDialog={<PasswordDialog open={open} handleClose={handleClose} />}
      handleClickOpen={handleClickOpen}
    />
  );
};
