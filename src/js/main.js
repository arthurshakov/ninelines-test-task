import './vendor';
import './helpers';
import './components/social';
import {ieFix} from './vendor/ie-fix';
import {vhFix} from './vendor/vh-fix';
import {actualYear} from './modules/actualYear';
import header from './components/header';
import lazyLoading from './modules/lazyLoading';
// import scrollToAnchor from './modules/scrollToAnchor';
import Preloader from './modules/Preloader';
import Menu from './modules/Menu';
import CustomScroll from './modules/CustomScroll';
import Modal from './modules/Modal';

const preloader = new Preloader();

ieFix();
vhFix();
actualYear();
// scrollToAnchor.init();

header.init();
lazyLoading.init();

const menu = new Menu();
const customScroll = new CustomScroll();
const modal = new Modal();
