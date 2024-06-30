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

const campos = {
	usuario: false,
	nombre: false,
	password: false,
	password2: false,
	correo: false,
	telefono: false,
};

const validarFormulario = (event) => {
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

const validarCampo = (exprecion, input, campo) => {
	if (exprecion.test(input)) {
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

		campos[campo] = true;
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

		campos[campo] = false;
	}
};

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const password2 = document.getElementById('password2');

	if (inputPassword1.value !== password2.value) {
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
		campos['password'] = false;
	} else {
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

		campos['password'] = true;
	}
};

projectoSelector.input.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

projectoSelector.form.addEventListener('submit', (event) => {
	event.preventDefault();
	const terminos = document.getElementById('terminos');
	if (
		campos.usuario &&
		campos.nombre &&
		campos.password &&
		campos.correo &&
		campos.telefono &&
		terminos.checked
	) {
		const { form } = projectoSelector;
		form.reset();

		document
			.getElementById('formulario__mensaje-exito')
			.classList.add('formulario__mensaje-exito-activo');

		setTimeout(() => {
			document
				.getElementById('formulario__mensaje-exito')
				.classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document
			.querySelectorAll('.formulario__grupo-correcto')
			.forEach((icono) => {
				icono.classList.remove('formulario__grupo-correcto');
			});
	} else {
		document
			.getElementById('formulario__mensaje')
			.classList.add('formulario__mensaje-activo');

		setTimeout(() => {
			document
				.getElementById('formulario__mensaje')
				.classList.remove('formulario__mensaje-activo');
		}, 5000);
	}
});
