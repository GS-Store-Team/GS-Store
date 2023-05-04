package com.store.gs.services.plugin;

import com.store.gs.dto.FilterDTO;
import com.store.gs.enums.PluginStatus;
import com.store.gs.models.Plugin;
import com.store.gs.models.PluginFile;
import com.store.gs.repositories.PluginFileRepository;
import com.store.gs.repositories.PluginRepository;
import com.store.gs.security.SecurityUser;
import com.store.gs.services.CommentService;
import com.store.gs.utils.ServiceUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static com.store.gs.models.QPlugin.plugin;
import static com.store.gs.models.supportclasses.QBoughtPluginRef.boughtPluginRef;
import static com.store.gs.models.supportclasses.QCategoryRef.categoryRef;
import static com.store.gs.models.supportclasses.QPluginImageRef.pluginImageRef;
import static com.store.gs.models.supportclasses.QTagRef.tagRef;

@Service
@RequiredArgsConstructor
public class PluginService {
    private final PluginRepository pluginRepository;
    private final CommentService commentService;
    private final PluginFileRepository pluginFileRepository;

    public Page<Plugin> getPage(final FilterDTO filter){
        var pageId = filter.getPageId();
        var pageSize = filter.getPageSize();

        if(pageId == null || pageId < 1) pageId = 1;
        if(pageSize == null || pageSize < 5) pageSize = 5;

        var pluginFilter = new PluginFilter(ServiceUtils.getUserId())
                .withValue(filter.getValue())
                .withCategory(filter.getCategory())
                .withTags(filter.getSelectedTags())
                .withUser(filter.getMy())
                .withBoughtByUser(filter.getBought());

        List<Long> ids = pluginRepository.query(q -> q
                .select(plugin.id).distinct()
                .from(plugin)
                .leftJoin(categoryRef).on(plugin.id.eq(categoryRef.pluginId))
                .leftJoin(tagRef).on(plugin.id.eq(tagRef.pluginId))
                .leftJoin(pluginImageRef).on(plugin.id.eq(pluginImageRef.pluginId))
                .leftJoin(boughtPluginRef).on(plugin.id.eq(boughtPluginRef.pluginId))
                .where(pluginFilter.buildPredicate())
                .fetch()
        );

        if(filter.getMy() != null && filter.getMy())
            return pluginRepository.findAllByIdIn(ids, PageRequest.of(pageId-1, pageSize));

        return pluginRepository.findAllByIdInAndStatus(ids, PluginStatus.OK, PageRequest.of(pageId-1, pageSize));
    }

    public Plugin getById(long id){
        return pluginRepository.findById(id).orElse(null);
    }

    public Long  add(Plugin plugin) {
        plugin.setDeveloper(ServiceUtils.getUserId());
        plugin.setStatus(PluginStatus.MODERATION);
        plugin.setId(null);

        return pluginRepository.save(plugin).getId();
    }

    public void changeById(Plugin plugin){
        pluginRepository.save(plugin);
    }

    public void deleteById(long id){
        commentService.deleteAllCommentsForPlugin(id);
        pluginRepository.deleteById(id);
    }

    public PluginFile getPluginFile(long id){
        return pluginFileRepository.findById(id).orElse(null);
    }

    public void uploadPluginFile(long id, MultipartFile file) throws IOException {
        pluginFileRepository.insert(id, file.getBytes());
    }
}