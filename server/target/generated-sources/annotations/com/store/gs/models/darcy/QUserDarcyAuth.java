package com.store.gs.models.darcy;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QUserDarcyAuth is a Querydsl query type for UserDarcyAuth
 */
@Generated("com.infobip.spring.data.jdbc.annotation.processor.CustomMetaDataSerializer")
public class QUserDarcyAuth extends com.querydsl.sql.RelationalPathBase<UserDarcyAuth> {

    private static final long serialVersionUID = -829373431;

    public static final QUserDarcyAuth userDarcyAuth = new QUserDarcyAuth("UserDarcyAuth");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public final StringPath username = createString("username");

    public final StringPath password = createString("password");

    public final StringPath email = createString("email");

    public final StringPath accessToken = createString("accessToken");

    public final StringPath refreshToken = createString("refreshToken");

    public QUserDarcyAuth(String variable) {
        super(UserDarcyAuth.class, forVariable(variable), null, "darcy_auth");
        addMetadata();
    }

    public QUserDarcyAuth(String variable, String schema, String table) {
        super(UserDarcyAuth.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QUserDarcyAuth(String variable, String schema) {
        super(UserDarcyAuth.class, forVariable(variable), schema, "darcy_auth");
        addMetadata();
    }

    public QUserDarcyAuth(Path<? extends UserDarcyAuth> path) {
        super(path.getType(), path.getMetadata(), null, "darcy_auth");
        addMetadata();
    }

    public QUserDarcyAuth(PathMetadata metadata) {
        super(UserDarcyAuth.class, metadata, null, "darcy_auth");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(id, ColumnMetadata.named("Id").withIndex(0));
        addMetadata(userId, ColumnMetadata.named("UserId").withIndex(1));
        addMetadata(username, ColumnMetadata.named("Username").withIndex(2));
        addMetadata(password, ColumnMetadata.named("Password").withIndex(3));
        addMetadata(email, ColumnMetadata.named("Email").withIndex(4));
        addMetadata(accessToken, ColumnMetadata.named("AccessToken").withIndex(5));
        addMetadata(refreshToken, ColumnMetadata.named("RefreshToken").withIndex(6));
    }

}

