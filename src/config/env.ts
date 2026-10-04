export const requiredEnv = (name: keyof NodeJS.ProcessEnv): string => {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured`);
  return value;
};

