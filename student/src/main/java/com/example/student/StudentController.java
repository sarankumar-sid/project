package com.example.student;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @PostMapping
    private void create(@RequestBody Student student){
        studentRepository.save(student);
    }

    @DeleteMapping("/{id}")
    private void delete(@PathVariable ("id") Integer regNo){
        Query query=new Query();
        query.addCriteria(Criteria.where("regNo").is(regNo));
        mongoTemplate.remove(query,Student.class);
    }

    @PutMapping
    private void updateStudent(@RequestBody Student student){
        Query query=new Query();
        query.addCriteria(Criteria.where("regNo").is(student.getRegNo()));
        mongoTemplate.remove(query,Student.class);
        studentRepository.save(student);
    }

    @GetMapping
    private List<Student> get(){
        Query query=new Query();
        query.addCriteria(Criteria.where("regNo").exists(true));
        return mongoTemplate.find(query, Student.class);
    }
}
