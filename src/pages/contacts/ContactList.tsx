import { ContactCard } from "./ContactCard";
import { Stack, Grid } from "@mui/material";
import { FilterListBySelector } from "../../ui/Search/FilterListBySelector.tsx";
import { Row } from "../../ui/Row";
import { useFetchQuery } from "../../hooks/useFetchQuery.ts";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { useState } from "react";

export const ContactsList = () => {
  const { data } = useFetchQuery("/api/contacts");
  const contacts = data?.content ?? [];
  const [tab, setTab] = useState("me");
  return (
    <Stack spacing={3} sx={{ minHeight: 0 }}>
      <Row justifyContent={"space-between"}>
        <ToggleButtonGroup value={tab} exclusive onChange={(_, v) => setTab(v)}>
          <ToggleButton value="me" aria-label="left aligned">
            Mes contacts
          </ToggleButton>
          <ToggleButton value="all" aria-label="left aligned">
            Tout
          </ToggleButton>
        </ToggleButtonGroup>
        <FilterListBySelector />
      </Row>

      <Grid
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          paddingBottom: 2,
          // Make the element scrollable
          minHeight: 0,
          overflow: "auto",
          // Offset the scrollbar out of the container
          width: "calc(100% + .5rem)",
          paddingRight: ".5rem",
        }}
        gap={3}
      >
        {contacts.map(c => (
          <div key={c.identifier}>
            {/* This div prevent card from behing resized by the grid */}
            <ContactCard
              identifier={c.identifier}
              firstname={c.firstName}
              lastname={c.lastName}
              cityName={c.address.cityName}
              phone={c.phone}
              email={c.email}
              functionContact={c.function}
            />
          </div>
        ))}
      </Grid>
    </Stack>
  );
};
