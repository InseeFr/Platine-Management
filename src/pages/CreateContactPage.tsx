import Stack from "@mui/material/Stack";
import { useState } from "react";
import { Row } from "../ui/Row";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import Typography from "@mui/material/Typography";
import { Step, StepLabel, Stepper, Divider, Card, CircularProgress } from "@mui/material";
import { InformationsForm } from "../ui/Contact/CreateContact/InformationsForm";
import { RightsManagementForm } from "../ui/Contact/CreateContact/RightsManagementForm";
import { Breadcrumbs } from "../ui/Breadcrumbs";
import { useLocation } from "react-router-dom";
import { useFetchQuery } from "../hooks/useFetchQuery";
const steps = ["Informations du contact", "Gestion des droits"];

export const CreateContactPage = () => {
  const { state: surveyUnitId } = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [contactData, setContactData] = useState();

  const [rights, setRights] = useState<{
    idSource?: string;
    year?: string;
    periodicity?: string;
  }>({
    idSource: undefined,
    year: undefined,
    periodicity: undefined,
  });

  const {
    data: surveyUnit,
    isLoading,
    isSuccess,
  } = useFetchQuery("/api/survey-units/{id}", {
    urlParams: {
      id: surveyUnitId,
    },
  });

  if (isLoading) {
    return (
      <Row justifyContent="center" py={10}>
        <CircularProgress />
      </Row>
    );
  }

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
              contact={contactData}
              surveyUnit={isSuccess ? surveyUnit : undefined}
            />
          )}

          {activeStep === 1 && (
            <RightsManagementForm
              handleSubmitStep={handleSubmitStep}
              handleBack={handleBack}
              rights={rights}
            />
          )}
        </Card>
      </Stack>
    </Stack>
  );
};
