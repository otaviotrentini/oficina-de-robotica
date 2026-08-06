function mostrarMensagem(){

alert(
"Bem-vindo à Oficina de Robótica! 🤖\nVamos aprender tecnologia e criar projetos incríveis!"
);

}



function resposta(opcao){


let resultado = document.getElementById("resultado");


if(opcao === "JavaScript"){


resultado.innerHTML =
"✅ Resposta correta! JavaScript cria interações em páginas web.";


resultado.style.color="green";


}

else{


resultado.innerHTML =
"❌ Resposta incorreta. Tente novamente!";


resultado.style.color="red";


}


}