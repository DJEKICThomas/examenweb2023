/*
    INPUT : Nom du cookie, Valeur du cookie, Durée du cookie
    PROCESS : Création d'un cookie
    OUTPUT : -
*/
function setCookie(name, value, days) 
{
    const date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    document.cookie = name + "=" + value + ";expires=" + date.toUTCString() + ";path=/";
}

/*
    INPUT : Nom du cookie
    PROCESS : Récupérer un cookie
    OUTPUT : Valeur du cookie
*/
function getCookie(cookieName) 
{
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
  
    for (let i = 0; i < cookieArray.length; i++) 
    {
      let cookie = cookieArray[i].trim(); /* trim = enlever les espaces blancs apres/avant la chaine de caract */
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
  
    // Retourne null si le cookie n'est pas trouvé
    return null;
}

/*
    INPUT : Nom utilisateur, point mémoire, point rapidité
    PROCESS : Créer un objet utilisateur
    OUTPUT : Renvoyer un objet utilisateur
*/
function createUser (paramNomUtilisateur, paramPointMemoire, paramPointRapidite)
{
    const user = {nomUtilisateur: paramNomUtilisateur, pointMemoire: paramPointMemoire, pointRapidite: paramPointRapidite};

    return user;
}


function login (paramNomUtilisateur)
{
    /* S'il n'y a pas de cookie, on crée un cookie */
    if (getCookie('sessions') == null)
    {
        let newUser = createUser (paramNomUtilisateur, 0, 0);
        let objectCookie = {activeUser : newUser , userList : []};
        setCookie("sessions", JSON.stringify(objectCookie),365);
    }
    else
    {
        const cookie  = JSON.parse(getCookie('sessions')); /* Je récupère le contenu du cookie */
        const userListe = cookie.userList; /* Je récupère le tableau d'utilisateur contenu dans ce cookie */ 
        let trouve = false;
        let i = 0;

        for (i = 0; i < userListe.length; i++)
        {
            if(userListe[i].nomUtilisateur.toLowerCase() == paramNomUtilisateur.toLowerCase())
            {
                trouve = true;
                break;
            }
        }

        /* Si trouvé, récupérer ses infos et le connecter */
        if (trouve == true)
        {
            let utilisateur = userListe[i];
            cookie.activeUser =  utilisateur;
            userListe.splice (i, 1);
            setCookie("sessions", JSON.stringify(cookie),365);
        }
        else
        /* Si pas trouvé, on le connecte */
        {
            let objectUser = createUser(paramNomUtilisateur, 0, 0);
            cookie.activeUser =  objectUser;
            setCookie("sessions", JSON.stringify(cookie),365); /* Remplacer l'ancien cookie */
        }

    }
}

function logout () 
{
    const cookie = JSON.parse(getCookie('sessions')); /* Récuperation cookie en chaine de caract que je transform en objet grace a JSON.parse */
    const userActif = cookie.activeUser; /* Récupérer le user actif*/
    cookie.activeUser = null; /* Mettre l'utilisateur actif à nul */
    cookie.userList.push(userActif); /* Mettre l'utilisateur qui ETAIT actif dans la liste user */
    setCookie("sessions", JSON.stringify(cookie), 365);
}

