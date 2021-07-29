import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { FaLinkedin, FaFacebook, FaTwitterSquare, FaInstagram } from 'react-icons/fa'
import logo from '../public/assets/logo.png'

import styles from '../styles/Index.module.css'

export default function Landing() {
  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <div>
          <Image
            src={logo}
            objectFit="contain"
            layout="fixed"
            width={200}
            height={200}
            quality={100}
            placeholder="blur"
          /> 
        </div>
        <div className={styles.header}>
          <div className={styles.title}>
            Citrus Hack
          </div>
          <div className={styles.subtitle}>
            Coming Soon - 2022
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.subheader}>
          Find us elsewhere.
        </div>
        <div className={styles.grid}>
          <Link passHref href="https://www.linkedin.com/company/citrus-hack">
            <motion.div whileHover={{ y: -2 }} className={styles.button}>
              <FaLinkedin />
              LinkedIn
            </motion.div>
          </Link>
          <Link passHref href="https://www.facebook.com/CitrusHack">
            <motion.div whileHover={{ y: -2 }} className={styles.button}>
              <FaFacebook />
              Facebook
            </motion.div>
          </Link>
          <Link passHref href="https://twitter.com/citrushack">
            <motion.div whileHover={{ y: -2 }} className={styles.button}>
              <FaTwitterSquare />
              Twitter
            </motion.div>
          </Link>
          <Link passHref href="https://www.instagram.com/citrushack_ucr">
            <motion.div whileHover={{ y: -2 }} className={styles.button}>
              <FaInstagram />
              Instagram
            </motion.div>
          </Link>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.subheader}>
          Check out our sister hackathon!
        </div>
        <Link passHref href="https://cutiehack.io">
          <motion.div whileHover={{ y: -2 }} className={styles.button}>
            Cutie Hack 2021
          </motion.div>
        </Link>
      </div>
    </div>
  )
}
