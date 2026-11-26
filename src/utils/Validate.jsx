export const Validate = (email, password, name = "apoorva") => {
  const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const isValidPass =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      password
    );
  const isValidName = /^[a-zA-Z0-9._-]{3,20}$/.test(name);

  if (!isValidEmail) return "Invalid Email";
  if (!isValidPass) return "Password Incorrect";
  if (!isValidName) return "Invalid User Name";

  return null;
};
