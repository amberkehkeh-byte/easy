const classData = {
  "A班": ["小明", "小華", "小美", "小強", "小芳"],
  "B班": ["小志", "小玲", "小君", "小安", "小傑"],
  "C班": ["小文", "小安妮", "小林", "小李", "小婷"],
  "D班": ["小宇", "小辰", "小佳", "小蓉", "小龍"]
};

const classContainer = document.getElementById("classes");

function loadStatus(name) {
  return localStorage.getItem(name) || "";
}

function saveStatus(name, status) {
  localStorage.setItem(name, status);
}

function toggleStatus(studentDiv, name) {
  let current = loadStatus(name);

  if (current === "") {
    current = "present";
  } else if (current === "present") {
    current = "absent";
  } else if (current === "absent") {
    current = "fixed";
  } else {
    current = "";
  }

  saveStatus(name, current);
  updateClass(studentDiv, current);
}

function updateClass(studentDiv, status) {
  studentDiv.className = "student";
  if (status) studentDiv.classList.add(status);
}

Object.keys(classData).forEach(cls => {
  const classDiv = document.createElement("div");
  classDiv.className = "class";

  const title = document.createElement("h2");
  title.textContent = cls;
  classDiv.appendChild(title);

  classData[cls].forEach(name => {
    const studentDiv = document.createElement("div");
    studentDiv.className = "student";
    studentDiv.textContent = name;

    let status = loadStatus(name);
    updateClass(studentDiv, status);

    studentDiv.onclick = () => toggleStatus(studentDiv, name);
    classDiv.appendChild(studentDiv);
  });

  classContainer.appendChild(classDiv);
});