import Box from "@mui/material/Box";
import { ContactCard } from "./ContactCard";
import { FilterListToggleButton } from "../FilterListToggleButton";
import { Stack } from "@mui/material";
import { FilterListBySelector } from "../FilterListBySelector";
import { Row } from "../../ui/Row";

// type ContactsListProps = {};

export const ContactsList = () => {
  return (
    <Stack spacing={2}>
      <Row justifyContent={"space-between"}>
        <FilterListToggleButton
          firstOption={"Mes contacts"}
          secondOption={"Tout"}
          handleChange={selectedOption => console.log(selectedOption)}
        />
        <FilterListBySelector />
      </Row>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          columnGap: "24px",
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
