const inputNacimiento = document.querySelector("#birth");

inputNacimiento.addEventListener("blur", (evento) => {
  validarNacimiento(evento.target);
});

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
