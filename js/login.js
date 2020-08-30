//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("boton").addEventListener("click", function (e) {
        let usuario = document.getElementById("nombre");
        let email = document.getElementById("email");
        let contraseña = document.getElementById("contraseña");
        let camposCompletos = false;

        if( usuario.value.trim() !== "" && email.value.trim() !== "" && contraseña.value.trim() !== "") {
            camposCompletos = true;
        }

        if(camposCompletos){
            localStorage.setItem("usuario-ingresado", JSON.stringify({email: email.value, usuario: usuario.value, contraseña: contraseña.value}));
            window.location = "cover.html";
        } else {
            alert("¡Los datos ingresados son insuficientes o no válidos!");
        }
    }


    )
});