package com.store.gs.models;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.infobip.spring.data.jdbc.annotation.processor.CustomMetaDataSerializer")
public class QUser extends com.querydsl.sql.RelationalPathBase<User> {

    private static final long serialVersionUID = 1798064615;

    public static final QUser user = new QUser("User");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath email = createString("email");

    public final StringPath password = createString("password");

    public final BooleanPath active = createBoolean("active");

    public final EnumPath<com.store.gs.enums.Role> role = createEnum("role", com.store.gs.enums.Role.class);

    public QUser(String variable) {
        super(User.class, forVariable(variable), null, "usr");
        addMetadata();
    }

    public QUser(String variable, String schema, String table) {
        super(User.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QUser(String variable, String schema) {
        super(User.class, forVariable(variable), schema, "usr");
        addMetadata();
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata(), null, "usr");
        addMetadata();
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata, null, "usr");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(id, ColumnMetadata.named("Id").withIndex(0));
        addMetadata(email, ColumnMetadata.named("Email").withIndex(1));
        addMetadata(password, ColumnMetadata.named("Password").withIndex(2));
        addMetadata(active, ColumnMetadata.named("Active").withIndex(3));
        addMetadata(role, ColumnMetadata.named("Role").withIndex(4));
    }

}

