export const createPropertyOption = (valueProperty, labelProperty) => option => {
  return {
    value: option[valueProperty || 'id'],
    label: option[labelProperty || 'name'],
  };
};
