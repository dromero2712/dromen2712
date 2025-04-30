const apiKey = 'e4b2932dedc9471a9b6d752332e8f055';
const newsApiUrl = `https://newsapi.org/v2/everything?q=espacio OR astronomia OR universo OR nasa&language=es&sortBy=relevancy&apiKey=${apiKey}`; // Broader query
const newsArticlesDiv = document.getElementById('news-articles');

// --- News Fetching Logic ---
async function fetchNews() {
    if (!newsArticlesDiv) {
        console.error('Error: News articles container not found.');
        return;
    }
    newsArticlesDiv.innerHTML = '<p>Cargando noticias...</p>'; // Show loading message
    try {
        const response = await fetch(newsApiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.status === 'ok') {
            if (data.articles && data.articles.length > 0) {
                console.log(`Fetched ${data.articles.length} space news articles.`);
                 // Filter out articles with "[Removed]" title or description
                const validArticles = data.articles.filter(article => article.title !== "[Removed]" && article.description !== "[Removed]");
                if (validArticles.length > 0) {
                     displayNews(validArticles.slice(0, 10)); // Display top 10 valid articles
                } else {
                    newsArticlesDiv.innerHTML = '<p>No se encontraron noticias relevantes sobre el espacio en este momento.</p>';
                }
            } else {
                console.log('No space news articles found.');
                newsArticlesDiv.innerHTML = '<p>No se encontraron noticias sobre el espacio en este momento.</p>';
            }
        } else {
            console.error('Error fetching space news from API:', data.message);
            newsArticlesDiv.innerHTML = `<p>Error al cargar las noticias: ${data.message || 'Unknown API error'}</p>`;
        }
    } catch (error) {
        console.error('Error during space news fetch operation:', error);
        newsArticlesDiv.innerHTML = `<p>No se pudieron cargar las noticias sobre el espacio. Verifique su conexión o inténtelo más tarde.</p><p style="font-size: 0.8em; color: grey;">Error: ${error.message}</p>`;
    }
}

function displayNews(articles) {
    if (!newsArticlesDiv) return;

    newsArticlesDiv.innerHTML = ''; // Clear loading message/previous content

    const slider = document.createElement('div');
    slider.classList.add('d-flex', 'overflow-auto'); // Use Bootstrap flex and overflow utilities
    slider.style.paddingBottom = '15px'; // Add padding for scrollbar visibility if needed
    newsArticlesDiv.appendChild(slider);

    articles.forEach(article => {
         if (!article.title || !article.url || !article.description) { // Ensure description exists
             console.warn('Skipping article due to missing essential data:', article.title);
             return;
         }

        const articleDiv = document.createElement('div');
        // Apply a specific class for Space news cards for styling
        articleDiv.classList.add('space-news-card', 'me-3', 'p-3', 'rounded', 'flex-shrink-0');
        // Specific styles are now primarily in CSS, but width remains here for consistency
        articleDiv.style.width = '300px';

        const title = document.createElement('h3');
        title.textContent = article.title;

        const description = document.createElement('p');
        const descText = article.description;
        description.textContent = descText.length > 100 ? descText.substring(0, 100) + '...' : descText;

        const source = document.createElement('p');
        source.textContent = `Fuente: ${article.source?.name || 'Desconocida'}`;

        const link = document.createElement('a');
        link.href = article.url;
        link.textContent = 'Leer más';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        // Using generic btn class, specific styles in CSS
        link.classList.add('btn', 'btn-sm');

        articleDiv.appendChild(title);
        articleDiv.appendChild(description);
        articleDiv.appendChild(source);
        articleDiv.appendChild(link);

        slider.appendChild(articleDiv);
    });
}

// --- Modal Logic ---
document.addEventListener('DOMContentLoaded', function() {
    console.log('Espacio script loaded.');

    const infoSection = document.getElementById('space-info-section'); // Use the correct ID
    const infoContent = infoSection ? infoSection.querySelector('#info-content') : null;
    const infoContainer = infoSection ? infoSection.querySelector('.info-container') : null;

     // Ensure modal elements are present before adding listeners
    if (!infoSection || !infoContent || !infoContainer) {
        console.error('Error: Modal elements not found in Espacio.html');
        // Still fetch news even if modal is broken
         fetchNews();
        return;
    }

    // Detailed information for each Space category
    const spaceInfo = {
        planets: {
            title: "Planetas",
            description: "Un planeta es un cuerpo celeste que orbita una estrella o remanente estelar, es lo suficientemente masivo como para ser redondeado por su propia gravedad, no ha limpiado su órbita de planetesimales y no es una estrella.",
            aspects: [
                "Clasificados como terrestres (rocosos) o jovianos (gaseosos)",
                "Varían enormemente en tamaño, composición y atmósfera",
                "Pueden tener lunas y anillos",
                "Se formaron a partir de la acumulación de polvo y gas en un disco protoplanetario",
                "La Tierra es un planeta terrestre con condiciones únicas para la vida"
            ],
            examples: [
                "Mercurio", "Venus", "Tierra", "Marte", "Júpiter", "Saturno", "Urano", "Neptuno"
            ],
            funFact: "Júpiter es tan grande que cabrían más de 1,300 Tierras dentro de él."
        },
        stars: {
            title: "Estrellas",
            description: "Una estrella es un esferoide luminoso de plasma, mantenido unido por su propia gravedad. La estrella más cercana a la Tierra es el Sol.",
            aspects: [
                "Producen luz y calor a través de la fusión nuclear (generalmente de hidrógeno a helio)",
                "Vienen en diferentes tamaños, temperaturas y colores (gigantes rojas, enanas blancas, etc.)",
                "Nacen en nebulosas, viven miles de millones de años y mueren (supernovas, enanas blancas, agujeros negros)",
                "Son la fuente de la mayoría de los elementos químicos más pesados que el helio",
                "Se agrupan en galaxias"
            ],
            examples: [
                "Sol", "Sirio", "Alfa Centauri A y B", "Estrella Polar", "Betelgeuse"
            ],
            funFact: "Hay más estrellas en el universo observable que granos de arena en todas las playas de la Tierra."
        },
        galaxies: {
            title: "Galaxias",
            description: "Una galaxia es una agrupación masiva de estrellas, cúmulos estelares, nubes de gas y polvo cósmico, y materia oscura, unidos por la gravedad.",
            aspects: [
                "Varían en forma (espirales, elípticas, irregulares)",
                "Pueden contener miles de millones o incluso billones de estrellas",
                "Nuestra galaxia es la Vía Láctea",
                "Las galaxias interactúan y colisionan entre sí",
                "Se cree que la mayoría de las galaxias tienen un agujero negro supermasivo en su centro"
            ],
            examples: [
                "Vía Láctea", "Andrómeda", "Galaxia del Triángulo", "Galaxias de Magallanes"
            ],
            funFact: "La Vía Láctea y la galaxia de Andrómeda se dirigen una hacia la otra y se espera que colisionen en unos 4.5 mil millones de años."
        },
         nebulae: {
            title: "Nebulosas",
            description: "Una nebulosa es una gigantesca nube interestelar de polvo, gas (principalmente hidrógeno y helio) y plasma. Son a menudo 'viveros estelares', donde nacen las estrellas.",
            aspects: [
                "Lugares de nacimiento de estrellas (nebulosas de emisión/reflexión)",
                "Restos de estrellas muertas (nebulosas planetarias, remanentes de supernova)",
                "Pueden ser oscuras, bloqueando la luz de las estrellas detrás de ellas (nebulosas oscuras)",
                "Vienen en una variedad de formas y tamaños, a menudo con colores impresionantes",
                "Son esenciales para el ciclo de vida de la materia en el universo"
            ],
            examples: [
                "Nebulosa de Orión", "Nebulosa del Cangrejo", "Nebulosa del Ojo de Gato", "Nebulosa del Águila (Pilares de la Creación)"
            ],
            funFact: "La Nebulosa de Orión es una de las nebulosas más brillantes y cercanas a la Tierra, visible a simple vista en el cielo nocturno."
        }
    };

    // Function to show detailed information for a space category
    window.showSpaceInfo = function(spaceType) {
        const item = spaceInfo[spaceType];

        if (item) {
            // Create HTML content
            let html = `
                <h2>${item.title}</h2>
                <p>${item.description}</p>
                <h3>Aspectos clave:</h3>
                <ul>
            `;

            // Add aspects
            if (item.aspects) {
                item.aspects.forEach(aspect => {
                    html += `<li>${aspect}</li>`;
                });
            }

            html += `</ul>`;

            // Add examples if they exist
            if (item.examples && item.examples.length > 0) {
                 html += `
                     <h3>Ejemplos:</h3>
                     <div class="example-container">
                 `;
                 item.examples.forEach(example => {
                     html += `<span class="example-tag">${example}</span>`;
                 });
                 html += `</div>`;
            }


            // Add fun fact if it exists
            if (item.funFact) {
                html += `
                    <div class="fun-fact">
                        <h3>¿Sabías que?</h3>
                        <p>${item.funFact}</p>
                    </div>
                `;
            }


            infoContent.innerHTML = html;
            infoSection.style.display = 'block';

            // Optional: Inject temporary styles for modal content if needed (less ideal, prefer CSS)
            // The styles are already primarily in CSS, so relying on that is better.
        }
    };

    // Function to close the info modal
    window.closeSpaceInfo = function() {
        infoSection.style.display = 'none';
    };

    // Close the modal if clicking outside the content
    infoSection.addEventListener('click', function(e) {
        // Check if the click target is the modal section itself, but not the container inside it
        if (e.target === infoSection) {
             closeSpaceInfo();
        }
    });

    // Close the modal with the Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && infoSection.style.display === 'block') {
            closeSpaceInfo();
        }
    });

    // Fetch news on page load
    fetchNews();
});