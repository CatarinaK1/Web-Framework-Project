import React from 'react';
import FooterCSS from './footer.module.css';
import { FaInstagram, FaFacebook, FaLinkedinIn, FaGithub, FaTwitter     } from "react-icons/fa";

const Footer = () => {

  return (  
  <div className='bg-dark text-center text-white'>
      <div className='p-4 pb-0'>
        <section className={FooterCSS.iconCollectionContainer}>
          <div color="light" className={FooterCSS.iconCollection} href='#!' role='button'>
            <FaFacebook  icon='facebook-f' />
          </div>

          <div color="light" className={FooterCSS.iconCollection} href='#!' role='button'>
            <FaTwitter  icon='twitter' />
          </div>

          <div color="light" className={FooterCSS.iconCollection} href='#!' role='button'>
            <FaInstagram  icon='instagram' />
          </div>

          <div color="light" className={FooterCSS.iconCollection} href='#!' role='button'>
            <FaLinkedinIn  icon='linkedin-in' />
          </div>

          <div color="light" className={FooterCSS.iconCollection} href='#!' role='button'>
            <FaGithub  icon='github' />
          </div>
        </section>
      </div>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2024 Copyright :     
        <a className='text-white' href='https://github.com/CatarinaK1/Web-Framework-Project'>
           TrainAPI
        </a>
      </div>
    </div>
  );
};

export default Footer;

