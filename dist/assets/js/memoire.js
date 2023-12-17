function getRandomColor ()
{
    const arrayColor = ["violet", "indigo", "blue", "cyan", "green", "yellow", "orange", "red"];
    const indexColor = Math.floor(Math.random() * 8);
    
    return arrayColor[indexColor];
}