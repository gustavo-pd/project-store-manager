<h1>Store Manager</h1>

<h2>Índice</h2>
<h4>- <a href="#context">Contexto</a></h4>
<h4>- <a href="#tecnologies">Técnologias utilizadas</a></h4>
<h4>- <a href="#development">Desenvolvimento</a></h4>
<h4>- <a href="#howtouse">Como executar o projeto</a></h4>

<h2 id="context">Contexto</h2>

<p>O Blogs API é um projeto de back-end, onde foi feito uma API CRUD para uma loja.</p>
<p>Esse projeto foi desenvolvido durante o curso da Trybe com o objetivo de consolidar os estudos e construir uma API RESTful CRUD com a arquitetura MSC, foi realizado em Abril de 2022, no módulo de Back-end.</p>


<h2 id="tecnologies">Técnologias utilizadas</h2>

<ul>
  <li>NodeJS</li>
</ul>

<h2 id="development">Desenvolvimento</h2>

<p>Neste projeto pude arquitetar e desenvolver uma API de um CRUD (seguindo os princípios RESTful) para uma loja, utilizando o NodeJS. Foram criadas tabelas no MySQL, onde é possível criar, editar, deletar e ler produtos e vendas.</p>

<h2 id="howtouse">Como executar o projeto</h2>

  1. Clone o repositório:
    </br>
    * `git clone git@github.com:gustavo-pd/project-store-manager`.
    </br>
    Entre na pasta do repositório que você acabou de clonar:
    </br>
      * `cd project-store-manager`
</br>

  2. Instale as dependências:
    </br>
    * `npm install`
</br>

  3. Configure as variáveis de ambiente:
    </br>
    * Crie o arquivo .env na raiz do projeto e crie as variáveis de ambiente utilizando seu user e password do Mysql.
    </br>
```sh
MYSQL_HOST=localhost
MYSQL_USER=seuuser
MYSQL_PASSWORD=seupassword
PORT=3000
```
</br>

  4. Copie o código do arquivo StoreManager.sql da raíz para o MySql e execute.
    </br>
    * `as tabelas do banco de dados serão criadas`
</br>

  5. Inicie a aplicação, ela rodará na porta 3000:
    </br>
    * `npm run start`
    </br>
    * `http://localhost:3000`
</br>
