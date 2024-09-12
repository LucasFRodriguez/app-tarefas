// Biblioteca INQUIRER
const { select, input, checkbox } = require('@inquirer/prompts');

let meta = {
    value: 'Criar novas metas!',
    checked: false,
};

let metas = [ meta ];

const cadastrarMeta = async () => {
    const meta = await input({message: "Digite sua nova meta:"})

    // apenas entra nesse if caso o usuario nao escrever nada na hora de criar uma nova meta!
    if(meta.length == 0){
        console.log('A meta não pode ser vazia!')
        return
    }
    metas.push({ value: meta, checked: false })
};

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as Setas para mudar de meta, o Espaço para marcar ou desmarcar e o Enter para finalizar essa etapa.",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) =>{
        m.checked = false
    })

    if(respostas.length == 0){
        console.log("Nenhuma meta selecionada.")
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true 

    })

    console.log('Meta(s) marcadas como concluidas')

};

const metasRealizadas = async () => {
    const realizadas = metas.filter(( meta ) => { 
        return meta.checked
     })

     if(realizadas.length == 0){
        console.log("Não existem metas realizadas! :(")
        return
     }

     await select({
        message: "Metas Realizadas " + realizadas.length,
        choices: [...realizadas]
     })

}

const metasAbertas = async () => {
    const abertas = metas.filter(( meta ) => { 
        // Outro farma !meta.checked = altera o valro do boleano...
        return meta.checked != true
     })

     if(abertas.length == 0){
        console.log("Não existem metas Abertas!")
        return
     }

     await select({
        message: "Metas Abertas " + abertas.length,
        choices: [...abertas]
     })

}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map( ( meta ) => {
        return { value: meta.value, checked: false }
     })

    const itemsADeletar = await checkbox({
        message: "Selecione a Meta que deseja deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if(itemsADeletar.length == 0){
        console.log("Nenhum item para deletar!")
        return
    }

    itemsADeletar.forEach( ( item ) => { 
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })
    console.log("Meta(s) deletada(s) com sucesso!");
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
                    name: "Listar metas",
                    value: "listar"
                },                
                {
                    name: "Metas Realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas Abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar Metas",
                    value: "deletar"
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
            case "listar":
                await listarMetas();
                break;
            case "realizadas":
                await metasRealizadas();
                break;
            case "abertas":
                await metasAbertas();
                break;
            case "deletar":
                await deletarMetas();
                break;
            case "sair":
                console.log("Até a próxima! Tenha um otimo dia e realize todas as suas metas!")
                return
            }

    }
    
}

start();