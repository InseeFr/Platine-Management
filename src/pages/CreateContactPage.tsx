import Stack from "@mui/material/Stack";
import { useState } from "react";
import { Row } from "../ui/Row";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import Typography from "@mui/material/Typography";
import { Step, StepLabel, Stepper, Divider, Card } from "@mui/material";
import { InformationsForm } from "../ui/Contact/CreateContact/InformationsForm";
import { RightsManagementForm } from "../ui/Contact/CreateContact/RightsManagementForm";
import { Breadcrumbs } from "../ui/Breadcrumbs";

const steps = ["Informations du contact", "Gestion des droits"];

export const CreateContactPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [contactData, setContactData] = useState();

  const [rights, setRights] = useState();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSubmitStep = async (data: any) => {
    if (activeStep === 0) {
      setContactData(data);
    }

    if (activeStep === 1) {
      setRights(data);
    }

    handleNext();
  };

  const breadcrumbs = [
    { href: "/", title: "Accueil" },
    { href: "/search", title: "Recherche" },
    "Nouveau contact",
  ];

  return (
    <Stack pb={5}>
      <Divider variant="fullWidth" />
      <Stack>
        <Row spacing={1} px={6} py={4} bgcolor={"white"} justifyContent={"space-between"}>
          <Row spacing={2} color={"black.main"}>
            <PersonAddAltOutlinedIcon fontSize="headerNewContact" />
            <Typography typography={"titleLarge"} fontWeight={700}>
              Nouveau contact
            </Typography>
          </Row>
          <Stepper activeStep={activeStep} sx={{ width: "500px" }}>
            {steps.map(label => {
              return (
                <Step key={label} sx={{ ".Mui-completed": { color: "#2E7D32 !important" } }}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Row>
        <Breadcrumbs items={breadcrumbs} />
        <Card sx={{ mt: 5, px: 6, py: 3, maxWidth: "1160px", alignSelf: "center" }} elevation={2}>
          {activeStep === 0 && (
            <InformationsForm
              handleSubmitStep={handleSubmitStep}
              handleBack={handleBack}
              contact={contactData}
            />
          )}

          {activeStep === 1 && (
            <RightsManagementForm handleSubmitStep={handleSubmitStep} handleBack={handleBack} />
          )}
        </Card>
      </Stack>
    </Stack>
  );
};
