const projectoSelector = {
	form: document.getElementById('formulario'),
	input: document.querySelectorAll('#formulario input'),
};

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
};

const validarFormulario = (event) => {
	if (event.target.name === 'usuario')
		return validarCampo(expresiones.usuario, event.target.value, 'usuario');

	if (event.target.name === 'password')
		return validarCampo(
			expresiones.password,
			event.target.value,
			'password',
		);

	if (event.target.name === 'correo')
		return validarCampo(expresiones.correo, event.target.value, 'correo');

	if (event.target.name === 'nombre')
		return validarCampo(expresiones.nombre, event.target.value, 'nombre');

	if (event.target.name === 'password2')
		return console.log('validando campo de repetir contrasña');

	if (event.target.name === 'telefono')
		return validarCampo(
			expresiones.telefono,
			event.target.value,
			'telefono',
		);
};

const validarCampo = (exprecion, input, campo) => {
	if (exprecion.test(input)) {
		document
			.getElementById(`grupo__${campo}`)
			.classList.remove('formulario__grupo-incorrecto');

		document
			.getElementById(`grupo__${campo}`)
			.classList.remove('formulario__grupo-correcto');

		document
			.querySelector(`#grupo__${campo} i`)
			.classList.add('fa-check-circle');

		document
			.querySelector(`#grupo__${campo} i`)
			.classList.remove('fa-times-circle');

		document
			.querySelector(`#grupo__${campo} .formulario__input-error`)
			.classList.remove('formulario__input-error-activo');
	} else {
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
	}
};

projectoSelector.input.forEach((input) => {
	input.addEventListener('input', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

projectoSelector.form.addEventListener('submit', (event) => {
	event.preventDefault();
});
