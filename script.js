const btn =document.querySelector("button");
const jokeContainer = document.querySelector(".joke-container span");
const engJokeContainer=document.querySelector(".eng-joke");
const hindiJokeContainer=document.querySelector(".hindi-joke");
const emoji = document.querySelectorAll("picture");
const jokeApikey ="kfIWxKad8S65+nAP2+JDqg==j2nc2NlAlWWfQ9yy";
const url ="https://api.api-ninjas.com/v1/dadjokes";

const option = {
    method: "GET",
    headers: {
      "X-Api-Key": jokeApikey,
    },
};

const translateApi ="https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURI(englishText)}"


emoji.forEach(item=>{
    item.style.display="none";
})

engJokeContainer.style.display="none";
hindiJokeContainer.style.display="none";
jokeContainer.innerText="Dad Joke";


btn.addEventListener("click", getJoke)

async function getJoke(){
    try{
        jokeContainer.innerText="Updating...";
        btn.innerText="Loading...";
        btn.disabled=true;

        const response = await fetch(url,option);
        let data = await response.json();
        let joke = data[0].joke;
        
        const transalteApi =await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${joke}`)

        const translateData = await transalteApi.json();

        let hindijoke="";
        translateData[0].forEach(element => {
            hindijoke+=element[0];
        });
        jokeContainer.style.display="none";
        engJokeContainer.innerText=joke;
        hindiJokeContainer.innerText=hindijoke;
        btn.innerText="Tell me a Joke";
        btn.disabled=false;

        emoji.forEach(item=>{
            item.style.display="block";
        })
        engJokeContainer.style.display="block";
        hindiJokeContainer.style.display="block";
    
    }catch(error){
        jokeContainer.innerText="An error happened, try again later";
        btn.innerText="Tell me a Joke";
        btn.disabled=false;
        console.log(error);
    }
}
