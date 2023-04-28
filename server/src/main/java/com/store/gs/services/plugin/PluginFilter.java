package com.store.gs.services.plugin;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.store.gs.models.Category;
import com.store.gs.models.Tag;
import org.springframework.data.jdbc.core.mapping.AggregateReference;

import java.util.List;

import static com.store.gs.models.QPlugin.plugin;
import static com.store.gs.models.supportclasses.QCategoryRef.categoryRef;
import static com.store.gs.models.supportclasses.QTagRef.tagRef;

public class PluginFilter {
    private String value;
    private Long category;
    private List<Long> tags;
    private Long user;
    private Long boughtByUser;
    private Long userId;

    public PluginFilter(Long userid){
        this.userId = userid;
    }

    public PluginFilter withValue(String value){
        this.value = value;
        return this;
    }

    public PluginFilter withCategory(Category category){
        if(category != null) this.category = category.getId();
        return this;
    }

    public PluginFilter withTags(List<Tag> tags){
        if(tags != null) this.tags = tags.stream().map(Tag::getId).toList();
        return this;
    }

    public PluginFilter withUser(Boolean user){
        if(user != null && user) this.user = userId;
        return this;
    }

    public PluginFilter withBoughtByUser(Boolean user){
        if(user != null && user) this.boughtByUser = userId;
        return this;
    }

    public Predicate buildPredicate(){

        BooleanBuilder builder = new BooleanBuilder();

        if(value != null && !value.equals(""))
            builder.and(plugin.name.contains(value));

        if(user != null)
            builder.and(plugin.developer.eq(user));

        if(boughtByUser != null)
            // rewrite
            builder.and(plugin.developer.eq(boughtByUser));

        if(category != null && category != -1)
            builder.and(categoryRef.categoryId.eq(category));

        if(tags != null) {
            var predicate = new BooleanBuilder();
            for (Long id : tags)
                predicate.or(tagRef.tagId.eq(id));
            builder.and(predicate);
        }

        return builder;
    }
}
