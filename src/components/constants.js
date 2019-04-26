const filterPredicates = ['And', 'Or'];

const filterOperators = {
  Boolean: ['is'],
  Date: ['is', 'is before', 'is after', 'is on or before', 'is on or after', 'is not', 'is empty', 'is not empty'],
  Number: ['=', '≠', '<', '>', '≤', '≥', 'is empty', 'is not empty'],
  Select: ['is', 'is not', 'is any of', 'is none of', 'is empty', 'is not empty'],
  String: ['contains', 'does not contains', 'is', 'is not', 'is empty', 'is not empty'],
};

for (const key in filterOperators) {
  filterOperators[key] = filterOperators[key].map(p => ({ value: p, label: p }));
}
export { filterOperators };

export const predicateOptions = filterPredicates.map(p => ({ value: p, label: p }));
