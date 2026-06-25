export const unwrap = (payload) => payload?.data ?? payload;

export const asArray = (payload, key) => {
  const value = unwrap(payload);

  if (Array.isArray(value)) {
    return value;
  }

  if (key && Array.isArray(value?.[key])) {
    return value[key];
  }

  if (Array.isArray(value?.data)) {
    return value.data;
  }

  return [];
};

export const asObject = (payload, key) => {
  const value = unwrap(payload);

  if (key && value?.[key]) {
    return value[key];
  }

  if (value?.data && !Array.isArray(value.data)) {
    return value.data;
  }

  return value ?? {};
};
