package com.store.gs.repositories;

import com.store.gs.models.darcy.License;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LicenseRepository extends CrudRepository<License, Long> {
    public List<License> findAllByPluginId(long pluginId);

    public List<License> findAllByOwnerId(long ownerId);

    public List<License> findAllByCompany(String companyName);

    public void deleteLicenseDataById(long id);
}
