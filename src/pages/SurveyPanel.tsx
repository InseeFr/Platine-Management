import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { type ReactNode, useState } from "react";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function SurveyPanel() {
  const [value, setValue] = useState(0);

  const handleChange = (_: unknown, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          centered
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{
            style: {
              backgroundColor: "purple",
            },
          }}
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab label="Infos de l'enquête" {...a11yProps(0)} />
          <Tab label="Calendrier" {...a11yProps(1)} />
          <Tab label="Unités Enquêtées" {...a11yProps(2)} />
          <Tab label="Suivi Collecte" {...a11yProps(3)} />
          <Tab label="Nouvelle Campagne" {...a11yProps(4)} />
          <Tab label="FAQ" {...a11yProps(5)} />
          <Tab label="Historique" {...a11yProps(6)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Rechercher un contact
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Rechercher une enquête
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Rechercher une unité enquêtée
      </CustomTabPanel>
    </Box>
  );
}
