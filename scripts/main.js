import '../styles/style.css';
import webgl from "./webgl";
import colorSlider from './colorSlider';

window.onload = () =>
{
  const colors = colorSlider();
  webgl(colors);
}