
# Next.Js APP Colaborador & Gestor

Um painel de gestão básica de Ordens de serviço, com visão de Colaborador e Gestor.




## Instalação

Depois de instalado a ENDPOINT do aplicativo (Caso não tenha instalado acesse: [nest-api-desafio](https://github.com/DanielXavierJob/nest-api-desafio)) siga estes passos:

Antes de começar a instalação, editar os arquivos ```src/service/auth.ts``` e ```src/service/axios.ts```, alterar ```192.168.0.16``` para sua ENDPOINT, após isso prossiga com a instalação.

Com docker

```bash
  docker build -t next-app-desafio .
  docker run -p 3000:3000 next-app-desafio
```
Com npm

```bash
  npm install
  npm run build
  npm start
```
A URL de acesso será http://localhost:3000
## Aprendizados

Recebi a instrução de fazer o Projeto de Seleção da MonteNegro Hub no dia 03/09/2022
e a data de entrega até o dia 08/09/2022, as linguagens eram 
Next.Js (Front), Nest.Js(Back), MySQL (database), Docker. Com muito esforço e dedicação consegui terminar este aplicativo com todos Bonus do Desafio e mais ainda. Acredito fortemente em que podemos dar nosso melhor independente das circustancias.
## Stack utilizada

**Front-end:** React, Next.JS, Axios, TailwindCSS, Mui, Docker

**Back-end:** Node, Nest.Js, NodeMailer, TypeORM, Docker

## Documentação + Screenshots

Imagens de demonstração do Painel com explicações

## Auth

#### Area de login

![Area de Login](https://i.imgur.com/hzLs34y.jpg)

## Forget

#### Area de recuperação de Senha
#### Primeira Etapa: Inserir o e-mail.
![Recuperar Senha](https://i.imgur.com/gkaK7Q1.jpg)

#### E-mail de recuperação: obter o código enviado para o e-mail.
![E-mail da Recuperação](https://i.imgur.com/zmTVYZW.jpg)


#### Segunda Etapa: Inserir o código que foi enviado para o e-mail.
![Recuperar Senha - Etapa 1](https://i.imgur.com/awdaqa0.jpg)

### Ultima Etapa: Inserir nova senha
![Recuperar Senha - Etapa Final](https://i.imgur.com/CRTz2yR.jpg)


## Visão do Colaborador

#### Dashboard do Colaborador, onde ele poderá ver as Ordens de serviços ativas em seu nome
![Dashboard - Visão Colaborador](https://i.imgur.com/ywAEqWw.jpg)

#### Demonstração do Card da ordem de serviço
![Ordem de serviço - Visão Colaborador](https://i.imgur.com/gVU9ZJ1.jpg)

#### Ao clicar no botão Finalizar será pedido para dar uma solução a resolução do problema
![Finalizar Ordem de serviço - Visão Colaborador](https://i.imgur.com/UoczsxZ.png)

## Visão do Gestor

#### Grafico contendo todas as Ordens de serviços abertas por dia durante o mês
![Dashboard - Visão Gestor](https://i.imgur.com/IkBQ7eO.jpg)

#### Tabela de visão de Colaboradores
![Colaboradores - Visão Gestor](https://i.imgur.com/j0HkhSE.jpg)

#### Tabela de visão dos Clientes
![Clientes - Visão Gestor](https://i.imgur.com/wlstiKx.jpg)

#### Tabela de visão das Ordens de serviço
![Ordens de serviço - Visão Gestor](https://i.imgur.com/WYRb7FP.jpg)

#### Demonstração de Filtragem nas Ordens de Serviço (Este metodo se aplica para todas as tabelas do Painel)
![Filtragem - Ordem de serviço - Visão Gestor](https://i.imgur.com/Ct96amQ.jpg)

#### Demonstração de Adição de um novo Cliente
![Adicionar Cliente - Visão Gestor](https://i.imgur.com/SzMGYZJ.jpg)

#### Demonstração de Adição de um novo Colaborador
![Adicionar Colaborador - Visão Gestor](https://i.imgur.com/V4HFJUS.jpg)

#### Demonstração de adição de uma nova Ordem de serviço
![Adicionar Nova Ordem de serviço - Visão Gestor](https://i.imgur.com/jD4I8k2.jpg)

#### Ao clicar em "Nome do Cliente" irá abrir um modal contendo um SELECT com os nomes dos Clientes, a primeira opção será "Adicionar um novo Cliente" onde será exibido outro Modal para adicionar um novo cliente, após criar um novo cliente, ele será automaticamente selecionado para criar a Ordem de serviço
![Adicionar Nova Ordem de serviço (Escolher cliente) - Visão Gestor](https://i.imgur.com/N4s0DHM.jpg)

![Adicionar Nova Ordem de serviço (Escolher cliente - Select) - Visão Gestor](https://i.imgur.com/Ksm18PI.jpg)


#### Ao clicar em "Nome do Colaborador" irá abrir um modal contendo um SELECT com os nomes dos Colaboradores, a primeira opção será "Adicionar um novo Colaborador" onde será exibido outro Modal para adicionar um novo Colaborador, após criar um novo colaborador (ou selecionar), ele será automaticamente selecionado para a criação de Ordem de serviço
![Adicionar Nova Ordem de serviço (Escolher Colaborador)](https://i.imgur.com/H88OnjU.png)


#### Histórico de Ordens de serviço dos colaboradores, nesta tabela será exibido todas as ordens de serviço completas.
![Histórico - Visão Gestor](https://i.imgur.com/NbS1U1m.jpg)

#### Ao dar um duplo clique em qualquer linha da tabela, irá ser exibido um modal contendo as informações dessa Ordem de serviço, incluindo data de fechamento e solução.
![Modal de Ordem de Serviço no Historico - Visão Gestor](https://i.imgur.com/m8apGio.jpg)
