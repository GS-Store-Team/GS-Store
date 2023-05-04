package com.store.gs.models.darcy;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QUserDarcy is a Querydsl query type for UserDarcy
 */
@Generated("com.infobip.spring.data.jdbc.annotation.processor.CustomMetaDataSerializer")
public class QUserDarcy extends com.querydsl.sql.RelationalPathBase<UserDarcy> {

    private static final long serialVersionUID = -1782662463;

    public static final QUserDarcy userDarcy = new QUserDarcy("UserDarcy");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public final StringPath username = createString("username");

    public final StringPath password = createString("password");

    public final BooleanPath isLogged = createBoolean("isLogged");

    public QUserDarcy(String variable) {
        super(UserDarcy.class, forVariable(variable), null, "darcy_users");
        addMetadata();
    }

    public QUserDarcy(String variable, String schema, String table) {
        super(UserDarcy.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QUserDarcy(String variable, String schema) {
        super(UserDarcy.class, forVariable(variable), schema, "darcy_users");
        addMetadata();
    }

    public QUserDarcy(Path<? extends UserDarcy> path) {
        super(path.getType(), path.getMetadata(), null, "darcy_users");
        addMetadata();
    }

    public QUserDarcy(PathMetadata metadata) {
        super(UserDarcy.class, metadata, null, "darcy_users");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(id, ColumnMetadata.named("Id").withIndex(0));
        addMetadata(userId, ColumnMetadata.named("UserId").withIndex(1));
        addMetadata(username, ColumnMetadata.named("Username").withIndex(2));
        addMetadata(password, ColumnMetadata.named("Password").withIndex(3));
        addMetadata(isLogged, ColumnMetadata.named("IsLogged").withIndex(4));
    }

}

