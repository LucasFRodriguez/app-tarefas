// Biblioteca INQUIRER
const { select, input } = require('@inquirer/prompts');

let meta = {
    value: 'Criar novas metas!',
    checked: false,
};

let metas = [ meta ];

const cadastrarMeta = async () => {
    const meta = await input({message: "Digite sua nova meta:"})

    if(meta.length == 0){
        console.log('A meta não pode ser vazia!')
        return
    }
    metas.push({ value: meta, checked: false })
}

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
                await cadastrarMeta();
                console.log(metas);
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