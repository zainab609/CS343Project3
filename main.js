document.getElementById('getJoke').addEventListener('click', () => {
    const keyword = document.getElementById('keyword').value;
    getDadJoke(keyword);
});

const getDadJoke = async (keyword) => {
    const url = keyword
        ? `https://icanhazdadjoke.com/search?term=${encodeURIComponent(keyword)}`
        : 'https://icanhazdadjoke.com/';
    const response = await fetch(url, {
        headers: {
            'Accept': 'application/json'
        }
    });
    const data = await response.json();
    const joke = keyword ? data.results[Math.floor(Math.random() * data.results.length)].joke : data.joke;
    document.getElementById('joke').textContent = joke;
};

document.querySelectorAll('.mood').forEach(button => {
    button.addEventListener('click', (event) => {
        const mood = event.target.dataset.mood;
        getCatImages(mood);
    });
});

const moodToCategoryMap = {
    happy: 4,   // glasses
    sad: 1,     // hats
    angry: 2,   // space
    neutral: 5  // boxes
};

// {"id":1,"name":"hats"},
// {"id":2,"name":"space"},
// {"id":4,"name":"sunglasses"},
// [{"id":5,"name":"boxes"},
// {"id":7,"name":"ties"}]
// {"id":14,"name":"sinks"},
// {"id":15,"name":"clothes"},]

const getCatImages = async (mood) => {
    const categoryId = moodToCategoryMap[mood.toLowerCase()];
    const url = `https://api.thecatapi.com/v1/images/search?limit=4&category_ids=${categoryId}`;
    const response = await fetch(url, {
        headers: {
            'x-api-key': 'live_rKpHqz3o1L75uUFZSRmca4jkKSmkLzNh8TOdKe9fLWlYt8r5zmbpN6JMF9yXKUdZ'
        }
    });
    const data = await response.json();
    displayCatImages(data);
};

const displayCatImages = (images) => {
    const container = document.getElementById('catImageContainer');
    container.innerHTML = '';

    images.forEach(image => {
        const img = document.createElement('img');
        img.src = image.url;
        img.alt = 'Cat image';
        img.classList.add('catImage');

        // Creates an anchor tag and set the download attribute
        const a = document.createElement('a');
        a.href = image.url;
        a.download = `cat-image-${image.id}.jpg`;
        a.classList.add('download-link');
        a.textContent = 'Download';

        // Creates a div to wrap the image and download link
        const div = document.createElement('div');
        div.classList.add('catImageWrapper');

        div.appendChild(img);
        div.appendChild(a);
        container.appendChild(div);
    });
};
