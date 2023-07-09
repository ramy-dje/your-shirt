import React from 'react'
import CustomeButton from './CustomeButton' 
const FilePicker = ({file,setFile,readFile}) => {
  return (
    <div className='filepicker-container'>
      <div className='flex-1 flex flex-col '>
        <input 
          id='file-upload'
          type='file'
          accept='image/*'
          onChange={(e)=>setFile(e.target.files[0])}
        />
        <label htmlFor='file-upload' className='filepicker-label'>Upload File</label>
        <p className='mt-2 text-gray-500 text-xs '>
          {file === '' ? "no file selected" : file.name }
        </p>
      </div>
      <div className='mt-4 flex flex-wrap gap-4'>
        <CustomeButton 
          type='outline'
          title='logo'
          handleClick={()=>readFile('logo')}
          custumeStyles='text-xs'
        />
        <CustomeButton 
          type='filled'
          title='full'
          handleClick={() => readFile('full')}
          custumeStyles='text-xs'
        />
      </div> 
    </div>
  )
}

export default FilePicker