window.addEventListener("load", function() {
    let productForm = document.querySelector("#productForm")

    productForm.addEventListener("submit", function(e) {
        e.preventDefault();

        let errors = [];

        let nombreProducto = document.querySelector("#product-name");
         if (nombreProducto.value = "") {
            errors.push('Este campo no puede estar vacio.')
         }

        let descripcionProducto = document.querySelector("#product-description");
        if (descripcionProducto.value = "") {
            errors.push('Este campo no puede estar vacio.')
        } else if (descripcionProducto.length < 20) {
            errors.push('Este campo debe tener al menos 20 caracteres.')
        }

    });
})