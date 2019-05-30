verificarAutenticacao();

function verificarAutenticacao() {

    if (sessionStorage.usuario_bandtec != undefined) {
        window.location.href = 'Dashboard.html';
    }
}

function entrar() {
    aguardar();
    var formulario = new URLSearchParams(new FormData(form_login));
    fetch("/usuarios/entrar", {
        method: "POST",
        body: formulario
    }).then(function (response) {
        if (inputEmail.value == '' || inputPassword.value == '') {
            div_brancos.style.display = 'block';
            img_aguarde.style.display = 'none';
            btn_entrar.disabled = false;
        } else {
            if (response.ok) {

                response.json().then(function (resposta) {

                    sessionStorage.usuario_bandtec = resposta.nomeUsuario;
                    verificarAutenticacao();
                });
            } else {
                console.log('Erro de login!');
                finalizar_aguardar();
            }
        }
    });

    return false;
}

function aguardar() {
    btn_entrar.disabled = true;
    img_aguarde.style.display = 'block';
    div_erro.style.display = 'none';
    div_brancos.style.display = 'none';
}

function finalizar_aguardar() {
    btn_entrar.disabled = false;
    img_aguarde.style.display = 'none';
    div_erro.style.display = 'block';
}

