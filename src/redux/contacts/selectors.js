import { createSelector } from "@reduxjs/toolkit";
import { selectFilters } from "../filters/selectors";
import Fuse from "fuse.js";

const selectContacts = (state) => state.contacts.items;

export const selectIsLoading = (state) => state.contacts.loading;

export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilters],
  (contacts, filters) => {
    const fuseOptions = {
      includeScore: true,
      shouldSort: true,
      includeMatches: false,
      findAllMatches: false,
      minMatchCharLength: 1,

      keys: ["name", "number"],
    };
    const fuse = new Fuse(contacts, fuseOptions);

    if (fuse.search(filters).length === 0) {
      return contacts;
    }
    return fuse.search(filters).map((el) => el.item);
  }
);