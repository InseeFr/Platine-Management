import { Box, Divider, Tabs } from "@mui/material";
import { PageTab } from "../ui/PageTab";
import { useState, SyntheticEvent } from "react";
import { SettingsHeader } from "../ui/Settings/SettingsHeader";
import { SettingsHabilitationsCard } from "../ui/Settings/SettingsHabilitationsCard";
import { Breadcrumbs } from "../ui/Breadcrumbs.tsx";

enum Tab {
  Habilitations = "Habilitations",
  Communications = "Communications",
  NewSource = "NewSource",
}

const TabNames = {
  [Tab.Habilitations]: "Gestion des habilitations",
  [Tab.Communications]: "Communications",
  [Tab.NewSource]: "Nouvelle Source",
};

export function SettingsPage() {
  const [currentTab, setCurrentTab] = useState(Tab.Habilitations);
  const handleChange = (_: SyntheticEvent, newValue: Tab) => {
    setCurrentTab(newValue);
  };
  const breadcrumbs = [
    { href: "/", title: "Accueil" },
    { href: "/settings", title: "Réglages" },
    TabNames[currentTab],
  ];
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

      <Breadcrumbs items={breadcrumbs} />

      <Box px={4}>
        <SettingsTab tab={currentTab} />
      </Box>
    </>
  );
}

function SettingsTab({ tab }: { tab: Tab }) {
  if (tab === Tab.Habilitations) {
    return <SettingsHabilitationsCard />;
  }

  return;
}
