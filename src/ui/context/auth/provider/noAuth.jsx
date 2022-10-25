import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../App";
import { API } from "core/api";
import { notifDictionary } from "i18n";
import { ERROR_SEVERITY, FAKE_USERS_LIST } from "core/constants";
import { buttonDictionary } from "i18n";
import "./noAuth.css";
import { ACCESS_APP_ROLE_ADMIN } from "core/role";

export const NoAuthLogin = ({ setOidcClient }) => {
  const { apiUrl, portailUrl, setLoading, openNotif } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState("");
  const [idSelected, setIdSelected] = useState("");
  const [chooseType, setChooseType] = useState(false);

  const login = id => {
    const fakeUserName = FAKE_USERS_LIST[Math.floor(Math.random() * FAKE_USERS_LIST.length)];
    const oidcClient = {
      isUserLoggedIn: true,
      accessToken: null,
      oidcUser: {
        id: id,
        given_name: fakeUserName.given_name,
        family_name: fakeUserName.family_name,
        ["groupe-ag"]: [ACCESS_APP_ROLE_ADMIN], // Admin role for noAuth
      },
      logout: () => (window.location.href = "/"),
    };
    setOidcClient(oidcClient);
  };

  useEffect(() => {
    const loadContact = async () => {
      setLoading(true);
      const { data, error } = await API.getUsers(apiUrl)(null);
      if (data) {
        const { content: usersFetched } = data;
        setUsers(usersFetched);
      }
      if (error) {
        openNotif({
          severity: ERROR_SEVERITY,
          message: notifDictionary.contactLoadingError,
        });
      }

      setLoading(false);
    };
    if (users.length === 0 && chooseType) loadContact();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, chooseType]);

  const handleChangeChooseType = event => {
    setSelected("");
    setIdSelected("");
    setChooseType(event.target.checked);
  };
  const handleChangeSelect = event => {
    setSelected(event.target.value);
  };

  const handleChangeInput = event => {
    setIdSelected(event.target.value);
  };

  const chooseUser = type => {
    if (type) {
      const { identifier } = users[selected];
      login(identifier);
    } else if (!type) login(idSelected);
  };

  return (
    <div className="main-body">
      <header id="bandeauSuperieur">
        <h1 id="titrePortail" className="nospace">
          {"Portail d'authentification"}
          <br />
          <span id="nomappli">{"Pilotage de la collecte et des contacts"}</span>
        </h1>
      </header>
      <hr />
      <div id="contenu">
        <div className="flex-contenu">
          <div className="groupe panel-default" id="content">
            <div className="group-heading">Authentification</div>
            <div className="group-body">
              <FormControl variant="standard" fullWidth sx={{ marginBottom: "15px" }}>
                <Typography>
                  <b>{`Choix de l'utilisateur`}</b>
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>Avec un identifiant</Typography>
                  <Switch onChange={handleChangeChooseType} />
                  <Typography>Parmi une liste</Typography>
                </Stack>
              </FormControl>
              <br />
              {!chooseType && (
                <FormControl variant="standard" fullWidth sx={{ marginBottom: "15px" }}>
                  <TextField
                    fullWidth
                    id="demo-simple-text"
                    value={idSelected}
                    label="Identifiant"
                    onChange={handleChangeInput}
                  />
                </FormControl>
              )}
              {chooseType && users.length > 0 && (
                <FormControl variant="standard" fullWidth sx={{ marginBottom: "15px" }}>
                  <InputLabel id="contact-select-label">Utilisateurs</InputLabel>
                  <Select
                    fullWidth
                    labelId="contact-select-label"
                    id="contact-select"
                    value={selected}
                    label="Contact"
                    onChange={handleChangeSelect}
                  >
                    <MenuItem disabled value="">
                      <em>Utilisateurs</em>
                    </MenuItem>
                    {users.map(({ identifier, role }, index) => (
                      <MenuItem
                        key={`${index}-item`}
                        value={index}
                      >{`${identifier}  - ${role}`}</MenuItem>
                    ))}
                  </Select>
                  {Number.isInteger(selected) && (
                    <>
                      <br />
                      <Typography>{`Le choix d'utilisateur n'a pas d'influence sur le rôle réel.`}</Typography>
                    </>
                  )}
                </FormControl>
              )}

              {(Number.isInteger(selected) || idSelected) && (
                <div className="form-group text-right">
                  <button className="button-insee" onClick={() => chooseUser(chooseType)}>
                    {buttonDictionary.login}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <nav id="piedPage" className="row-fluid navbar-fixed-bottom">
          <ul>
            <li>
              <a
                id="uri-assistance-2"
                title="Contacter l'assistance"
                href={`${portailUrl}/contacter-assistance`}
              >
                {`Contacter l'assistance`}
              </a>
            </li>

            <li>
              <a id="uri-accessibilite" title="Accessibilité" href={`${portailUrl}/accessibilite`}>
                Accessibilité
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
