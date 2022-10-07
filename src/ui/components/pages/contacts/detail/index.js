import { useState } from "react";
import { useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ContactsUpdateForm } from "ui/components/pages/contacts/updateForm";
import { AccreditationsDetail } from "../accreditationsDetail";
import { contactDictionary } from "i18n";

function TabPanel(props) {
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
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const ContactsDetail = () => {
  let { idec } = useParams();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label={contactDictionary.subMenuUpdateContact} {...a11yProps(0)} />
            <Tab label={contactDictionary.subMenuResetPassword} {...a11yProps(1)} />
            <Tab label={contactDictionary.subMenuAccreditations} {...a11yProps(2)} />
            <Tab label={contactDictionary.subMenuSurveyUnit} {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ContactsUpdateForm idec={idec} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Renouveler le mot de passe de {idec}
        </TabPanel>
        <TabPanel value={value} index={2}>
          Associer / dissocier des droits de {idec}
          <AccreditationsDetail idec={idec} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          Consulter une unité enquêtée
        </TabPanel>
      </Box>
    </>
  );
};
