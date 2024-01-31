export type Address = {
    streetNumber?: string;
    repetitionIndex?: string;
    streetType?: string;
    streetName?: string;
    addressSupplement?: string;
    cityName?: string;
    zipCode?: string;
    cedexCode?: string;
    cedexName?: string;
    specialDistribution?: string;
    countryCode?: string;
    countryName?: string;
}

export type Contact = {
    identifier?: string;
    externalId?: string;
    civility?: "Female" | "Male" | "Undefined";
    lastName?: string;
    firstName?: string;
    function?: string;
    email?: string;
    phone?: string;
    address?: Address;
    main?: boolean;
}