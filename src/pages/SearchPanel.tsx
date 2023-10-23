import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PersonOutline from "@mui/icons-material/PersonOutline";
import CorporateFare from "@mui/icons-material/CorporateFare";
import { TextField } from "@mui/material";
import Binoculars from "./home/Binoculars";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface PanelProps {
  children?: React.ReactNode;
  tab: number;
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
        <Box
          style={{
            width: 329,
            height: 360,

            background: "white",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 3.25,
            display: "flex",
          }}
          className="ChampsDeRecherches"
        >
          <Box style={{ width: 329, height: 46, background: "#EAE5FE" }}>
            <Box
              sx={{
                height: 24,
                pl: 4,
                pt: 1.7,
                pb: 1.05,
              }}
              className="Titre"
            >
              <Typography fontWeight={600}>{children}</Typography>
            </Box>
          </Box>
          <Box
            style={{
              height: 249,
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 2.7,
              display: "flex",
            }}
            className="Champs-recherche"
          >
            <Box
              style={{
                height: 249,
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 3,
                display: "flex",
              }}
              className="Recherche-par-type"
            >
              <Box
                className="Field"
                style={{
                  height: 153,
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: 3,
                  display: "flex",
                }}
              >
                <TextField
                  style={{
                    width: 261,
                    height: 39,
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 4,
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    display: "flex",
                  }}
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  label="identifiant du contact"
                  variant="outlined"
                />
              </Box>
            </Box>
          </Box>
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

export function SearchPanel(props: PanelProps) {
  const { tab } = props;
  const [value, setValue] = React.useState(tab);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      style={{
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.10)",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        display: "flex",
      }}
      className="Recherche-contact"
    >
      <Box
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          display: "inline-flex",
        }}
        className="Recherche"
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            TabIndicatorProps={{
              style: {
                backgroundColor: "purple",
              },
            }}
            sx={{
              "& .MuiTab-root.Mui-selected": {
                backgroundColor: "#EAE5FF",
                borderBottom: "1.5px solid var(--platine-key-colors-couleur-primaire-primaire, #6750A4)",
              },
              "& .MuiTab-root.Mui-disabled": {
                // not working
                backgroundColor: "#EAE5FF",
                width: "1px",
              },

              width: 329,
              height: 54,
              justifyContent: "space-between",
              alignItems: "flex-end",
              display: "flex",
            }}
            indicatorColor="secondary"
            textColor="secondary"
            className="Onglets"
          >
            <Tab
              sx={{
                textTransform: "none",
                fontSize: 12,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
              }}
              icon={<PersonOutline />}
              label="Contact"
              {...a11yProps(0)}
            />

            <Tab
              sx={{
                textTransform: "none",
                fontSize: 12,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
              }}
              icon={<Binoculars />}
              label="Enquête"
              {...a11yProps(1)}
            />
            {/*   <Tab
              label=""
              component={Divider}
              icon={
                <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 1, height: "54px" }} />
              }
              disabled
            /> */}
            <Tab
              sx={{
                textTransform: "none",

                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
              }}
              icon={<CorporateFare />}
              label={<Typography sx={{ fontSize: 12, lineHeight: "16px" }}>Unité enquêtée</Typography>}
              wrapped={true}
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          Recherche d'un contact
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Recherche d'une enquête
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Recherche d'une unité enquêtée
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
