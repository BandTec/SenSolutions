function limparCampos() {
    exampleInputUser.value = '';
    exampleInputEmail.value = '';
    exampleInputPassword.value = '';
    exampleRepeatPassword.value = '';
  }

  function aguardar() {
    btn_Cadastrar.disabled = true;
    div_erro.style.display = 'none';
    div_sucess.style.display = 'none';
    div_brancos.style.display ='none';
    div_erro_BD.style.display = 'none';
    
  }

  function finalizar_aguardar() {
    btn_Cadastrar.disabled = false;
    div_erro.style.display = 'block';
    
  }


  function cadUsuario(user, email, password, confirmPassword) {
    aguardar();
    fetch(`usuarios/cadastrar/?user=${user}&email=${email}&password=${password}`, {
      method: "POST"
    }).then(js => {
      console.log(js.status);
      if(user == '' || email == '' ||  password == '' || confirmPassword == '' ){
        console.log('Preencha todos os campos');
        limparCampos();
        div_brancos.style.display ='block';
        btn_Cadastrar.disabled = false;
      }else if(password == confirmPassword){
        if (js.status === 200) {
        console.log('Cadastrado com Sucesso!');
        div_sucess.style.display = 'block';
        btn_Cadastrar.disabled = false;
        limparCampos(); 
        } else if(js.status === 500){         
        console.log('Erro de Cadastro!'); 
        div_erro_BD.style.display ='block';
        }
      }else{
        console.log('Senhas estao Diferentes!');
        finalizar_aguardar();
      }
    });
    return false;
  }


  // function cadastroUsuario(user, email, password, confirmPassword) {
  //   aguardar();
    
  //   fetch(`usuarios/cadastro/?user=${user}&email=${email}&password=${password}`, {
  //     method: "POST"
  //   }).then(js => {
  //     console.log(js.status);
  //     if (user == '' || email == '' || password == '' || confirmPassword == '') {
  //       console.log('Preencha todos os campos');
  //       limparCampos();
  //       div_brancos.style.display = 'block';
  //       btn_Cadastrar.disabled = false;
  //     } else if (password == confirmPassword) {
  //       if (js.status === 200) {
  //         console.log('Cadastrado com Sucesso!');
  //         div_sucess.style.display = 'block';
  //         btn_Cadastrar.disabled = false;
  //         limparCampos();
  //       } else {
  //         console.log('Erro de Cadastro!');
  //         finalizar_aguardar();
  //       }
  //     } else {
  //       console.log('Senhas estao Diferentes!');
  //       finalizar_aguardar();
  //     }
  //   });
  //   return false;
  // }

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