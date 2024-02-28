function showHome() {
  document.querySelector('.main-content').innerHTML = "<h2>Hey! welcome to my page</h2>";
}

function showAbout() {
  document.querySelector('.main-content').innerHTML = "<h2>About Us</h2><p>Wanna know about Us??</p>";
}

function showContact() {
  document.querySelector('.main-content').innerHTML = "<h2>Contact Us</h2><p>contact us.. 730******49</p>";
}

// Student Form
function showStudentForm() {
  let form = `
    <div class="student-form">
      <h2>Add Student Details</h2>
      <form id="studentForm">
        <label for="studentName">Student Name:</label>
        <input type="text" id="studentName" required><br><br>

        <label for="studentId">Student ID:</label>
        <input type="text" id="studentId" required><br><br>

        <label for="studentDOB">Student DOB:</label>
        <input type="date" id="studentDOB" required><br><br>

        <label for="contactNumber">Contact Number:</label>
        <input type="text" id="contactNumber" required><br><br>

        <label for="address">Address:</label>
        <textarea id="address" required></textarea><br><br>

        <button type="submit">Add Student</button>
      </form>
    </div>
    <div class="student-list">
      <!-- Student list will be displayed here -->
    </div>
  `;
  document.querySelector('.main-content').innerHTML = form;

  document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addStudent();
  });

  let students = JSON.parse(localStorage.getItem('students')) || [];
  updateStudentSidebar(students);
}


function addStudent() {
  let studentName = document.getElementById('studentName').value;
  let studentId = document.getElementById('studentId').value;
  let studentDOB = document.getElementById('studentDOB').value;
  let contactNumber = document.getElementById('contactNumber').value;
  let address = document.getElementById('address').value;

  let student = {
    name: studentName,
    id: studentId,
    dob: studentDOB,
    contact: contactNumber,
    address: address
  };

  let students = JSON.parse(localStorage.getItem('students')) || [];
  students.push(student);
  localStorage.setItem('students', JSON.stringify(students));
  updateStudentList(students);
  document.getElementById('studentForm').reset();
  updateStudentSidebar(students);
}

// Update List
function updateStudentList(students) {
  let studentList = document.querySelector('.student-list');
  studentList.innerHTML = '';

  students.forEach(function(student, index) {
    let studentItem = document.createElement('div');
    studentItem.classList.add('student-item');
    studentItem.innerHTML = `
      <a href="#" onclick="showStudentDetails(${index})">${student.name}</a>
      <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
    `;
    studentList.appendChild(studentItem);
  });
}

// Delete Details
function deleteStudent(index) {
  let students = JSON.parse(localStorage.getItem('students')) || [];

  let confirmDelete = window.confirm("Are you sure you want to delete details??");

  if (confirmDelete) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    updateStudentList(students);
    updateStudentSidebar(students);
    clearStudentDetails();
    window.alert("Student details deleted");
  }
}

// Update
function updateStudentSidebar(students) {
  let studentSidebar = document.getElementById('studentSidebar');
  studentSidebar.innerHTML = '';

  students.forEach(function(student, index) {
    let studentLink = document.createElement('a');
    studentLink.href = "#";
    studentLink.textContent = student.name;
    studentLink.onclick = function() {
      showStudentDetails(index);
    };
    studentSidebar.appendChild(studentLink);
    studentSidebar.appendChild(document.createElement("br"));
  });
}

// Show Student Details
function showStudentDetails(index) {
  let students = JSON.parse(localStorage.getItem('students')) || [];
  let student = students[index];

  let studentDetails = `
    <div class="student-details">
      <h2>${student.name}</h2>
      <p><strong>Student ID:</strong> ${student.id}</p>
      <p><strong>Date of Birth:</strong> ${student.dob}</p>
      <p><strong>Contact Number:</strong> ${student.contact}</p>
      <p><strong>Address:</strong> ${student.address}</p>
      <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
    </div>
  `;

  document.querySelector('.main-content').innerHTML = studentDetails;
}

// Clear Student Details
function clearStudentDetails() {
  document.querySelector('.main-content').innerHTML = '';
}

showHome();
