import ICard from "../types/Card";

import html from '../assets/img/cards/html5.png'
import css from '../assets/img/cards/css3.png'
import js from '../assets/img/cards/javaScript.png'
import nodejs from '../assets/img/cards/nodejs.png'
import react from '../assets/img/cards/react.png'
import vuejs from '../assets/img/cards/vuejs.png'
import php from '../assets/img/cards/php.png'
import symfony from '../assets/img/cards/symfony.png'

const cardsState: ICard[] = [
  { title: 'HTML5', filePath: html },
  { title: 'CSS3', filePath: css },
  { title: 'JavaScript', filePath: js },
  { title: 'NodeJS', filePath: nodejs },
  { title: 'React', filePath: react },
  { title: 'VueJS', filePath: vuejs },
  { title: 'PHP', filePath: php },
  { title: 'Symfony', filePath: symfony },
]

// Simultate as an api call
export const cards = new Promise<ICard[]>((resolve, reject) => setTimeout(resolve, 100, cardsState))
