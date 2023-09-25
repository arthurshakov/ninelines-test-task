import 'core-js/stable';
import 'regenerator-runtime/runtime';
import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import objectFitImages from 'object-fit-images';
// import objectFitVideos from 'object-fit-videos';

// ARTUR SHAKOV
import LocomotiveScroll from 'locomotive-scroll';
import gsap from "gsap";
import { ExpoScaleEase, RoughEase, SlowMo } from "gsap/EasePack";

gsap.registerPlugin(ExpoScaleEase, RoughEase, SlowMo);
// ARTUR SHAKOV

svg4everybody();
objectFitImages();
// objectFitVideos();

window.$ = $;
window.jQuery = $;
window.objectFitImages = objectFitImages;
window.LocomotiveScroll = LocomotiveScroll;
window.gsap = gsap;
// window.objectFitVideos = objectFitVideos;

require('ninelines-ua-parser');