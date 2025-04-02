package com.dckl.smartlogistics.repository;

import com.dckl.smartlogistics.model.GlobalsParameters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GlobalsParametersRepository extends JpaRepository<GlobalsParameters, Integer> {
}