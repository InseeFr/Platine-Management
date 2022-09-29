export const OIDC = "OIDC";
export const NONE = "NONE";

export const SUCCESS_SEVERITY = "success";
export const INFO_SEVERITY = "info";
export const ERROR_SEVERITY = "error";

export const FAKE_USERS_LIST = [
  "Alain Térieur",
  "Alain Verse",
  "Barack Afritt",
  "Brice Glace",
  "Céline Évitable",
  "Eric Hochet",
  "Eva Porée",
  "Guy Yiotine",
  "Harry Cover",
  "Jacques Ouzi",
  "Jean Titouplin",
  "Jean Registre",
  "Justin Calva",
  "Kelly Diote",
  "Laurent Gina",
  "Marie Rouana",
  "Médhi Khaman",
  "Nicolas Nihorangina",
  "Paul Hémique",
  "Prosper Hytté",
  "Pierre Kiroul",
  "Ray Ponse",
  "Rob Otique",
  "Sarah Pelle",
  "Sandra Nicouverture",
  "Tarek Tifié",
  "Vishnou Lapaix",
  "Yvon Tremblay",
].map(funnyName => ({ given_name: funnyName.split(" ")[0], family_name: funnyName.split(" ")[1] }));
