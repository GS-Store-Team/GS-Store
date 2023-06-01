package com.store.gs.converters;

import com.store.gs.dto.UserDataDTO;
import com.store.gs.enums.Role;
import com.store.gs.models.UserData;
import com.store.gs.models.supportclasses.UserdataImageRef;

import java.util.Optional;

public class ModelToDTO {
    public static UserDataDTO userDataDTO(UserData userData, Role role){
        var userDataDTO = new UserDataDTO();

        userDataDTO.setUserId(userData.getUserId());
        userDataDTO.setNickName(userData.getNickName());
        userDataDTO.setEmail(userData.getEmail());
        userDataDTO.setPhoneNumber(userData.getPhoneNumber());
        userDataDTO.setDescription(userData.getDescription());
        userDataDTO.setImages(userData.getImages().stream().map(UserdataImageRef::getImageId).toList());
        userDataDTO.setRole(role);

        return userDataDTO;
    }
}
