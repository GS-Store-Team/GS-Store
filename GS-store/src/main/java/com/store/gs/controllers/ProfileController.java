package com.store.gs.controllers;

import com.store.gs.models.Plugin;
import com.store.gs.security.SecurityUser;
import com.store.gs.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@Scope("session")
@RequestMapping("/me")
@RequiredArgsConstructor
public class ProfileController {
    private final SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    private final UserService userService;

    @GetMapping
    public String profile(Model model){
        model.addAttribute("user", securityUser);
        return "profile/Me";
    }

    @GetMapping("/plugins")
    public String getUserPlugins(@RequestParam(name = "page", required = false) String pageId,
                                 Model model){
        int id = 0;
        if(pageId != null)
            try {
                id = Integer.parseInt(pageId)-1;
            } catch (NumberFormatException ignored){}

        Iterable<Plugin> plugins = userService.getUserPluginsByUserEmail(securityUser.getUsername(), id);
        model.addAttribute("plugins", plugins);
        return "profile/MyPlugins";
    }

    @GetMapping("/reviews")
    public String getUserReviews(Model model){
        return "profile/Reviews";
    }
}
