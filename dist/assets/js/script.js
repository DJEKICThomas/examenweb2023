let btn_memoire = document.getElementById("btn_memoire");
let btn_rapidite = document.getElementById("btn_rapidite");
let btn_menu = document.getElementById("btn_menu");
let btn_connexion = document.getElementById("btn_connexion");
let btn_deconnexion = document.getElementById("btn_deconnexion");
let load_page_connexion = document.getElementById("connexion");
let load_page_menu = document.getElementById("menu");
let load_page_memoire = document.getElementById("memoire");
let load_page_rapidite = document.getElementById("rapidite");

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
        username = username.trim();
        if (username.length >= 2)
        {
            login(username);
            location.href = "menu.html";
        }
        else
        {
            document.getElementById("badName").innerHTML = "Votre nom d'utilisateur doit avoir minimum 2 caractères";
            document.getElementById("badName").style.color = "red";
        }
        
    });
}

if (btn_deconnexion != null)
{
    btn_deconnexion.addEventListener("click", () => {
        logout();
        location.href = "index.html";
    });
}


if (load_page_connexion != null)
{
    document.addEventListener("DOMContentLoaded", () => {
        if (isPlayerActive() == true)
        {
            location.href = "menu.html";
        }
    });
}

if (load_page_menu != null || load_page_memoire != null || load_page_rapidite != null )
{
    document.addEventListener("DOMContentLoaded", () => {

        /* Vérifie qu'un cookie existe bien sinon on renvoi à l'accueil */
        if (getCookie("sessions") == null)
        {
            location.href = "index.html";
        }

        if (isPlayerActive() == false)
        {
            location.href = "index.html";
        }
        else
        {
            if (load_page_menu != null)
            {
                let userActif = getUserActive();
                document.getElementById("utilisateur").innerHTML = userActif.nomUtilisateur;
                document.getElementById("points_totals").innerHTML = (userActif.pointMemoire) + (userActif.pointRapidite);
            }
            if (load_page_memoire != null)
            {
                let userActif = getUserActive();
                document.getElementById("points_memoire").innerHTML = userActif.pointMemoire;
            }
            if (load_page_rapidite != null)
            {
                let userActif = getUserActive();
                document.getElementById("points_rapidite").innerHTML = userActif.pointRapidite;
            }
        }

    });
}











