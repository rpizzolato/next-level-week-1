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
	const stateHidden = document.querySelector("input[name=state]");
	const valueState = event.target.value;

	const indexOfSelectedState = event.target.selectedIndex;
	stateHidden.value = event.target.options[indexOfSelectedState].text;


	citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
	citySelect.disabled = true;

	fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${valueState}/municipios`)
		.then(res => res.json())
		.then(cities => {
			for (const city of cities) {
				citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
			}

			citySelect.disabled = false;
		})
}

document.querySelector("select[name=uf]")
	.addEventListener("change", getCities);


	//itens coleta
	const itemsToCollect = document.querySelectorAll(".items-grid li");

	for (const item of itemsToCollect) {
		item.addEventListener("click", handleSelectedItem);
	}

	const collectedItems = document.querySelector("input[name=items");
	let selectedItems = [];

	function handleSelectedItem(event) {
		const itemLi = event.target;
		const itemId = itemLi.dataset.id;
		
		itemLi.classList.toggle("selected");

		//verifica se exitem itens selecionados
		const alreadySelected = selectedItems.findIndex(item => item === itemId);

		//se estiver selecionado, retira da seleção
		if (alreadySelected >= 0) {
			const filteredItems = selectedItems.filter(item => item != itemId);
			selectedItems = filteredItems;
				//se não estiver selecionado, adiciona à seleção
		} else {
			selectedItems.push(itemId);
		}

		collectedItems.value = selectedItems;
	

		//atualizar o campo hidden com os itens selecionados
	}