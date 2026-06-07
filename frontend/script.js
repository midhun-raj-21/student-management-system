const API_URL = "http://localhost:8080/students";

async function loadStudents() {

    try {

        const response = await fetch(API_URL);
        const students = await response.json();

        document.getElementById("studentCount").innerText = students.length;

        let table = "";

        students.forEach(student => {

            table += `
            <tr>
                <td>${student.id}</td>
                <td>${student.firstName} ${student.lastName}</td>
                <td>${student.email}</td>
                <td>${student.department}</td>
                <td>${student.age}</td>
                <td>
                    <button
                        class="btn btn-warning btn-sm me-1"
                        onclick="editStudent(
                            ${student.id},
                            '${student.firstName}',
                            '${student.lastName}',
                            '${student.email}',
                            '${student.department}',
                            ${student.age}
                        )">
                        Edit
                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="deleteStudent(${student.id})">
                        Delete
                    </button>
                </td>
            </tr>
            `;
        });

        document.getElementById("studentTable").innerHTML = table;

    } catch (error) {

        console.error("Error loading students:", error);

    }
}

async function addStudent() {

    const id = document.getElementById("studentId").value;

    const student = {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        email: document.getElementById("email").value.trim(),
        department: document.getElementById("department").value.trim(),
        age: parseInt(document.getElementById("age").value)
    };

    try {

        let response;

        if (id) {

            response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(student)
            });

            alert("Student Updated Successfully!");

        } else {

            response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(student)
            });

            alert("Student Added Successfully!");
        }

        if (!response.ok) {

            const error = await response.json();

            alert(JSON.stringify(error, null, 2));

            return;
        }

        clearForm();

        await loadStudents();

    } catch (error) {

        console.error("Error saving student:", error);

    }
}

function editStudent(id, firstName, lastName, email, department, age) {

    document.getElementById("studentId").value = id;

    document.getElementById("firstName").value = firstName;
    document.getElementById("lastName").value = lastName;
    document.getElementById("email").value = email;
    document.getElementById("department").value = department;
    document.getElementById("age").value = age;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

async function deleteStudent(id) {

    if (!confirm("Are you sure you want to delete this student?")) {
        return;
    }

    try {

        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        await loadStudents();

    } catch (error) {

        console.error("Error deleting student:", error);

    }
}

function clearForm() {

    document.getElementById("studentId").value = "";

    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("department").value = "";
    document.getElementById("age").value = "";
}

loadStudents();