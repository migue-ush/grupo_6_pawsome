window.addEventListener("load", function() {
    let loginForm = document.querySelector("#loginForm");

    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        let errors = [];

        let email = document.querySelector("#email");

        if (email.value == "") {
            errors.push('Este campo no puede estar vacio.')
        }
        
        let password = document.querySelector("#password");

        if (password.value == "") {
            errors.push('Este campo no puede estar vacio.')
        }

        if (password.value.length < 8) {
            errors.push('Este campo debe tener al menos 8 caracteres.')
        }
    });


})