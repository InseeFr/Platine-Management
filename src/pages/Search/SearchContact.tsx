import { Divider, Stack, Typography } from "@mui/material";
import { Breadcrumbs } from "../../ui/Breadcrumbs.tsx";
import { theme } from "../../theme.tsx";
import { FormEventHandler, useState } from "react";
import { useInfiniteFetchQuery } from "../../hooks/useFetchQuery.ts";
import { SearchContactTable } from "../../ui/Contact/SearchContactTable.tsx";
import {
  useGetSearchFilter,
  useSearchFilterParams,
  useSearchForm,
} from "../../hooks/useSearchFilter.ts";
import { EmptyState } from "../../ui/TableComponents.tsx";
import { SearchTextField } from "../../ui/SearchTextField.tsx";

const endpoint = "/api/contacts/search";

export const SearchContacts = () => {
  const breadcrumbs = [{ href: "/", title: "Accueil" }, "Contacts"];

  const {
    results: contacts,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useInfiniteFetchQuery(endpoint, {
    query: { param: useSearchFilterParams("contacts").search, pageSize: 20, sort: "identifier" },
  });

  const { contacts: contactsFilter } = useGetSearchFilter();
  const [valueSubmitted, setValueSubmitted] = useState(contactsFilter.search);

  const { onSubmit, onReset, inputProps, value } = useSearchForm("contacts", contactsFilter);

  const handleSubmit: FormEventHandler = e => {
    setValueSubmitted(value.search);
    onSubmit(e);
  };

  const handleReset: FormEventHandler = e => {
    setValueSubmitted("");
    onReset(e);
  };

  const isResetButton = valueSubmitted === value.search && value.search !== "";

  const hasNoContact = !isLoading && (contacts === undefined || contacts.length === 0);

  return (
    <Stack>
      <Stack px={6} py={3} sx={{ backgroundColor: theme.palette.Surfaces.Secondary }}>
        <Breadcrumbs items={breadcrumbs} />
        <Typography variant="headlineLarge">Contacts</Typography>
      </Stack>
      <Divider variant="fullWidth" />
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <Stack sx={{ my: 3, px: 5 }} gap={3}>
          <SearchTextField
            isResetButton={isResetButton}
            label={"Rechercher par prénom/nom, IDEP, ou adresse email"}
            inputProps={inputProps}
          />
          {hasNoContact ? (
            <EmptyState
              isFiltered={isResetButton}
              onReset={handleReset}
              text={"Aucun contact trouvé."}
            />
          ) : (
            <SearchContactTable
              isLoading={isLoading}
              contacts={contacts}
              hasNextPage={hasNextPage}
              onVisible={fetchNextPage}
            />
          )}
        </Stack>
      </form>
    </Stack>
  );
};
