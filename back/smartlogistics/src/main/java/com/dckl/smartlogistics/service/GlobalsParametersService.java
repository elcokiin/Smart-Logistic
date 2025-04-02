package com.dckl.smartlogistics.service;

import com.dckl.smartlogistics.model.GlobalsParameters;
import com.dckl.smartlogistics.repository.GlobalsParametersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GlobalsParametersService {

    private final GlobalsParametersRepository globalsParametersRepository;

    @Autowired
    public GlobalsParametersService(GlobalsParametersRepository globalsParametersRepository) {
        this.globalsParametersRepository = globalsParametersRepository;
    }

    public float getMinDistanceWarehouse() {
        GlobalsParameters globalsParameters = globalsParametersRepository.findById(1).orElseThrow(
                () -> new RuntimeException("No se encontró el parámetro global")
        );
        return globalsParameters.getMinDistanceWarehouse();
    }

    public float getVirtualStorePercentage() {
        GlobalsParameters globalsParameters = globalsParametersRepository.findById(1).orElseThrow(
                () -> new RuntimeException("No se encontró el parámetro global")
        );
        return globalsParameters.getVirtualStorePercentage();
    }
}