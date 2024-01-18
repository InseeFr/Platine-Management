import Box from "@mui/material/Box";
import { ContactCard } from "./ContactCard";
import { FilterListToggleButton } from "../FilterListToggleButton";
import { Stack } from "@mui/material";
import { FilterListBySelector } from "../FilterListBySelector";

// type ContactsListProps = {};

export const ContactsList = () => {
  return (
    <Stack display={"flex"} flexDirection={"column"} spacing={"16px"}>
      <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <FilterListToggleButton
          firstOption={"Mes contacts"}
          secondOption={"Tout"}
          handleChange={selectedOption => console.log(selectedOption)}
        />
        <FilterListBySelector />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          rowGap: "29px",
          columnGap: "26px",
          height: "calc(100vh - 230px)",
          overflow: "auto",
        }}
      >
        <ContactCard
          identifier={"MVIL001"}
          firstname={"Jeanne"}
          lastname={"MARTIN"}
          cityName={"Ville"}
          phone={"06 27 58 32 04"}
          email={"nom.prénom@gmail.com"}
          functionContact={"Fonction"}
        />
        <ContactCard
          identifier={"MVIL002"}
          firstname={"Louis"}
          lastname={"PENCOLE"}
          cityName={"Ville"}
          phone={"06 27 58 32 04"}
          email={"nom.prénom@gmail.com"}
          functionContact={"Fonction"}
        />
        <ContactCard
          identifier={"MVIL001"}
          firstname={"Jeanne"}
          lastname={"MARTIN"}
          cityName={"Ville"}
          phone={"06 27 58 32 04"}
          email={"nom.prénom@gmail.com"}
          functionContact={"Fonction"}
        />
        <ContactCard
          identifier={"MVIL001"}
          firstname={"Jeanne"}
          lastname={"MARTIN"}
          cityName={"Ville"}
          phone={"06 27 58 32 04"}
          email={"nom.prénom@gmail.com"}
          functionContact={"Fonction"}
        />
        <ContactCard
          identifier={"MVIL001"}
          firstname={"Jeanne"}
          lastname={"MARTIN"}
          cityName={"Ville"}
          phone={"06 27 58 32 04"}
          email={"nom.prénom@gmail.com"}
          functionContact={"Fonction"}
        />
        <ContactCard
          identifier={"MVIL001"}
          firstname={"Jeanne"}
          lastname={"MARTIN"}
          cityName={"Ville"}
          phone={"06 27 58 32 04"}
          email={"nom.prénom@gmail.com"}
          functionContact={"Fonction"}
        />
        <ContactCard
          identifier={"MVIL001"}
          firstname={"Jeanne"}
          lastname={"MARTIN"}
          cityName={"Ville"}
          phone={"06 27 58 32 04"}
          email={"nom.prénom@gmail.com"}
          functionContact={"Fonction"}
        />
        <ContactCard
          identifier={"MVIL001"}
          firstname={"Jeanne"}
          lastname={"MARTIN"}
          cityName={"Ville"}
          phone={"06 27 58 32 04"}
          email={"nom.prénom@gmail.com"}
          functionContact={"Fonction"}
        />
        <ContactCard
          identifier={"MVIL001"}
          firstname={"Jeanne"}
          lastname={"MARTIN"}
          cityName={"Ville"}
          phone={"06 27 58 32 04"}
          email={"nom.prénom@gmail.com"}
          functionContact={"Fonction"}
        />
        <ContactCard
          identifier={"MVIL001"}
          firstname={"Jeanne"}
          lastname={"MARTIN"}
          cityName={"Ville"}
          phone={"06 27 58 32 04"}
          email={"nom.prénom@gmail.com"}
          functionContact={"Fonction"}
        />
        <ContactCard
          identifier={"MVIL001"}
          firstname={"Jeanne"}
          lastname={"MARTIN"}
          cityName={"Ville"}
          phone={"06 27 58 32 04"}
          email={"nom.prénom@gmail.com"}
          functionContact={"Fonction"}
        />
      </Box>
    </Stack>
  );
};
