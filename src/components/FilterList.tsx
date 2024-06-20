/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
// import products from '../data/data.json';
import CriteriaRow from './Criteria.tsx';
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
    

    function addFilter() {
        const newFilter = {ProductName: "", Criterias: [{Name: "", Qualifier: "", Value: null}]};

        setFilters([...(filters || []), newFilter]); 
    }
    function saveFilter() {
        //make API call to add the particular filter to the database 

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
    return (
        <>
            <button onClick={addFilter}> add filter</button>
            {filters?.map((filter, index) => {
                return (
                    <div key={index}>
                        <label>Product Name</label>
                        <input type="text"></input>

                        <label> Criteria</label>
                        <div>
                            {filter.Criterias?.map((criteria, criteriaIndex)=>{
                                return <><CriteriaRow criteria={criteria}></CriteriaRow><button onClick={() => removeRow(criteriaIndex, index)}>Remove</button></>

                            })}
                        </div>
                        <button onClick={() => addRow(index)}>add row</button>
                        <button onClick={saveFilter}>Save</button>
                        <button onClick={() => removeFilter(index)}>Close</button>
                    </div>)
            })}
            {/* {products.map((product, index) => (
                        <li key={index}>
                            <p>Product Name: {product["Product Name"]}</p>
                            <p>Price: ${product.Price}</p>
                            <p>Rating: {product.Rating}</p>
                            <p>Stock Quantity: {product["Stock Quantity"]}</p>
                        </li>
                    ))} */}
        </>
        
    )
}