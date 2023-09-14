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
    fetch("https://meme-api.com/gimme/wholesomememes")
        .then((response) => response.json())
        .then(data => {
            memes.push(data);
            currentMemeIndex = memes.length - 1;
            updateDetails(data.url, data.title, data.author);

            // Disable the "Prev" button if there's no previous meme
            if (currentMemeIndex === 0) {
                prevBtn.disabled = true;
                prevBtn.style.opacity = 0.5;
                prevBtn.style.pointerEvents = 'none'; // Disable hover effect
            } else {
                prevBtn.disabled = false;
                prevBtn.style.opacity = 1;
                prevBtn.style.pointerEvents = 'auto'; // Enable hover effect
            }
        });
}

const showPreviousMeme = () => {
    if (currentMemeIndex > 0) {
        currentMemeIndex--;
        const previousMeme = memes[currentMemeIndex];
        updateDetails(previousMeme.url, previousMeme.title, previousMeme.author);

        // Enable the "Next" button since there's a previous meme now
        nextBtn.disabled = false;
        nextBtn.style.opacity = 1;
        nextBtn.style.pointerEvents = 'auto'; // Enable hover effect
    }
}

const showNextMeme = () => {
    if (currentMemeIndex < memes.length - 1) {
        currentMemeIndex++;
        const nextMeme = memes[currentMemeIndex];
        updateDetails(nextMeme.url, nextMeme.title, nextMeme.author);
    } else {
        // No more next memes, generate a new one
        fetchMeme();
    }
}

prevBtn.addEventListener("click", showPreviousMeme);
nextBtn.addEventListener("click", showNextMeme);

fetchMeme(); // Initial meme load
