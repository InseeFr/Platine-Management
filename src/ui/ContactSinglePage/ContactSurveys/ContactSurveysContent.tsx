import Card from "@mui/material/Card";
import { Row } from "../../Row";
import { TitleWithIconAndDivider } from "../../TitleWithIconAndDivider";
import { BinocularIcon } from "../../Icon/BinocularIcon";
import { ContactSurveysFilterSelect } from "./ContactSurveysFilterSelect";
import { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { ContactSurveysTable } from "./ContactSurveysTable";

export const ContactSurveysContent = () => {
  const [filters, setFilters] = useState<{ filterName: string; value: string }[]>([]);
  const [tab, setTab] = useState("inProgress");

  console.log({ filters });
  const onFilterChange = (event: SelectChangeEvent, filterName: string) => {
    console.log(event.target.value, filterName);
    setFilters([...filters, { filterName: filterName, value: event.target.value }]);
    // call api with filter
  };
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
            onFilterChange={onFilterChange}
          />

          <ContactSurveysFilterSelect
            options={["Collecte initialisée", "Questionnaire validé sur internet", "Unité relancée"]}
            placeholderLabel="Sélectionnez un état"
            label={"Etat de la collecte"}
            name={"state"}
            onFilterChange={onFilterChange}
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

      <ContactSurveysTable />
    </Card>
  );
};
