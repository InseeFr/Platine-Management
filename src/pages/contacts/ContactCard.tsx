import { CardActionArea, CardContent, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailIcon from "@mui/icons-material/Email";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import { Link } from "react-router-dom";
import { Row } from "../../ui/Row";

type ContactCardProps = {
  identifier: string;
  firstname: string;
  lastname: string;
  cityName: string;
  phone: string;
  email: string;
  functionContact: string;
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
    <Card sx={{ m: 1, px: 3, py: 2 }} elevation={3} variant={isDisabled ? "disabled" : undefined}>
      <CardActionArea component={Link} to={`/contact/${identifier}`}>
        <CardContent>
          <Typography
            variant="titleMedium"
            color={"text.tertiary"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-end"}
            gutterBottom
          >
            #{identifier}
          </Typography>

          <Row gap={1}>
            <PersonOutlineOutlinedIcon />
            <Typography
              variant="titleLarge"
              sx={{
                fontWeight: 600,
              }}
            >{`${firstname} ${lastname}`}</Typography>
          </Row>

          <Stack spacing={0.5} my={4} color={"text.secondary"}>
            <Row gap={2}>
              <LocationOnIcon fontSize="small" />
              <Typography variant="titleSmall">{cityName}</Typography>
            </Row>
            <Row gap={2}>
              <LocalPhoneOutlinedIcon fontSize="small" />
              <Typography variant="titleSmall">{phone}</Typography>
            </Row>
            <Row gap={2}>
              <EmailIcon fontSize="small" />
              <Typography variant="titleSmall">{email}</Typography>
            </Row>
            <Row gap={2}>
              <DesktopWindowsOutlinedIcon fontSize="small" />
              <Typography variant="titleSmall">{functionContact}</Typography>
            </Row>
          </Stack>
          <Stack spacing={1}>
            <Typography variant={"titleSmall"} color={"text.hint"}>
              Carrefour, Auchan, E.Leclerc
            </Typography>
            <Typography variant={"titleSmall"} color={"text.hint"}>
              EVA, PIAAC
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
