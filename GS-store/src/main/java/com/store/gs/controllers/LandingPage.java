package com.store.gs.controllers;

import com.store.gs.models.Plugin;
import com.store.gs.services.PluginService;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.stream.Collectors;

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
        int id = 0;
        if(pageId != null)
            try {
                id = Integer.parseInt(pageId)-1;
            } catch (NumberFormatException ignored){}

        model.addAttribute("plugins", pluginService.getPage(id));
        //model.addAttribute("pageCnt", pluginService.get);
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
    public String addNewPlugin(@ModelAttribute("plugin") @Valid Plugin plugin,
                               BindingResult bindingResult,
                               Model model){
        if(bindingResult.hasErrors()){
            model.addAttribute(plugin);
            model.addAttribute("errors", ControllersUtils.errors(bindingResult));
            return "NewPlugin";
        }
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
                               @Valid @ModelAttribute("plugin") Plugin plugin,
                               BindingResult bindingResult,
                               Model model){
        if(bindingResult.hasErrors()){
            model.addAttribute("plugin",plugin);
            model.addAttribute("errors", ControllersUtils.errors(bindingResult));
            return "EditPlugin";
        }
        pluginService.changeById(plugin, id);
        return "redirect:/all/" + id;
    }

    @DeleteMapping("/all/{id}")
    public String deletePlugin(@PathVariable("id") long id){
        pluginService.deleteById(id);
        return "redirect:/all";
    }
}

