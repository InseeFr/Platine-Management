import Stack from "@mui/material/Stack";
import { useForm } from "../hooks/useForm";
import { schema } from "../ui/Contact/ContactFormDialog";
import { useRef, useState } from "react";
import { Row } from "../ui/Row";
import Button from "@mui/material/Button";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import Typography from "@mui/material/Typography";
import { Step, StepLabel, Stepper, Divider } from "@mui/material";
import { InformationsForm } from "../ui/Contact/CreateContact/InformationsForm";
import { AddressForm } from "../ui/Contact/CreateContact/AddressForm";
import { RightsManagementForm } from "../ui/Contact/CreateContact/RightsManagementForm";

const steps = ["Informations du contact", "Adresse du contact", "Gestion des droits"];

export const CreateContactPage = () => {
  const { register, control, errors } = useForm(schema);
  const [activeStep, setActiveStep] = useState(0);

  const data = useRef(new FormData());

  const onSubmitStep = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newData = new FormData(event.currentTarget);
    console.log("new data", { newData });
    for (let [name, value] of newData) {
      data.current.append(name, value);
    }
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSubmitStep = async (event: React.FormEvent<HTMLFormElement>) => {
    onSubmitStep(event);
    handleNext();
  };

  return (
    <Stack>
      <Divider variant="fullWidth" />
      <Stack>
        <Row spacing={1} px={6} py={4} bgcolor={"white"}>
          <Row spacing={2} color={"black.main"}>
            <PersonAddAltOutlinedIcon fontSize="headerNewContact" />
            <Typography typography={"titleLarge"} fontWeight={700}>
              Nouveau contact
            </Typography>
          </Row>
          <Stepper activeStep={activeStep}>
            {steps.map(label => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Row>

        <Stack>
          <form action="#" onSubmit={handleSubmitStep}>
            {activeStep === 0 && (
              <InformationsForm errors={errors} register={register} control={control} />
            )}
            {activeStep === 1 && <AddressForm errors={errors} register={register} />}
            {activeStep === 2 && <RightsManagementForm />}
            <Row>
              <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                Annuler
              </Button>

              <Button type="submit">Suivant</Button>
            </Row>
          </form>
        </Stack>
      </Stack>
    </Stack>
  );
};
