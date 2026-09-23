const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const result = document.getElementById("result");
const sound = document.getElementById("sound");
const word = document.getElementById("word");

const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    const inpWord = document.getElementById("inp-word").value.trim();

  

    fetch(`${url}${encodeURIComponent(inpWord)}`)
  .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            return response.json();
        })
        .then(data => {
            console.log(data);
            result.innerHTML = `
            <div class="word">
                    <h3 id="word">${inpWord}</h3>
                    <button onclick="playSound()" id="play-btn">
                        <i class="fas fa-volume-up"></i>
                    </button>
                    <p id="phonetics"></p>

                </div>
                <div class="details">
                    <p id="meaning">${data[0].meanings[0].partOfSpeech}</p>
                    <p id="example">${data[0].phonetic}</p>
                </div>
                <p class = "word-meaning">
                    ${data[0].meanings[0].definitions[0].definition || "No definition available."} 

                </p>
                <p class = "word-example">
                    ${data[0].meanings[0].definitions[0].example || "No example available."}
                 </p> `;
                 sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
                //  console.log(sound.getAttribute);
        })
        .catch(error => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
            console.error("Dictionary API Error:", error);
        });
});

function playSound() {
    sound.play();
}