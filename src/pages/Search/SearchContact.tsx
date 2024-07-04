import { Card, Divider, Stack, Typography } from "@mui/material";
import { Breadcrumbs } from "../../ui/Breadcrumbs";
import { theme } from "../../theme";
import { SearchTextField } from "../../ui/SearchTextField";
import { useState } from "react";
import { useFetchQuery } from "../../hooks/useFetchQuery";
import { SearchContactTable } from "./SearchContactTable";

export const SearchContacts = () => {
  const { data, isLoading } = useFetchQuery("/api/contacts/search");

  const [search, setSearch] = useState("");

  const breadcrumbs = [{ href: "/", title: "Accueil" }, "Contacts"];

  return (
    <Stack>
      <Stack px={6} py={3} sx={{ backgroundColor: theme.palette.Surfaces.Secondary }}>
        <Breadcrumbs items={breadcrumbs} />
        <Typography variant="headlineLarge">Contacts</Typography>
      </Stack>
      <Divider variant="fullWidth" />
      <Card sx={{ mx: 5, my: 3, p: 5 }} elevation={2}>
        <SearchTextField
          searchValue={search}
          onSearch={e => {
            setSearch(e.target.value);
          }}
          placeholder={"Rechercher par prénom/nom, IDEP, ou adresse email"}
        />
        <SearchContactTable isLoading={isLoading} contacts={data?.content} />
      </Card>
    </Stack>
  );
};
