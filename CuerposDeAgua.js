const apiKey = 'e4b2932dedc9471a9b6d752332e8f055';
// Updated query to fetch news about the ocean
const apiUrl = `https://newsapi.org/v2/everything?q=oceano OR mar OR acuatico&language=es&apiKey=${apiKey}`;
const newsArticlesDiv = document.getElementById('news-articles'); // Get element once

document.addEventListener('DOMContentLoaded', function() {
    console.log('CuerposDeAgua script loaded.'); // Log script load

    const waterInfoSection = document.getElementById('water-info-section'); // Get modal section
    const infoContent = waterInfoSection ? waterInfoSection.querySelector('#info-content') : null; // Get content div inside section
    const infoContainer = waterInfoSection ? waterInfoSection.querySelector('.info-container') : null; // Get container div inside section

    // Check if modal elements are found before proceeding with modal logic
    if (!waterInfoSection || !infoContent || !infoContainer) {
        console.error('Error: Modal elements not found in CuerposDeAgua.html');
        // Still fetch news even if modal is broken
        fetchNews();
        return;
    }

    // Detailed information for each category of water bodies
    const waterInfo = {
        oceans: {
            title: "Océanos y Mares",
            description: "Los océanos son las mayores masas de agua salada que cubren más del 70% de la superficie terrestre. Los mares son generalmente más pequeños, parcial o totalmente rodeados por tierra, y a menudo conectados a un océano.",
            characteristics: [
                "Agua salada (salinidad promedio de 35 partes por mil)",
                "Grandes profundidades (promedio ~3,700m)",
                "Contienen la mayor parte de la vida en la Tierra",
                "Regulan el clima global y los patrones meteorológicos",
                "Vitales para el ciclo del agua y el oxígeno atmosférico"
            ],
            examples: [
                "Océano Pacífico", "Océano Atlántico", "Mar Mediterráneo", "Mar Caribe"
            ],
            funFact: "La Fosa de las Marianas en el Océano Pacífico es el punto más profundo conocido en la Tierra, alcanzando más de 11,000 metros."
        },
        rivers: {
            title: "Ríos",
            description: "Un río es una corriente natural de agua dulce que fluye continuamente por un cauce fijo, desde su nacimiento en zonas altas (montañas, lagos) hasta su desembocadura en un lago, mar u otro río.",
            characteristics: [
                "Agua dulce",
                "Fluyen en una dirección determinada (cauce)",
                "Forman sistemas de drenaje (cuencas fluviales)",
                "Erosionan y transportan sedimentos",
                "Fuente crucial de agua para la agricultura y el consumo humano"
            ],
            examples: [
                "Río Nilo", "Río Amazonas", "Río Yangtsé", "Río Misisipi", "Río Danubio"
            ],
            funFact: "El Río Amazonas transporta más agua dulce que los siete ríos más grandes del mundo combinados."
        },
        lakes: {
            title: "Lagos",
            description: "Un lago es un cuerpo de agua dulce o salada, de extensión considerable, que se encuentra separado del mar y rodeado por tierra. Se forman en depresiones del terreno por acumulación de agua.",
            characteristics: [
                "Generalmente agua dulce (algunos son salados)",
                "Rodeados completamente por tierra",
                "Pueden ser de origen glaciar, tectónico, volcánico, etc.",
                "Hábitat para diversas especies acuáticas y aves",
                "Importantes para el abastecimiento de agua y recreación"
            ],
            examples: [
                "Lago Superior (América del Norte)", "Lago Baikal (Siberia)", "Mar Caspio (salado)", "Lago Titicaca (América del Sur)"
            ],
            funFact: "El Lago Baikal es el lago de agua dulce más antiguo y profundo del mundo, conteniendo aproximadamente el 20% del agua dulce líquida superficial del planeta."
        },
        lagoons: {
            title: "Lagunas",
            description: "Una laguna es un cuerpo de agua poco profundo que está separado de un cuerpo de agua más grande (como un océano o un lago) por una barrera natural (como un arrecife de coral, una barra de arena o un banco de arena). Pueden ser de agua dulce o salada.",
            characteristics: [
                "Poco profundas",
                "Parcialmente separadas de un cuerpo de agua mayor",
                "A menudo asociadas a zonas costeras o arrecifes",
                "Ecosistemas únicos y sensibles",
                "Pueden variar en salinidad"
            ],
            examples: [
                "Lagunas costeras (como las de atolones)", "Lagunas separadas por barras de arena"
            ],
            funFact: "Las lagunas de los atolones se forman cuando un arrecife de coral crece alrededor de una isla volcánica que luego se hunde, dejando un anillo de coral con una laguna central."
        },
        glaciers: {
            title: "Glaciares",
            description: "Un glaciar es una gran masa de hielo comprimida que se forma por la acumulación y compactación de nieve a lo largo de cientos o miles de años. Se mueven lentamente y son la mayor reserva de agua dulce del planeta.",
            characteristics: [
                "Hechos de hielo comprimido",
                "Se mueven (flujo de hielo)",
                "Forman paisajes por erosión y deposición",
                "Actúan como reservorios de agua dulce",
                "Son indicadores clave del cambio climático"
            ],
            examples: [
                "Glaciar Perito Moreno (Argentina)", "Glaciar de Groenlandia", "Glaciar de la Antártida"
            ],
            funFact: "Los glaciares y las capas de hielo contienen alrededor del 69% del agua dulce del mundo."
        },
        springs: {
            title: "Manantiales",
            description: "Un manantial es un punto donde el agua subterránea emerge naturalmente a la superficie de la Tierra. Pueden variar desde pequeñas filtraciones hasta grandes flujos de agua.",
            characteristics: [
                "Origen subterráneo",
                "Agua que emerge a la superficie",
                "Temperatura del agua relativamente constante",
                "Pueden ser fuentes de ríos o lagos",
                "Históricamente importantes para el suministro de agua"
            ],
            examples: [
                "Manantiales de agua fría", "Manantiales termales (aguas calientes)"
            ],
            funFact: "Algunos manantiales termales albergan formas de vida únicas adaptadas a altas temperaturas y composiciones químicas inusuales."
        }
    };

    // Function to show detailed information for a water category
    window.showWaterInfo = function(waterType) {
        const water = waterInfo[waterType];

        if (water && infoContent && waterInfoSection) { // Check if elements exist
            // Create HTML content
            let html = `
                <h2>${water.title}</h2>
                <p>${water.description}</p>
                <h3>Características principales:</h3>
                <ul>
            `;

            // Add characteristics
            water.characteristics.forEach(char => {
                html += `<li>${char}</li>`;
            });

            html += `</ul>`;

            // Add examples if they exist
            if (water.examples && water.examples.length > 0) {
                 html += `
                     <h3>Ejemplos:</h3>
                     <div class="example-container">
                 `;
                 water.examples.forEach(example => {
                     html += `<span class="example-tag">${example}</span>`;
                 });
                 html += `</div>`;
            }

            // Add fun fact if it exists
            if (water.funFact) {
                html += `
                    <div class="fun-fact">
                        <h3>¿Sabías que?</h3>
                        <p>${water.funFact}</p>
                    </div>
                `;
            }


            infoContent.innerHTML = html;
            waterInfoSection.style.display = 'block';

        } else {
             console.error('Water info not found or modal elements missing for:', waterType);
        }
    };

    // Function to close the info modal
    window.closeWaterInfo = function() {
         if (waterInfoSection) { // Check if element exists
            waterInfoSection.style.display = 'none';
         }
    };

    // Close the modal if clicking outside the content
    if (waterInfoSection) { // Check if element exists
        waterInfoSection.addEventListener('click', function(e) {
            // Check if the click target is the modal section itself, not the container inside it
            if (e.target === waterInfoSection) {
                 closeWaterInfo();
            }
        });
    }


    // Close the modal with the Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && waterInfoSection && waterInfoSection.style.display === 'block') { // Check if modal is open and elements exist
            closeWaterInfo();
        }
    });

    async function fetchNews() {
         if (!newsArticlesDiv) {
            console.error('Error: News articles container not found.');
            return;
        }
        newsArticlesDiv.innerHTML = '<p>Cargando noticias...</p>'; // Show loading message
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                // Handle HTTP errors like 4xx/5xx
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data.status === 'ok') {
                if (data.articles && data.articles.length > 0) {
                     console.log(`Fetched ${data.articles.length} ocean news articles.`);
                     // Filter out articles with "[Removed]" title or description
                    const validArticles = data.articles.filter(article => article.title !== "[Removed]" && article.description !== "[Removed]");
                     if (validArticles.length > 0) {
                        displayNews(validArticles.slice(0, 10)); // Display top 10 valid articles
                     } else {
                         newsArticlesDiv.innerHTML = '<p>No se encontraron noticias relevantes sobre cuerpos de agua en este momento.</p>';
                     }
                } else {
                    console.log('No ocean news articles found.');
                    newsArticlesDiv.innerHTML = '<p>No se encontraron noticias sobre cuerpos de agua en este momento.</p>';
                }
            } else {
                console.error('Error fetching ocean news from API:', data.message);
                newsArticlesDiv.innerHTML = `<p>Error al cargar las noticias: ${data.message || 'Unknown API error'}</p>`;
            }
        } catch (error) {
            console.error('Error during ocean news fetch operation:', error);
            newsArticlesDiv.innerHTML = `<p>No se pudieron cargar las noticias sobre cuerpos de agua. Verifique su conexión o inténtelo más tarde.</p><p style="font-size: 0.8em; color: grey;">Error: ${error.message}</p>`;
        }
    }

    function displayNews(articles) {
        if (!newsArticlesDiv) return;

        newsArticlesDiv.innerHTML = ''; // Clear previous content

        const slider = document.createElement('div');
        // Use d-flex for horizontal layout and overflow-auto for scrollbar
        slider.classList.add('d-flex', 'overflow-auto');
        // Add some padding for better spacing
        slider.style.paddingBottom = '15px';
        newsArticlesDiv.appendChild(slider);

        articles.forEach(article => {
            // Basic check for essential article data
            if (!article.title || !article.url || !article.description) { // Added description check
                console.warn('Skipping article due to missing essential data:', article.title);
                return;
            }

            const articleDiv = document.createElement('div');
            // Add specific class for Water news card styling
            articleDiv.classList.add('water-news-card', 'me-3', 'p-3', 'rounded', 'flex-shrink-0');
             // Width is handled by CSS class now
            articleDiv.style.width = '300px'; // Keep JS width for consistency


            const title = document.createElement('h3');
            title.textContent = article.title;
            // Styles are handled by CSS class now

            const description = document.createElement('p');
            // Limit description length for better card layout
            const descText = article.description || 'No description available.';
            description.textContent = descText.length > 100 ? descText.substring(0, 100) + '...' : descText;
            // Styles are handled by CSS class now

            const source = document.createElement('p');
            source.textContent = `Fuente: ${article.source?.name || 'Desconocida'}`; // Safer access
            // Styles are handled by CSS class now

            const link = document.createElement('a');
            link.href = article.url;
            link.textContent = 'Leer más';
            link.target = '_blank'; // Open in new tab
            link.rel = 'noopener noreferrer';
            // Using generic btn class, specific styles in CSS
            link.classList.add('btn', 'btn-sm'); // Use btn-sm for smaller size
            // Styles are handled by CSS class now


            articleDiv.appendChild(title);
            articleDiv.appendChild(description);
            articleDiv.appendChild(source);
            articleDiv.appendChild(link);

            slider.appendChild(articleDiv);
        });
    }

    // Fetch news on page load after modal logic is set up
    fetchNews();

});