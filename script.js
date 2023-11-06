const inputEle=document.getElementById("input")
const infoText=document.getElementById("info")
const meaningContEle=document.getElementById("meaning-container")
const meaningEle=document.getElementById("meaning")
const titleEle=document.getElementById("title")
const audioEle=document.getElementById("audio")


 async function fetchAPI(word)
{
    try {
        infoText.style.display="block"
        meaningContEle.style.display="none"
        infoText.innerText=`Searching the meaning of "${word}"`
        const url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    const result= await fetch(url).then((response)=>response.json())

    if(result.title)
    {
        meaningContEle.style.display="block"
        infoText.style.display="none"
        titleEle.innerText=word
        meaningEle.innerText="N/A"
        audioEle.style.display="none"     

    }
    else{

        infoText.style.display="none"
        meaningContEle.style.display="block"
        titleEle.innerText=result[0].word
        meaningEle.innerText=result[0].meanings[0].definitions[0].definition 
        audioEle.src=result[0].phonetics[0].audio    
    }
    
   
    } catch (error) {
        console.log(error)
        infoText.innerText="error happened"
        
    }
    
}
inputEle.addEventListener("keyup",(event)=>
{
    // console.log(event.target.value)
    // console.log(event.key)
    if(event.target.value && event.key==="Enter")
    {
        fetchAPI(event.target.value)
    }
})