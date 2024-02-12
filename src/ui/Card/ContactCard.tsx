import { CardActionArea, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailIcon from "@mui/icons-material/Email";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import { Link } from "react-router-dom";
import { Row } from "../Row.tsx";
import { TextWithLeftIcon } from "../TextWithLeftIcon.tsx";

type ContactCardProps = {
  identifier?: string;
  firstname?: string;
  lastname?: string;
  cityName?: string;
  phone?: string;
  email?: string;
  functionContact?: string;
  isDisabled?: boolean;
  // add surveyUnits and surveys
};

export const ContactCard = ({
  identifier,
  firstname,
  lastname,
  cityName,
  phone,
  functionContact,
  email,
  isDisabled,
}: ContactCardProps) => {
  return (
    <Card elevation={2} variant={isDisabled ? "disabled" : undefined}>
      <CardActionArea component={Link} to={`/contacts/${identifier}`}>
        <Box px={3} py={2}>
          <Typography align="right" variant="titleMedium" color="text.tertiary" gutterBottom>
            #{identifier}
          </Typography>

          <Stack gap={2.5}>
            <Row gap={1}>
              <PersonOutlineOutlinedIcon />
              <Typography
                variant="titleLarge"
                fontWeight={600}
                color="text.primary"
              >{`${firstname} ${lastname}`}</Typography>
            </Row>

            <Stack spacing={0.5} color="text.secondary">
              <TextWithLeftIcon IconComponent={LocationOnIcon} text={cityName} />
              <TextWithLeftIcon IconComponent={LocalPhoneOutlinedIcon} text={phone} />
              <TextWithLeftIcon IconComponent={EmailIcon} text={email} />
              <TextWithLeftIcon IconComponent={DesktopWindowsOutlinedIcon} text={functionContact} />
            </Stack>

            <Stack spacing={1} typography="titleSmall" color="text.hint">
              <div>Carrefour, Auchan, E.Leclerc</div>
              <div>EVA, PIAAC</div>
            </Stack>
          </Stack>
        </Box>
      </CardActionArea>
    </Card>
  );
};
