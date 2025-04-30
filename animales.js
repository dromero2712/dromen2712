// --- Modal Logic (Existing) ---
document.addEventListener('DOMContentLoaded', function() {
    console.log('Animales script loaded.'); // Log script load

    const animalInfoSection = document.getElementById('animal-info-section');
    const infoContent = document.getElementById('info-content');
    // Use querySelector on the infoSection for safer targeting
    const infoContainer = animalInfoSection ? animalInfoSection.querySelector('.info-container') : null;

    if (!animalInfoSection || !infoContent || !infoContainer) {
        console.error('Error: Modal elements not found in animales.html');
        // Continue to load news even if modal elements are missing
    }

    // Información detallada de cada categoría de animales
    const animalInfo = {
        mammals: {
            title: "Mamíferos",
            description: "Los mamíferos son una clase de vertebrados que se caracterizan por tener glándulas mamarias, que en las hembras producen leche para alimentar a las crías; pelo o pelaje; y un neocórtex, una región del cerebro.",
            characteristics: [
                "Producen leche para alimentar a sus crías",
                "Tienen pelo o pelaje (aunque algunos lo han perdido evolutivamente)",
                "Son de sangre caliente (endotermos)",
                "Tienen un corazón de cuatro cámaras",
                "Respiran a través de pulmones"
            ],
            examples: [
                "Leones", "Elefantes", "Ballenas", "Murciélagos", "Seres humanos"
            ],
            funFact: "Los murciélagos son los únicos mamíferos capaces de volar activamente."
        },
        birds: {
            title: "Aves",
            description: "Las aves son animales vertebrados, de sangre caliente, que caminan, saltan o se mantienen solo sobre las extremidades posteriores, mientras que las extremidades anteriores se han modificado como alas que les permiten volar.",
            characteristics: [
                "Tienen plumas",
                "Tienen pico córneo sin dientes",
                "Ponen huevos",
                "Tienen esqueleto ligero y hueco",
                "Son de sangre caliente (endotermos)"
            ],
            examples: [
                "Águilas", "Colibríes", "Pingüinos", "Avestruces", "Loros"
            ],
            funFact: "El colibrí zunzuncito es el ave más pequeña del mundo, con un tamaño de apenas 5-6 cm."
        },
        reptiles: {
            title: "Reptiles",
            description: "Los reptiles son animales vertebrados de sangre fría que se caracterizan por tener la piel cubierta de escamas o placas córneas. La mayoría de reptiles pone huevos, aunque algunos dan a luz crías vivas.",
            characteristics: [
                "Tienen piel cubierta de escamas",
                "Son de sangre fría (ectotermos)",
                "La mayoría pone huevos con cáscara",
                "Respiran por pulmones",
                "Tienen corazón con tres o cuatro cámaras"
            ],
            examples: [
                "Cocodrilos", "Serpientes", "Tortugas", "Lagartos", "Iguanas"
            ],
            funFact: "Algunas especies de lagartos pueden desprender su cola cuando son atacados y luego regenerarla."
        },
        fish: {
            title: "Peces",
            description: "Los peces son animales vertebrados acuáticos que respiran por branquias. Tienen el cuerpo generalmente fusiforme, recubierto por escamas, y equipado con aletas, que permiten su desplazamiento en el medio acuático.",
            characteristics: [
                "Respiran por branquias",
                "Viven en ambientes acuáticos",
                "La mayoría tiene cuerpo cubierto de escamas",
                "Tienen aletas para desplazarse",
                "Son de sangre fría (ectotermos)"
            ],
            examples: [
                "Salmones", "Tiburones", "Peces payaso", "Atunes", "Anguilas"
            ],
            funFact: "El pez más rápido es el pez vela, que puede alcanzar velocidades de hasta 110 km/h."
        },
        amphibians: {
            title: "Anfibios",
            description: "Los anfibios son vertebrados tetrápodos que, salvo excepciones, se caracterizan por tener una vida bipolar, con una fase larvaria acuática y una adulta predominantemente terrestre. La palabra 'anfibio' significa 'doble vida'.",
            characteristics: [
                "Piel desnuda y húmeda, sin escamas",
                "Metamorfosis en su desarrollo",
                "Pueden respirar a través de la piel y pulmones",
                "Son de sangre fría (ectotermos)",
                "La mayoría pasa parte de su vida en agua y parte en tierra"
            ],
            examples: [
                "Ranas", "Sapos", "Salamandras", "Tritones", "Cecilias"
            ],
            funFact: "Algunas especies de ranas pueden congelar su cuerpo casi por completo durante el invierno y revivir cuando llega la primavera."
        },
        insects: {
            title: "Insectos",
            description: "Los insectos son los animales más diversos del planeta, con más de un millón de especies descritas. Son invertebrados artrópodos caracterizados por tener un cuerpo dividido en tres regiones: cabeza, tórax y abdomen.",
            characteristics: [
                "Cuerpo dividido en tres partes: cabeza, tórax y abdomen",
                "Poseen tres pares de patas",
                "La mayoría tiene uno o dos pares de alas",
                "Tienen exoesqueleto de quitina",
                "Respiran a través de un sistema de tubos llamados tráqueas"
            ],
            examples: [
                "Abejas", "Mariposas", "Escarabajos", "Hormigas", "Libélulas"
            ],
            funFact: "Los insectos constituyen el grupo más diverso de animales en la Tierra, representando más del 70% de todas las especies animales."
        }
    };

    // Función para mostrar información detallada de una categoría de animal
    window.showAnimalInfo = function(animalType) {
        const animal = animalInfo[animalType];
        
        if (animal && infoContent && animalInfoSection) { // Added checks
            // Crear contenido HTML
            let html = `
                <h2>${animal.title}</h2>
                <p>${animal.description}</p>
                <h3>Características principales:</h3>
                <ul>
            `;
            
            // Agregar características
            animal.characteristics.forEach(char => {
                html += `<li>${char}</li>`;
            });
            
            html += `</ul>
                <h3>Ejemplos:</h3>
                <div class="example-container">
            `;
            
            // Agregar ejemplos
            animal.examples.forEach(example => {
                html += `<span class="example-tag">${example}</span>`;
            });
            
            html += `</div>
                <div class="fun-fact">
                    <h3>¿Sabías que?</h3>
                    <p>${animal.funFact}</p>
                </div>
            `;
            
            infoContent.innerHTML = html;
            animalInfoSection.style.display = 'block';
            
            // Removed redundant style injection - rely on CSS file
        } else {
             console.error('Animal info not found or modal elements missing for:', animalType);
        }
    };
    
    // Función para cerrar el modal de información
    window.closeAnimalInfo = function() {
        if (animalInfoSection) { // Added check
             animalInfoSection.style.display = 'none';
        }
    };
    
    // Cerrar el modal si se hace clic fuera del contenido
    if (animalInfoSection && infoContainer) { // Added checks
        animalInfoSection.addEventListener('click', function(e) {
            if (e.target === animalInfoSection) { // Check if the target is the modal overlay itself
                closeAnimalInfo();
            }
        });
    }

    // Cerrar el modal con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && animalInfoSection && animalInfoSection.style.display === 'block') { // Added checks
            closeAnimalInfo();
        }
    });

    // --- News Fetching Logic (New) ---
    const apiKey = 'e4b2932dedc9471a9b6d752332e8f055'; // Reuse API Key
    const newsApiUrl = `https://newsapi.org/v2/everything?q=animales OR vida+silvestre OR conservacion&language=es&sortBy=relevancy&apiKey=${apiKey}`; // Query for animal news
    const newsArticlesDiv = document.getElementById('news-articles'); // Get news container

    async function fetchNews() {
        if (!newsArticlesDiv) {
            console.error('Error: News articles container not found.');
            return;
        }
        newsArticlesDiv.innerHTML = '<p>Cargando noticias...</p>'; // Show loading message
        try {
            const response = await fetch(newsApiUrl);
            if (!response.ok) {
                 // Handle HTTP errors like 4xx/5xx
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data.status === 'ok') {
                if (data.articles && data.articles.length > 0) {
                    console.log(`Fetched ${data.articles.length} animal news articles.`);
                    // Filter out articles with "[Removed]" title or description
                    const validArticles = data.articles.filter(article => article.title !== "[Removed]" && article.description !== "[Removed]");
                    if (validArticles.length > 0) {
                         displayNews(validArticles.slice(0, 10)); // Display top 10 valid articles
                    } else {
                         newsArticlesDiv.innerHTML = '<p>No se encontraron noticias relevantes sobre animales en este momento.</p>';
                    }
                } else {
                    console.log('No animal news articles found.');
                    newsArticlesDiv.innerHTML = '<p>No se encontraron noticias sobre animales en este momento.</p>';
                }
            } else {
                console.error('Error fetching animal news from API:', data.message);
                 newsArticlesDiv.innerHTML = `<p>Error al cargar las noticias: ${data.message || 'Unknown API error'}</p>`;
            }
        } catch (error) {
            console.error('Error during animal news fetch operation:', error);
            newsArticlesDiv.innerHTML = `<p>No se pudieron cargar las noticias sobre animales. Verifique su conexión o inténtelo más tarde.</p><p style="font-size: 0.8em; color: grey;">Error: ${error.message}</p>`;
        }
    }

    function displayNews(articles) {
        if (!newsArticlesDiv) return;

        newsArticlesDiv.innerHTML = ''; // Clear loading message/previous content

        const slider = document.createElement('div');
         // Use Bootstrap flex and overflow utilities for horizontal scroll
        slider.classList.add('d-flex', 'overflow-auto');
        slider.style.paddingBottom = '15px'; // Add padding for scrollbar visibility if needed
        newsArticlesDiv.appendChild(slider);

        articles.forEach(article => {
            // Basic check for essential article data
            if (!article.title || !article.url || !article.description) {
                 console.warn('Skipping article due to missing essential data:', article.title);
                return;
            }

            const articleDiv = document.createElement('div');
            // Apply a specific class for Animal news cards for styling
            articleDiv.classList.add('animal-news-card', 'me-3', 'p-3', 'rounded', 'flex-shrink-0');
            // Specific styles are now primarily in CSS, but width remains here for consistency
            articleDiv.style.width = '300px';

            const title = document.createElement('h3');
            title.textContent = article.title;
            // Title styles are now primarily in CSS

            const description = document.createElement('p');
             const descText = article.description;
             // Limit description length
            description.textContent = descText.length > 100 ? descText.substring(0, 100) + '...' : descText;
            // Description styles are now primarily in CSS

            const source = document.createElement('p');
            source.textContent = `Fuente: ${article.source?.name || 'Desconocida'}`; // Safer access
            // Source styles are now primarily in CSS

            const link = document.createElement('a');
            link.href = article.url;
            link.textContent = 'Leer más';
            link.target = '_blank'; // Open in new tab
            link.rel = 'noopener noreferrer';
            // Using generic btn class, specific styles in CSS
            link.classList.add('btn', 'btn-sm'); // Use btn-sm for smaller size
             // Link styles are now primarily in CSS


            articleDiv.appendChild(title);
            articleDiv.appendChild(description);
            articleDiv.appendChild(source);
            articleDiv.appendChild(link);

            slider.appendChild(articleDiv);
        });
    }

     // Fetch news on page load
    fetchNews();

});