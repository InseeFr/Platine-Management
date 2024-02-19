import { Divider, Stack, Tabs } from "@mui/material";
import { PageTab } from "../ui/PageTab";
import { useState, SyntheticEvent } from "react";
import { SettingsHeader } from "../ui/Settings/SettingsHeader";
import { SettingsHabilitationsTab } from "./Settings/SettingsHabilitationsTab";

enum Tab {
  Habilitations = "Habilitations",
  Communications = "Communications",
  NewSource = "NewSource",
}

const TabNames = {
  [Tab.Habilitations]: "Habilitations",
  [Tab.Communications]: "Communications",
  [Tab.NewSource]: "Nouvelle Source",
};

export function SettingsPage() {
  const [currentTab, setCurrentTab] = useState(Tab.Habilitations);
  const handleChange = (_: SyntheticEvent, newValue: Tab) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <SettingsHeader />
      <Divider variant="fullWidth" />
      <Tabs
        value={currentTab}
        onChange={handleChange}
        sx={{
          px: 5,
          backgroundColor: "white",
        }}
      >
        {Object.keys(Tab).map(k => (
          <PageTab
            sx={{
              paddingX: 4,
              paddingY: 3,
              typography: "titleSmall",
              letterSpacing: 0.4,
            }}
            key={k}
            value={k}
            label={TabNames[k]}
          />
        ))}
      </Tabs>

      <Stack px={3} py={3}>
        {currentTab === Tab.Habilitations && <SettingsHabilitationsTab />}
        {currentTab === Tab.Communications && "1"}
        {currentTab === Tab.NewSource && "2"}
      </Stack>
    </>
  );
}
