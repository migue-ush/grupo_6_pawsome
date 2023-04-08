window.addEventListener("load", function() {
    let registerForm = document.querySelector("#registerForm");

    registerForm.addEventListener("submit", function(e) {
        e.preventDefault();

        let errors = [];

        let firstName = document.querySelector("#firstName");

        let lastName = document.querySelector("#lastName");

        let email = document.querySelector("#email");

        let password = document.querySelector("#password");

        if (firstName.value == "") {
            errors.push('Este campo no puede estar vacio.')
        }

        if (firstName.value.length < 2) {
            errors.push('Este campo debe tener al menos 2 caracteres.')
        }

        if (lastName.value == "") {
            errors.push('Este campo no puede estar vacio.')
        }

        if (lastName.value.length < 2) {
            errors.push('Este campo debe tener al menos 2 caracteres.')
        }

        if (email.value == "") {
            errors.push('Este campo no puede estar vacio.')
        }

        if (password.value == "") {
            errors.push('Este campo no puede estar vacio.')
        }

        if (password.value.length < 8) {
            errors.push('Este campo debe tener al menos 8 caracteres.')
        }


    })
})