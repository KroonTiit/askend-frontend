import React, { useEffect, useState } from "react"
import { Criteria } from "./FilterList";

interface CriteriaProp {
    criteria: Criteria
};

const CriteriaRow = ({
    criteria,
  }: CriteriaProp) => {
    const [dataTypes, setDataTypeas] = useState(["Amount", "Title", "Date"]);
    const [amountQualifiers, setAmountQualifiers] = useState(["More", "Less", "Equal"]);
    const [titleQualifiers, setTitleQualifiers] = useState(["Starts with", "Contains"]);
    const [dateQualifiers, setDateQualifiers] = useState(["Before", "After", "On"]);
    const [dataConstraints, setDataConstraints] = useState([""]);
    const [dataOption, setDataOption] = useState("");
    const [type, setType] = useState("");

    const onOptionChangeHandler = (event) => {
        setDataOption(event.target.value);
    };

    const onQualifierChangeHandler = (event) => {
        criteria.Qualifier = event.target.value;
    }
    
    useEffect(() => {
        console.log(dataOption);
        switch (dataOption) {
            case "Amount":
                setDataConstraints(amountQualifiers);
                setType("number");
                break;
            case "Title":
                setDataConstraints(titleQualifiers);
                setType("text");
                break;
            case "Date":
                setDataConstraints(dateQualifiers);
                setType("date");
                break;
            default:
                break;
        }
        criteria.Name = dataOption;

    },[dataOption]);

    useEffect(() => {
        setDataConstraints(amountQualifiers);
        setType("number");
    },[]);
    
    return <>
            <div>
                <select className="critiria-selection" onChange={onOptionChangeHandler}>
                    {dataTypes.map((option, index) => {
                        return (
                            <option key={index}>
                                {option}
                            </option>
                        );
                    })}
                </select>
                <select className="critiria-selection" onChange={onQualifierChangeHandler}>
                    {dataConstraints && dataConstraints.map((option, index) => {
                        return (
                            <option key={index}>
                                {option}
                            </option>
                        );
                    })}
                </select>
                <input className="critiria-selection" type={type} ></input>
            </div>
        </>
  }

export default CriteriaRow