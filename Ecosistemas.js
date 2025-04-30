const apiKey = 'e4b2932dedc9471a9b6d752332e8f055';
const apiUrl = `https://newsapi.org/v2/everything?q=ecosistemas OR biodiversidad OR "cambio climatico"&language=es&sortBy=relevancy&apiKey=${apiKey}`; // Broader query
const newsArticlesDiv = document.getElementById('news-articles');

document.addEventListener('DOMContentLoaded', function() {
    console.log('Ecosistemas script loaded.');

    const infoSection = document.getElementById('ecosystem-info-section'); // Use the correct ID
    const infoContent = infoSection ? infoSection.querySelector('#info-content') : null;
    const infoContainer = infoSection ? infoSection.querySelector('.info-container') : null;

    if (!infoSection || !infoContent || !infoContainer) {
        console.error('Error: Modal elements not found in Ecosistemas.html');
        fetchNews();
        return;
    }

    const ecosystemInfo = {
        forests: {
            title: "Bosques",
            description: "Los bosques son áreas terrestres dominadas por árboles y otra vegetación leñosa. Son ecosistemas complejos que albergan una inmensa biodiversidad y desempeñan un papel crucial en la regulación del clima global, el ciclo del agua y la calidad del suelo.",
            characteristics: [
                "Alta densidad de árboles",
                "Diversidad de estratos vegetales (dosel, sotobosque, suelo)",
                "Hábitat para gran variedad de fauna",
                "Producen oxígeno y absorben dióxido de carbono",
                "Clima y suelo influenciados por la vegetación"
            ],
            examples: [
                "Bosques tropicales lluviosos", "Bosques templados caducifolios", "Bosques boreales (Taiga)", "Bosques mediterráneos"
            ],
            funFact: "El bosque amazónico es el bosque tropical más grande del mundo y se estima que alberga alrededor del 10% de todas las especies conocidas en la Tierra."
        },
        deserts: {
            title: "Desiertos",
            description: "Los desiertos son regiones terrestres con muy bajas precipitaciones, lo que resulta en condiciones de vida extremas. La vegetación y la fauna están adaptadas a la escasez de agua y las fluctuaciones extremas de temperatura entre el día y la noche.",
            characteristics: [
                "Muy poca lluvia (menos de 250 mm/año)",
                "Grandes variaciones de temperatura diarias",
                "Suelos pobres en materia orgánica",
                "Vegetación dispersa y adaptada (cactus, arbustos espinosos)",
                "Fauna nocturna o adaptada a conservar agua"
            ],
            examples: [
                "Desierto del Sahara", "Desierto de Atacama", "Desierto de Sonora", "Desierto Antártico (desierto polar)"
            ],
            funFact: "Aunque parezca inhabitable, el Desierto del Sahara alberga varias especies de animales, incluyendo zorros del desierto (fennec), camellos, escorpiones y algunas aves migratorias."
        },
        aquatic: {
            title: "Ecosistemas Acuáticos",
            description: "Los ecosistemas acuáticos incluyen todos los cuerpos de agua de la Tierra, tanto dulces (ríos, lagos, estanques) como salados (océanos, mares, arrecifes). Son esenciales para la vida en el planeta y albergan una biodiversidad única.",
            characteristics: [
                "Medio principal es el agua",
                "Divididos en agua dulce y agua salada",
                "Influenciados por factores como salinidad, temperatura, luz y nutrientes",
                "Albergan desde microorganismos hasta grandes mamíferos marinos",
                "Fundamentales para los ciclos biogeoquímicos"
            ],
            examples: [
                "Arrecifes de coral", "Humedales", "Manglares", "Lagos de agua dulce", "Océano abierto"
            ],
            funFact: "Los arrecifes de coral, aunque cubren menos del 1% del fondo oceánico, albergan alrededor del 25% de toda la vida marina conocida."
        },
        tundra: {
            title: "Tundra",
            description: "La tundra es un bioma caracterizado por temperaturas extremadamente bajas, cortas temporadas de crecimiento y suelos helados de forma permanente (permafrost). Se encuentra en las regiones polares y en altas montañas.",
            characteristics: [
                "Temperaturas muy frías",
                "Permafrost (suelo permanentemente congelado)",
                "Bajas precipitaciones (similar a desiertos)",
                "Vegetación de bajo crecimiento (musgos, líquenes, arbustos enanos)",
                "Fauna adaptada al frío (caribú, zorros árticos, osos polares)"
            ],
            examples: [
                "Tundra ártica", "Tundra alpina"
            ],
            funFact: "El permafrost de la tundra almacena enormes cantidades de carbono. Si se derrite debido al cambio climático, liberaría gases de efecto invernadero, acelerando el calentamiento global."
        }
    };

    window.showEcosystemInfo = function(ecosystemType) {
        const ecosystem = ecosystemInfo[ecosystemType];

        if (ecosystem) {
            let html = `
                <h2>${ecosystem.title}</h2>
                <p>${ecosystem.description}</p>
                <h3>Características principales:</h3>
                <ul>
            `;

            if (ecosystem.characteristics) {
                ecosystem.characteristics.forEach(char => {
                    html += `<li>${char}</li>`;
                });
            }

            html += `</ul>`;

            if (ecosystem.examples && ecosystem.examples.length > 0) {
                html += `
                    <h3>Ejemplos:</h3>
                    <div class="example-container">
                `;
                ecosystem.examples.forEach(example => {
                    html += `<span class="example-tag">${example}</span>`;
                });
                html += `</div>`;
            }

            if (ecosystem.funFact) {
                html += `
                    <div class="fun-fact">
                        <h3>¿Sabías que?</h3>
                        <p>${ecosystem.funFact}</p>
                    </div>
                `;
            }

            infoContent.innerHTML = html;
            infoSection.style.display = 'block';
        } else {
            console.error('Ecosystem info not found:', ecosystemType);
        }
    };

    window.closeEcosystemInfo = function() {
        if (infoSection) { 
            infoSection.style.display = 'none';
        }
    };

    if (infoSection) { 
        infoSection.addEventListener('click', function(e) {
            if (e.target === infoSection) {
                closeEcosystemInfo();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && infoSection && infoSection.style.display === 'block') { 
            closeEcosystemInfo();
        }
    });

    async function fetchNews() {
        if (!newsArticlesDiv) {
            console.error('Error: News articles container not found.');
            return;
        }
        newsArticlesDiv.innerHTML = '<p>Cargando noticias...</p>'; 
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data.status === 'ok') {
                if (data.articles && data.articles.length > 0) {
                    console.log(`Fetched ${data.articles.length} ecosystem news articles.`);
                    const validArticles = data.articles.filter(article => article.title !== "[Removed]" && article.description !== "[Removed]");
                    if (validArticles.length > 0) {
                        displayNews(validArticles.slice(0, 10)); 
                    } else {
                        newsArticlesDiv.innerHTML = '<p>No se encontraron noticias relevantes sobre ecosistemas en este momento.</p>';
                    }

                } else {
                    console.log('No ecosystem news articles found.');
                    newsArticlesDiv.innerHTML = '<p>No se encontraron noticias sobre ecosistemas en este momento.</p>';
                }
            } else {
                console.error('Error fetching ecosystem news from API:', data.message);
                newsArticlesDiv.innerHTML = `<p>Error al cargar las noticias: ${data.message || 'Unknown API error'}</p>`;
            }
        } catch (error) {
            console.error('Error during ecosystem news fetch operation:', error);
            newsArticlesDiv.innerHTML = `<p>No se pudieron cargar las noticias sobre ecosistemas. Verifique su conexión o inténtelo más tarde.</p><p style="font-size: 0.8em; color: grey;">Error: ${error.message}</p>`;
        }
    }

    function displayNews(articles) {
        if (!newsArticlesDiv) return;

        newsArticlesDiv.innerHTML = ''; 

        const slider = document.createElement('div');
        slider.classList.add('d-flex', 'overflow-auto'); 
        slider.style.paddingBottom = '15px'; 
        newsArticlesDiv.appendChild(slider);

        articles.forEach(article => {
            if (!article.title || !article.url || !article.description) { 
                console.warn('Skipping article due to missing essential data:', article.title);
                return;
            }

            const articleDiv = document.createElement('div');
            articleDiv.classList.add('ecosystem-news-card', 'me-3', 'p-3', 'rounded', 'flex-shrink-0');
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
            link.classList.add('btn', 'btn-sm');

            articleDiv.appendChild(title);
            articleDiv.appendChild(description);
            articleDiv.appendChild(source);
            articleDiv.appendChild(link);

            slider.appendChild(articleDiv);
        });
    }

    fetchNews();
});