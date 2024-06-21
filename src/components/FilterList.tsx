/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
// import products from '../data/data.json';
import CriteriaRow from './Criteria.tsx';
import axios from 'axios';

export type Criteria = {
    Name: string,
    Qualifier: any
}

export type Filter = {
    ProductName: string, 
    Criterias: Object[] | undefined,
};

export default function  FilterList() {
    const [filters, setFilters] = useState<Filter[] | undefined>([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    function addFilter() {
        const newFilter = {ProductName: "", Criterias: [{Name: "", Qualifier: "", Value: null}]};
        setFilters([...(filters || []), newFilter]); 
    }

    function saveFilter() {
        //make API call to add the particular filter to the database 
        axios.post(apiUrl + '/filters', filters,{
            headers: {
            'Content-Type': 'application/json',
        },})
          .then(response => {
            alert("saved filters succesfully");
          })
          .catch(error => console.error('Error saveing filter:', error));
    }

    function removeFilter(index) {
        const newFilterArray = [...filters || []];
        newFilterArray.splice(index, 1);
        setFilters(newFilterArray);
    }

    function addRow(index) {
        const newCriteria = {Name: "Amount", Qualifier: "More", Value: 0};
        const updatedFilters = [...filters || []];

        updatedFilters[index] = {
            ...updatedFilters[index],
            Criterias: [...updatedFilters[index].Criterias || [], newCriteria]
          };
        setFilters(updatedFilters); 
    }

    function removeRow(criteriaIndex, index) {
        const updatedFilters = [...filters || []];

        if (updatedFilters[index]) {
            const updatedCriterias = updatedFilters[index].Criterias?.filter((_, index) => index !== criteriaIndex);

            updatedFilters[index] = {
                ...updatedFilters[index],
                Criterias: updatedCriterias
            };

            setFilters(updatedFilters);
        }
        setFilters(updatedFilters);
    }

    useEffect(() => {
        axios.get(apiUrl + '/filters',{
            headers: {
            'Content-Type': 'application/json',
        },})
          .then(response => {
            setFilters(response.data);
          })
          .catch(error => console.error('Error fetching data:', error));
      }, []);

    return (
        <>
            <button onClick={addFilter}> add filter</button>
            {filters?.map((filter, filterIndex) => {
                return (
                    <div className='filter' key={filterIndex}>
                        <label>Filter Name</label>
                        <input type="text"></input>

                        <div className='criteria-box'>
                            <label> Criteria</label>

                            {filter.Criterias?.map((criteria, criteriaIndex)=>{
                                return <div className='criteria-row'>
                                    <CriteriaRow criteria={criteria}></CriteriaRow>
                                    <button className='remove-row' onClick={() => removeRow(criteriaIndex, filterIndex)}>Remove</button>
                                </div>

                            })}
                        </div>
                        <button onClick={() => addRow(filterIndex)}>Add Criteria</button>
                        <button onClick={saveFilter}>Save</button>
                        <button onClick={() => removeFilter(filterIndex)}>Close</button>
                    </div>)
            })}
        </>
        
    )
}
