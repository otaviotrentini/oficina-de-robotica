/* ==========================================
   ROBOLAB
   JAVASCRIPT PRINCIPAL
========================================== */


/* ==========================================
   MENU
========================================== */

const menuButton =
    document.getElementById("menuButton");

const navbar =
    document.getElementById("navbar");


menuButton.addEventListener(
    "click",
    function () {

        navbar.classList.toggle("open");

    }
);


/* ==========================================
   NAVEGAÇÃO ENTRE ABAS
========================================== */

const navButtons =
    document.querySelectorAll(
        ".nav-button"
    );


const sections =
    document.querySelectorAll(
        ".page-section"
    );


function abrirSecao(nome) {

    sections.forEach(
        function (section) {

            section.classList.remove(
                "active-section"
            );

        }
    );


    const secao =
        document.getElementById(nome);


    if (secao) {

        secao.classList.add(
            "active-section"
        );

    }


    navButtons.forEach(
        function (button) {

            button.classList.remove(
                "active"
            );

            if (
                button.dataset.section
                === nome
            ) {

                button.classList.add(
                    "active"
                );

            }

        }
    );


    navbar.classList.remove("open");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


navButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                abrirSecao(
                    button.dataset.section
                );

            }
        );

    }
);


/* ==========================================
   BOTÕES DA PÁGINA INICIAL
========================================== */

document
    .getElementById("startButton")
    .addEventListener(
        "click",
        function () {

            abrirSecao("aulas");

        }
    );


document
    .getElementById("projectsButton")
    .addEventListener(
        "click",
        function () {

            abrirSecao("projetos");

        }
    );


/* ==========================================
   MODO ESCURO
========================================== */

const themeButton =
    document.getElementById(
        "themeButton"
    );


themeButton.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "dark"
        );


        if (
            document.body.classList.contains(
                "dark"
            )
        ) {

            themeButton.textContent =
                "☀️";

            localStorage.setItem(
                "tema",
                "dark"
            );

        } else {

            themeButton.textContent =
                "🌙";

            localStorage.setItem(
                "tema",
                "light"
            );

        }

    }
);


if (
    localStorage.getItem("tema")
    === "dark"
) {

    document.body.classList.add("dark");

    themeButton.textContent =
        "☀️";

}


/* ==========================================
   AULAS
========================================== */

const lessonButtons =
    document.querySelectorAll(
        ".lesson-button"
    );


const lessonContent =
    document.getElementById(
        "lessonContent"
    );


const aulas = {

    programacao: {

        titulo:
            "💻 Programação",

        texto:
            "Nesta aula você aprende lógica de programação, variáveis, condições, repetição e funções. Esses conhecimentos são importantes para programar robôs e sistemas automatizados."

    },


    eletronica: {

        titulo:
            "⚡ Eletrônica",

        texto:
            "Você aprenderá sobre LEDs, resistores, sensores, motores, fios, protoboard e circuitos elétricos básicos."

    },


    robotica: {

        titulo:
            "🤖 Robótica",

        texto:
            "A robótica reúne programação, eletrônica e mecânica. Nesta aula você aprende como transformar essas áreas em projetos funcionais."

    },


    inteligencia: {

        titulo:
            "🧠 Sistemas Inteligentes",

        texto:
            "Sensores permitem que um projeto perceba o ambiente. Com programação, podemos fazer o sistema tomar decisões de acordo com essas informações."

    }

};


lessonButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const tipo =
                    button.dataset.lesson;


                const aula =
                    aulas[tipo];


                lessonContent.innerHTML = `

                    <h3>
                        ${aula.titulo}
                    </h3>

                    <p>
                        ${aula.texto}
                    </p>

                `;


                lessonContent.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    }
);


/* ==========================================
   PROJETOS
========================================== */

const newProjectButton =
    document.getElementById(
        "newProjectButton"
    );


const projectForm =
    document.getElementById(
        "projectForm"
    );


const cancelProjectButton =
    document.getElementById(
        "cancelProjectButton"
    );


newProjectButton.addEventListener(
    "click",
    function () {

        projectForm.classList.remove(
            "hidden"
        );

        projectForm.scrollIntoView({
            behavior: "smooth"
        });

    }
);


cancelProjectButton.addEventListener(
    "click",
    function () {

        projectForm.classList.add(
            "hidden"
        );

        limparFormulario();

    }
);


/* ==========================================
   IMAGEM
========================================== */

const projectImage =
    document.getElementById(
        "projectImage"
    );


const imagePreview =
    document.getElementById(
        "imagePreview"
    );


const imagePreviewContainer =
    document.getElementById(
        "imagePreviewContainer"
    );


let imagemAtual = "";


projectImage.addEventListener(
    "change",
    function () {

        const arquivo =
            projectImage.files[0];


        if (!arquivo) {

            imagemAtual = "";

            imagePreviewContainer
                .classList
                .add("hidden");

            return;

        }


        if (
            !arquivo.type.startsWith(
                "image/"
            )
        ) {

            alert(
                "Escolha uma imagem válida."
            );

            projectImage.value = "";

            return;

        }


        const leitor =
            new FileReader();


        leitor.onload =
            function (evento) {

                imagemAtual =
                    evento.target.result;


                imagePreview.src =
                    imagemAtual;


                imagePreviewContainer
                    .classList
                    .remove("hidden");

            };


        leitor.readAsDataURL(
            arquivo
        );

    }
);


/* ==========================================
   BANCO DE PROJETOS
========================================== */

let projetos =
    JSON.parse(
        localStorage.getItem(
            "projetosRoboLab"
        )
    ) || [];


/* ==========================================
   SALVAR PROJETOS
========================================== */

function salvarProjetos() {

    localStorage.setItem(
        "projetosRoboLab",
        JSON.stringify(projetos)
    );

}


/* ==========================================
   MOSTRAR PROJETOS
========================================== */

const projectGrid =
    document.getElementById(
        "projectGrid"
    );


function mostrarProjetos(
    lista = projetos
) {

    projectGrid.innerHTML = "";


    if (lista.length === 0) {

        projectGrid.innerHTML = `

            <div class="content-box">

                <h3>
                    🤖 Nenhum projeto cadastrado
                </h3>

                <p>
                    Clique em "+ Novo projeto"
                    para cadastrar seu primeiro projeto.
                </p>

            </div>

        `;

        atualizarEstatistica();

        return;

    }


    lista.forEach(
        function (projeto) {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "project-card";


            if (projeto.imagem) {

                card.innerHTML += `

                    <img
                        src="${projeto.imagem}"
                        alt="${projeto.nome}">

                `;

            } else {

                card.innerHTML += `

                    <div class="project-placeholder">
                        🤖
                    </div>

                `;

            }


            card.innerHTML += `

                <div class="project-content">

                    <h3>
                        ${projeto.nome}
                    </h3>

                    <p>
                        ${projeto.descricao}
                    </p>

                    <span class="project-tag">
                        ${projeto.tecnologia}
                    </span>

                    <br>

                    <button
                        class="delete-project"
                        data-id="${projeto.id}">

                        🗑️ Excluir

                    </button>

                </div>

            `;


            projectGrid.appendChild(
                card
            );

        }
    );


    document
        .querySelectorAll(
            ".delete-project"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        excluirProjeto(
                            Number(
                                button.dataset.id
                            )
                        );

                    }
                );

            }
        );


    atualizarEstatistica();

}


/* ==========================================
   SALVAR NOVO PROJETO
========================================== */

const saveProjectButton =
    document.getElementById(
        "saveProjectButton"
    );


saveProjectButton.addEventListener(
    "click",
    function () {

        const nome =
            document.getElementById(
                "projectName"
            ).value.trim();


        const tecnologia =
            document.getElementById(
                "projectTech"
            ).value.trim();


        const descricao =
            document.getElementById(
                "projectDescription"
            ).value.trim();


        if (!nome) {

            alert(
                "Digite o nome do projeto."
            );

            return;

        }


        if (!descricao) {

            alert(
                "Digite uma descrição."
            );

            return;

        }


        const novoProjeto = {

            id:
                Date.now(),

            nome:
                nome,

            tecnologia:
                tecnologia ||
                "Robótica",

            descricao:
                descricao,

            imagem:
                imagemAtual

        };


        projetos.push(
            novoProjeto
        );


        salvarProjetos();

        mostrarProjetos();

        limparFormulario();


        projectForm.classList.add(
            "hidden"
        );


        alert(
            "✅ Projeto salvo com sucesso!"
        );

    }
);


/* ==========================================
   LIMPAR FORMULÁRIO
========================================== */

function limparFormulario() {

    document.getElementById(
        "projectName"
    ).value = "";


    document.getElementById(
        "projectTech"
    ).value = "";


    document.getElementById(
        "projectDescription"
    ).value = "";


    projectImage.value = "";


    imagemAtual = "";


    imagePreview.src = "";


    imagePreviewContainer
        .classList
        .add("hidden");

}


/* ==========================================
   EXCLUIR
========================================== */

function excluirProjeto(id) {

    const confirmar =
        confirm(
            "Deseja excluir este projeto?"
        );


    if (!confirmar) {
        return;
    }


    projetos =
        projetos.filter(
            function (projeto) {

                return projeto.id !== id;

            }
        );


    salvarProjetos();

    mostrarProjetos();

}


/* ==========================================
   PESQUISA
========================================== */

const searchProject =
    document.getElementById(
        "searchProject"
    );


searchProject.addEventListener(
    "input",
    function () {

        const pesquisa =
            searchProject.value
                .toLowerCase();


        const resultados =
            projetos.filter(
                function (projeto) {

                    return (

                        projeto.nome
                            .toLowerCase()
                            .includes(
                                pesquisa
                            )

                        ||

                        projeto.tecnologia
                            .toLowerCase()
                            .includes(
                                pesquisa
                            )

                        ||

                        projeto.descricao
                            .toLowerCase()
                            .includes(
                                pesquisa
                            )

                    );

                }
            );


        mostrarProjetos(
            resultados
        );

    }
);


/* ==========================================
   ESTATÍSTICA
========================================== */

function atualizarEstatistica() {

    document.getElementById(
        "totalProjetos"
    ).textContent =
        projetos.length;

}


/* ==========================================
   QUIZ
========================================== */

const perguntas = [

    {
        pergunta:
            "Qual componente emite luz?",

        opcoes:
            [
                "LED",
                "Sensor",
                "Motor",
                "Jumper"
            ],

        resposta:
            "LED"
    },


    {
        pergunta:
            "Qual placa é muito usada em robótica educacional?",

        opcoes:
            [
                "Arduino",
                "Monitor",
                "Teclado",
                "Mouse"
            ],

        resposta:
            "Arduino"
    },


    {
        pergunta:
            "Qual componente detecta informações do ambiente?",

        opcoes:
            [
                "Sensor",
                "LED",
                "Resistor",
                "Jumper"
            ],

        resposta:
            "Sensor"
    },


    {
        pergunta:
            "Qual linguagem é usada para adicionar interatividade a páginas web?",

        opcoes:
            [
                "JavaScript",
                "HTML",
                "CSS",
                "Arduino"
            ],

        resposta:
            "JavaScript"
    },


    {
        pergunta:
            "Qual componente pode movimentar um robô?",

        opcoes:
            [
                "Motor",
                "LED",
                "Resistor",
                "Protoboard"
            ],

        resposta:
            "Motor"
    }

];


let perguntaAtual = 0;

let pontos = 0;

let respondeu = false;


const quizNumber =
    document.getElementById(
        "quizNumber"
    );


const quizScore =
    document.getElementById(
        "quizScore"
    );


const quizQuestion =
    document.getElementById(
        "quizQuestion"
    );


const quizOptions =
    document.getElementById(
        "quizOptions"
    );


const quizFeedback =
    document.getElementById(
        "quizFeedback"
    );


const nextQuestion =
    document.getElementById(
        "nextQuestion"
    );


function carregarPergunta() {

    const pergunta =
        perguntas[
            perguntaAtual
        ];


    respondeu = false;


    quizNumber.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;


    quizScore.textContent =
        `Pontos: ${pontos}`;


    quizQuestion.textContent =
        pergunta.pergunta;


    quizOptions.innerHTML =
        "";


    quizFeedback.textContent =
        "";


    nextQuestion.classList.add(
        "hidden"
    );


    pergunta.opcoes.forEach(
        function (opcao) {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "quiz-option";


            button.textContent =
                opcao;


            button.addEventListener(
                "click",
                function () {

                    responder(
                        opcao,
                        button
                    );

                }
            );


            quizOptions.appendChild(
                button
            );

        }
    );

}


function responder(
    resposta,
    botao
) {

    if (respondeu) {
        return;
    }


    respondeu = true;


    const pergunta =
        perguntas[
            perguntaAtual
        ];


    const botoes =
        document.querySelectorAll(
            ".quiz-option"
        );


    botoes.forEach(
        function (item) {

            item.disabled = true;


            if (
                item.textContent
                === pergunta.resposta
            ) {

                item.classList.add(
                    "correct"
                );

            }

        }
    );


    if (
        resposta
        === pergunta.resposta
    ) {

        pontos += 10;


        botao.classList.add(
            "correct"
        );


        quizFeedback.textContent =
            "✅ Resposta correta! +10 pontos";

    } else {

        botao.classList.add(
            "wrong"
        );


        quizFeedback.textContent =
            "❌ Resposta incorreta.";

    }


    quizScore.textContent =
        `Pontos: ${pontos}`;


    nextQuestion.classList.remove(
        "hidden"
    );

}


nextQuestion.addEventListener(
    "click",
    function () {

        perguntaAtual++;


        if (
            perguntaAtual
            >= perguntas.length
        ) {

            finalizarQuiz();

        } else {

            carregarPergunta();

        }

    }
);


function finalizarQuiz() {

    quizNumber.textContent =
        "Resultado final";


    quizQuestion.textContent =
        "🏆 Quiz concluído!";


    quizOptions.innerHTML =
        "";


    quizFeedback.innerHTML = `

        <h2>
            Você fez ${pontos} pontos!
        </h2>

        <p>
            Parabéns por completar o desafio.
        </p>

        <button
            id="restartQuiz"
            class="primary-button">

            🔄 Jogar novamente

        </button>

    `;


    nextQuestion.classList.add(
        "hidden"
    );


    document
        .getElementById(
            "restartQuiz"
        )
        .addEventListener(
            "click",
            function () {

                perguntaAtual = 0;

                pontos = 0;

                carregarPergunta();

            }
        );

}


/* ==========================================
   FORMULÁRIO DE CONTATO
========================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );


contactForm.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();


        const nome =
            document.getElementById(
                "contactName"
            ).value;


        alert(
            `📩 Obrigado, ${nome}! Sua mensagem foi registrada.`
        );


        contactForm.reset();

    }
);


/* ==========================================
   INICIALIZAÇÃO
========================================== */

mostrarProjetos();

atualizarEstatistica();

carregarPergunta();