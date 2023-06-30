import styles from "./styles/Home.module.css"
import Image from "next/image";
import Link from "next/link";
import HomeFooter from "./components/HomeFooter";
import HomeHeader from "./components/HomeHeader";
import {FacebookOutlined, InstagramOutlined, TwitterOutlined} from "@ant-design/icons";

const HomePage = () => {
    return (
        <div>
            <title>LyrX | Welcome</title>
            <div className={styles.main}>
                <HomeHeader/>
                <div className={styles.banner}>
                    <div className={styles.bannerContainer}>
                        <h1 className={styles.secondTitle}>Let the music control your mood</h1>
                        <h1 className={styles.mainTitle}>music | LyrX | platform</h1>
                        <p className={styles.socialsTitle}>Check our socials</p>
                        <ul className={styles.socialsIcons}>
                            <li><Link className={styles.icon} href={'/'}><InstagramOutlined/></Link></li>
                            <li><Link className={styles.icon} href={'/'}><TwitterOutlined/></Link></li>
                            <li><Link className={styles.icon} href={'/'}><FacebookOutlined/></Link></li>
                        </ul>
                    </div>
                </div>
                <div className={styles.body}>
                    <h1 className={styles.bodyTitle}>LyrX gives you access for more then billions audio from all world. You can do anything, anywhere, anytime you want! Your music can be with you for all time. Just tap the button</h1>
                    {<ul className={styles.bodyList}>
                        <li className={styles.listItem}>
                            <Image width={200} height={200} src={'/../public/body1.jpg'} alt={'body'}/>
                            <h3 className={styles.itemText}>High quality sound</h3>
                            <p className={styles.itemText}>Here you can find the best music in HD. It good value for money</p>
                        </li>
                        <li className={styles.listItem}>
                            <Image width={300} height={200} src={'/../public/body_4.jpg'} alt={'body'}/>
                            <h3 className={styles.itemText}>Download for listening in offline</h3>
                            <p className={styles.itemText}>Play at your home or big party</p>
                        </li>
                        <li className={styles.listItem}>
                            <Image width={300} height={200} src={'/../public/body_3.jpg'} alt={'body'}/>
                            <h3 className={styles.itemText}>Fits in your pocket</h3>
                            <p className={styles.itemText}>You can take your little personal world anywhere you want</p>
                        </li>
                        <li className={styles.listItem}>
                            <Image width={200} height={200} src={'/../public/body_2.jpg'} alt={'body'}/>
                            <h3 className={styles.itemText}>Everything you want</h3>
                            <p className={styles.itemText}>Kabillions of tracks, podcasts and more you can find here</p>
                        </li>
                    </ul>}
                </div>
                <HomeFooter/>
            </div>
        </div>
    );
};

export default HomePage;