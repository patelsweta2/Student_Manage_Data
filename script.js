const sortByNameAsc = document.getElementById("sortaz");
const sortByNameDesc = document.getElementById("sortza");
const sortByNum = document.getElementById("sortmarks");
const sortByPassNum = document.getElementById("sortpass");
const sortByClasses = document.getElementById("sortclass");
const sortByGender = document.getElementById("sortgen");
const dataTable = document.getElementById("mytable");
const maleTable = document.getElementById("maleTable");
const femaleTable = document.getElementById("femaleTable");
const resetBtn = document.getElementById("reset");
const reset = document.getElementById("resetBtn");
const searchButton = document.getElementById("searchButton");

maleTable.style.display = "none";
femaleTable.style.display = "none";
resetBtn.style.display = "none";
reset.style.display = "none";

function fetchData() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      populateTable(data, dataTable);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function populateTable(data, table) {
  const tableBody = table.getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";

  const sortData = [...data];

  sortByNameAsc.addEventListener("click", (e) => {
    sortData.sort((a, b) => {
      const nameA = `${a.first_name} ${a.last_name}`.toUpperCase();
      const nameB = `${b.first_name} ${b.last_name}`.toUpperCase();
      return nameA.localeCompare(nameB);
    });
    populateTable(sortData, dataTable);
  });

  sortByNameDesc.addEventListener("click", (e) => {
    sortData.sort((a, b) => {
      const nameA = `${a.first_name} ${a.last_name}`.toUpperCase();
      const nameB = `${b.first_name} ${b.last_name}`.toUpperCase();
      return nameB.localeCompare(nameA);
    });
    populateTable(sortData, dataTable);
  });

  sortByNum.addEventListener("click", (e) => {
    sortData.sort((a, b) => {
      return a.marks - b.marks;
    });
    populateTable(sortData, dataTable);
  });

  sortByPassNum.addEventListener("click", (e) => {
    const passData = sortData.filter((item) => item.passing === "Pass");
    populateTable(passData, dataTable);
    reset.style.display = "block";
  });

  sortByClasses.addEventListener("click", (e) => {
    sortData.sort((a, b) => {
      return a.class - b.class;
    });
    populateTable(sortData, dataTable);
  });

  sortByGender.addEventListener("click", (e) => {
    const femaleData = sortData.filter((item) => item.gender === "Female");
    populateTable(femaleData, femaleTable);
    const maleData = sortData.filter((item) => item.gender === "Male");
    populateTable(maleData, maleTable);

    maleTable.style.display = "table";
    femaleTable.style.display = "table";
    dataTable.style.display = "none";
    resetBtn.style.display = "block";
  });

  resetBtn.addEventListener("click", () => {
    fetchData();
    maleTable.style.display = "none";
    femaleTable.style.display = "none";
    dataTable.style.display = "table";
    resetBtn.style.display = "none";
  });
  reset.addEventListener("click", () => {
    fetchData();
    reset.style.display = "none";
  });

  searchButton.addEventListener("click", searchTable);

  data.forEach((item) => {
    if ("passing" in item && typeof item.passing === "boolean") {
      item.passing = item.passing ? "Pass" : "Failed";
    }
    const row = tableBody.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("circle-img");
    const img = document.createElement("img");
    img.src = item.img_src;
    img.alt = "Profile Image";
    imgContainer.appendChild(img);
    cell2.appendChild(imgContainer);

    const name = document.createTextNode(
      item.first_name + " " + item.last_name
    );
    cell2.appendChild(name);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    const cell6 = row.insertCell(5);
    const cell7 = row.insertCell(6);

    cell1.textContent = item.id;
    cell3.textContent = item.gender;
    cell4.textContent = item.class;
    cell5.textContent = item.marks;
    cell6.textContent = item.passing;
    cell7.textContent = item.city;
  });

  function searchTable() {
    const searchInput = document
      .getElementById("searchInput")
      .value.toLowerCase();

    const filteredData = sortData.filter((item) => {
      const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
      const email = item.email.toLowerCase();

      return fullName.includes(searchInput) || email.includes(searchInput);
    });

    populateTable(filteredData, dataTable);
    reset.style.display = "block";
  }
}

fetchData();
