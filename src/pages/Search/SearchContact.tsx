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
import { useNavigate } from "react-router-dom";
import { SearchFilters } from "../../ui/Search/SearchFilters.tsx";
import { SearchContactEmptyState } from "../../ui/Search/SearchContactEmptyState.tsx";

const endpoint = "/api/contacts/search";

const options = [
  { label: "Identifiant de connexion", value: "identifier" },
  { label: "Prénom et/ou Nom", value: "name" },
  { label: "Email", value: "email" },
];

export const SearchContacts = () => {
  const navigate = useNavigate();
  const breadcrumbs = [{ href: "/", title: "Accueil" }, "Contacts"];

  const { contacts: contactsFilter } = useGetSearchFilter();
  const [submittedValue, setSubmittedValue] = useState(contactsFilter);

  // isRedirected determines whether or not to redirect when there is only one result
  const [isRedirected, setIsRedirected] = useState(false);

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
    !!contactsFilter.searchParam,
  );

  const { onSubmit, onReset, inputProps, value, onChangeSearchType } = useSearchForm(
    "contacts",
    contactsFilter,
  );

  const handleSubmit: FormEventHandler = e => {
    setSubmittedValue(value);
    setIsRedirected(true);
    onSubmit(e);
  };

  const handleReset: FormEventHandler = e => {
    setSubmittedValue({ searchType: "", searchParam: "" });
    onReset(e);
  };

  const isResetButton =
    submittedValue.searchParam === value.searchParam &&
    value.searchParam !== "" &&
    submittedValue.searchType === value.searchType;

  const hasNoContact =
    !isLoading && contactsFilter.searchParam && (contacts === undefined || contacts.length === 0);

  const textFieldLabel = getTextFieldLabel(value.searchType);

  if ((!contacts || contacts.length === 0) && !isSuccess && !isLoading) {
    return (
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <Stack px={6} py={3} sx={{ backgroundColor: theme.palette.Surfaces.Secondary }}>
          <Breadcrumbs items={breadcrumbs} />
          <Typography variant="headlineLarge">
            Rechercher un contact par identifiant de connexion, Prénom/Nom ou email
          </Typography>
        </Stack>
        <Divider variant="fullWidth" />

        <Stack sx={{ my: 3, px: 5 }} gap={3} alignItems={"center"}>
          <SearchFilters
            isResetButton={isResetButton}
            inputProps={inputProps}
            options={options}
            textFieldLabel={textFieldLabel}
            sx={{ width: "50vw", height: "50vh", minWidth: "700px" }}
          />
        </Stack>
      </form>
    );
  }

  if (contacts.length === 1 && isRedirected) {
    navigate(`/contacts/${contacts[0].identifier}`);
    setIsRedirected(false);
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
        <SearchFilters
          isResetButton={isResetButton}
          inputProps={inputProps}
          options={options}
          textFieldLabel={textFieldLabel}
        />
      </Stack>
      <Divider variant="fullWidth" />

      <Stack sx={{ my: 3, px: 5 }} gap={3}>
        {submittedValue && hasNoContact && (
          <SearchContactEmptyState
            onChangeSearchType={onChangeSearchType}
            searchType={contactsFilter.searchType}
            searchValue={contactsFilter.searchParam}
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

const getTextFieldLabel = (searchType: string) => {
  switch (searchType) {
    case "identifier":
      return "Rechercher un contact par Identifiant de connexion";
    case "name":
      return "Rechercher un contact par Prénom et/ou Nom";
    case "email":
      return "Rechercher un contact par email";

    default:
      return "Rechercher un contact";
  }
};
