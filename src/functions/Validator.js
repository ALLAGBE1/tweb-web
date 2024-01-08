class Validator {
	constructor() {
		this.errors = {};
	}

	required(value, fieldName) {
		if (!value || value.trim() === "") {
			this.errors[fieldName] = "Ce champ est obligatoire";
		} else {
			delete this.errors[fieldName];
		}
	}

	email(value, fieldName) {
		if (
			!String(value)
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				)
		) {
			this.errors[fieldName] = "Veuillez renseigner un email valide";
		} else {
			delete this.errors[fieldName];
		}
	}

	min(value, fieldName, number) {
		if (String(value).length < number) {
			this.errors[fieldName] =
				"Ce champ doit contenir au moins " + number + " lettre(s)";
		} else {
			delete this.errors[fieldName];
		}
	}

	max(value, fieldName, number) {
		if (String(value).length > number) {
			this.errors[fieldName] =
				"Ce champ doit contenir au plus " + number + " lettre(s)";
		} else {
			delete this.errors[fieldName];
		}
	}

	same(firstValue, secondValue, fieldName) {
		if (String(firstValue) !== String(secondValue)) {
			this.errors[fieldName] = "Mot de passe non identiques";
		} else {
			delete this.errors[fieldName];
		}
	}

	file(value, fieldName) {
        console.log(value);
        if (!value) {
            this.errors[fieldName] = "Ce champ est obligatoire";
        }
    }

	hasErrors() {
		return Object.keys(this.errors).length > 0;
	}

	getErrors() {
		return this.errors;
	}
}

export default Validator;
