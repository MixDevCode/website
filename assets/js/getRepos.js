// URL de la API de GitHub para obtener los repositorios de un usuario
const apiUrl = 'https://api.github.com/users/MixDevCode/repos';
    
// Elemento donde se agregarán las tarjetas de repositorio
const repoCards = document.getElementById('repo-cards');

// Realizar una solicitud GET a la API de GitHub utilizando Axios
axios.get(apiUrl).then(response => {
    const repos = response.data;

    // Iterar sobre los repositorios y crear una tarjeta por cada uno
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6).forEach(repo => {
        const column = document.createElement('div');
        column.classList.add('col-md-4');

        const cardLink = document.createElement('a');
        cardLink.href = repo.html_url;
        cardLink.target = '_blank';
        cardLink.rel = 'noopener noreferrer';
        cardLink.classList.add('text-decoration-none');

        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');

        const cardHeader = document.createElement('h5');
        cardHeader.classList.add('card-header');
        cardHeader.textContent = repo.name;

        const starGazers = document.createElement('h5');
        starGazers.classList.add('float-end');
        starGazers.innerHTML = `
            <svg aria-hidden="true" height="15" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-star mr-2">
                <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
            </svg> ${repo.stargazers_count} 
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-repo-forked mr-2">
                <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
            </svg> ${repo.forks_count}`;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'text-center');

        const cardText = document.createElement('p');
        cardText.classList.add('card-text', 'text-truncate');
        cardText.textContent = repo.description;

        const cardFooter = document.createElement('div');
        cardFooter.classList.add('card-footer', 'text-muted');
        cardFooter.textContent = repo.language;

        
        const topics = document.createElement('div');
        topics.classList.add('text-muted', 'float-end');

        
        repo.topics.slice(0, 2).forEach(topic => {
            const topicButton = document.createElement('button');
            topicButton.classList.add('btn', 'btn-sm', 'ms-2'); 
            topicButton.textContent = `#${topic}`; 

            topics.appendChild(topicButton);
        });

        // Bisnietos
        cardFooter.appendChild(topics);
        column.appendChild(cardLink);
        cardLink.appendChild(card);
        cardBody.appendChild(cardText);
        cardHeader.appendChild(starGazers);

        // Nietos
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);
        
        // Hijo
        repoCards.appendChild(column);
    });
}).catch(error => {
    console.error('Error al obtener los repositorios:', error);
});