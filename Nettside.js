
//Side 2 nedenfor =)
/* MYE Inspirasjon hentet fra "lecture 7", da jeg tok utgangspunkt i at det er slik det skal se ut */
/* Endret til å telle side og limit for å kunne hente nye posts */
/* Lagt til at det lytter til scroll, refererer til kilde nedenfor*/
let side=1;
function fetchHomeData(side){
    let limit =9;   //henter 9 av gangen max på siden
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${side}&_limit=${limit}`)
        .then((response) => {
            if(!response.ok){
                throw new Error("Error with status: " + response.status);
            }
            return response.json();
        })
        .then((posts) =>{
            let container = document.getElementById("posts-container");
            /*container.innerHTML = "";    */

            let i =1;
            for( post of posts){
                if (i <= limit){
                    const article = document.createElement("article");
                    const title = document.createElement("h1");
                    title.textContent = post.title;
                    const body = document.createElement("p");
                    body.textContent = post.body;
                    article.appendChild(title);
                    article.appendChild(body);
                    container.appendChild(article);
                    if (i % 3 == 0){
                        const clearfix  = document.createElement("div");
                        clearfix.setAttribute("class", "clearfix");
                        container.appendChild(clearfix);
                    }
                }
                i++;
            }
        })
        .catch((error) =>{                                  //dersom feil/error, skal det cacthes
            console.error("Error fetching data: ", error);        //Send feilmeldingen til console
        });
}
/* Lytter til scroll på siden og fetcher nye post
Inspirasjon: https://webdesign.tutsplus.com/how-to-implement-infinite-scrolling-with-javascript--cms-37055t
 */
function blaNedSide(){
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight){
        side++;
        fetchHomeData(side);
    }
}
window.addEventListener('scroll', blaNedSide);
fetchHomeData(side);













//Side 3 nedenfor :)
//Inspirasjon; https://dev.to/iamcymentho/dynamic-content-loading-with-javascript-15hh
//https://stackoverflow.com/questions/69535173/how-to-iteratively-store-multiple-api-calls-into-a-usestate-array
//https://community.retool.com/t/querying-an-api-multiple-times-and-creating-an-array-with-the-results/13312/7
const alleLand = [  //Ikke optimalisert, men enklere metode (blir veldig statisk);
    {
        apiURL : "https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true",
        elementId: "tokyo"
    },
    {
        apiURL: "https://api.open-meteo.com/v1/forecast?latitude=59.91&longitude=10.75&current_weather=true",
        elementId: "norge"
    },
    {
        apiURL: "https://api.open-meteo.com/v1/forecast?latitude=55.67&longitude=12.56&current_weather=true",
        elementId: "danmark"
    },
    {
        apiURL: "https://api.open-meteo.com/v1/forecast?latitude=27.00&longitude=135.00&current_weather=true",
        elementId: "australia"
    },
    {
        apiURL: "https://api.open-meteo.com/v1/forecast?latitude=60.00&longitude=95.00&current_weather=true",
        elementId: "canada"
    },
    {
        apiURL: "https://api.open-meteo.com/v1/forecast?latitude=52.38&longitude=4.89&current_weather=true",
        elementId: "nederland"
    }
    ];


function hentInfoEttLand(land){                     //Sender med land i funksjonen
    fetch(land.apiURL)                                    //Landet sin link, som vi har lagt inn i "alleLand"
        .then(response => response.json())      //Gjør om til json
        .then(data => {                                   //Tar med json data (tror jeg)
            const weather = data.current_weather;         //Tar med current_weather av api-dataen
            visInformasjon(weather, land.elementId);      //weather til landet, aka land.elementId
        })
        .catch(error => {                                                       //dersom feil/error, skal det catches
            console.error("Feil med henting av data", error);                   //Feilmelding console til troubleshoot
        });
}
function visInformasjon(weather, elementId){
    //Nedenfor: innerhtml henter dataene den skal ha
    document.getElementById(elementId).innerHTML = `
       <p>Temperatur: ${weather.temperature}</p>
       <p>Vind: ${weather.windspeed}</p>
       <p>Kode: ${weather.weathercode}</p>
       `;
}

alleLand.forEach(land => hentInfoEttLand(land));    //forEach er en loop, aka alla landene
