const generateMemeBtn = document.querySelector(".generate-meme-btn");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const memeImage = document.querySelector(".meme-generator img");
const memeTitle = document.querySelector(".meme-generator .meme-title");
const memeAuthor = document.querySelector(".meme-generator .meme-author");

let currentMemeIndex = -1; // Initialize with -1 to indicate no meme loaded
const memes = []; // Store fetched memes

const updateDetails = (url, title, author) => {
    memeImage.setAttribute("src", url);
    memeTitle.innerHTML = title;
    memeAuthor.innerHTML = `Meme by: ${author}`;
}

const fetchMeme = () => {
    fetch("https://meme-api.com/gimme/funnymemes")
        .then((response) => response.json())
        .then(data => {
            memes.push(data);
            currentMemeIndex = memes.length - 1;
            updateDetails(data.url, data.title, data.author);
        });
}

const showPreviousMeme = () => {
    if (currentMemeIndex > 0) {
        currentMemeIndex--;
        const previousMeme = memes[currentMemeIndex];
        updateDetails(previousMeme.url, previousMeme.title, previousMeme.author);
    }
}

const showNextMeme = () => {
    if (currentMemeIndex < memes.length - 1) {
        currentMemeIndex++;
        const nextMeme = memes[currentMemeIndex];
        updateDetails(nextMeme.url, nextMeme.title, nextMeme.author);
    }
}

generateMemeBtn.addEventListener("click", fetchMeme);
prevBtn.addEventListener("click", showPreviousMeme);
nextBtn.addEventListener("click", showNextMeme);

fetchMeme(); // Initial meme load
