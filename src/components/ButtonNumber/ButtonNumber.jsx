import { useState,useEffect } from "react";
import { DashCircleFill, PlusCircleFill } from "react-bootstrap-icons";
import './style.css';

export const ButtonNumber = ( {defaultValue, onChange} ) => {
    const [ value, setValue ] = useState(defaultValue);
    const changeValue = (TYPE) => {
        const newvalue = TYPE === 'ADD' ? value+1 : value-1;
        setValue(newvalue);
    }

    useEffect(()=>{
        onChange(value);
    },[value]);
    return (
    <div className="tag-orange button-number">
        <DashCircleFill fill="#fff" size={28} onClick={()=>changeValue("Dash")} />
        <b className="color-white">{value}</b>
        <PlusCircleFill fill="#fff" size={28} onClick={()=>changeValue("ADD")} />
    </div>
    )
}