function limparCampos() {
    nome_emp.value = '';
    cep_emp.value = '';
    num_emp.value = '';
    logr_emp.value = '';
}

function aguardar() {
    btn_Cadastrar.disabled = false;
    div_erro.style.display = 'none';
    div_sucess.style.display = 'none';
    div_brancos.style.display = 'none';

}

function finalizar_aguardar() {
    btn_Cadastrar.disabled = false;
    div_erro.style.display = 'block';
}


function cadLocal(cep, rua ,bairro, uf ,cidade,numero,complemento) {
    aguardar();
  
    fetch(`local/cadastrar/?cep=${cep}&rua=${rua}&bairro=${bairro}&uf=${uf}&cidade=${cidade}&numero${numero}&complemento${complemento}`, {
        method: "POST"
    }).then(js => {
        console.log(js.status);      
        if (rua == '' || cep == '' || bairro == '' || uf == '' || cidade == '' || numero == '') {
            console.log('Preencha todos os campos');
            limparCampos();
            div_brancos.style.display = 'block';
            btn_Cadastrar.disabled = true;
        }  else{
            if (js.status === 200) {
                console.log('Cadastrado com Sucesso!');
                div_sucess.style.display = 'block';
                btn_Cadastrar.disabled = false;
                limparCampos();
            } else {
                console.log('Erro de Cadastro!');
                finalizar_aguardar();
            }
        }         
    });
    return false;
}

getUsuariosId(1);

function getUsuariosId(id) {

    fetch(`usuarios/?id=${id}`, {
        method: "GET"
    }).then(js => {
        return js.json();
    }).then(rs => {
        console.log(rs);
    });
    return false;
}