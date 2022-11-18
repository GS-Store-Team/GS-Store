package com.store.gs.controllers;

import com.store.gs.models.Plugin;
import com.store.gs.security.SecurityUser;
import com.store.gs.services.PluginService;
import com.store.gs.utils.ControllersUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@Controller
@Scope("session")
@RequestMapping("/all")
@RequiredArgsConstructor
public class LandingPage {
    private final SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    private final PluginService pluginService;

    @GetMapping
    public String plugins(@RequestParam(name = "page", required = false) String pageId,
                          Model model){
        int id = 0;
        if(pageId != null)
            try {
                id = Integer.parseInt(pageId)-1;
            } catch (NumberFormatException ignored){}

        model.addAttribute("plugins", pluginService.getPage(id));
        model.addAttribute("user", securityUser);
        return "AllPlugins";
    }

    @GetMapping("/{id}")
    public String plugin(@PathVariable("id") long id,
                         Model model){
        model.addAttribute("plugin", pluginService.getById(id));
        model.addAttribute("user", securityUser);
        return "Plugin";
    }

    @GetMapping("/new")
    public String newPlugin(Model model){
        Plugin plugin = new Plugin();

        model.addAttribute(plugin);
        return "NewPlugin";
    }

    @PostMapping
    public String addNewPlugin(@ModelAttribute("plugin") @Valid Plugin plugin,
                               BindingResult bindingResult,
                               Model model){
        if(bindingResult.hasErrors()){
            model.addAttribute(plugin);
            model.addAttribute("errors", ControllersUtils.errors(bindingResult));
            return "NewPlugin";
        }
        plugin.setDeveloperEmail(securityUser.getUsername());
        pluginService.add(plugin);
        return "redirect:/all";
    }

    @GetMapping("/{id}/edit")
    public String addNewPlugin(@PathVariable("id") long id,
                               Model model){
        model.addAttribute("plugin", pluginService.getById(id));
        return "EditPlugin";
    }

    @PatchMapping("/{id}")
    public String changePlugin(@PathVariable("id") long id,
                               @Valid @ModelAttribute("plugin") Plugin plugin,
                               BindingResult bindingResult,
                               Model model){
        if(bindingResult.hasErrors()){
            model.addAttribute("plugin",plugin);
            model.addAttribute("errors", ControllersUtils.errors(bindingResult));
            return "EditPlugin";
        }
        plugin.setDeveloperEmail(securityUser.getUsername());
        pluginService.changeById(plugin, id);
        return "redirect:/all/" + id;
    }

    @DeleteMapping("/{id}")
    public String deletePlugin(@PathVariable("id") long id){
        pluginService.deleteById(id);
        return "redirect:/all";
    }
}