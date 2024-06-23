import { createSelector } from 'reselect';
import { selectNameFilter } from '../filters/selectors'; 

export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, nameFilter) => {
    if (!nameFilter) {
      return contacts;
    }
    const normalizedFilter = nameFilter.toLowerCase();
    return contacts.filter((contact) => {
      const matchesName = contact.name.toLowerCase().includes(normalizedFilter);
      const matchesNumber = contact.number.includes(normalizedFilter);
      return matchesName || matchesNumber;
    });
  }
);
