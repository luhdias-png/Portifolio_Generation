const cardList = document.querySelector(".card-list");

async function carregarRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/luhdias-png/repos`);
        const repos = await response.json();
        const imagem = `https://t2.tudocdn.net/675938?w=646&h=284`;

        repos.forEach(repo => {
            const card = document.createElement("li");
            card.classList.add("card-item", "swiper-slide");

            card.innerHTML = `
                <a href="${repo.html_url}" target="_blank" class="card-link">
                    <img src="${imagem}" alt="card imagem" class="card-imagem">

                    <p class="badge">${repo.language || "Sem linguagem"}</p>

                    <h2 class="card-title">
                        ${repo.name.replaceAll(/[-_]/g, ' ')}
                    </h2>

                    <p class="card-desc">
                        ${repo.description || "Sem descrição"}
                    </p>

                    <button class="card-button material-symbols-outlined">
                        arrow_forward
                    </button>
                </a>
            `;

            cardList.appendChild(card);
        });

    } catch (erro) {
        console.error("Erro ao carregar repositórios:", erro);
    }
    
}

carregarRepos();


new Swiper('.card-wrapper', {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
    
        breakpoints: {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });
