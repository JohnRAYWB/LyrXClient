import styles from "../styles/Home.module.css"
import Image from "next/image";
import Link from "next/link";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import Footer from "../../components/Footer";

export default function Home() {
    return (
        <>
            <div>
                <div className={styles.header}>
                    <Image width={180} height={63} src={'/../public/logo1.png'} alt={'logo'}/>
                    <ul className={styles.linkList}>
                        <li className={styles.linkNavbar}>
                            <Link href={'/'}>Home</Link>
                        </li>
                        <li className={styles.linkNavbar}>
                            <Link href={'/'}>Support</Link>
                        </li>
                        <li className={styles.separator}>
                            |
                        </li>
                        <li className={styles.linkNavbar}>
                            <Link href={'/'}>Login</Link>
                        </li>
                        <li className={styles.linkNavbar}>
                            <Link href={'/'}>Sign Up</Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.banner}>
                    <div className={styles.bannerContainer}>
                        <h1 className={styles.secondTitle}>Let the music control your mood</h1>
                        <h1 className={styles.mainTitle}>music | LyrX | platform</h1>
                        <p className={styles.socialsTitle}>Check our socials</p>
                        <ul className={styles.socialsIcons}>
                            <li><Link className={styles.icon} href={'/'}><InstagramIcon/></Link></li>
                            <li><Link className={styles.icon} href={'/'}><TwitterIcon/></Link></li>
                            <li><Link className={styles.icon} href={'/'}><FacebookIcon/></Link></li>
                        </ul>
                    </div>
                </div>
                <div className={styles.body}>
                    <h1 className={styles.bodyTitle}>LyrX gives you access for more then billions audio from all world. You can do anything, anywhere, anytime you want! Your music can be with you for all time. Just tap the button</h1>
                    {<ul className={styles.bodyList}>
                        <li className={styles.listItem}>
                            <Image width={200} height={200} src={'/../public/body1.jpg'} alt={'body'}/>
                            <h3 className={styles.itemText}>For everyone</h3>
                            <p className={styles.itemText}>Parent control can protect our little friends</p>
                        </li>
                        <li className={styles.listItem}>
                            <Image width={300} height={200} src={'/../public/body_4.jpg'} alt={'body'}/>
                            <h3 className={styles.itemText}>Suit for your pocket</h3>
                            <p className={styles.itemText}>You can take your little personal world anywhere you want</p>
                        </li>
                        <li className={styles.listItem}>
                            <Image width={300} height={200} src={'/../public/body_3.jpg'} alt={'body'}/>
                            <h3 className={styles.itemText}>Suit for your pocket</h3>
                            <p className={styles.itemText}>You can take your little personal world anywhere you want</p>
                        </li>
                        <li className={styles.listItem}>
                            <Image width={200} height={200} src={'/../public/body_2.jpg'} alt={'body'}/>
                            <h3 className={styles.itemText}>Everything you want</h3>
                            <p className={styles.itemText}>Kabillions of tracks, podcasts and more you can find here</p>
                        </li>
                    </ul>}
                </div>
                <Footer/>
            </div>
        </>
    )
}
