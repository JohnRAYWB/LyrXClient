import styles from "../styles/Header.module.css"
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";

const Header = () => {

    return (
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
                    <Link href={'/pth/auth?activeKey=1'}>Login</Link>
                </li>
                <li className={styles.linkNavbar}>
                    <Link href={'/pth/auth?activeKey=2'}>Sign Up</Link>
                </li>
            </ul>
        </div>
    );
};

export default Header;