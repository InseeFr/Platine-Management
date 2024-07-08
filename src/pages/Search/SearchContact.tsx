import { Button, Card, Divider, Stack, Typography } from "@mui/material";
import { Breadcrumbs } from "../../ui/Breadcrumbs";
import { theme } from "../../theme";
import { SearchTextField } from "../../ui/SearchTextField";
import { useState } from "react";
import { useInfiniteFetchQuery } from "../../hooks/useFetchQuery";
import { SearchContactTable } from "./SearchContactTable";
import { useSearchFilterParams } from "../../hooks/useSearchFilter";
import { VisibilitySpy } from "../../ui/VisibilitySpy";

const endpoint = "/api/contacts/search" as const;

export const SearchContacts = () => {
  const {
    results: contacts,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useInfiniteFetchQuery(endpoint, {
    query: { ...useSearchFilterParams("contacts"), pageSize: 20, sort: "identifier" },
  });

  //  TODO: search will be used to filter
  // const [search, setSearch] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
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
          searchValue={searchInputValue}
          onSearch={() => {
            // setSearch(searchInputValue);
          }}
          onChange={e => {
            setSearchInputValue(e.target.value);
          }}
          placeholder={"Rechercher par prénom/nom, IDEP, ou adresse email"}
        />
        {!isLoading && (contacts === undefined || contacts.length === 0) ? (
          <EmptyState />
        ) : (
          <>
            <SearchContactTable isLoading={isLoading} contacts={contacts} />
            {hasNextPage && <VisibilitySpy onVisible={fetchNextPage} />}
          </>
        )}
      </Card>
    </Stack>
  );
};

const EmptyState = () => {
  return (
    <Stack
      mt={3}
      sx={{
        border: `1px solid ${theme.palette.border.default}`,
        height: "30vh",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="titleSmall" color={theme.palette.text.tertiary}>
        Aucun contact trouvé.
      </Typography>
      <Button variant="outlined" sx={{ width: "fit-content" }}>
        Effacer les filtres
      </Button>
    </Stack>
  );
};
