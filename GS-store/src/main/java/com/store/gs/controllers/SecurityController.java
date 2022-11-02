package com.store.gs.controllers;

import com.store.gs.models.User;
import com.store.gs.services.UserService;
import com.store.gs.utils.ControllersUtils;
import com.store.gs.utils.ModelsUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import javax.validation.Valid;

@Controller
@RequiredArgsConstructor
public class SecurityController {
    private final UserService userService;
    @GetMapping("/login")
    public String login(@RequestParam(value = "reg", required = false) String str,
                        Model model){
        if(str != null) model.addAttribute("reg", str);
        return "security/gsLogin";
    }

    @GetMapping("/registration")
    public String registration(Model model){
        User user = new User();
        user.setName(ModelsUtils.generateUserName());
        model.addAttribute("user", user);
        return "security/registration";
    }

    @PostMapping("/registration")
    public String register(@Valid @ModelAttribute("user") User user,
                           BindingResult bindingResult,
                           Model model){

        if(bindingResult.hasErrors()){
            model.addAttribute("user", user);
            model.addAttribute("errors", ControllersUtils.errors(bindingResult));
            return "security/registration";
        }

        //if(!pass.equals(user.getPassword())) return "redirect:/registration?error=true";

        if(!userService.register(user)) {
            model.addAttribute("user", user);
            model.addAttribute("errors", "User with such email already exists! ");
            return "security/registration";
        };
        return "redirect:/login?reg=success!";
    }
}