async function loadStudents() {

    try {

        const response = await fetch('http://localhost:3000/students');

        const students = await response.json();

        console.log(students);

        const tableBody = document.getElementById('studentTableBody');

        tableBody.innerHTML = '';

        students.forEach(student => {

            const row = `
                <tr>
                    <td>${student.student_id}</td>
                    <td>${student.full_name}</td>
                    <td>${student.email}</td>
                    <td>${student.gender}</td>
                    <td>${student.department}</td>
                    <td>${student.enrollment_year}</td>
                </tr>
            `;

            tableBody.innerHTML += row;

        });

        document.getElementById('totalStudents').innerText =
            students.length;

    } catch (error) {

        console.log('Error loading students:', error);

    }
}

async function loadRiskStudents() {

    try {

        const response = await fetch('http://localhost:3000/students-at-risk');

        const riskStudents = await response.json();

        console.log(riskStudents);

        const riskTable = document.getElementById('riskTableBody');

        riskTable.innerHTML = '';

        let totalScore = 0;

        riskStudents.forEach(student => {

            const score = parseFloat(student.average_score);

            totalScore += score;

            const row = `
                <tr>
                    <td>${student.full_name}</td>
                    <td>${Math.round(score)}%</td>
                    <td style="color:red;">At Risk</td>
                </tr>
            `;

            riskTable.innerHTML += row;

        });

        document.getElementById('riskStudents').innerText =
            riskStudents.length;

        let average = 0;

        if (riskStudents.length > 0) {

            average = totalScore / riskStudents.length;

        }

        document.getElementById('averageScore').innerText =
            Math.round(average) + '%';

    } catch (error) {

        console.log('Error loading risk students:', error);

    }
}

window.onload = async () => {

    await loadStudents();
    await loadRiskStudents();

};

document.addEventListener('DOMContentLoaded', () => {
    loadStudents();
    loadRiskStudents();
});