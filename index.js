// Biblioteca INQUIRER
const { select } = require('@inquirer/prompts');

const start = async () => {
    
    while(true){

        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    nome: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        });

        switch(opcao){
            case "cadastrar":
                console.log("vamos cadastrar")
                break;
            case "Listar":
                console.log("vamos Listar")
                break;
            case "sair":
                console.log("Até a próxima! Tenha um otimo dia e realize todas as suas metas!")
                return
            }

    }
    
}

start();