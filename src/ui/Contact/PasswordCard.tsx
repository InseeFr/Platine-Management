import { useState } from "react";
import { Box, Typography } from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password";

import AddIcon from "@mui/icons-material/Add";
import { CardInner } from "./CardInner";
import { GeneralCardContent } from "./GeneralCardContent";
import { FormDialog } from "./FormDialog";
import { theme } from "../../theme";
import { SelectWithOptions } from "../Form/SelectWithOptions.tsx";

export const PasswordCard = () => {
  const [open, setOpen] = useState(false);
  const [optionSelected, setOptionSelected] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setOptionSelected("");
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    console.log(password);
    onClose();
  };

  const options = [
    { label: "email", value: "mail" },
    { label: "téléphone", value: "phone" },
  ]; // TODO: use real options

  const style = {
    root: {
      ".MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.text.secondary,
      },
      ".MuiOutlinedInput-input": {
        fontSize: "16px",
        letterSpacing: "0.5px",
      },
    },
  };
  return (
    <GeneralCardContent
      TitleIconComponent={PasswordIcon}
      title={"Mot de passe"}
      ButtonStartIcon={<AddIcon />}
      buttonLabel={"demande de réinitialisation"}
      CardContent={<CardInner content={<Typography>work in progress</Typography>} />}
      CardDialog={
        <FormDialog
          open={open}
          onCancel={onClose}
          onSubmit={onSubmit}
          title={"Réinitialisation du mot de passe"}
        >
          <Box sx={style.root} pb={1} pt={3} px={6}>
            <SelectWithOptions
              value={optionSelected}
              onChange={e => setOptionSelected(e.target.value)}
              options={options}
              label={"Choisissez le mode d'envoi"}
              name={"password"}
            />
          </Box>
        </FormDialog>
      }
      handleClickOpen={handleClickOpen}
    />
  );
};
