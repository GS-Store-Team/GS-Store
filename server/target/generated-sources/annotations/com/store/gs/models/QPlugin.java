package com.store.gs.models;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QPlugin is a Querydsl query type for Plugin
 */
@Generated("com.infobip.spring.data.jdbc.annotation.processor.CustomMetaDataSerializer")
public class QPlugin extends com.querydsl.sql.RelationalPathBase<Plugin> {

    private static final long serialVersionUID = 1214101071;

    public static final QPlugin plugin = new QPlugin("Plugin");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath developer = createString("developer");

    public final StringPath name = createString("name");

    public final StringPath shortDescription = createString("shortDescription");

    public final StringPath fullDescription = createString("fullDescription");

    public final NumberPath<Double> mark = createNumber("mark", Double.class);

    public final NumberPath<Double> price = createNumber("price", Double.class);

    public final BooleanPath isDeleted = createBoolean("isDeleted");

    public final BooleanPath checked = createBoolean("checked");

    public QPlugin(String variable) {
        super(Plugin.class, forVariable(variable), null, "plugin");
        addMetadata();
    }

    public QPlugin(String variable, String schema, String table) {
        super(Plugin.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QPlugin(String variable, String schema) {
        super(Plugin.class, forVariable(variable), schema, "plugin");
        addMetadata();
    }

    public QPlugin(Path<? extends Plugin> path) {
        super(path.getType(), path.getMetadata(), null, "plugin");
        addMetadata();
    }

    public QPlugin(PathMetadata metadata) {
        super(Plugin.class, metadata, null, "plugin");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(id, ColumnMetadata.named("Id").withIndex(0));
        addMetadata(developer, ColumnMetadata.named("Developer").withIndex(1));
        addMetadata(name, ColumnMetadata.named("Name").withIndex(2));
        addMetadata(shortDescription, ColumnMetadata.named("shortdescription").withIndex(3));
        addMetadata(fullDescription, ColumnMetadata.named("fulldescription").withIndex(4));
        addMetadata(mark, ColumnMetadata.named("Mark").withIndex(5));
        addMetadata(price, ColumnMetadata.named("Price").withIndex(6));
        addMetadata(isDeleted, ColumnMetadata.named("isdeleted").withIndex(7));
        addMetadata(checked, ColumnMetadata.named("Checked").withIndex(8));
    }

}

