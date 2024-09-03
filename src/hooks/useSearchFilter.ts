import { FormEventHandler, useState } from "react";
import { create } from "zustand";
import { combine } from "zustand/middleware";

export const base = {
  contacts: {
    searchParam: "",
    searchType: "identifier",
  },
  surveyUnits: {
    searchParam: "",
    searchType: "code",
  },
  questionings: {
    searchParam: "",
  },
  surveys: {
    idSource: "",
    year: undefined as undefined | number,
    periodicity: "",
  },
};

type Key = "contacts" | "surveyUnits" | "surveys" | "questionings";
type State = typeof base;

const useSearchFilter = create(
  combine(base, set => ({
    setFilter: <K extends Key>(name: K, filter: State[K]) => set({ [name]: filter }),
  })),
);

export function useSetSearchFilter() {
  return useSearchFilter(v => v.setFilter);
}

export function useGetSearchFilter() {
  return useSearchFilter(v => v);
}

export function useSearchFilterParams<K extends Key>(name: K): State[K] {
  return useSearchFilter(v => v[name]);
}

/* 
  Hook to manage filter states more efficiently 

  example: 
    const { onSubmit, onReset, inputProps } = useSearchForm("contacts", {
      identifier: "",
      name: "",
      email: "",
      city: "",
      function: "",
    });

    <form onSubmit={onSubmit} onReset={onReset}>
      <TextField
        label="Identifiant du contact"
        {...inputProps("identifier")}
      />
      <TextField 
        label="Nom/prénom" 
        {...inputProps("name")} 
      />
      ...
    </form>
*/

export function useSearchForm<K extends Key>(key: K, initialValue: State[K]) {
  const [value, setValue] = useState(initialValue);
  const setFilter = useSetSearchFilter();

  const onSubmit: FormEventHandler = e => {
    e.preventDefault();
    setFilter(key, value);
  };

  const onReset: FormEventHandler = e => {
    e.preventDefault();
    setFilter(key, base[key]);
    setValue(base[key]);
  };

  return {
    value,
    onSubmit,
    onReset,
    inputProps: (name: keyof State[K]) => ({
      id: name,
      name: name,
      value: value[name],
      onChange: (e: any) => setValue({ ...value, [name]: e.target.value }),
    }),
    handler: (name: keyof State[K]) => {
      return (e: any) => setValue({ ...value, [name]: e.target.value });
    },
    onChangeSearchType: (type: string) => {
      return setValue({ ...value, searchType: type });
    },
  };
}
