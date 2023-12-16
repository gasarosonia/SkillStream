package com.sonia.skillstream.controllers;

import com.sonia.skillstream.models.Course;
import com.sonia.skillstream.models.User;
import com.sonia.skillstream.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public String Welcome() {
        return "Welcome to SkillStream";
    }

    @GetMapping("admin/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    record RegisterUserRequest (
            String name,
            String email,
            String password,
            String role,
            Integer age
    ){}

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterUserRequest request){
        if (userRepository.existsByEmail(request.email)){
            return ResponseEntity.badRequest().body("User with email \"" + request.email + "\" already exists.");
        }
        User user = new User();
        user.setName(request.name);
        user.setEmail(request.email);
        user.setPassword(request.password);
        user.setAge(request.age);
        user.setRole(request.role);
        userRepository.save(user);
        return ResponseEntity.ok("User created");
    }

    record UserLoginRequest (
            String email,
            String password
    ){}
    @PostMapping("login")
    public ResponseEntity<Object> login(@RequestBody UserLoginRequest request){
        if (!userRepository.existsByEmail(request.email)){
            return ResponseEntity.badRequest().body("User doesn't exists.");
        }
        User user = userRepository.findByEmail(request.email);
        if (!user.getPassword().equals(request.password)) {
            return ResponseEntity.badRequest().body("Password doesn't match.");
        }
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("admin/users/{userId}")
    public void deleteUser(@PathVariable("userId") Integer id){
        Optional<User> userExists = userRepository.findById(id);
        userRepository.deleteById(id);
    }
}
