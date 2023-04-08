const incomeTable = [];
const spendTable = [];

const incomeInputName = document.querySelector("#income-name");
const incomeInputAmount = document.querySelector("#income-amount");
const incomeList = document.querySelector("#incomeList");
const incomeForm = document.querySelector("#income-form");
const allIncomeList = document.querySelector(".income-list-cont");
const allIncomeAmount = document.querySelector("#totalIncomeAmount");

const spendInputName = document.querySelector("#spend-name");
const spendInputAmount = document.querySelector("#spend-amount");
const spendList = document.querySelector("#spendList");
const spendForm = document.querySelector("#spend-form");
const allSpendList = document.querySelector(".spend-list-cont");
const allSpendAmount = document.querySelector("#totalSpendAmount");

const buttonAdd = document.querySelector("#form-submit");
const finalSum = document.querySelector("#totalCounter");

incomeForm.addEventListener("submit", function (event) {
	event.preventDefault();

	if (incomeInputName.value == "" || incomeInputAmount.value == "") {
		alert("Wpisz prawidłowe wartości");
	} else if (incomeInputAmount.value < 0.01) {
		alert("Wpisz prawidłową wartość");
	} else {
		let insideIncomeTable = {
			id: Math.random(),
			name: incomeInputName.value,
			amount: incomeInputAmount.value,
		};
		incomeTable.push(insideIncomeTable);
		createIncomeList();

		getMoneyDiff();
	}
});

allIncomeAmount.innerHTML = 0;
allSpendAmount.innerHTML = 0;

const getMoneyDiff = () => {
	let income = 0;
	for (let i = 0; i < incomeTable.length; i++) {
		income += Number(incomeTable[i].amount);
	}

	allIncomeAmount.innerHTML = income;

	let spending = 0;
	for (let i = 0; i < spendTable.length; i++) {
		spending += Number(spendTable[i].amount);
	}
	allSpendAmount.innerHTML = spending;

	let difference = 0;
	difference = income - spending;
	if (difference > 0) {
		finalSum.innerHTML = `Jesteś na plusie ${difference} zł`;
	} else if (difference < 0) {
		finalSum.innerHTML = `Jesteś na minusie ${difference * -1} zł`;
	} else if (difference === 0) {
		finalSum.innerHTML = `Jestes na zero `;
	}
};

spendForm.addEventListener("submit", function (event) {
	event.preventDefault();

	if (spendInputName.value == "" || spendInputAmount.value == "") {
		alert("Wpisz prawidłowe wartości");
	} else if (spendInputAmount.value < 0.01) {
		alert("Wpisz prawidłową wartość");
	} else {
		let insideSpendTable = {
			id: Math.random(),
			name: spendInputName.value,
			amount: spendInputAmount.value,
		};

		spendTable.push(insideSpendTable);
		createSpendingList();

		getMoneyDiff();
	}
});

const createIncomeList = () => {
	allIncomeList.innerHTML = "";

	incomeTable.forEach((element, index) => {
		let inputName = element.name;
		let inputAmount = element.amount;

		const listDiv = document.createElement("div");
		const listRow = document.createElement("li");
		const spanListAmount = document.createElement("span");
		const spanListText = document.createElement("span");
		const buttonEdit = document.createElement("button");
		const buttonDelete = document.createElement("button");
		const divIcon = document.createElement("div");

		listRow.id = element.id;

		buttonEdit.id = "buttonEdit";
		buttonEdit.textContent = "✏️";
		buttonDelete.id = "buttonDelete";
		buttonDelete.textContent = "❌";

		spanListText.textContent = inputName;
		spanListAmount.textContent = inputAmount;
		listDiv.classList.add("listDiv");
		spanListAmount.classList.add("spanAmount");

		listDiv.appendChild(spanListText);
		listDiv.appendChild(spanListAmount);
		listRow.appendChild(listDiv);
		listRow.appendChild(divIcon);
		divIcon.appendChild(buttonEdit);
		divIcon.appendChild(buttonDelete);
		allIncomeList.appendChild(listRow);

		buttonDelete.addEventListener("click", () => {
			deleteItems(incomeTable[index], "income");
		});

		buttonEdit.addEventListener("click", () => {
			listDiv.classList.add("gray");
			buttonEdit.classList.add("not-visible");
			buttonDelete.classList.add("not-visible");

			const editName = document.createElement("input");
			const editAmount = document.createElement("input");

			const editAccept = document.createElement("button");
			const editCancel = document.createElement("button");

			listRow.appendChild(editAccept);
			listRow.appendChild(editCancel);

			editAccept.id = "editAccept";
			editAccept.textContent = "✔️";
			editCancel.id = "editCancel";
			editCancel.textContent = "❌";

			editName.value = element.name;
			editAmount.value = element.amount;
			editAmount.type = "number";

			listDiv.appendChild(editName);
			listDiv.appendChild(editAmount);

			editCancel.addEventListener("click", createIncomeList);

			editAccept.addEventListener("click", () => {
				if (editAmount.value == "" || editName.value == "") {
					alert("Wpisz prawidłową wartość");
				} else if (editAmount.value < 0.01) {
					alert("Wpisz prawidłową wartość");
				} else {
					const newIncomeTableRow = (editedObject) => {
						editedObject.name = editName.value;
						editedObject.amount = editAmount.value;
					};
					incomeTable.map((editedTableRow) => {
						editedTableRow.id === element.id
							? newIncomeTableRow(editedTableRow)
							: editedTableRow;
					});

					getMoneyDiff();
					createIncomeList();
				}
			});
		});
	});

	incomeInputName.value = "";
	incomeInputAmount.value = "";
};

const createSpendingList = () => {
	allSpendList.innerHTML = "";

	spendTable.forEach((element, index) => {
		let spendingName = element.name;
		let spendingAmount = element.amount;

		const listDiv = document.createElement("div");
		const listRow = document.createElement("li");
		const spanListAmount = document.createElement("span");
		const spanListText = document.createElement("span");
		const buttonEdit = document.createElement("button");
		const buttonDelete = document.createElement("button");
		const divIcon = document.createElement("div");

		listRow.id = element.id;

		buttonEdit.id = "buttonEdit";
		buttonEdit.textContent = "✏️";
		buttonDelete.id = "buttonDelete";
		buttonDelete.textContent = "❌";

		spanListText.textContent = spendingName;
		spanListAmount.textContent = spendingAmount;
		spanListAmount.classList.add("spanAmount");
		listDiv.classList.add("listDiv");

		listDiv.appendChild(spanListText);
		listDiv.appendChild(spanListAmount);
		listRow.appendChild(listDiv);
		listRow.appendChild(divIcon);
		divIcon.appendChild(buttonEdit);
		divIcon.appendChild(buttonDelete);
		allSpendList.appendChild(listRow);

		buttonDelete.addEventListener("click", () => {
			deleteItems(spendTable[index], "spend");
		});

		buttonEdit.addEventListener("click", () => {
			listDiv.classList.add("gray");
			buttonEdit.classList.add("not-visible");
			buttonDelete.classList.add("not-visible");

			const editName = document.createElement("input");
			const editAmount = document.createElement("input");

			const editAccept = document.createElement("button");
			const editCancel = document.createElement("button");

			listRow.appendChild(editAccept);
			listRow.appendChild(editCancel);

			editAccept.id = "editAccept";
			editAccept.textContent = "✔️";
			editCancel.id = "editCancel";
			editCancel.textContent = "❌";

			editName.value = element.name;
			editAmount.value = element.amount;
			editAmount.type = "number";

			listDiv.appendChild(editName);
			listDiv.appendChild(editAmount);

			editCancel.addEventListener("click", createSpendingList);
			editAccept.addEventListener("click", () => {
				if (editAmount.value == "" || editName.value == "") {
					alert("Wpisz prawidłową wartość");
				} else if (editAmount.value < 0.01) {
					alert("Wpisz prawidłową wartość");
				} else {
					const newSpendingTableRow = (editedObject) => {
						editedObject.name = editName.value;
						editedObject.amount = editAmount.value;
					};
					spendTable.map((editedTableRow) => {
						editedTableRow.id === element.id
							? newSpendingTableRow(editedTableRow)
							: editedTableRow;
					});

					getMoneyDiff();
					createSpendingList();
				}
			});
		});
	});

	spendInputName.value = "";
	spendInputAmount.value = "";
};

const deleteItems = (item, type) => {
	if (type === "income") {
		const itemToRemove = incomeTable.findIndex(
			(income) => income.id == item.id
		);
		incomeTable.splice(itemToRemove, 1);

		createIncomeList();
		getMoneyDiff();
	} else {
		const itemToRemove = spendTable.findIndex(
			(expence) => expence.id == item.id
		);
		spendTable.splice(itemToRemove, 1);

		createSpendingList();
		getMoneyDiff();
	}
};
