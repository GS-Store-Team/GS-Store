package com.store.gs.controllers;

import com.store.gs.models.Plugin;
import com.store.gs.services.PluginService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class LandingPage {
    private final PluginService pluginService;

    public LandingPage(PluginService pluginService) {
        this.pluginService = pluginService;
    }

    @GetMapping()
    public String helloWorld(){
        return "hello";
    }

    @GetMapping("/all")
    public String plugins(@RequestParam(name = "page", required = false) String pageId,
                          Model model){
        long id = 0;
        if(pageId != null)
            try {
                id = Long.parseLong(pageId)-1;
            } catch (NumberFormatException ignored){}

        model.addAttribute("plugins", pluginService.getPage(id));
        return "AllPlugins";
    }

    @GetMapping("/all/{id}")
    public String plugin(@PathVariable("id") long id,
                         Model model){
        model.addAttribute("plugin", pluginService.getById(id));
        return "Plugin";
    }

    @GetMapping("/all/new")
    public String newPlugin(Model model){
        model.addAttribute(new Plugin());
        return "NewPlugin";
    }

    @PostMapping("/all")
    public String addNewPlugin(@ModelAttribute("plugin") Plugin plugin){
        pluginService.add(plugin);
        return "redirect:/all";
    }

    @GetMapping("/all/{id}/edit")
    public String addNewPlugin(@PathVariable("id") long id,
                               Model model){
        model.addAttribute("plugin", pluginService.getById(id));
        return "EditPlugin";
    }

    @PatchMapping("/all/{id}")
    public String changePlugin(@PathVariable("id") long id,
                               @ModelAttribute("plugin") Plugin plugin){
        pluginService.changeById(plugin, id);
        return "redirect:/all/" + id;
    }

    @DeleteMapping("/all/{id}")
    public String deletePlugin(@PathVariable("id") long id){
        pluginService.deleteById(id);
        return "redirect:/all";
    }
}

