import Card from "@mui/material/Card";
import { Row } from "../Row";
import { TitleWithIconAndDivider } from "../TitleWithIconAndDivider";
import { BinocularIcon } from "../Icon/BinocularIcon";
import { ContactSurveysFilterSelect } from "./ContactSurveysFilterSelect";
import { ChangeEvent, useEffect, useState } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { ContactSurveysTable } from "./ContactSurveysTable";
import { APISchemas } from "../../types/api";
import { useFetchQuery } from "../../hooks/useFetchQuery";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  contact: APISchemas["ContactFirstLoginDto"];
};

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay ?? 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const ContactSurveysContent = ({ contact }: Props) => {
  const [role, setRole] = useState("");
  const [state, setState] = useState("");
  const [search, setSearch] = useState("");

  const debouncedValue = useDebounce<string>(search);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // useEffect(() => {
  //   refetch();
  // }, [debouncedValue]);

  const { data: surveys, refetch } = useFetchQuery("/api/contacts/{id}/accreditations", {
    urlParams: {
      id: contact.identifier!,
    },
    params: {
      role,
      state,
      search,
    },
  });

  const [tab, setTab] = useState("inProgress");

  if (!surveys) {
    return (
      <Row justifyContent="center" py={10}>
        <CircularProgress />
      </Row>
    );
  }

  return (
    <Card sx={{ mx: 2, px: 6, py: 3 }} elevation={2}>
      <TitleWithIconAndDivider title={"Liste des enquêtes du contact"} IconComponent={BinocularIcon} />

      <Row justifyContent={"space-between"}>
        <Row spacing={3} py={4}>
          {/* use real options */}
          <ContactSurveysFilterSelect
            options={["Tous", "Principal", "Secondaire"]}
            defaultValue={"Tous"}
            label={"Rôle du contact"}
            name={"role"}
            onFilterChange={e => setRole(e.target.value)}
          />

          <ContactSurveysFilterSelect
            options={["Collecte initialisée", "Questionnaire validé sur internet", "Unité relancée"]}
            placeholderLabel="Sélectionnez un état"
            label={"Etat de la collecte"}
            name={"state"}
            onFilterChange={e => setState(e.target.value)}
          />

          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            name="name"
            id="name"
            label="Rechercher dans le tableau"
            placeholder="Saisissez votre recherche"
            variant="outlined"
            size="small"
            onChange={handleChange}
          />
        </Row>
        <ToggleButtonGroup value={tab} exclusive onChange={(_, v) => setTab(v)}>
          <ToggleButton value="inProgress" aria-label="left aligned">
            En cours
          </ToggleButton>
          <ToggleButton value="all" aria-label="left aligned">
            Tout
          </ToggleButton>
        </ToggleButtonGroup>
      </Row>

      <ContactSurveysTable surveys={surveys} />
    </Card>
  );
};
