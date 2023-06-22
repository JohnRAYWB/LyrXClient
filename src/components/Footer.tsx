import styles from "../styles/Footer.module.css"
import Image from "next/image";
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
    return (
        <div className={styles.main}>
            <div className={styles.topMain}>
                <div>
                    <Image width={224} height={79} src={'/../public/logo1.png'} alt={'logo'}/>
                </div>
                <div className={styles.columnItems}>
                    <h3 className={styles.listTitle}>Company</h3>
                    <ul className={styles.listColumn}>
                        <li className={styles.listLi}><Link href={'/'}>About</Link> </li>
                        <li className={styles.listLi}><Link href={'/'}>Jobs</Link> </li>
                    </ul>
                </div>
                <div className={styles.columnItems}>
                    <h3 className={styles.listTitle}>Communities</h3>
                    <ul className={styles.listColumn}>
                        <li className={styles.listLi}><Link href={'/'}>For labels</Link> </li>
                        <li className={styles.listLi}><Link href={'/'}>For  artist</Link></li>
                        <li className={styles.listLi}><Link href={'/'}>Developers</Link> </li>
                        <li className={styles.listLi}><Link href={'/'}>Investors</Link> </li>
                    </ul>
                </div>
                <div className={styles.columnItems}>
                    <ul className={styles.socialsList}>
                        <li className={styles.socialsLi}><Link href={'/'}><InstagramIcon/></Link></li>
                        <li className={styles.socialsLi}><Link href={'/'}><TwitterIcon/></Link></li>
                        <li className={styles.socialsLi}><Link href={'/'}><FacebookIcon/></Link></li>
                    </ul>
                </div>
            </div>
            <div className={styles.bottomMain}>
                    <ul className={styles.bottomLinks}>
                        <li className={styles.linkLi}><Link href={'/'}>Privacy Policy</Link></li>
                        <li className={styles.linkLi}><Link href={'/'}>Privacy Center</Link></li>
                        <li className={styles.linkLi}><Link href={'/'}>Cookies</Link></li>
                        <li className={styles.linkLi}><Link href={'/'}>Legals</Link></li>
                        <li className={styles.linkLi}><Link href={'/'}>Accessibility</Link></li>
                    </ul>
                    <p className={styles.rights}>© LyrX | All rights reserved</p>
            </div>
        </div>
    );
};

export default Footer;