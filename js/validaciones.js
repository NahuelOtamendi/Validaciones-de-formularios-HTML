export const validar = (input) => {
  const tipoDeInput = input.dataset.tipo;

  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeDeError(tipoDeInput, input);
  }
};

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesDeError = {
  nombre: {
    valueMissing: "El campo Nombre no puede estar vacio",
  },
  email: {
    valueMissing: "El campo Email no puede estar vacio",
    typeMismatch: "El correo no es valido",
  },
  contraseña: {
    valueMissing: "El campo Contraseña no puede estar vacio",
    patternMismatch:
      "Al menos una Mayuscula, una Minuscula, un Numero, no ingrese caracteres especiales, minimo 6 caracteres, maximo 12.",
  },
  nacimiento: {
    customError: "Debes tener almenos 18 años",
    valueMissing: "El campo Fecha de nacimiento no puede estar vacio",
  },
  numeroTelefonico: {},
  direccion: {},
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

const mostrarMensajeDeError = (tipoDeInput, input) => {
  let mensaje = "";

  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoDeInput][error]);
      mensaje = mensajesDeError[tipoDeInput][error];
      console.log(tipoDeInput, error);
    }
  });

  return mensaje;
};

const validarNacimiento = (input) => {
  const fechaCliente = new Date(input.value);
  let mensaje = "";

  if (!mayorEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años.";
  }

  input.setCustomValidity(mensaje);
};

const mayorEdad = (fecha) => {
  const fechaActual = new Date();
  const diferenciaFecha = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFecha <= fechaActual;
};
