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
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        autoplay:{
            delay: 2000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },
         speed: 1000,
    });

async function carregarGitHub() {
    try {
        const response = await fetch("https://api.github.com/users/luhdias-png");

        if (!response.ok) {
            throw new Error("Erro ao buscar dados");
        }

        const data = await response.json();

        // Atualiza HTML
        document.getElementById("followers").textContent = data.followers;
        document.getElementById("repos").textContent = data.public_repos;

    } catch (error) {
        console.error("Erro:", error);
    }
}

carregarGitHub();


const formulario = document.querySelector('#formulario');

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Função de Validação do Formulário
formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    document.querySelectorAll('form span')
        .forEach(span => span.innerHTML = '');

    let isValid = true;

    const nome = document.querySelector('#nome');
    const erroNome = document.querySelector('#erro-nome');

    if (nome.value.trim().length < 3) {
        erroNome.innerHTML = 'O Nome deve ter no mínimo 3 caracteres.';
        if (isValid) nome.focus();
        isValid = false;
    }

    const email = document.querySelector('#email');
    const erroEmail = document.querySelector('#erro-email');

    if (!email.value.trim().match(emailRegex)) {
        erroEmail.innerHTML = 'Digite um e-mail válido.';
        if (isValid) email.focus();
        isValid = false;
    }

    const assunto = document.querySelector('#assunto');
    const erroAssunto = document.querySelector('#erro-assunto');

    if (assunto.value.trim().length < 5) {
        erroAssunto.innerHTML = 'O Assunto deve ter no mínimo 5 caracteres.';
        if (isValid) assunto.focus();
        isValid = false;
    }

    const mensagem = document.querySelector('#mensagem');
    const erroMensagem = document.querySelector('#erro-mensagem');

    if (mensagem.value.trim().length === 0) {
        erroMensagem.innerHTML = 'A mensagem não pode ser vazia.';
        if (isValid) mensagem.focus();
        isValid = false;
    }

    if (isValid) {
        const submitButton = formulario.querySelector('button[type=submit]');
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        formulario.submit();
    }
});