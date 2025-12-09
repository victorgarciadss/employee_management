package teste.java.employeeManagement.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import teste.java.employeeManagement.dtos.request.AuthDTO;
import teste.java.employeeManagement.dtos.request.UserDTO;
import teste.java.employeeManagement.dtos.response.UserResponseDTO;
import teste.java.employeeManagement.entities.User;
import teste.java.employeeManagement.services.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;
    private AuthenticationManager authenticationManager;

    public UserController(UserService userService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDTO userDTO) {
        userService.registerUser(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Uusário registrado com sucesso");
    }

    @PostMapping(value = "/auth")
    public ResponseEntity<UserResponseDTO> makeLogin(@RequestBody AuthDTO authDTO) {
        UserResponseDTO userResponseDTO = userService.makeLogin(authDTO, authenticationManager);

        return ResponseEntity.status(HttpStatus.OK).body(userResponseDTO);
    }
}
