package com.student.studentmanagement.service;

import com.student.studentmanagement.model.Student;
import com.student.studentmanagement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // Save Student
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    // Get All Students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get Student By ID
    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

// Delete Student
public void deleteStudent(Long id) {
    studentRepository.deleteById(id);
}

// Update Student
public Student updateStudent(Long id, Student studentDetails) {

    Student student = studentRepository.findById(id).orElse(null);

    if (student != null) {
        student.setFirstName(studentDetails.getFirstName());
        student.setLastName(studentDetails.getLastName());
        student.setEmail(studentDetails.getEmail());
        student.setDepartment(studentDetails.getDepartment());
        student.setAge(studentDetails.getAge());

        return studentRepository.save(student);
    }

    return null;
}
}