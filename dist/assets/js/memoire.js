/*
    INPUT : -
    PROCESS : Généré une couleur aléatoire parmis les 8 couleurs
    OUTPUT : Retourne une couleur
*/

/*eslint-disable-next-line no-unused-vars*/
function getRandomColor()
{
    const arrayColor = ["violet", "indigo", "blue", "cyan", "green", "yellow", "orange", "red"];
    const indexColor = Math.floor(Math.random() * 8);
    return arrayColor[indexColor];
}