const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

async function fetchAPOD() {
  const container = document.getElementById("apod");

  try {
    const res = await fetch(APOD_URL);

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    container.innerHTML = `
      <h2>${data.title}</h2>
      ${data.media_type === "video"
        ? `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`
        : `<img src="${data.hdurl || data.url}" alt="${data.title}" />`
      }
      <p class="date">${data.date}</p>
      <p>${data.explanation}</p>
    `;
  } catch (err) {
    container.innerHTML = `<p class="error">Something went wrong: ${err.message}</p>`;
  }
}

fetchAPOD();
