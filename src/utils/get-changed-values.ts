export const getChangedValuesInObject = <T>(values: T, initialValues?: T) => {
  const changedValues: Partial<T> = {};

  if (!initialValues) {
    return values;
  }
  for (const k in values) {
    const key = k as keyof T;
    if (values[key] !== initialValues[key]) {
      changedValues[key] = values[key];
    }
  }

  return changedValues;
};
