```javascript
/* =====================================================
   OFICINA DE ROBÓTICA
   JAVASCRIPT
===================================================== */


/* =====================================================
   MENU MOBILE
===================================================== */

function abrirMenu() {

    const navbar =
        document.querySelector(".navbar");

    navbar.classList.toggle("active");

}



/* =====================================================
   MODO ESCURO
===================================================== */

const themeButton =
    document.getElementById("themeButton");


themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark");


    if (
        document.body.classList.contains("dark")
    ) {

        themeButton.textContent = "☀️";

        localStorage.setItem(
            "tema",
            "dark"
        );

    }

    else {

        themeButton.textContent = "🌙";

        localStorage.setItem(
            "tema",
            "light"
        );

    }

});



/* =====================================================
   CARREGAR TEMA
===================================================== */

const temaSalvo =
    localStorage.getItem("tema");


if (temaSalvo === "dark") {

    document.body.classList.add("dark");

    themeButton.textContent = "☀️";

}



/* =====================================================
   PROJETOS INICIAIS
===================================================== */

let projetos = JSON.parse(

    localStorage.getItem("projetosRobotica")

) || [

    {

        id: Date.now(),

        nome:
        "Robô Seguidor de Linha",

        descricao:
        "Robô capaz de seguir uma linha utilizando sensores.",

        tecnologia:
        "Arduino + sensores",

        imagem:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"

    },


    {

        id: Date.now() + 1,

        nome:
        "Semáforo Inteligente",

        descricao:
        "Sistema educativo utilizando LEDs para representar um semáforo.",

        tecnologia:
        "Arduino + LEDs",

        imagem:
        "https://images.unsplash.com/photo-1518770660439-4636190af475"

    }

];



/* =====================================================
   MOSTRAR PROJETOS
===================================================== */

function mostrarProjetos(lista = projetos) {


    const container =
        document.getElementById(
            "listaProjetos"
        );


    container.innerHTML = "";


    if (lista.length === 0) {

        container.innerHTML = `

            <div class="project">

                <div class="project-content">

                    <h3>
                        Nenhum projeto encontrado.
                    </h3>

                    <p>
                        Adicione seu primeiro projeto!
                    </p>

                </div>

            </div>

        `;

        atualizarNumeroProjetos();

        return;

    }



    lista.forEach(function(projeto) {


        const article =
            document.createElement("article");


        article.className =
            "project";


        article.innerHTML = `

            <img
                src="${projeto.imagem || 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e'}"
                alt="${projeto.nome}"
            >


            <div class="project-content">

                <h3>

                    ${projeto.nome}

                </h3>


                <p>

                    ${projeto.descricao}

                </p>


                <span class="project-tech">

                    ${projeto.tecnologia}

                </span>


                <br>


                <button
                    class="delete-button"
                    onclick="removerProjeto(${projeto.id})">

                    🗑️ Remover

                </button>

            </div>

        `;


        container.appendChild(article);


    });


    atualizarNumeroProjetos();

}



/* =====================================================
   ABRIR FORMULÁRIO
===================================================== */

function abrirFormulario() {

    const formulario =
        document.getElementById(
            "formularioProjeto"
        );


    formulario.classList.remove(
        "hidden"
    );


    formulario.scrollIntoView({

        behavior: "smooth"

    });

}



/* =====================================================
   FECHAR FORMULÁRIO
===================================================== */

function fecharFormulario() {

    document
        .getElementById(
            "formularioProjeto"
        )
        .classList.add("hidden");

}



/* =====================================================
   SALVAR PROJETO
===================================================== */

function salvarProjeto() {


    const nome =
        document.getElementById(
            "nomeProjeto"
        ).value.trim();


    const descricao =
        document.getElementById(
            "descricaoProjeto"
        ).value.trim();


    const tecnologia =
        document.getElementById(
            "tecnologiaProjeto"
        ).value.trim();


    const imagem =
        document.getElementById(
            "imagemProjeto"
        ).value.trim();



    if (!nome || !descricao) {

        alert(
            "Preencha o nome e a descrição do projeto."
        );

        return;

    }



    const novoProjeto = {

        id: Date.now(),

        nome: nome,

        descricao: descricao,

        tecnologia:
            tecnologia ||
            "Tecnologia não informada",

        imagem:
            imagem ||
            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"

    };



    projetos.push(novoProjeto);


    salvarNoNavegador();


    mostrarProjetos();


    limparFormulario();


    fecharFormulario();


    alert(
        "Projeto adicionado com sucesso! 🤖"
    );

}



/* =====================================================
   SALVAR NO LOCAL STORAGE
===================================================== */

function salvarNoNavegador() {

    localStorage.setItem(

        "projetosRobotica",

        JSON.stringify(projetos)

    );

}



/* =====================================================
   LIMPAR FORMULÁRIO
===================================================== */

function limparFormulario() {

    document.getElementById(
        "nomeProjeto"
    ).value = "";


    document.getElementById(
        "descricaoProjeto"
    ).value = "";


    document.getElementById(
        "tecnologiaProjeto"
    ).value = "";


    document.getElementById(
        "imagemProjeto"
    ).value = "";

}



/* =====================================================
   REMOVER PROJETO
===================================================== */

function removerProjeto(id) {


    const confirmar =
        confirm(
            "Deseja realmente remover este projeto?"
        );


    if (!confirmar) {

        return;

    }


    projetos =
        projetos.filter(
            projeto =>
                projeto.id !== id
        );


    salvarNoNavegador();


    mostrarProjetos();

}



/* =====================================================
   PESQUISA
===================================================== */

const pesquisa =
    document.getElementById(
        "pesquisaProjeto"
    );


pesquisa.addEventListener(
    "input",
    function () {


        const termo =
            pesquisa.value
            .toLowerCase()
            .trim();


        const resultado =
            projetos.filter(
                projeto =>

                    projeto.nome
                        .toLowerCase()
                        .includes(termo)

                    ||

                    projeto.descricao
                        .toLowerCase()
                        .includes(termo)

                    ||

                    projeto.tecnologia
                        .toLowerCase()
                        .includes(termo)

            );


        mostrarProjetos(resultado);

    }
);



/* =====================================================
   CONTADOR
===================================================== */

function atualizarNumeroProjetos() {


    const contador =
        document.getElementById(
            "numeroProjetos"
        );


    if (contador) {

        contador.textContent =
            projetos.length;

    }

}



/* =====================================================
   CONTEÚDO DAS AULAS
===================================================== */

function mostrarAula(tipo) {


    const box =
        document.getElementById(
            "aulaInfo"
        );


    const aulas = {


        programacao: {

            titulo:
                "💻 Programação",

            texto:
                "Nesta aula os alunos aprendem lógica, variáveis, condições, repetições e funções."

        },


        eletronica: {

            titulo:
                "⚡ Eletrônica",

            texto:
                "Aprendemos sobre LEDs, resistores, sensores, motores, alimentação e circuitos."

        },


        robotica: {

            titulo:
                "🤖 Robótica",

            texto:
                "Nesta etapa os conhecimentos de programação e eletrônica são utilizados para construir robôs."

        }

    };


    box.innerHTML = `

        <h3>

            ${aulas[tipo].titulo}

        </h3>


        <p>

            ${aulas[tipo].texto}

        </p>

    `;


    box.style.display =
        "block";

}



/* =====================================================
   QUIZ
===================================================== */

function responder(resposta) {


    const resultado =
        document.getElementById(
            "resultadoQuiz"
        );


    if (resposta === "LED") {


        resultado.textContent =
            "✅ Correto! O LED é um componente que pode emitir luz.";


        resultado.style.color =
            "green";


    }

    else {


        resultado.textContent =
            "❌ Resposta incorreta. Tente novamente!";


        resultado.style.color =
            "red";

    }

}



/* =====================================================
   FORMULÁRIO DE CONTATO
===================================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );


contactForm.addEventListener(
    "submit",
    function(event) {


        event.preventDefault();


        alert(
            "Mensagem enviada com sucesso! 🤖"
        );


        contactForm.reset();

    }
);



/* =====================================================
   INICIALIZAÇÃO
===================================================== */

mostrarProjetos();


atualizarNumeroProjetos();
```
