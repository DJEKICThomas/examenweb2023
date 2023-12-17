let btn_memoire = document.getElementById("btn_memoire");
let btn_rapidite = document.getElementById("btn_rapidite");
let btn_menu = document.getElementById("btn_menu");
let btn_connexion = document.getElementById("btn_connexion");
let btn_deconnexion = document.getElementById("btn_deconnexion");
let load_page_connexion = document.getElementById("connexion");
let load_page_menu = document.getElementById("menu");
let load_page_memoire = document.getElementById("memoire");
let load_page_rapidite = document.getElementById("rapidite");
let btn_lancerRapidite = document.getElementById("lancerRapidite");
let wordInput = document.getElementById("mot");
let spanPointRapidite = document.getElementById("points_rapidite");
let btn_lancerMemoire = document.getElementById("lancerMemoire");
let btn_colorPalette = document.getElementsByClassName("color");
let spanNbreClick = document.getElementById("nbre_click");
let spanPointMemoire = document.getElementById("points_total_memoire");
let spanLvlActuel = document.getElementById("level_memoire");



let choixColor = [];

let arrayColor = [];
let paletteActive = false ;


let interval;
let timer = 60;
let word = "";

let level = 0;
let nbre_click = 0;

let inGameMemoire = 0;
let inGamePointRapidite = 0;

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

/* RAPIDITE */
/* On vérifie qu'il existe un btn_menu dans la page chargée et ajouter l'événement*/
if (btn_lancerRapidite != null)
{
    btn_lancerRapidite.addEventListener("click", () => {
        inGamePointRapidite = 0;
        afficherWord();
        wordInput.disabled = false;
        interval = setInterval(diminuerTimer, 1000);
        btn_lancerRapidite.disabled = true;   
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

/* RAPIDITE */

function diminuerTimer ()
{
    //je récup le cookie sous forme d'un objet
    let cookie = JSON.parse(getCookie('sessions'));
    
    timer--;
    if (timer == 0)
    {
        clearInterval(interval);
        wordInput.disabled = true;
        timer = 60;
        btn_lancerRapidite.innerHTML = "Relancer la partie";
        btn_lancerRapidite.disabled = false;
        document.getElementById("randomWord").innerHTML = "Texte aléatoire à recopier";
        document.getElementById("points_total_rapidite").innerHTML = 0;

        if(inGamePointRapidite > cookie.activeUser.pointRapidite)
        {
            cookie.activeUser.pointRapidite = inGamePointRapidite;
            //Je modifie le cookie
            setCookie("sessions",JSON.stringify(cookie),365);
            spanPointRapidite.innerHTML = cookie.activeUser.pointRapidite;   
        }
    }

    document.getElementById("timerInGame").innerHTML = timer;
}

function afficherWord ()
{
    word = getRandomWord();
    document.getElementById("randomWord").innerHTML = word;
}

if(wordInput != null)
{
    wordInput.addEventListener("keyup", () => {
        if(word == wordInput.value)
        {
            inGamePointRapidite++;
            document.getElementById("points_total_rapidite").innerHTML = inGamePointRapidite;
            wordInput.value = "";
            afficherWord();
        }
    });
}


/* Memoire */

if (btn_lancerMemoire != null)
{
    btn_lancerMemoire.addEventListener("click", () => {
        lancerPartie();
    });
}

function lancerPartie()
{
    let duree = 1500;
    choixColor = [];
    btn_lancerMemoire.disabled = true;

    paletteActive = false ;

    document.getElementById("paletteColor").style.visibility = "hidden";

    //On push dans le tableau la couleur
    arrayColor.push(getRandomColor());

    for (let i = 0; i < arrayColor.length ; i++)
    {
        setTimeout(function() {
            document.getElementById("random_color").style.background = arrayColor[i];
        }, duree);
       
        duree = duree + 1500;
        
        if (i < (arrayColor.length)-1)
        {
            setTimeout(function() {
                document.getElementById("random_color").style.background = "white";
            }, duree);
        }
        

        duree = duree + 1500;
    }

    setTimeout(function() {
        document.getElementById("random_color").style.background = "linear-gradient(to right, violet, indigo, blue, cyan, green, yellow, orange, red)";
        paletteActive = true ;
        document.getElementById("paletteColor").style.visibility = "visible";
    }, duree);  
}

if (btn_colorPalette.length != 0)
{
    for (let i = 0 ; i < btn_colorPalette.length ; i++)
    {
        btn_colorPalette[i].addEventListener("click", () => {
            if (paletteActive)
            {
                let colorBackground = btn_colorPalette[i].dataset.color;
                choixColor.push(colorBackground);
                nbre_click++;
                spanNbreClick.innerHTML = nbre_click;

                if (choixColor.length == arrayColor.length)
                {
                    if (JSON.stringify(choixColor) == JSON.stringify(arrayColor))
                    {
                        level++;
                        inGameMemoire++;
                        nbre_click = 0;
                        spanNbreClick.innerHTML = "0";
                        spanLvlActuel.innerHTML = level;
                        spanPointMemoire.innerHTML = inGameMemoire;
                        lancerPartie();
                    }
                    else
                    {
                        let cookie = JSON.parse(getCookie('sessions'));
                        if (inGameMemoire > cookie.activeUser.pointMemoire)
                        {
                            cookie.activeUser.pointMemoire = inGameMemoire;
                            //Je modifie le cookie
                            setCookie("sessions",JSON.stringify(cookie),365);
                            document.getElementById("points_memoire").innerHTML = inGameMemoire;
                        }
                        level = 0;
                        inGameMemoire = 0;
                        nbre_click = 0;
                        spanNbreClick.innerHTML = "0";
                        spanLvlActuel.innerHTML = "0";
                        spanPointMemoire.innerHTML = "0";
                        btn_lancerMemoire.disabled = false;
                        btn_lancerMemoire.innerHTML = "Relancer une partie";
                        arrayColor =[];
                    }
                }
            }
            
        });
    }
}














