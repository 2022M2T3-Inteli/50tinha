# Inteli - Instituto de Tecnologia e Liderança 

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="https://www.inteli.edu.br/wp-content/uploads/2021/08/20172028/marca_1-2.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
</p>

# Yamaha Planning System

## 50tinha

## Integrantes: 
- <a href="https://www.linkedin.com/in/eric-tachdjian/">Eric Tachdjian</a>
- <a href="https://www.linkedin.com/in/pedromunhozsouza">Pedro Munhoz</a>
- <a href="https://www.linkedin.com/in/israel-carvalho-706133241/">Israel Carvalho</a> 
- <a href="https://www.linkedin.com/in/pablo-ruan-lana-viana-b0818b1a6/">Pablo Viana</a> 
- <a href="https://www.linkedin.com/in/raissa-sabino-2a00a11b1/">Raissa Sabino</a>
- <a href="https://www.linkedin.com/in/jv-oliveira-rodrigues/">João Vitor Oliveira</a> 
- <a href="https://www.linkedin.com/in/isabela-amado-da-rocha-0314b4237/">Isabela Rocha</a>

## 📝 Descrição
  &emsp;  Uma aplicação web criado para o "Capacity Planning" da empresa Yamaha, com a função de auxiliar a gestão dos recursos humanos da empresa.<br>
   &emsp; O site desempenha sua função por meio de informações detalhadas e gráficos interativos, com uma interface simples e direta, visando otimizar a alocação de funcionários quanto a projetos, evitando possíveis sobrecargas e funcionários trabalhando menos que o ideal. Seu principal objetivo é auxiliar os gestores a otimizarem o tempo de seus funcionários sem a necessidade de um excell


## 📁 Estrutura de pastas

```
Alunos inteli (remover essa observação do readme.md após leitura e execução):

Supondo que você é da Turma 4 e Projeto 5, substitua:

T(NUMERO_DA_TURMA)_G(NUMERO_DO_GRUPO)_V(VERSÃO)_Web_application_document.pdf
por
T4_G5_V01_Web_application_document.pdf

Faça o mesmo para a documentação em formato DOCX.
```

|--> documentos<br>
  &emsp;| --> outros <br>
  &emsp;| T(NUMERO_DA_TURMA)_G(NUMERO_DO_GRUPO)_V(VERSÃO)_Web_application_document.pdf<br>
  &emsp;| T(NUMERO_DA_TURMA)_G(NUMERO_DO_GRUPO)_V(VERSÃO)_Web_application_document.docx<br>
|--> imagens<br>
|--> src<br>
  &emsp;|--> Backend<br>
  &emsp;|--> Frontend<br>
| readme.md<br>
| license.txt

Dentre os arquivos presentes na raiz do projeto, definem-se:

- <b>readme.md</b>: arquivo que serve como guia e explicação geral sobre o projeto (o mesmo que você está lendo agora).

- <b>documentos</b>: aqui estarão todos os documentos do projeto. Há também uma pasta denominada <b>outros</b> onde estão presentes aqueles documentos complementares ao <b>web application document</b>.

- <b>imagens</b>: imagens relacionadas ao projeto como um todo (por exemplo imagens do sistema, do grupo, logotipos e afins).

- <b>src</b>: nesta pasta encontra-se todo o código fonte do sistema (existem duas subpastas <b>backend</b> e <b>frontend</b> que contêm, respectivamente, o código do servidor e o código da página web).

## 💻 Configuração para desenvolvimento

Aqui encontram-se todas as instruções necessárias para a instalação de todos os programas, bibliotecas e ferramentas imprescindíveis para a configuração do ambiente de desenvolvimento.

1.  Baixar e instalar o node.js:  [https://nodejs.org/pt-br/](https://nodejs.org/pt-br/) (versão 16.15.1 LTS)
2. Clone o repositório em questão.
3.  No modo administrador, abra o "prompt de comando" ou o "terminal" e, após,  abra a pasta "src/backend" no diretório raiz do repositório clonado e digite o segundo comando:

```sh
npm install
```

Isso instalará todas as dependências definidas no arquivo <b>package.json</b> que são necessárias para rodar o projeto. Agora o projeto já está pronto para ser modificado. Caso ainda deseje iniciar a aplicação, digite o comando abaixo no terminal:

```sh
npm start
```
5. Agora você pode acessar a aplicação através do link http://localhost:1234/
6. O servidor está online.


```
Alunos inteli (remover essa observação do readme.md após leitura e execução):

1. Certifique-se que há um arquivo "package.json" na pasta backend do projeto.

2. Dentro deste arquivo, encontre a propriedade "scripts", e adicione um atributo de nome "start"
com o valor "node <CAMINHO_DO_ARQUIVO_DO_SERVIDOR>." Atenção: "<CAMINHO_DO_ARQUIVO_DO_SERVIDOR>" 
deve ser substituído pelo caminho para o arquivo principal da aplicação, utilizado para subir o
servidor. Por exemplo, se o arquivo utilizado para subir o servidor é "app.js", o atributo start
deve possuir o valor "node app.js".

3. No arquivo utilizado para subir a aplicação, defina a porta padrão de execução para "1234".
````

## 🗃 Histórico de lançamentos

* 0.2.6 - 29/04/2022
    * Criação do Front End da aplicação
    * Criação do WAD
* 0.3.2 - 13/05/2022
    * Criação do Back End
    * Atualização do WAD
* 0.4.3 - 27/05/2022
    * Criação do Banco de Dados utilizando SQL e Node.js
    * Modificação do Back End e Front End
* 0.7.5 - 10/06/2022
    * Primeira versão "apresentavel" do site
    * Junção do Back com o Front End
    * Banco de Dados começa a ser integrado
* 1.1.1 - 24/06/2022
    * Gráficos funcionais linkados com o Banco de Dados
    * Tabelas finalizadas
    * Front End Finalizado

## 📋 Licença/License

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Spidus/Teste_Final_1">YAMAHA PLANNING SYSTEM</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.yggbrasil.com.br/vr">Inteli, Eric Tachdjian, Pablo Viana, Israel Carvalho, Pedro Munhoz, Isabela Rocha, Raissa Sabino, João Vitor Oliveira</a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>

## 🎓 Referências

Aqui estão as referências usadas no projeto:

1. <https://creativecommons.org/share-your-work/>
