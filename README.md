### Next Level Week 1

## Dia 1

#### Box Model
- Modelo de caixa: toda caixa tem: **largura**, **altura**, **espaçamentos**, **preenchimentos**, **bordas**, **cor**, **fundo**, **maneira que é vista pelo html (display)**, **posicionamento**, **alinhamentos**.


#### Fonts
- caso tenha que fazer uma chamada ao __google fonts__ mais de uma vez, é possível colocar tudo em uma chamada, utilizando `&` e `family=` na mesma _url_:
```html
<link href="https://fonts.googleapis.com/css2?family=Roboto&family=Ubuntu:wght@300;700&display=swap" rel="stylesheet">
```
- a propriedade `-webkit-font-smoothing: antialiased;` melhora bastante a forma de visualizar a fonte;

#### Alinhamentos
- normalemente se for pelo lado de fora, usar `margin: 0 auto;`;
- caso seja alinhamento interno, usar `display: flex;` no elemento pai.

#### box-sizing
- a fim de facilitar no cálculo do tamanho da caixas criadas, é possível utilizar a propriedade `box-sizing: border-box;`. Assim o tamanho será limitado até a borda da caixa que estiver trabalhando. Normalmente é utilizado com a marcação `*` quando for normalizar (fazer um _reset_) o comportamento padrão do navegador (utilizando junto com `margin` e `padding`):
```css
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
```

#### reset nas aparências do `<select>`
- é possível fazer um reset nas aparências padrão vindas do navegador utilizando a seguinte propriedade:
```css
select {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
}
```

#### macetes
- para aplicar uma formatação para o irmão de um elemento, considerando o seguinte trecho em HTML:
```html
<div class="field-group">
	<div class="field">
		Elemento 1
	</div>

	<div class="field">
		Elemento 2
	</div>
</div>
```
utilizamos o seguinte código CSS:
```css
.field-group .field + .field {
	color: red;
}
```
assim teremos apenas `Element 2` com o `color` igual a `red`.

#### Console do navegador
- caso queira selecionar um elemento, acesse o console do navegador e use:
```js
document.querySelector('tag_html') //seleciona a tag desejada
// ou
document.querySelectorAll() //seleciona todas as tags
```
- caso queira selecionar um elemento pelo seu nome (propriedade name):
```js
document.querySelector("select[name=uf") // pega um <select> com name igual a uf
```
- além de selecionar, é possível adicionar um Event Listener usando `addEventListener()`:
```js
document.querySelector("select[name=uf").addEventListener("change",() => {})

#### completando Cidade e Estado com o <Select>
- obter a API do site [IBGE](https://servicodados.ibge.gov.br/api/docs/localidades?versao=1);
- usar a API `https://servicodados.ibge.gov.br/api/v1/localidades/distritos`
