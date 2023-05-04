package com.store.gs.models;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QTag is a Querydsl query type for Tag
 */
@Generated("com.infobip.spring.data.jdbc.annotation.processor.CustomMetaDataSerializer")
public class QTag extends com.querydsl.sql.RelationalPathBase<Tag> {

    private static final long serialVersionUID = -1743114754;

    public static final QTag tag = new QTag("Tag");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath title = createString("title");

    public QTag(String variable) {
        super(Tag.class, forVariable(variable), null, "tag");
        addMetadata();
    }

    public QTag(String variable, String schema, String table) {
        super(Tag.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QTag(String variable, String schema) {
        super(Tag.class, forVariable(variable), schema, "tag");
        addMetadata();
    }

    public QTag(Path<? extends Tag> path) {
        super(path.getType(), path.getMetadata(), null, "tag");
        addMetadata();
    }

    public QTag(PathMetadata metadata) {
        super(Tag.class, metadata, null, "tag");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(id, ColumnMetadata.named("Id").withIndex(0));
        addMetadata(title, ColumnMetadata.named("Title").withIndex(1));
    }

}

