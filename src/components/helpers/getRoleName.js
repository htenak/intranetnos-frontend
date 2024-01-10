export const getRoleName = (roleString = "user") => {
  if (roleString === "admin") {
    return "Administrador";
  }
  if (roleString === "professor") {
    return "Profesor";
  }
  if (roleString === "student") {
    return "Estudiante";
  }
  if (roleString === "user") {
    return "Usuario";
  }
  return roleString;
};
