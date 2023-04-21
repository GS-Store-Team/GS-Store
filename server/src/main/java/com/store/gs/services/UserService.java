package com.store.gs.services;

import com.store.gs.GlobalConfig;
import com.store.gs.converters.ModelToDTO;
import com.store.gs.dto.ChangePasswordRequestDTO;
import com.store.gs.dto.UserDataDTO;
import com.store.gs.enums.Role;
import com.store.gs.models.User;
import com.store.gs.models.UserData;
import com.store.gs.repositories.UserDataRepository;
import com.store.gs.repositories.UserRepository;
import com.store.gs.utils.ModelsUtils;
import com.store.gs.utils.ServiceUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class UserService {
    private final GlobalConfig config;
    private final UserRepository userRepository;
    private final UserDataRepository userDataRepository;
    private final PasswordEncoder encoder;

    public User getUserByEmail(String email) throws NoSuchElementException{
        return userRepository.getUserByEmail(email).orElseThrow(NoSuchElementException::new);
    }

    public boolean createNewUser(String username, String password){
        if(userRepository.existsUserByEmail(username)) return false;

        User user = new User();
        user.setEmail(username);
        user.setPassword(encoder.encode(password));
        user.setRole(Role.USER);
        user.setActive(true);

        user = userRepository.save(user);

        UserData userData = defaultUserData();
        userData.setUserId(user.getId());

        rawInsertUserdata(userData);

        return true;
    }

    public UserDataDTO getUserDataById(long userId) throws NoSuchElementException{

        User user = userRepository.getUserById(userId).orElseThrow(NoSuchElementException::new);

        UserData userData = user.getUserData();

        if(userData == null) throw new NoSuchElementException();

        return ModelToDTO.userDataDTO(userData);
    }

    public UserDataDTO getUserDataFromCurrentUser(Authentication authentication){
        User user = getUserByEmail(authentication.getName());
        UserData userData = user.getUserData();
        if(userData == null) throw new NoSuchElementException();

        return ModelToDTO.userDataDTO(userData);
    }

    public void deleteCurrentUser(Authentication authentication) throws UserPrincipalNotFoundException{
        try {
            User user = getUserByEmail(authentication.getName());
            user.setActive(false);
            user.setUserData(defaultUserData());

            userRepository.save(user);
        }catch (NoSuchElementException e){
            throw new UserPrincipalNotFoundException("current user not found");
        }
    }

    public UserData updateUserdata(UserData updatedUserData){
        UserData userData = userDataRepository.findById(ServiceUtils.getUserId()).orElseThrow();

        userData.setEmail(updatedUserData.getEmail());
        userData.setDescription(updatedUserData.getDescription());
        userData.setNickName(updatedUserData.getNickName());
        userData.setPhoneNumber(updatedUserData.getPhoneNumber());

        return userDataRepository.save(userData);
    }

    public boolean updateUserAuthentication(Authentication authentication, ChangePasswordRequestDTO changePasswordRequestDTO) throws UserPrincipalNotFoundException{
        try {
            User user = getUserByEmail(authentication.getName());

            if(!changePasswordRequestDTO.getOldPassword().equals(changePasswordRequestDTO.getNewPassword()) &&
               encoder.matches(changePasswordRequestDTO.getOldPassword(), user.getPassword()))
                user.setPassword(encoder.encode(changePasswordRequestDTO.getNewPassword()));
            else return false;

            userRepository.save(user);
            return true;
        }catch (NoSuchElementException e){
            throw new UserPrincipalNotFoundException("current user not found");
        }
    }

    private void rawInsertUserdata(UserData userData){
        userDataRepository.insert(
                userData.getUserId(),
                userData.getNickName(),
                userData.getEmail(),
                userData.getPhoneNumber(),
                userData.getDescription()
        );
    }

    private UserData defaultUserData(){
        UserData userData = new UserData();
        userData.setNickName(ModelsUtils.generateUserName());
        userData.setPhoneNumber("");
        userData.setEmail(config.get_USER_DEFAULT_EMAIL());
        userData.setDescription(config.get_USER_DEFAULT_DESCRIPTION());

        return userData;
    }
}