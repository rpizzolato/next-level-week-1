function populateUfs() {
	const ufSelect = document.querySelector("select[name=uf]");

	fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
		.then(res => res.json())
		.then(states => {

			for (const state of states) {
			ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
			}
		})
}

populateUfs();

function getCities(event) {
	const citySelect = document.querySelector("select[name=city]");
	const valueState = event.target.value;

	citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
	citySelect.disabled = true;

	fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${valueState}/municipios`)
		.then(res => res.json())
		.then(cities => {
			for (const city of cities) {
				citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
			}

			citySelect.disabled = false;
		})
}

document.querySelector("select[name=uf]")
	.addEventListener("change", getCities);
