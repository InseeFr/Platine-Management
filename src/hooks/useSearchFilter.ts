import { create } from "zustand";
import { combine } from "zustand/middleware";

const base = {
  contacts: {
    id: "",
    name: "",
    email: "",
  },
  surveyUnits: {
    idSu: "",
    identificationCode: "",
    identificationName: "",
  },
  surveys: {
    surveyId: "",
    year: "",
    period: "",
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

export function useSearchFilterParams(name: Key) {
  return useSearchFilter(v => v[name]);
}
