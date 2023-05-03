package com.store.gs.models.supportclasses;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QBoughtPluginRef is a Querydsl query type for BoughtPluginRef
 */
@Generated("com.infobip.spring.data.jdbc.annotation.processor.CustomMetaDataSerializer")
public class QBoughtPluginRef extends com.querydsl.sql.RelationalPathBase<BoughtPluginRef> {

    private static final long serialVersionUID = -214021094;

    public static final QBoughtPluginRef boughtPluginRef = new QBoughtPluginRef("BoughtPluginRef");

    public final NumberPath<Long> userdata_id = createNumber("userdata_id", Long.class);

    public final NumberPath<Long> pluginId = createNumber("pluginId", Long.class);

    public QBoughtPluginRef(String variable) {
        super(BoughtPluginRef.class, forVariable(variable), null, "userdata_plugin");
        addMetadata();
    }

    public QBoughtPluginRef(String variable, String schema, String table) {
        super(BoughtPluginRef.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QBoughtPluginRef(String variable, String schema) {
        super(BoughtPluginRef.class, forVariable(variable), schema, "userdata_plugin");
        addMetadata();
    }

    public QBoughtPluginRef(Path<? extends BoughtPluginRef> path) {
        super(path.getType(), path.getMetadata(), null, "userdata_plugin");
        addMetadata();
    }

    public QBoughtPluginRef(PathMetadata metadata) {
        super(BoughtPluginRef.class, metadata, null, "userdata_plugin");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(userdata_id, ColumnMetadata.named("userdata_id").withIndex(0));
        addMetadata(pluginId, ColumnMetadata.named("plugin_id").withIndex(1));
    }

}

