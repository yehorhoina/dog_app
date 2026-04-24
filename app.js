const btn = document.getElementById('btn');
const dogImage = document.getElementById('dog-image');
const statusText = document.getElementById('status-text');
const breedList = document.getElementById('breed-list');

async function loadBreeds() {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await response.json();
        const breeds = Object.keys(data.message); // Отримуємо масив назв порід
        
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed;
            option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
            breedList.appendChild(option);
        });
    } catch (err) {
        console.error("Не вдалося завантажити список порід");
    }
}

loadBreeds();

btn.addEventListener('click', async () => {
    try {
        statusText.textContent = 'Шукаємо песика... 🐾';
        dogImage.style.display = 'none';

        const selectedBreed = breedList.value;
        // Якщо порода обрана — міняємо URL на ендпоінт породи, якщо ні — залишаємо загальний рандом
        const url = selectedBreed 
            ? `https://dog.ceo/api/breed/${selectedBreed}/images/random`
            : 'https://dog.ceo/api/breeds/image/random';

        const response = await fetch(url);
        const data = await response.json();

        dogImage.src = data.message;
        dogImage.style.display = 'block';
        statusText.textContent = '';
    } catch (err) {
        statusText.textContent = 'Помилка: ' + err.message;
    }
});