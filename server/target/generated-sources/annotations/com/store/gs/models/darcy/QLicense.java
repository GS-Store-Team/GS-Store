package com.store.gs.models.darcy;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QLicense is a Querydsl query type for License
 */
@Generated("com.infobip.spring.data.jdbc.annotation.processor.CustomMetaDataSerializer")
public class QLicense extends com.querydsl.sql.RelationalPathBase<License> {

    private static final long serialVersionUID = -1605254782;

    public static final QLicense license = new QLicense("License");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath title = createString("title");

    public final StringPath company = createString("company");

    public final DateTimePath<java.util.Date> activationDate = createDateTime("activationDate", java.util.Date.class);

    public final DateTimePath<java.util.Date> expireDate = createDateTime("expireDate", java.util.Date.class);

    public final DateTimePath<java.util.Date> supportEndDate = createDateTime("supportEndDate", java.util.Date.class);

    public final NumberPath<Integer> amount = createNumber("amount", Integer.class);

    public final StringPath document = createString("document");

    public final StringPath pluginName = createString("pluginName");

    public final StringPath activationKey = createString("activationKey");

    public QLicense(String variable) {
        super(License.class, forVariable(variable), null, "licenses");
        addMetadata();
    }

    public QLicense(String variable, String schema, String table) {
        super(License.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QLicense(String variable, String schema) {
        super(License.class, forVariable(variable), schema, "licenses");
        addMetadata();
    }

    public QLicense(Path<? extends License> path) {
        super(path.getType(), path.getMetadata(), null, "licenses");
        addMetadata();
    }

    public QLicense(PathMetadata metadata) {
        super(License.class, metadata, null, "licenses");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(id, ColumnMetadata.named("Id").withIndex(0));
        addMetadata(title, ColumnMetadata.named("Title").withIndex(1));
        addMetadata(company, ColumnMetadata.named("Company").withIndex(2));
        addMetadata(activationDate, ColumnMetadata.named("ActivationDate").withIndex(3));
        addMetadata(expireDate, ColumnMetadata.named("ExpireDate").withIndex(4));
        addMetadata(supportEndDate, ColumnMetadata.named("SupportEndDate").withIndex(5));
        addMetadata(amount, ColumnMetadata.named("Amount").withIndex(6));
        addMetadata(document, ColumnMetadata.named("Document").withIndex(7));
        addMetadata(pluginName, ColumnMetadata.named("PluginName").withIndex(8));
        addMetadata(activationKey, ColumnMetadata.named("ActivationKey").withIndex(9));
    }

}

