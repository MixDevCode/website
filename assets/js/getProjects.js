// Elemento donde se agregarán las tarjetas de repositorio
const projectCards = document.getElementById('project-cards');

// Realizar una solicitud GET a la API de GitHub utilizando Axios
fetch("./assets/json/projects.json")
    .then(response => response.json())
    .then(projects => {

    // Iterar sobre los repositorios y crear una tarjeta por cada uno
    for(const project in projects) {
        const column = document.createElement('div');
        column.classList.add('col-md-12');

        const cardLink = document.createElement('a');
        cardLink.href = projects[project].url;
        cardLink.target = '_blank';
        cardLink.rel = 'noopener noreferrer';
        cardLink.classList.add('text-decoration-none');

        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');

        const cardHeader = document.createElement('h5');
        cardHeader.classList.add('card-header');
        cardHeader.textContent = projects[project].ES.name;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'text-center');

        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = projects[project].ES.description;

    
        // Bisnietos
        column.appendChild(cardLink);
        cardLink.appendChild(card);
        cardBody.appendChild(cardText);

        // Nietos
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        
        // Hijo
        projectCards.appendChild(column);
    };

}).catch(error => {
    console.error('Error al obtener los repositorios:', error);
});