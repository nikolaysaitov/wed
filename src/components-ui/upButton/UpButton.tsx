import { useState } from 'react';
import styles from './UpBotton.module.scss';
  
const UpButton = () =>{ 
  
  const [visible, setVisible] = useState(false) 
  
  const toggleVisible = () => { 
    const scrolled = document.documentElement.scrollTop; 
    if (scrolled > 300){ 
      setVisible(true) 
    }  
    else if (scrolled <= 300){ 
      setVisible(false) 
    } 
  }; 

  const scrollToTop = () =>{ 
    window.scrollTo({ 
      top: 0,  
      behavior: 'smooth'
    }); 
  }; 
   
  
  window.addEventListener('scroll', toggleVisible); 
  
  return ( 
    <button className={`${visible ? styles.button : styles.none}`} onClick={scrollToTop}></button>
  ); 
} 
  
export default UpButton; 