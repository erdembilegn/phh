export const formatName = (firstname: string, lastname: string): string => {
  const name =
    lastname.charAt(0).toUpperCase() + '.' + firstname.charAt(0).toUpperCase() + firstname.slice(1);
  return name;
};
