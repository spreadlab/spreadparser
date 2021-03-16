# Spreadparser

Módulo JavaScript que permite uso de dados de planilhas públicas do Google Spreadsheet em formato amigável para aplicações frontend.
Não requer uso de chaves de API ou serviços de terceiros, ideal para protótipos e pequenas aplicações.

## Motivação

Várias vezes me vi prototipando uma pequena aplicação e para evitar utilizar um banco de dados ou algum serviço de hospedagem de dados preferi usar uma planilha.
Planilhas são práticas e mesmo pessoas que não programam são capazes de manipula-las, o que as torna boas fontes de dados fáceis de atualizar quando não temos muitos dados para gerenciar.

Então resolvi criar o Spreadparser para poder importá-lo quando necessário. 
Spreadparser deve ser compatível com projetos node, aplicações frontend com módulos Ecma Script e também pode ser usado como dependência via url.

## Requisitos

* node versão 10 ou superior

## Instalação

Para uso com npm:
```Shell
npm install spreadparser
```

Para uso com yarn:

```Shell
yarn add spreadparser
```

## Uso simplificado

O Spreadparser pode ser usado como módulo EcmaScript em aplicações web da seguinte forma:

```JavaScript
import Spreadparser from "spreadparser";

const options = {
  "slugify": true,
  "offset": 2,
  "limit": 4
  "nested": true
};

fetch(spreadsheetUrl)
    .then(response => response.json())
    .then(data => Spreadparser.parse(data, options))
```

## Spreadparser.parse(data, [options])

A função `Spreadparser.parse` recebe os dados retornados já serializados e retorna um objeto com uma lista de itens em formato amigável.
É possível informar um objeto `options` para essa função alterando o resultado obtido.

| Nome | Valor inicial | Tipo | É opcional? | Descrição|
| --- | --- | --- | --- | --- |
| slugify | true | Boolean | Sim | Define se títulos devem ou não ser transformados em slugs | 
| offset | 0 | Number | Sim | Define um offset para início da lista de resposta |
| limit | data.length | Number | Sim | Define a quantidade máxima de itens a serem retornados | 
| nested | true | Boolean | Sim | Define se os títulos da planilha podem ser interpretados como valores aninhados de objetos |  

### slugify

Ao declarar `{ "slugify": true }` como opção do `Spreadparser.parse` os títulos das planilha serão aderentes ao padrão slug.
Assim, se tivermos uma planilha com os dados:

| Nome | Idade da Pessoa | Profissão |
| - | - | - |
| John | 33 | Programador | 
| Santa Claus | 50 | Papai Noel | 

Ao aplicar `Spreadparser.parse(data, {"slugify": true})` o retorno dos dados atenderá o seguinte padrão:

```JSON
{
  "data": [{
    "nome": "John",
    "idade-da-pessoa": 33,
    "profissao": "Programador"
  },{
    "nome": "Santa Claus",
    "idade-da-pessoa": 50,
    "profissao": "Papai Noel"
  }]
}
```

Perceba que os nomes dos atributos sofrerão alterações, removendo acentos, substituindo espaços e aplicando caixa baixa no título. No entanto os valores dos atributos não sofreram alterações.

### nested

A opção nested permite criar objetos complexos usando uma notação simples nos títulos das planilhas, dessa forma se tivermos os seguintes dados:

| Pokemon | Tipo | Treinador__nome | Treinador__Ginásio |
| - | - | - | - |
| Onix | Pedra | Brock | Pewter |
| Psyduck | Água | Misty | Cerulean | 

Ao aplicar `Spreadparser.parse(data, {"nested": true})` o retorno dos dados atenderá o seguinte padrão:

```JSON
{
  "data": [{
    "pokemon": "Onix",
    "tipo": "Pedra",
    "treinador": {
      "nome": "Brock",
      "ginasio": "Pewter"
    }
  },{
    "pokemon": "Psyduck",
    "tipo": "Água",
    "treinador": {
      "nome": "Misty",
      "ginasio": "Cerulean"
    }
  }]
}
```

Note que o separador entre atributo pai e filho é o duplo underline, ou `__` .


## Spreadparser.find(data, search, [options])

O método `find` retorna a primeira ocorrência que atende a uma busca no formato chave e valor, onde a chave é sempre tipo String e o valor pode ser String ou RegExp. Exemplo:

Dados da planilha:

| Pokemon | Tipo | Treinador__nome | Treinador__Ginásio |
| - | - | - | - |
| Onix | Pedra | Brock | Pewter |
| Psyduck | Água | Misty | Cerulean | 

```JavaScript
Spreadparser.find(data, {tipo: "Pedra"})
```

Deve retornar:
```JSON
{
  "data": [{
    "pokemon": "Onix",
    "tipo": "Pedra",
    "treinador": {
      "nome": "Brock",
      "ginasio": "Pewter"
    }
  }]
}
```

Também pode ser feita uma busca por valores internos associados a opção `nested`:

```JavaScript
Spreadparser.find(data, {"treinador__nome": "Brock"})
```

Nesse caso a busca seria feita pelo primeiro item da lista retornada que possua o valor `treinador.nome` igual a `Brock`.

## Spreadparser.findAll(data, search, [options])

O método `findAll` funciona de forma semelhante ao método `find` com a única diferença de que `findAll` retorna uma lista com todos os valores que correspondem a busca informada no padrão chave e valor.

## Spreadparser.getSpreadsheetUrl(spreadSheetId, [sheetId])

O método `getSpreadsheetUrl` pode ser usado para obter url pública da resposta de uma planilha do Google Spreadsheet no formato JSON.

```JavaScript
const url = Spreadparser.getSpreadsheetUrl("abc123");
console.log(url);
> "https://spreadsheets.google.com/feeds/cells/abc123/1/public/full?alt=json"
```

Também pode ser informado o id de uma aba específica da planilha desejada, assim:
```JavaScript
const url = Spreadparser.getSpreadsheetUrl("abc123", 5);
console.log(url);
> "https://spreadsheets.google.com/feeds/cells/abc123/5/public/full?alt=json"
```

### Roadmap

* [ ] Iniciar código do projeto com eslint, ES6 e TypeScript
* [ ] Implementar método parse sem opção nested
* [ ] Implementar opção nested para o método parse com teste unitário
* [ ] Empacotar primeira versão no npmjs
* [ ] Implementar testes de integração com planilhas reais
* [ ] Export páginas de erros no GitHub pages



