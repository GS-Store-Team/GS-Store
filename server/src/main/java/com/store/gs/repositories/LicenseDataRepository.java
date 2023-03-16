package com.store.gs.repositories;

import com.store.gs.models.license.LicenseData;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LicenseDataRepository extends CrudRepository<LicenseData, Long> {
    public Optional<LicenseData> getLicenseDataById(long id);
    public List<LicenseData> getAllByOwnerId(long ownerId);

    public void deleteLicenseDataById(long id);

}
