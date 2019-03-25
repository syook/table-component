// search for a query in an object
export const searchObj = (obj, query, searchKeys) => {
  let found = false;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(searchKeys, key)) {
      const value = obj[key];
      if (typeof value === 'object') {
        found = searchObj(value, query, searchKeys);
        if (found) {
          return found;
        }
      } else if (
        value
          .toString()
          .toLowerCase()
          .indexOf(query) !== -1
      ) {
        found = true;
        return found;
      }
    } // end if key is searchable
  } // end for every key in object
  return found;
}; // end of searchObj
