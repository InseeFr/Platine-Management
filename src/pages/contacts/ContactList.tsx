import Box from "@mui/material/Box";
import { ContactCard } from "./ContactCard";
import { FilterListToggleButton } from "../FilterListToggleButton";
import { Stack, Grid } from "@mui/material";
import { FilterListBySelector } from "../FilterListBySelector";
import { Row } from "../../ui/Row";
import { useFetchQuery } from "../../hooks/useFetchQuery.ts";

// type ContactsListProps = {};

export const ContactsList = () => {
  const { data } = useFetchQuery("/api/contacts");
  const contacts = data?.content ?? [];
  return (
    <Stack spacing={2}>
      <Row justifyContent={"space-between"}>
        <FilterListToggleButton
          options={["contacts", "all"]}
          handleChange={selectedOption => console.log(selectedOption)}
        />
        <FilterListBySelector />
      </Row>
      <Grid
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          minHeight: 0,
          overflow: "auto",
          // Offset the scrollbar out of the container
          width: "calc(100% + .5rem)",
          paddingRight: ".5rem",
        }}
        gap={3}
      >
        {contacts.map(c => (
          <ContactCard
            key={c.identifier}
            identifier={c.identifier}
            firstname={c.firstName}
            lastname={c.lastName}
            cityName={c.address.cityName}
            phone={c.phone}
            email={c.email}
            functionContact={c.function}
          />
        ))}
      </Grid>
    </Stack>
  );
};
