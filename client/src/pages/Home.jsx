import React from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import {useSnapshot} from 'valtio';
import state from '../store'; 
import {headContainerAnimation,slideAnimation,headContentAnimation,headTextAnimation} from '../config/motion'
import { CustomeButton } from '../components';

const Home = () => {
    const snap =useSnapshot(state);
    

    return (
    <AnimatePresence>
    { snap.intro && <motion.section className='home ' {...slideAnimation('left')}>
            <motion.header {...slideAnimation('down')} >
                <img src='/logo.png' className='h-20 w-20'/> 
            </motion.header>
            <motion.div className='home-content flex flex-col justify-between' {...headContainerAnimation}>
                <motion.div {...headTextAnimation}>
                    <h1 className='head-text '>
                        MAKE IT  <br className='xl:block hidden'/>TRUE
                    </h1>
                </motion.div>
                <motion.div {...headContentAnimation} className='flex flex-col gap-5'>
                    <p className='max-w-md font-normal text-gray-600 text-base'>
                        create you unique t-shirts with ou 3d and ai cusomization app <strong>unleach you imaginations </strong>
                    </p>
                    <CustomeButton 
                        type='filled' 
                        title='Customize it' 
                        handleClick={()=>state.intro =false} 
                        custumeStyles = 'w-fit px-4 py-2.5 font-bold text-sm '
                    />
                </motion.div>

            </motion.div>
        </motion.section>
    }
    </AnimatePresence>
  )
}

export default Home