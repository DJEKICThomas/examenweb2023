let btn_memoire = document.getElementById("btn_memoire");
let btn_rapidite = document.getElementById("btn_rapidite");
let btn_menu = document.getElementById("btn_menu");
let btn_connexion = document.getElementById("btn_connexion");
let btn_deconnexion = document.getElementById("btn_deconnexion");

/* On vérifie qu'il existe un btn_memoire dans la page chargée et ajouter l'événement*/
if (btn_memoire != null)
{
    btn_memoire.addEventListener("click", () => {
        location.href = "memoire.html";
    });
}

/* On vérifie qu'il existe un btn_rapidite dans la page chargée et ajouter l'événement*/
if (btn_rapidite != null)
{
    btn_rapidite.addEventListener("click", () => {
        location.href = "rapidite.html";
    });
}

/* On vérifie qu'il existe un btn_menu dans la page chargée et ajouter l'événement*/
if (btn_menu != null)
{
    btn_menu.addEventListener("click", () => {
        location.href = "menu.html";
    });
}

if (btn_connexion != null)
{
    btn_connexion.addEventListener("click", () => {
        let username = document.getElementById("user").value;
        login(username);
        location.href = "menu.html";
    });
}

if (btn_deconnexion != null)
{
    btn_deconnexion.addEventListener("click", () => {
        logout();
        location.href = "index.html";
    });
}








