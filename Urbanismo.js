const apiKey = 'e4b2932dedc9471a9b6d752332e8f055';
const newsApiUrl = `https://newsapi.org/v2/everything?q=urbanismo OR ciudades inteligentes OR planificacion urbana&language=es&sortBy=relevancy&apiKey=${apiKey}`; // Broader query
const newsArticlesDiv = document.getElementById('news-articles');

// --- Modal Logic ---
document.addEventListener('DOMContentLoaded', function() {
    console.log('Urbanismo script loaded.');

    const infoSection = document.getElementById('urbanismo-info-section'); // Use the new ID
    const infoContent = infoSection ? infoSection.querySelector('#info-content') : null;
    const infoContainer = infoSection ? infoSection.querySelector('.info-container') : null;

    // Ensure modal elements are present before adding listeners
    if (!infoSection || !infoContent || !infoContainer) {
        console.error('Error: Modal elements not found in Urbanismo.html');
        // Still fetch news even if modal is broken
        fetchNews();
        return;
    }

    // Detailed information for each Urbanismo category
    const urbanismoInfo = {
        architecture: {
            title: "Arquitectura Urbana",
            description: "La arquitectura urbana se enfoca en el diseño y la construcción de los edificios y estructuras que dan forma a las ciudades, considerando su función, estética y cómo interactúan con el entorno y las personas.",
            aspects: [
                "Diseño de edificios residenciales y comerciales",
                "Construcción de infraestructura pública (puentes, estaciones)",
                "Estilos arquitectónicos históricos y modernos",
                "Uso de materiales y técnicas sostenibles",
                "La relación entre el edificio y el espacio público circundante"
            ],
            examples: [
                "Rascacielos", "Edificios históricos", "Museos", "Estaciones de tren/metro", "Bloques de apartamentos"
            ],
            funFact: "La Torre Burj Khalifa en Dubai es actualmente el edificio más alto del mundo, con 828 metros de altura."
        },
        planning: {
            title: "Planificación Urbana",
            description: "La planificación urbana es el proceso técnico y político que concierne al desarrollo y diseño del uso del suelo y el ambiente construido, incluida el aire, agua e infraestructura física y social que fluyen dentro y hacia áreas urbanizadas.",
            aspects: [
                "Zonificación y uso del suelo",
                "Diseño de sistemas de transporte y movilidad",
                "Creación y gestión de espacios verdes",
                "Desarrollo de infraestructura (agua, energía, comunicaciones)",
                "Regulaciones de construcción y desarrollo"
            ],
            examples: [
                "Planes maestros de ciudades", "Sistemas de transporte público eficientes", "Diseño de parques urbanos", "Regulaciones de altura de edificios"
            ],
            funFact: "La cuadrícula de calles de muchas ciudades americanas modernas tiene sus raíces en el Plan de Comisionados de 1811 para Manhattan."
        },
    };

    // Function to show detailed information for an urbanismo category
    window.showUrbanismoInfo = function(urbanismoType) {
        const item = urbanismoInfo[urbanismoType];

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
        } else {
            console.error('Urbanismo info not found:', urbanismoType);
        }
    };

    // Function to close the info modal
    window.closeUrbanismoInfo = function() {
        if (infoSection) { // Check if element exists
            infoSection.style.display = 'none';
        }
    };

    // Close the modal if clicking outside the content
    if (infoSection) { // Check if element exists
        infoSection.addEventListener('click', function(e) {
            // Check if the click target is the modal section itself, but not the container inside it
            if (e.target === infoSection) {
                closeUrbanismoInfo();
            }
        });
    }


    // Close the modal with the Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && infoSection && infoSection.style.display === 'block') { // Check if modal is open and elements exist
            closeUrbanismoInfo();
        }
    });


    // --- Existing News Fetching Logic ---
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
                    console.log(`Fetched ${data.articles.length} urbanism news articles.`);
                    // Filter out articles with "[Removed]" title or description
                    const validArticles = data.articles.filter(article => article.title !== "[Removed]" && article.description !== "[Removed]");
                    if (validArticles.length > 0) {
                        displayNews(validArticles.slice(0, 10)); // Display top 10 valid articles
                    } else {
                        newsArticlesDiv.innerHTML = '<p>No se encontraron noticias relevantes sobre urbanismo en este momento.</p>';
                    }
                } else {
                    console.log('No urbanism news articles found.');
                    newsArticlesDiv.innerHTML = '<p>No se encontraron noticias sobre urbanismo en este momento.</p>';
                }
            } else {
                console.error('Error fetching urbanism news from API:', data.message);
                newsArticlesDiv.innerHTML = `<p>Error al cargar las noticias: ${data.message || 'Unknown API error'}</p>`;
            }
        } catch (error) {
            console.error('Error during urbanism news fetch operation:', error);
            newsArticlesDiv.innerHTML = `<p>No se pudieron cargar las noticias sobre urbanismo. Verifique su conexión o inténtelo más tarde.</p><p style="font-size: 0.8em; color: grey;">Error: ${error.message}</p>`;
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
            // Apply a specific class for Urbanismo news cards for styling
            articleDiv.classList.add('urbanismo-news-card', 'me-3', 'p-3', 'rounded', 'flex-shrink-0');
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

    // Fetch news on page load after modal logic is set up
    fetchNews();
});