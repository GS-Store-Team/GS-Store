package com.store.gs.models;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QComment is a Querydsl query type for Comment
 */
@Generated("com.infobip.spring.data.jdbc.annotation.processor.CustomMetaDataSerializer")
public class QComment extends com.querydsl.sql.RelationalPathBase<Comment> {

    private static final long serialVersionUID = 408455875;

    public static final QComment comment = new QComment("Comment");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Long> pluginId = createNumber("pluginId", Long.class);

    public final NumberPath<Long> reviewer = createNumber("reviewer", Long.class);

    public final NumberPath<Float> mark = createNumber("mark", Float.class);

    public final StringPath text = createString("text");

    public final DateTimePath<java.sql.Timestamp> creationTime = createDateTime("creationTime", java.sql.Timestamp.class);

    public final DateTimePath<java.sql.Timestamp> lastChange = createDateTime("lastChange", java.sql.Timestamp.class);

    public QComment(String variable) {
        super(Comment.class, forVariable(variable), null, "review");
        addMetadata();
    }

    public QComment(String variable, String schema, String table) {
        super(Comment.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QComment(String variable, String schema) {
        super(Comment.class, forVariable(variable), schema, "review");
        addMetadata();
    }

    public QComment(Path<? extends Comment> path) {
        super(path.getType(), path.getMetadata(), null, "review");
        addMetadata();
    }

    public QComment(PathMetadata metadata) {
        super(Comment.class, metadata, null, "review");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(id, ColumnMetadata.named("Id").withIndex(0));
        addMetadata(pluginId, ColumnMetadata.named("PluginId").withIndex(1));
        addMetadata(reviewer, ColumnMetadata.named("Reviewer").withIndex(2));
        addMetadata(mark, ColumnMetadata.named("Mark").withIndex(3));
        addMetadata(text, ColumnMetadata.named("Text").withIndex(4));
        addMetadata(creationTime, ColumnMetadata.named("creation_time").withIndex(5));
        addMetadata(lastChange, ColumnMetadata.named("last_change").withIndex(6));
    }

}

