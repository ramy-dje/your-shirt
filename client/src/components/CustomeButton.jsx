import React from 'react'
import state from '../store'
import { useSnapshot } from 'valtio'
import { getContrastingColor } from '../config/helpers'
const CustomeButton = ({type,title,handleClick,custumeStyles}) => {
    const snap = useSnapshot(state);
    const generatedStyles = (type)=>{
        if(type == 'filled'){
            return {
                backgroundColor: snap.color,
                color: getContrastingColor(snap.color)
            }
        }else if(type == 'outline'){
            return {
                borderWidth : '1px',
                borderColor : snap.color ,
                color : snap.color
            }
        }
    }

  return (
   <button 
        className={` py-1.5 flex-1 rounded-md ${custumeStyles}`}
        style={generatedStyles(type)}
        onClick={handleClick}
   >
    {title}
   </button>
  )
}

export default CustomeButton