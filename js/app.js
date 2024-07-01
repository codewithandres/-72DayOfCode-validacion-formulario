// * Objeto que contiene los elementos del formulario
const projectoSelector = {
	form: document.getElementById('formulario'), // Selecciona el formulario por su ID
	input: document.querySelectorAll('#formulario input'), // Selecciona todos los campos de entrada dentro del formulario
};

//* Objeto que contiene las expresiones regulares para validar los campos del formulario
const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, números, guion y guion bajo, entre 4 y 16 caracteres
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos, entre 1 y 40 caracteres
	password: /^.{4,12}$/, // De 4 a 12 caracteres
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Formato de correo electrónico
	telefono: /^\d{7,14}$/, // De 7 a 14 números
};

// *Objeto que contiene el estado de validación de cada campo del formulario
const campos = {
	usuario: false,
	nombre: false,
	password: false,
	password2: false,
	correo: false,
	telefono: false,
};

// * Función para validar el formulario
const validarFormulario = (event) => {
	// * Dependiendo del nombre del campo, se llama a la función validarCampo con la expresión correspondiente
	if (event.target.name === 'usuario')
		return validarCampo(expresiones.usuario, event.target.value, 'usuario');

	if (event.target.name === 'password') {
		validarPassword2();
		return validarCampo(
			expresiones.password,
			event.target.value,
			'password',
		);
	}

	if (event.target.name === 'correo')
		return validarCampo(expresiones.correo, event.target.value, 'correo');

	if (event.target.name === 'nombre')
		return validarCampo(expresiones.nombre, event.target.value, 'nombre');

	if (event.target.name === 'password2') return validarPassword2();

	if (event.target.name === 'telefono')
		return validarCampo(
			expresiones.telefono,
			event.target.value,
			'telefono',
		);
};

// * Función para validar cada campo individualmente
const validarCampo = (expresion, input, campo) => {
	if (expresion.test(input)) {
		// * Si el input cumple con la expresión regular, se marcan como correcto
		document
			.getElementById(`grupo__${campo}`)
			.classList.remove('formulario__grupo-incorrecto');
		document
			.getElementById(`grupo__${campo}`)
			.classList.add('formulario__grupo-correcto');
		document
			.querySelector(`#grupo__${campo} i`)
			.classList.add('fa-check-circle');
		document
			.querySelector(`#grupo__${campo} i`)
			.classList.remove('fa-times-circle');
		document
			.querySelector(`#grupo__${campo} .formulario__input-error`)
			.classList.remove('formulario__input-error-activo');
		campos[campo] = true; // Actualiza el estado del campo a true
	} else {
		// *  Si el input no cumple con la expresión regular, se marcan como incorrecto
		document
			.getElementById(`grupo__${campo}`)
			.classList.add('formulario__grupo-incorrecto');
		document
			.getElementById(`grupo__${campo}`)
			.classList.remove('formulario__grupo-correcto');
		document
			.querySelector(`#grupo__${campo} i`)
			.classList.add('fa-times-circle');
		document
			.querySelector(`#grupo__${campo} i`)
			.classList.remove('fa-check-circle');
		document
			.querySelector(`#grupo__${campo} .formulario__input-error`)
			.classList.add('formulario__input-error-activo');
		campos[campo] = false; // Actualiza el estado del campo a false
	}
};

// * Función para validar la coincidencia de las contraseñas
const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password'); // Selecciona el primer campo de contraseña
	const password2 = document.getElementById('password2'); // Selecciona el segundo campo de contraseña

	if (inputPassword1.value !== password2.value) {
		// * Si las contraseñas no coinciden, se marca como incorrecto
		document
			.getElementById(`grupo__password2`)
			.classList.add('formulario__grupo-incorrecto');
		document
			.getElementById(`grupo__password2`)
			.classList.remove('formulario__grupo-correcto');
		document
			.querySelector(`#grupo__password2 i`)
			.classList.add('fa-times-circle');
		document
			.querySelector(`#grupo__password2 i`)
			.classList.remove('fa-check-circle');
		document
			.querySelector(`#grupo__password2 .formulario__input-error`)
			.classList.add('formulario__input-error-activo');
		campos['password'] = false; // Actualiza el estado del campo a false
	} else {
		// * Si las contraseñas coinciden, se marca como correcto
		document
			.getElementById(`grupo__password2`)
			.classList.remove('formulario__grupo-incorrecto');
		document
			.getElementById(`grupo__password2`)
			.classList.add('formulario__grupo-correcto');
		document
			.querySelector(`#grupo__password2 i`)
			.classList.remove('fa-times-circle');
		document
			.querySelector(`#grupo__password2 i`)
			.classList.add('fa-check-circle');
		document
			.querySelector(`#grupo__password2 .formulario__input-error`)
			.classList.remove('formulario__input-error-activo');
		campos['password'] = true; // * Actualiza el estado del campo a true
	}
};

// * Asigna eventos de validación a cada campo del formulario
projectoSelector.input.forEach((input) => {
	input.addEventListener('keyup', validarFormulario); // * Valida el campo al levantar una tecla
	input.addEventListener('blur', validarFormulario); // * Valida el campo al perder el foco
});

// * Asigna un evento al enviar el formulario
projectoSelector.form.addEventListener('submit', (event) => {
	event.preventDefault(); // * Previene el comportamiento por defecto del formulario
	const terminos = document.getElementById('terminos'); // * Selecciona el checkbox de términos y condiciones
	// * Verifica si todos los campos son válidos y si los términos y condiciones están aceptados
	if (
		campos.usuario &&
		campos.nombre &&
		campos.password &&
		campos.correo &&
		campos.telefono &&
		terminos.checked
	) {
		const { form } = projectoSelector;
		form.reset(); // Resetea el formulario

		// * Muestra el mensaje de éxito
		document
			.getElementById('formulario__mensaje-exito')
			.classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document
				.getElementById('formulario__mensaje-exito')
				.classList.remove('formulario__mensaje-exito-activo');
		}, 5000); // *  Oculta el mensaje de éxito después de 5 segundos

		// * Elimina las clases de validación correcta de todos los campos
		document
			.querySelectorAll('.formulario__grupo-correcto')
			.forEach((icono) => {
				icono.classList.remove('formulario__grupo-correcto');
			});
	} else {
		// * Muestra el mensaje de error si algún campo no es válido o los términos no están aceptados
		document
			.getElementById('formulario__mensaje')
			.classList.add('formulario__mensaje-activo');
		setTimeout(() => {
			document
				.getElementById('formulario__mensaje')
				.classList.remove('formulario__mensaje-activo');
		}, 5000); // * Oculta el mensaje de error después de 5 segundos
	}
});
