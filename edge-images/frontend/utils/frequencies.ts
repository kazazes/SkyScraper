export const validFrequencyMHz = (mhz: string) => {
    if (mhz.length === 0) {
        return false;
    }
  const match = mhz.match(/^[1-9]\d{1,3}(\.[0-9]{2,5})/g);
  return match !== null;
};

export const validFrequencyKHz = (khz: string) => {
  return khz.match(/^[1-9]\d{1,6}(\.[0-9]{2,5})?/g) !== null;
};
