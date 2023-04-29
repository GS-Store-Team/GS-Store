package com.store.gs.models;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QCategory is a Querydsl query type for Category
 */
@Generated("com.infobip.spring.data.jdbc.annotation.processor.CustomMetaDataSerializer")
public class QCategory extends com.querydsl.sql.RelationalPathBase<Category> {

    private static final long serialVersionUID = 430157082;

    public static final QCategory category = new QCategory("Category");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath title = createString("title");

    public QCategory(String variable) {
        super(Category.class, forVariable(variable), null, "category");
        addMetadata();
    }

    public QCategory(String variable, String schema, String table) {
        super(Category.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QCategory(String variable, String schema) {
        super(Category.class, forVariable(variable), schema, "category");
        addMetadata();
    }

    public QCategory(Path<? extends Category> path) {
        super(path.getType(), path.getMetadata(), null, "category");
        addMetadata();
    }

    public QCategory(PathMetadata metadata) {
        super(Category.class, metadata, null, "category");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(id, ColumnMetadata.named("Id").withIndex(0));
        addMetadata(title, ColumnMetadata.named("Title").withIndex(1));
    }

}

