package com.store.gs.models.supportclasses;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QTagRef is a Querydsl query type for TagRef
 */
@Generated("com.infobip.spring.data.jdbc.annotation.processor.CustomMetaDataSerializer")
public class QTagRef extends com.querydsl.sql.RelationalPathBase<TagRef> {

    private static final long serialVersionUID = 1196563604;

    public static final QTagRef tagRef = new QTagRef("TagRef");

    public final NumberPath<Long> tagId = createNumber("tagId", Long.class);

    public final NumberPath<Long> pluginId = createNumber("pluginId", Long.class);

    public QTagRef(String variable) {
        super(TagRef.class, forVariable(variable), null, "plugin_tag");
        addMetadata();
    }

    public QTagRef(String variable, String schema, String table) {
        super(TagRef.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QTagRef(String variable, String schema) {
        super(TagRef.class, forVariable(variable), schema, "plugin_tag");
        addMetadata();
    }

    public QTagRef(Path<? extends TagRef> path) {
        super(path.getType(), path.getMetadata(), null, "plugin_tag");
        addMetadata();
    }

    public QTagRef(PathMetadata metadata) {
        super(TagRef.class, metadata, null, "plugin_tag");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(tagId, ColumnMetadata.named("tag_id").withIndex(0));
        addMetadata(pluginId, ColumnMetadata.named("plugin_id").withIndex(1));
    }

}

