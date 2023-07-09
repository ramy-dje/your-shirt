import React,{useState,useEffect} from 'react';
import {motion,AnimatePresence}from 'framer-motion';
import {useSnapshot} from 'valtio';
import config from '../config/config';
import state from '../store';
import {download} from '../assets';
import {downloadCanvasToImage,reader} from '../config/helpers';
import {DecalTypes,EditorTabs,FilterTabs} from '../config/constants';
import {slideAnimation,fadeAnimation} from '../config/motion';
import {AIPicker,ColorPicker,CustomeButton,FilePicker,Tab} from '../components';


const Customizer = () => {

    const snap = useSnapshot(state);
    const [file, setfile] = useState('');
    const [prompt, setPrompt] = useState('');
    const [generatingImg, setgeneratingImg] = useState(false);
    const [activeEditorTab, setactiveEditorTab] = useState('');
    const [activeFilterTab, setactiveFilterTab] = useState({
        logoShirt :true ,
        stylishShirt : false
    });

    const generateTabContent = ()=>{
        switch(activeEditorTab){
          case "colorpicker" :
            return <ColorPicker /> ;
          case "filepicker" :
            return <FilePicker 
                        file = {file}
                        setFile = {setfile}
                        readFile = {readFile}
                    />  ;
          case "aipicker" :
            return <AIPicker 
                        prompt = {prompt}
                        setPrompt = {setPrompt}
                        generatingImg = {generatingImg}
                        handleSubmit = {handleSubmit}
                    /> ;
          default :
            return null ;     
    
        }
      }
      const handleSubmit =async (type)=>{
        if(!prompt)
           return alert('the prompt is empty');
           try{
                setgeneratingImg(true);
                const response = await fetch('http://localhost:8080/api/v1/dalle',{
                    method:'POST',
                    headers:{'Content-type':'application/json'},
                    body: JSON.stringify({prompt})
                })
                const data = await response.json();
                handleDecals(type,`data:image/png;base64,${data.photo}`)
           }catch(e){
                alert('error')
           }finally{
                setgeneratingImg(false);
                setactiveEditorTab('') 
           } 
      }
      const readFile = (type)=>{
        reader(file).then((result)=>{
            handleDecals(type,result);
            setactiveEditorTab('');


        })
      }
    const handleActiveFilterTab = (tabname)=>{
        switch (tabname) {
            case "logoShirt":
                state.isLogoTexture = !activeFilterTab[tabname];    
            break;
            case "stylishShirt":
                state.isFullTexture = !activeFilterTab[tabname];    
            break;
            default:
                state.isFullTexture = true ;
                state.isLogoTexture = false ;
        }
        setactiveFilterTab((prev)=>({
            ...prev,
            [tabname] : !prev[tabname]
        }))
    }
    const handleDecals = (type,result)=>{
        const decalType = DecalTypes[type];
        state[decalType.stateProperty] = result ;
        if(!activeFilterTab[decalType.filterTab]){
            handleActiveFilterTab(decalType.filterTab);
        }    
    }
   
  return (
    <AnimatePresence>
        {!snap.intro && 
            <> 
                <motion.div key='custome' className='absolute top-0 left-0 z-10  ' {...slideAnimation('left')}>
                    <div className='flex items-center min-h-screen'>
                        <div className='editortabs-container tabs'>
                            {EditorTabs.map((tab)=>(
                                <Tab key={tab.name} tab={tab} handleClick={()=>{setactiveEditorTab(tab.name)}}/>
                            ))}
                            {generateTabContent ()}
                        </div>
                    </div>
                </motion.div>
                <motion.div className='absolute z-10 top-5 right-5 flex flex-col gap-2' {...fadeAnimation}>
                    <CustomeButton 
                        title='Go Back'
                        type='filled'
                        handleClick={()=>state.intro = true}
                        custumeStyles='w-24 py-2.5 font-bold text-sm '
                    />
                   <form action="http://localhost:8080/create-checkout-session" method="POST">
                        <button type="submit" className='w-24 py-2.5 font-bold text-sm bg-gray-100 rounded-md'>
                            buy
                        </button>
                    </form>
                </motion.div>
                <motion.div className='filtertabs-container' {...slideAnimation('up')}>
                    {FilterTabs.map((tab)=>(
                        <Tab key={tab.name} tab={tab} isFilterTab isActiveTab={activeFilterTab[tab.name]} handleClick={()=>{handleActiveFilterTab(tab.name)}}/>
                    ))}
                </motion.div>
            </>
        }
    </AnimatePresence>
  )
}

export default Customizer