import { Stack, Typography } from "@mui/material";
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
import { useNavigate } from "react-router-dom";
import { SearchContactFilter } from "../../ui/Contact/SearchContactFilter.tsx";
import { EmptyState } from "../../ui/Contact/EmptyState.tsx";

const endpoint = "/api/contacts/search";

export const SearchContacts = () => {
  const navigate = useNavigate();
  const breadcrumbs = [{ href: "/", title: "Accueil" }, "Contacts"];

  const { contacts: contactsFilter } = useGetSearchFilter();
  const [submittedValue, setSubmittedValue] = useState(contactsFilter.search);
  const [submittedType, setSubmittedType] = useState(contactsFilter.searchType);
  const [isSearching, setIsSearching] = useState(false);

  const {
    results: contacts,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isSuccess,
  } = useInfiniteFetchQuery(
    endpoint,
    {
      query: { ...useSearchFilterParams("contacts"), pageSize: 20, sort: "identifier" },
    },
    !!contactsFilter.search,
  );

  const { onSubmit, onReset, inputProps, value, onChangeSearchType } = useSearchForm(
    "contacts",
    contactsFilter,
  );

  const handleSubmit: FormEventHandler = e => {
    setSubmittedValue(value.search);
    setSubmittedType(value.searchType);
    setIsSearching(true);
    onSubmit(e);
  };

  const handleReset: FormEventHandler = e => {
    setSubmittedValue("");
    setSubmittedType("");
    onReset(e);
  };

  const isResetButton =
    submittedValue === value.search && value.search !== "" && submittedType === value.searchType;

  const hasNoContact =
    !isLoading && contactsFilter.search && (contacts === undefined || contacts.length === 0);

  if ((!contacts || contacts.length === 0) && !isSuccess && !isLoading) {
    return (
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <Stack px={6} py={3} sx={{ backgroundColor: theme.palette.Surfaces.Secondary }}>
          <Breadcrumbs items={breadcrumbs} />
          <Typography variant="headlineLarge">
            Rechercher un contact par Idep, Prénom/Nom ou email
          </Typography>
        </Stack>

        <Stack sx={{ my: 3, px: 5 }} gap={3} alignItems={"center"}>
          <SearchContactFilter
            isResetButton={isResetButton}
            inputProps={inputProps}
            sx={{ width: "50vw", height: "50vh", minWidth: "700px" }}
          />
        </Stack>
      </form>
    );
  }

  if (contacts.length === 1 && isSearching) {
    navigate(`/contacts/${contacts[0].identifier}`);
    setIsSearching(false);
  }

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <Stack px={6} py={3} gap={2} sx={{ backgroundColor: theme.palette.Surfaces.Secondary }}>
        <Stack>
          <Breadcrumbs items={breadcrumbs} />
          <Typography variant="headlineLarge">
            Rechercher un contact par Idep, Prénom/Nom ou email
          </Typography>
        </Stack>
        <SearchContactFilter isResetButton={isResetButton} inputProps={inputProps} />
      </Stack>

      <Stack sx={{ my: 3, px: 5 }} gap={3}>
        {submittedValue && hasNoContact && (
          <EmptyState
            onChangeSearchType={onChangeSearchType}
            searchType={contactsFilter.searchType}
            search={contactsFilter.search}
          />
        )}
        {submittedValue && !hasNoContact && (
          <SearchContactTable
            isLoading={isLoading}
            contacts={contacts}
            hasNextPage={hasNextPage}
            onVisible={fetchNextPage}
          />
        )}
      </Stack>
    </form>
  );
};
