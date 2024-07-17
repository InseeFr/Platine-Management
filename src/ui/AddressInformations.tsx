import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { APISchemas } from "../types/api.ts";

type Props = {
  identificationName?: string;
  address?: APISchemas["AddressDto"];
};
export const AddressInformations = ({ identificationName, address }: Props) => {
  const isStreetBoxDisplayed =
    address?.streetNumber || address?.repetitionIndex || address?.streetType || address?.streetName;

  const isCodeBoxDisplayed =
    address?.zipCode || address?.cityName || address?.cedexCode || address?.cedexName;

  return (
    <Stack spacing={1} typography={"bodyMedium"}>
      {identificationName && (
        <Typography variant="titleSmall">{identificationName.toUpperCase()}</Typography>
      )}
      {address?.addressSupplement && <Box component={"span"}>{address?.addressSupplement}</Box>}
      {isStreetBoxDisplayed && (
        <Box component={"span"}>
          {address?.streetNumber} {address?.repetitionIndex} {address?.streetType} {address?.streetName}
        </Box>
      )}
      {address?.specialDistribution && <Box component={"span"}>{address?.specialDistribution}</Box>}
      {isCodeBoxDisplayed && (
        <Box component={"span"}>
          {address?.zipCode} {address?.cityName?.toLocaleUpperCase()} {address?.cedexCode}
          {address?.cedexName?.toLocaleUpperCase()}
        </Box>
      )}
      <Box component={"span"}>{address?.countryName}</Box>
    </Stack>
  );
};
