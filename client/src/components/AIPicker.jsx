import React from 'react'
import CustumeButton from './CustomeButton'
const AIPicker = ({prompt,setPrompt,generatingImg,handleSubmit}) => {
  return (
    <div className='aipicker-container'> 
      <textarea 
        placeholder='ask AI...'
        rows={5}
        value={prompt}
        onChange={(e)=> setPrompt(e.target.value)}
        className='aipicker-textarea'
      />
      <div className='flex flex-wrap gap-3'>
        {
          generatingImg ? (
            <CustumeButton type='outline' title='asking AI...' custumeStyles='text-xs' />
          ):(
            <>
              <CustumeButton type='outline' title='AI logo' handleClick={()=> handleSubmit('logo')} custumeStyles='text-xs'/>
               <CustumeButton type='filled' title='AI Full' handleClick={()=> handleSubmit('full')} custumeStyles='text-xs'/>
         
            </>
          )
        }
      </div>
    </div>
  )
}

export default AIPicker