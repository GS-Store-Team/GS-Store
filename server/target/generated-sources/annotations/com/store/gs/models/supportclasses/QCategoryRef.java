package com.store.gs.models.supportclasses;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QCategoryRef is a Querydsl query type for CategoryRef
 */
@Generated("com.infobip.spring.data.jdbc.annotation.processor.CustomMetaDataSerializer")
public class QCategoryRef extends com.querydsl.sql.RelationalPathBase<CategoryRef> {

    private static final long serialVersionUID = 433292698;

    public static final QCategoryRef categoryRef = new QCategoryRef("CategoryRef");

    public final NumberPath<Long> categoryId = createNumber("categoryId", Long.class);

    public final NumberPath<Long> pluginId = createNumber("pluginId", Long.class);

    public QCategoryRef(String variable) {
        super(CategoryRef.class, forVariable(variable), null, "plugin_category");
        addMetadata();
    }

    public QCategoryRef(String variable, String schema, String table) {
        super(CategoryRef.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QCategoryRef(String variable, String schema) {
        super(CategoryRef.class, forVariable(variable), schema, "plugin_category");
        addMetadata();
    }

    public QCategoryRef(Path<? extends CategoryRef> path) {
        super(path.getType(), path.getMetadata(), null, "plugin_category");
        addMetadata();
    }

    public QCategoryRef(PathMetadata metadata) {
        super(CategoryRef.class, metadata, null, "plugin_category");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(categoryId, ColumnMetadata.named("category_id").withIndex(0));
        addMetadata(pluginId, ColumnMetadata.named("plugin_id").withIndex(1));
    }

}

