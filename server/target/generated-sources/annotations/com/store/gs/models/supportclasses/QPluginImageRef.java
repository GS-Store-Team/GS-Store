package com.store.gs.models.supportclasses;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QPluginImageRef is a Querydsl query type for PluginImageRef
 */
@Generated("com.infobip.spring.data.jdbc.annotation.processor.CustomMetaDataSerializer")
public class QPluginImageRef extends com.querydsl.sql.RelationalPathBase<PluginImageRef> {

    private static final long serialVersionUID = -1483664250;

    public static final QPluginImageRef pluginImageRef = new QPluginImageRef("PluginImageRef");

    public final NumberPath<Long> imageId = createNumber("imageId", Long.class);

    public final NumberPath<Long> pluginId = createNumber("pluginId", Long.class);

    public QPluginImageRef(String variable) {
        super(PluginImageRef.class, forVariable(variable), null, "plugin_image");
        addMetadata();
    }

    public QPluginImageRef(String variable, String schema, String table) {
        super(PluginImageRef.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QPluginImageRef(String variable, String schema) {
        super(PluginImageRef.class, forVariable(variable), schema, "plugin_image");
        addMetadata();
    }

    public QPluginImageRef(Path<? extends PluginImageRef> path) {
        super(path.getType(), path.getMetadata(), null, "plugin_image");
        addMetadata();
    }

    public QPluginImageRef(PathMetadata metadata) {
        super(PluginImageRef.class, metadata, null, "plugin_image");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(imageId, ColumnMetadata.named("image_id").withIndex(0));
        addMetadata(pluginId, ColumnMetadata.named("plugin_id").withIndex(1));
    }

}

