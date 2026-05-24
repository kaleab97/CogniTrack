CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    gender VARCHAR(10) NOT NULL,
    department VARCHAR(100) NOT NULL,
    enrollment_year YEAR NOT NULL
);
CREATE TABLE exam_results (
    result_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    score DECIMAL(5,2) NOT NULL CHECK (score >= 0 AND score <= 100),
    exam_date DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (student_id)
    REFERENCES students(student_id)
    ON DELETE CASCADE
);
INSERT INTO students (full_name, email, gender, department, enrollment_year) VALUES
('Kaleb Bekele', 'kaleb@gmail.com', 'Male', 'Computer Science', 2025),
('Bekele Kaleab', 'bekele@gmail.com', 'male', 'Software Engineering', 2025),
('Dagme Yegeta', 'dagme@gmail.com', 'Male', 'Information Systems', 2025),
('tariku kebede', 'tariku@gmail.com', 'Male', 'pre engineering', 2025),
('yonas Samuel', 'yonas@gmail.com', 'Male', 'pre engineering', 2025);
INSERT INTO exam_results (student_id, score) VALUES
(1, 85), -- Kaleb
(2, 50), -- Bekele 
(3, 35); -- dagme   
(4, 70); -- tariku
(5, 90); -- yonas