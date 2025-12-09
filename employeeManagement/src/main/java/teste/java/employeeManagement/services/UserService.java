package teste.java.employeeManagement.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import teste.java.employeeManagement.config.TokenService;
import teste.java.employeeManagement.dtos.request.AuthDTO;
import teste.java.employeeManagement.dtos.request.UserDTO;
import teste.java.employeeManagement.dtos.response.UserResponseDTO;
import teste.java.employeeManagement.entities.User;
import teste.java.employeeManagement.repositories.UserRepository;

@Service
public class UserService implements UserDetailsService {

    private UserRepository userRepository;
    private TokenService tokenService;

    public UserService(UserRepository userRepository, TokenService tokenService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email);
    }

    public UserResponseDTO makeLogin(AuthDTO authDTO, AuthenticationManager manager) {

        UsernamePasswordAuthenticationToken credentials = new UsernamePasswordAuthenticationToken(authDTO.email(), authDTO.password());
        Authentication authentication = manager.authenticate(credentials);

        User user = (User) authentication.getPrincipal();
        String token = tokenService.generateToken(user);

        return new UserResponseDTO(user.getId(), user.getName(), token);
    }


}
