function Cadastrar() {
    alert('🚧 Paginas em obras 🚧');
}

function Logar() {
    var user = username.value;
    var pass_word = senha.value;

    if (user == "Rafael30s" && pass_word == "123456") {
        document.getElementById("Login").action = "../pages/portfolioTest.html";
    } else {
        alert("E-mail ou senha incorretos!");
    }
}

function Exibir() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}