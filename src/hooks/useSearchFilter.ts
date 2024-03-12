import { create } from "zustand";
import { combine } from "zustand/middleware";

const base = {
  contacts: {
    identifier: "",
    name: "",
    email: "",
  },
  surveyUnits: {
    idSu: "",
    identificationCode: "",
    identificationName: "",
  },
  surveys: {
    idSource: undefined as undefined | string,
    year: undefined as undefined | number,
    periodicity: undefined as undefined | string,
  },
};

type Key = "contacts" | "surveyUnits" | "surveys";
type State = typeof base;

const useSearchFilter = create(
  combine(base, set => ({
    setFilter: <K extends Key>(name: K, filter: State[K]) => set({ [name]: filter }),
  })),
);

export function useSetSearchFilter() {
  return useSearchFilter(v => v.setFilter);
}

export function useSearchFilterParams<K extends Key>(name: K): State[K] {
  return useSearchFilter(v => v[name]);
}
