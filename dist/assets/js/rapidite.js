/*
    INPUT : -
    PROCESS : Récupération d'un mot via un API si on arrive à avoir accès à l'API on récupère le mot dans un objet et on retourne le mot
    OUTPUT : Retourne le mot
*/

/*eslint-disable-next-line no-unused-vars*/
function getRandomWord()
{
    //On crée un objet XMLHttpRequest
    let xhr = new XMLHttpRequest();

    //On initialise notre requête avec open()
    xhr.open("GET", "https://trouve-mot.fr/api/random", false);

    //On envoie la requête
    xhr.send();

    //Si le statut HTTP est 200 (si ça s'est bien déroulé)
    if (xhr.status == 200)
    {
        const objectRandomWord = JSON.parse(xhr.response)[0];
        return objectRandomWord.name;
    }
    else
    {
        //...On affiche le statut et le message correspondant
        alert("Erreur " + xhr.status + " : " + xhr.statusText);
    }
}
