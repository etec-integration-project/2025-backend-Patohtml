import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaHome } from 'react-icons/fa';

// Componentes
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import LoginModal from './components/LoginModal';

// Imágenes
import smb from './media/SideBar/smb.png';
import splatoon from './media/SideBar/splatoon.png';
import acnh from './media/SideBar/acnh.png';
import ssbu from './media/SideBar/ssbu.png';
import zelda from './media/SideBar/zelda.png';
import fireEmblem from './media/SideBar/FireEmblem.png';
import mario from './media/Amiibos/smb/mario.png';
import linkTotk from './media/Amiibos/zelda/link_totk.jpg';
import marinaSplatoon from './media/Amiibos/splatoon/marina.jpg';
import isabelleSmr from './media/Amiibos/animal-crossing/isabelle_summer.jpg';
import chrom from './media/Amiibos/fire-emblem/chrom.png';
import kazuya from './media/Amiibos/smash/kazuya.jpg';
import blathers from './media/Amiibos/animal-crossing/blathers.png';
import celeste from './media/Amiibos/animal-crossing/celeste.png';
import cyrus from './media/Amiibos/animal-crossing/cyrus.jpg';
import digby from './media/Amiibos/animal-crossing/digby.png';
import isabelleWinter from './media/Amiibos/animal-crossing/isabelle_winter.jpg';
import kappn from './media/Amiibos/animal-crossing/kappn.png';
import kicks from './media/Amiibos/animal-crossing/kicks.jpg';
import lottie from './media/Amiibos/animal-crossing/lottie.jpg';
import mabel from './media/Amiibos/animal-crossing/mabel.png';
import resetti from './media/Amiibos/animal-crossing/resetti.jpg';
import rover from './media/Amiibos/animal-crossing/rover.jpg';
import timmyTommy from './media/Amiibos/animal-crossing/timmy_tommy.png';
import tomNook from './media/Amiibos/animal-crossing/tom_nook.jpg';
import totakeke from './media/Amiibos/animal-crossing/totakeke.jpg';
import alm from './media/Amiibos/fire-emblem/alm.png';
import celica from './media/Amiibos/fire-emblem/celica.jpg';
import tiki from './media/Amiibos/fire-emblem/tiki.jpg';

// Importaciones de Smash Bros
import alex from './media/Amiibos/smash/alex.png';
import banjo from './media/Amiibos/smash/banjo.png';
import bayonetta from './media/Amiibos/smash/bayonetta.jpg';
import bayonetta2 from './media/Amiibos/smash/bayonetta2.png';
import bowserJr from './media/Amiibos/smash/bowser_jr.png';
import bowserSmash from './media/Amiibos/smash/bowser.png';
import byleth from './media/Amiibos/smash/byleth.png';
import captainFalcon from './media/Amiibos/smash/captain_falcon.jpg';
import charizard from './media/Amiibos/smash/charizard.png';
import chromSmash from './media/Amiibos/smash/chrom.jpg';
import cloud from './media/Amiibos/smash/cloud.jpg';
import cloud2 from './media/Amiibos/smash/cloud2.jpg';
import corrin from './media/Amiibos/smash/corrin.png';
import corrin2 from './media/Amiibos/smash/corrin2.png';
import daisySmash from './media/Amiibos/smash/daisy.png';
import darkPit from './media/Amiibos/smash/dark_pit.png';
import darkSamus from './media/Amiibos/smash/dark_samus.png';
import diddyKongSmash from './media/Amiibos/smash/diddy_kong.jpg';
import donkeyKongSmash from './media/Amiibos/smash/donkey_kong.jpg';
import drMario from './media/Amiibos/smash/dr_mario.png';
import duckHunt from './media/Amiibos/smash/duck_hunt.jpg';
import falco from './media/Amiibos/smash/falco.png';
import fox from './media/Amiibos/smash/fox.jpg';
import gameAndWatch from './media/Amiibos/smash/game&watch.jpg';
import ganondorfSmash from './media/Amiibos/smash/ganondorf.png';
import greninja from './media/Amiibos/smash/greninja.jpg';
import hero from './media/Amiibos/smash/hero.jpg';
import iceClimbers from './media/Amiibos/smash/ice_climbers.jpg';
import ike from './media/Amiibos/smash/ike.jpg';
import incineroar from './media/Amiibos/smash/incineroar.jpg';
import inkling from './media/Amiibos/smash/inkling.png';
import isabelleSmash from './media/Amiibos/smash/isabelle.jpg';
import ivysaur from './media/Amiibos/smash/ivysaur.png';
import jigglypuff from './media/Amiibos/smash/jigglypuff.png';
import joker from './media/Amiibos/smash/joker.jpg';
import kazuyaSmash from './media/Amiibos/smash/kazuya.jpg';
import ken from './media/Amiibos/smash/ken.png';
import kingDedede from './media/Amiibos/smash/king_dedede.jpg';
import kingKRool from './media/Amiibos/smash/king_k_rool.jpg';
import kirby from './media/Amiibos/smash/kirby.jpg';
import linkSmash from './media/Amiibos/smash/link.jpg';
import littleMac from './media/Amiibos/smash/little_mac.png';
import lucario from './media/Amiibos/smash/lucario.png';
import lucas from './media/Amiibos/smash/lucas.png';
import lucina from './media/Amiibos/smash/lucina.jpg';
import luigiSmash from './media/Amiibos/smash/luigi.jpg';
import marth from './media/Amiibos/smash/marth.jpg';
import megaman from './media/Amiibos/smash/megaman.png';
import metaKnight from './media/Amiibos/smash/meta_knight.jpg';
import mewtwo from './media/Amiibos/smash/mewtwo.png';
import miiBrawler from './media/Amiibos/smash/mii_brawler.png';
import miiGunner from './media/Amiibos/smash/mii_gunner.jpg';
import miiSwordfighter from './media/Amiibos/smash/mii_swordfighter.png';
import minMin from './media/Amiibos/smash/min_min.png';
import mythra from './media/Amiibos/smash/mythra.jpg';
import ness from './media/Amiibos/smash/ness.png';
import olimar from './media/Amiibos/smash/olimar.jpg';
import pacMan from './media/Amiibos/smash/pac_man.jpg';
import palutena from './media/Amiibos/smash/palutena.jpg';
import peachSmash from './media/Amiibos/smash/peach.jpg';
import pichu from './media/Amiibos/smash/pichu.jpg';
import pikachu from './media/Amiibos/smash/pikachu.png';
import piranhaPlant from './media/Amiibos/smash/piranha_plant.png';
import pit from './media/Amiibos/smash/pit.png';
import pokemonTrainer from './media/Amiibos/smash/pokemon trainer.png';
import pyra from './media/Amiibos/smash/pyra.png';
import richter from './media/Amiibos/smash/richter.jpg';
import ridley from './media/Amiibos/smash/ridley.jpg';
import rob from './media/Amiibos/smash/rob.png';
import robin from './media/Amiibos/smash/robin.jpg';
import rosalinaSmash from './media/Amiibos/smash/rosalina.png';
import roy from './media/Amiibos/smash/roy.png';
import ryu from './media/Amiibos/smash/ryu.png';
import samus from './media/Amiibos/smash/samus.jpg';
import sephiroth from './media/Amiibos/smash/sephiroth.jpg';
import sheik from './media/Amiibos/smash/sheik.jpg';
import shulk from './media/Amiibos/smash/shulk.jpg';
import simon from './media/Amiibos/smash/simon.jpg';
import snake from './media/Amiibos/smash/snake.png';
import sonic from './media/Amiibos/smash/sonic.jpg';
import sora from './media/Amiibos/smash/sora.png';
import squirtle from './media/Amiibos/smash/squirtle.png';
import steve from './media/Amiibos/smash/steve.png';
import terry from './media/Amiibos/smash/terry.jpg';
import toonLink from './media/Amiibos/smash/toon_link.png';
import villager from './media/Amiibos/smash/villager.jpg';
import warioSmash from './media/Amiibos/smash/wario.jpg';
import wiiFitTrainer from './media/Amiibos/smash/wii_fit_trainer.jpg';
import wolf from './media/Amiibos/smash/wolf.jpg';
import yoshiSmash from './media/Amiibos/smash/yoshi.png';
import youngLink from './media/Amiibos/smash/young_link.jpg';
import zeldaSmash from './media/Amiibos/smash/zelda.jpg';
import zeroSuitSamus from './media/Amiibos/smash/zero_suit_samus.jpg';

// Importaciones de Super Mario Bros
import boo from './media/Amiibos/smb/boo.png';
import bowserOdyssey from './media/Amiibos/smb/bowser_oddysey.jpg';
import bowserSmb from './media/Amiibos/smb/bowser.jpg';
import daisySmb from './media/Amiibos/smb/daisy.jpg';
import diddyKongSmb from './media/Amiibos/smb/diddy_kong.jpg';
import donkeyKongSmb from './media/Amiibos/smb/donkey_kong.jpg';
import goomba from './media/Amiibos/smb/goomba.jpg';
import koopa from './media/Amiibos/smb/koopa.jpg';
import luigiSmb from './media/Amiibos/smb/luigi.jpg';
import marioCat from './media/Amiibos/smb/mario_cat.jpg';
import marioOdyssey from './media/Amiibos/smb/mario_odyssey.jpg';
import marioSmb from './media/Amiibos/smb/mario.png';
import peachCat from './media/Amiibos/smb/peach_cat.jpg';
import peachOdyssey from './media/Amiibos/smb/peach_odyssey.jpg';
import peachSmb from './media/Amiibos/smb/peach.jpg';
import rosalinaSmb from './media/Amiibos/smb/rosalina.png';
import waluigi from './media/Amiibos/smb/waluigi.jpg';
import warioSmb from './media/Amiibos/smb/wario.jpg';
import yoshiSmb from './media/Amiibos/smb/yoshi.jpg';

// Importaciones de Splatoon
import bigMan from './media/Amiibos/splatoon/big_man.png';
import callie from './media/Amiibos/splatoon/callie.png';
import callie2 from './media/Amiibos/splatoon/callie2.jpg';
import frye from './media/Amiibos/splatoon/frye.jpg';
import inklingBoyAlt from './media/Amiibos/splatoon/inkling_boy_alt.jpg';
import inklingBoy from './media/Amiibos/splatoon/inkling_boy.png';
import inklingGirlAlt from './media/Amiibos/splatoon/inkling_girl_alt.png';
import inklingGirl from './media/Amiibos/splatoon/inkling_girl.jpg';
import marie from './media/Amiibos/splatoon/marie.png';
import marie2 from './media/Amiibos/splatoon/marie2.jpeg';
import marina from './media/Amiibos/splatoon/marina.jpg';
import marina2 from './media/Amiibos/splatoon/marina2.png';
import newInklingBoy from './media/Amiibos/splatoon/new_inkling_boy.png';
import newInklingGirl from './media/Amiibos/splatoon/new_inkling_girl.jpg';
import pearl from './media/Amiibos/splatoon/pearl.png';
import pearl2 from './media/Amiibos/splatoon/pearl2.png';
import shiver from './media/Amiibos/splatoon/shiver.jpg';

// Importaciones de Zelda
import daruk from './media/Amiibos/zelda/daruk.png';
import ganondorfZelda from './media/Amiibos/zelda/ganondorf.jpg';
import linkBotw from './media/Amiibos/zelda/link_botw.jpg';
import linkMm from './media/Amiibos/zelda/link_mm.png';
import linkOot from './media/Amiibos/zelda/link_oot.jpg';
import linkSs from './media/Amiibos/zelda/link_ss.png';
import linkTotkZelda from './media/Amiibos/zelda/link_totk.jpg';
import mipha from './media/Amiibos/zelda/mipha.png';
import revali from './media/Amiibos/zelda/revali_botw.jpg';
import urbosa from './media/Amiibos/zelda/urbosa.jpg';
import wolfLink from './media/Amiibos/zelda/wolf_link.jpg';
import zeldaBotw from './media/Amiibos/zelda/zelda_botw.jpg';
import zeldaSs from './media/Amiibos/zelda/zelda_ss.jpg';
import zeldaBase from './media/Amiibos/zelda/zelda.png';

// Estilos
import './App.css';

const PRODUCTS = [
  // Animal Crossing
  { 
    id: 1, 
    franchise: 'animal-crossing', 
    src: blathers, 
    name: 'Blathers', 
    price: 24.99, 
    description: 'Museum curator who shares his extensive knowledge about fossils, fish, and bugs' 
  },
  { 
    id: 2, 
    franchise: 'animal-crossing', 
    src: celeste, 
    name: 'Celeste', 
    price: 29.99, 
    description: 'Blathers\' sister who loves studying the stars and constellations' 
  },
  { 
    id: 3, 
    franchise: 'animal-crossing', 
    src: cyrus, 
    name: 'Cyrus', 
    price: 24.99, 
    description: 'Skilled craftsman alpaca who can customize your furniture' 
  },
  { 
    id: 4, 
    franchise: 'animal-crossing', 
    src: digby, 
    name: 'Digby', 
    price: 24.99, 
    description: 'Isabelle\'s twin brother who works at the Happy Home Academy' 
  },
  { 
    id: 5, 
    franchise: 'animal-crossing', 
    src: isabelleSmr, 
    name: 'Isabelle (Summer)', 
    price: 34.99, 
    description: 'The cheerful secretary in her summer outfit' 
  },
  { 
    id: 6, 
    franchise: 'animal-crossing', 
    src: isabelleWinter, 
    name: 'Isabelle (Winter)', 
    price: 34.99, 
    description: 'The hardworking secretary in her winter outfit' 
  },
  { 
    id: 7, 
    franchise: 'animal-crossing', 
    src: kappn, 
    name: 'Kapp\'n', 
    price: 24.99, 
    description: 'The singing sailor who takes you to mysterious islands' 
  },
  { 
    id: 8, 
    franchise: 'animal-crossing', 
    src: kicks, 
    name: 'Kicks', 
    price: 24.99, 
    description: 'The fashionable skunk who sells shoes and accessories' 
  },
  { 
    id: 9, 
    franchise: 'animal-crossing', 
    src: lottie, 
    name: 'Lottie', 
    price: 24.99, 
    description: 'The enthusiastic otter who manages Paradise Planning' 
  },
  { 
    id: 10, 
    franchise: 'animal-crossing', 
    src: mabel, 
    name: 'Mabel', 
    price: 29.99, 
    description: 'The friendly hedgehog who runs the Able Sisters shop' 
  },
  { 
    id: 11, 
    franchise: 'animal-crossing', 
    src: resetti, 
    name: 'Mr. Resetti', 
    price: 29.99, 
    description: 'The passionate mole who reminds you to save your game' 
  },
  { 
    id: 12, 
    franchise: 'animal-crossing', 
    src: rover, 
    name: 'Rover', 
    price: 29.99, 
    description: 'The traveling cat who helps you start your new life' 
  },
  { 
    id: 13, 
    franchise: 'animal-crossing', 
    src: timmyTommy, 
    name: 'Timmy & Tommy', 
    price: 34.99, 
    description: 'Tom Nook\'s apprentices who run Nook\'s Cranny' 
  },
  { 
    id: 14, 
    franchise: 'animal-crossing', 
    src: tomNook, 
    name: 'Tom Nook', 
    price: 34.99, 
    description: 'The business-savvy tanuki who helps develop your island' 
  },
  { 
    id: 15, 
    franchise: 'animal-crossing', 
    src: totakeke, 
    name: 'K.K. Slider', 
    price: 34.99, 
    description: 'The talented musician who performs every Saturday night' 
  },

  // Fire Emblem
  { 
    id: 16, 
    franchise: 'fire-emblem', 
    src: alm, 
    name: 'Alm', 
    price: 34.99, 
    description: 'The brave leader of the Deliverance from Fire Emblem Echoes' 
  },
  { 
    id: 17, 
    franchise: 'fire-emblem', 
    src: celica, 
    name: 'Celica', 
    price: 34.99, 
    description: 'The lost princess of Zofia from Fire Emblem Echoes' 
  },
  { 
    id: 18, 
    franchise: 'fire-emblem', 
    src: chrom, 
    name: 'Chrom', 
    price: 34.99, 
    description: 'The prince of Ylisse from Fire Emblem Awakening' 
  },
  { 
    id: 19, 
    franchise: 'fire-emblem', 
    src: tiki, 
    name: 'Tiki', 
    price: 39.99, 
    description: 'The Voice of the Divine Dragon from Fire Emblem' 
  },

  // Super Mario Bros
  { 
    id: 21, 
    franchise: 'smb', 
    src: boo, 
    name: 'Boo', 
    price: 24.99, 
    description: 'The shy ghost who only moves when you\'re not looking' 
  },
  { 
    id: 22, 
    franchise: 'smb', 
    src: bowserOdyssey, 
    name: 'Bowser (Wedding)', 
    price: 34.99, 
    description: 'The King of the Koopas in his wedding attire from Super Mario Odyssey' 
  },
  { 
    id: 23, 
    franchise: 'smb', 
    src: bowserSmb, 
    name: 'Bowser', 
    price: 29.99, 
    description: 'The mighty King of the Koopas in his classic pose' 
  },
  { 
    id: 24, 
    franchise: 'smb', 
    src: daisySmb, 
    name: 'Daisy', 
    price: 29.99, 
    description: 'The energetic princess of Sarasaland' 
  },
  { 
    id: 25, 
    franchise: 'smb', 
    src: diddyKongSmb, 
    name: 'Diddy Kong', 
    price: 29.99, 
    description: 'Donkey Kong\'s agile sidekick and best friend' 
  },
  { 
    id: 26, 
    franchise: 'smb', 
    src: donkeyKongSmb, 
    name: 'Donkey Kong', 
    price: 29.99, 
    description: 'The powerful leader of the DK crew' 
  },
  { 
    id: 27, 
    franchise: 'smb', 
    src: goomba, 
    name: 'Goomba', 
    price: 24.99, 
    description: 'The classic first enemy from Super Mario Bros' 
  },
  { 
    id: 28, 
    franchise: 'smb', 
    src: koopa, 
    name: 'Koopa Troopa', 
    price: 24.99, 
    description: 'The iconic turtle soldier from Bowser\'s army' 
  },
  { 
    id: 29, 
    franchise: 'smb', 
    src: luigiSmb, 
    name: 'Luigi', 
    price: 29.99, 
    description: 'Mario\'s brave brother in his classic pose' 
  },
  { 
    id: 30, 
    franchise: 'smb', 
    src: marioCat, 
    name: 'Mario (Cat)', 
    price: 34.99, 
    description: 'Mario wearing the Super Bell power-up from Super Mario 3D World' 
  },
  { 
    id: 31, 
    franchise: 'smb', 
    src: marioOdyssey, 
    name: 'Mario (Wedding)', 
    price: 34.99, 
    description: 'Mario in his dashing wedding outfit from Super Mario Odyssey' 
  },
  { 
    id: 32, 
    franchise: 'smb', 
    src: marioSmb, 
    name: 'Mario', 
    price: 29.99, 
    description: 'The legendary hero of the Mushroom Kingdom' 
  },
  { 
    id: 33, 
    franchise: 'smb', 
    src: peachCat, 
    name: 'Peach (Cat)', 
    price: 34.99, 
    description: 'Princess Peach with the Cat power-up from Super Mario 3D World' 
  },
  { 
    id: 34, 
    franchise: 'smb', 
    src: peachOdyssey, 
    name: 'Peach (Wedding)', 
    price: 34.99, 
    description: 'Princess Peach in her wedding dress from Super Mario Odyssey' 
  },
  { 
    id: 35, 
    franchise: 'smb', 
    src: peachSmb, 
    name: 'Peach', 
    price: 29.99, 
    description: 'The beloved princess of the Mushroom Kingdom' 
  },
  { 
    id: 36, 
    franchise: 'smb', 
    src: rosalinaSmb, 
    name: 'Rosalina', 
    price: 34.99, 
    description: 'The mysterious guardian of the Lumas and the Comet Observatory' 
  },
  { 
    id: 37, 
    franchise: 'smb', 
    src: waluigi, 
    name: 'Waluigi', 
    price: 29.99, 
    description: 'The mischievous rival of Luigi' 
  },
  { 
    id: 38, 
    franchise: 'smb', 
    src: warioSmb, 
    name: 'Wario', 
    price: 29.99, 
    description: 'Mario\'s greedy rival and treasure hunter' 
  },
  { 
    id: 39, 
    franchise: 'smb', 
    src: yoshiSmb, 
    name: 'Yoshi', 
    price: 29.99, 
    description: 'Mario\'s faithful dinosaur companion' 
  },

  // Splatoon
  { 
    id: 41, 
    franchise: 'splatoon', 
    src: bigMan, 
    name: 'Big Man', 
    price: 34.99, 
    description: 'The lovable manta ray member of Deep Cut from Splatoon 3' 
  },
  { 
    id: 42, 
    franchise: 'splatoon', 
    src: callie, 
    name: 'Callie', 
    price: 34.99, 
    description: 'One half of the Squid Sisters from Splatoon' 
  },
  { 
    id: 43, 
    franchise: 'splatoon', 
    src: callie2, 
    name: 'Callie (Idol)', 
    price: 39.99, 
    description: 'Callie in her iconic idol outfit from Splatoon 2' 
  },
  { 
    id: 44, 
    franchise: 'splatoon', 
    src: frye, 
    name: 'Frye', 
    price: 34.99, 
    description: 'The energetic member of Deep Cut from Splatoon 3' 
  },
  { 
    id: 45, 
    franchise: 'splatoon', 
    src: inklingBoyAlt, 
    name: 'Inkling Boy (Alt)', 
    price: 29.99, 
    description: 'Alternative costume for the male Inkling' 
  },
  { 
    id: 46, 
    franchise: 'splatoon', 
    src: inklingBoy, 
    name: 'Inkling Boy', 
    price: 29.99, 
    description: 'The male Inkling ready for turf war' 
  },
  { 
    id: 47, 
    franchise: 'splatoon', 
    src: inklingGirlAlt, 
    name: 'Inkling Girl (Alt)', 
    price: 29.99, 
    description: 'Alternative costume for the female Inkling' 
  },
  { 
    id: 48, 
    franchise: 'splatoon', 
    src: inklingGirl, 
    name: 'Inkling Girl', 
    price: 29.99, 
    description: 'The female Inkling ready for battle' 
  },
  { 
    id: 49, 
    franchise: 'splatoon', 
    src: marie, 
    name: 'Marie', 
    price: 34.99, 
    description: 'The other half of the Squid Sisters from Splatoon' 
  },
  { 
    id: 50, 
    franchise: 'splatoon', 
    src: marie2, 
    name: 'Marie (Idol)', 
    price: 39.99, 
    description: 'Marie in her stunning idol outfit from Splatoon 2' 
  },
  { 
    id: 51, 
    franchise: 'splatoon', 
    src: marina, 
    name: 'Marina', 
    price: 34.99, 
    description: 'The talented DJ of Off the Hook from Splatoon 2' 
  },
  { 
    id: 52, 
    franchise: 'splatoon', 
    src: marina2, 
    name: 'Marina (Idol)', 
    price: 39.99, 
    description: 'Marina in her spectacular idol outfit' 
  },
  { 
    id: 53, 
    franchise: 'splatoon', 
    src: newInklingBoy, 
    name: 'Inkling Boy (Splatoon 3)', 
    price: 34.99, 
    description: 'The new male Inkling design from Splatoon 3' 
  },
  { 
    id: 54, 
    franchise: 'splatoon', 
    src: newInklingGirl, 
    name: 'Inkling Girl (Splatoon 3)', 
    price: 34.99, 
    description: 'The new female Inkling design from Splatoon 3' 
  },
  { 
    id: 55, 
    franchise: 'splatoon', 
    src: pearl, 
    name: 'Pearl', 
    price: 34.99, 
    description: 'The energetic MC of Off the Hook from Splatoon 2' 
  },
  { 
    id: 56, 
    franchise: 'splatoon', 
    src: pearl2, 
    name: 'Pearl (Idol)', 
    price: 39.99, 
    description: 'Pearl in her dazzling idol costume' 
  },
  { 
    id: 57, 
    franchise: 'splatoon', 
    src: shiver, 
    name: 'Shiver', 
    price: 34.99, 
    description: 'The cool and collected member of Deep Cut from Splatoon 3' 
  },

  // The Legend of Zelda
  { 
    id: 61, 
    franchise: 'zelda', 
    src: daruk, 
    name: 'Daruk', 
    price: 34.99, 
    description: 'The powerful Goron Champion from Breath of the Wild' 
  },
  { 
    id: 62, 
    franchise: 'zelda', 
    src: ganondorfZelda, 
    name: 'Ganondorf', 
    price: 39.99, 
    description: 'The King of Evil and bearer of the Triforce of Power' 
  },
  { 
    id: 63, 
    franchise: 'zelda', 
    src: linkBotw, 
    name: 'Link (BOTW)', 
    price: 39.99, 
    description: 'Link in his Champion\'s Tunic from Breath of the Wild' 
  },
  { 
    id: 64, 
    franchise: 'zelda', 
    src: linkMm, 
    name: 'Link (Majora\'s Mask)', 
    price: 34.99, 
    description: 'Link from The Legend of Zelda: Majora\'s Mask' 
  },
  { 
    id: 65, 
    franchise: 'zelda', 
    src: linkOot, 
    name: 'Link (Ocarina of Time)', 
    price: 34.99, 
    description: 'Link from The Legend of Zelda: Ocarina of Time' 
  },
  { 
    id: 66, 
    franchise: 'zelda', 
    src: linkSs, 
    name: 'Link (Skyward Sword)', 
    price: 34.99, 
    description: 'Link from The Legend of Zelda: Skyward Sword' 
  },
  { 
    id: 67, 
    franchise: 'zelda', 
    src: linkTotkZelda, 
    name: 'Link (TOTK)', 
    price: 44.99, 
    description: 'Link from The Legend of Zelda: Tears of the Kingdom' 
  },
  { 
    id: 68, 
    franchise: 'zelda', 
    src: mipha, 
    name: 'Mipha', 
    price: 34.99, 
    description: 'The graceful Zora Champion from Breath of the Wild' 
  },
  { 
    id: 69, 
    franchise: 'zelda', 
    src: revali, 
    name: 'Revali', 
    price: 34.99, 
    description: 'The prideful Rito Champion from Breath of the Wild' 
  },
  { 
    id: 70, 
    franchise: 'zelda', 
    src: urbosa, 
    name: 'Urbosa', 
    price: 34.99, 
    description: 'The fierce Gerudo Champion from Breath of the Wild' 
  },
  { 
    id: 71, 
    franchise: 'zelda', 
    src: wolfLink, 
    name: 'Wolf Link', 
    price: 39.99, 
    description: 'Link\'s wolf form from Twilight Princess' 
  },
  { 
    id: 72, 
    franchise: 'zelda', 
    src: zeldaBotw, 
    name: 'Zelda (BOTW)', 
    price: 39.99, 
    description: 'Princess Zelda in her research attire from Breath of the Wild' 
  },
  { 
    id: 73, 
    franchise: 'zelda', 
    src: zeldaSs, 
    name: 'Zelda (Skyward Sword)', 
    price: 34.99, 
    description: 'Zelda in her goddess dress from Skyward Sword' 
  },
  { 
    id: 74, 
    franchise: 'zelda', 
    src: zeldaBase, 
    name: 'Zelda', 
    price: 34.99, 
    description: 'The classic design of Princess Zelda' 
  },

  // Super Smash Bros
  { 
    id: 79, 
    franchise: 'smash', 
    src: pyra, 
    name: 'Pyra', 
    price: 34.99, 
    description: 'The powerful Fire Blade from Xenoblade Chronicles 2' 
  },
  { 
    id: 80, 
    franchise: 'smash', 
    src: mythra, 
    name: 'Mythra', 
    price: 34.99, 
    description: 'The legendary Light Blade from Xenoblade Chronicles 2' 
  },
  { 
    id: 81, 
    franchise: 'smash', 
    src: alex, 
    name: 'Alex', 
    price: 29.99, 
    description: 'The alternative protagonist from Minecraft' 
  },
  { 
    id: 82, 
    franchise: 'smash', 
    src: banjo, 
    name: 'Banjo & Kazooie', 
    price: 34.99, 
    description: 'The adventurous duo of the bear and the bird' 
  },
  { 
    id: 83, 
    franchise: 'smash', 
    src: bayonetta, 
    name: 'Bayonetta', 
    price: 34.99, 
    description: 'The original Umbra Witch in her attire' 
  },
  { 
    id: 84, 
    franchise: 'smash', 
    src: bayonetta2, 
    name: 'Bayonetta (P2)', 
    price: 34.99, 
    description: 'Bayonetta in her original attire' 
  },
  { 
    id: 85, 
    franchise: 'smash', 
    src: bowserJr, 
    name: 'Bowser Jr.', 
    price: 29.99, 
    description: 'The mischievous son of Bowser in his Junior Clown Car' 
  },
  { 
    id: 86, 
    franchise: 'smash', 
    src: bowserSmash, 
    name: 'Bowser', 
    price: 34.99, 
    description: 'The King of the Koopas ready for battle' 
  },
  { 
    id: 87, 
    franchise: 'smash', 
    src: byleth, 
    name: 'Byleth', 
    price: 34.99, 
    description: 'The protagonist from Fire Emblem: Three Houses' 
  },
  { 
    id: 88, 
    franchise: 'smash', 
    src: captainFalcon, 
    name: 'Captain Falcon', 
    price: 29.99, 
    description: 'The F-Zero champion and bounty hunter' 
  },
  { 
    id: 89, 
    franchise: 'smash', 
    src: charizard, 
    name: 'Charizard', 
    price: 34.99, 
    description: 'The powerful Fire/Flying-type Pokémon' 
  },
  { 
    id: 90, 
    franchise: 'smash', 
    src: chromSmash, 
    name: 'Chrom', 
    price: 29.99, 
    description: 'The prince of Ylisse joins the battle' 
  },
  { 
    id: 106, 
    franchise: 'smash', 
    src: greninja, 
    name: 'Greninja', 
    price: 34.99, 
    description: 'The ninja-like Water/Dark-type Pokémon' 
  },
  { 
    id: 107, 
    franchise: 'smash', 
    src: hero, 
    name: 'Hero', 
    price: 34.99, 
    description: 'The legendary hero from Dragon Quest XI' 
  },
  { 
    id: 108, 
    franchise: 'smash', 
    src: iceClimbers, 
    name: 'Ice Climbers', 
    price: 34.99, 
    description: 'Popo and Nana, the mountain-climbing duo' 
  },
  { 
    id: 109, 
    franchise: 'smash', 
    src: ike, 
    name: 'Ike', 
    price: 34.99, 
    description: 'The legendary mercenary from Fire Emblem' 
  },
  { 
    id: 110, 
    franchise: 'smash', 
    src: incineroar, 
    name: 'Incineroar', 
    price: 34.99, 
    description: 'The heel wrestler Fire/Dark-type Pokémon' 
  },
  { 
    id: 111, 
    franchise: 'smash', 
    src: inkling, 
    name: 'Inkling', 
    price: 34.99, 
    description: 'The colorful fighters from Splatoon' 
  },
  { 
    id: 112, 
    franchise: 'smash', 
    src: isabelleSmash, 
    name: 'Isabelle', 
    price: 29.99, 
    description: 'The helpful secretary from Animal Crossing' 
  },
  { 
    id: 113, 
    franchise: 'smash', 
    src: ivysaur, 
    name: 'Ivysaur', 
    price: 29.99, 
    description: 'The evolving Grass/Poison-type Pokémon' 
  },
  { 
    id: 114, 
    franchise: 'smash', 
    src: jigglypuff, 
    name: 'Jigglypuff', 
    price: 29.99, 
    description: 'The balloon Pokémon with a deadly lullaby' 
  },
  { 
    id: 115, 
    franchise: 'smash', 
    src: joker, 
    name: 'Joker', 
    price: 34.99, 
    description: 'The phantom thief from Persona 5' 
  },
  { 
    id: 116, 
    franchise: 'smash', 
    src: kazuyaSmash, 
    name: 'Kazuya', 
    price: 34.99, 
    description: 'The powerful martial artist from Tekken' 
  },
  { 
    id: 117, 
    franchise: 'smash', 
    src: ken, 
    name: 'Ken', 
    price: 34.99, 
    description: 'The burning Shoryuken master from Street Fighter' 
  },
  { 
    id: 118, 
    franchise: 'smash', 
    src: kingDedede, 
    name: 'King Dedede', 
    price: 34.99, 
    description: 'The self-proclaimed king of Dream Land' 
  },
  { 
    id: 119, 
    franchise: 'smash', 
    src: kingKRool, 
    name: 'King K. Rool', 
    price: 34.99, 
    description: 'The kremling king and arch-nemesis of the Kong family' 
  },
  { 
    id: 120, 
    franchise: 'smash', 
    src: kirby, 
    name: 'Kirby', 
    price: 29.99, 
    description: 'The powerful pink puffball from Dream Land' 
  },
  { 
    id: 121, 
    franchise: 'smash', 
    src: linkSmash, 
    name: 'Link', 
    price: 34.99, 
    description: 'The legendary hero of Hyrule' 
  },
  { 
    id: 122, 
    franchise: 'smash', 
    src: littleMac, 
    name: 'Little Mac', 
    price: 29.99, 
    description: 'The determined boxer from Punch-Out!!' 
  },
  { 
    id: 123, 
    franchise: 'smash', 
    src: lucario, 
    name: 'Lucario', 
    price: 34.99, 
    description: 'The Aura Pokémon with fighting spirit' 
  },
  { 
    id: 124, 
    franchise: 'smash', 
    src: lucas, 
    name: 'Lucas', 
    price: 29.99, 
    description: 'The young PSI user from Mother 3' 
  },
  { 
    id: 125, 
    franchise: 'smash', 
    src: lucina, 
    name: 'Lucina', 
    price: 34.99, 
    description: 'The warrior princess from the future in Fire Emblem Awakening' 
  },
  { 
    id: 126, 
    franchise: 'smash', 
    src: luigiSmash, 
    name: 'Luigi', 
    price: 29.99, 
    description: 'The green-clad plumber with a powerful uppercut' 
  },
  { 
    id: 127, 
    franchise: 'smash', 
    src: marth, 
    name: 'Marth', 
    price: 34.99, 
    description: 'The legendary Hero-King from Fire Emblem' 
  },
  { 
    id: 128, 
    franchise: 'smash', 
    src: megaman, 
    name: 'Mega Man', 
    price: 34.99, 
    description: 'The Blue Bomber with his arsenal of weapons' 
  },
  { 
    id: 129, 
    franchise: 'smash', 
    src: metaKnight, 
    name: 'Meta Knight', 
    price: 34.99, 
    description: 'The mysterious masked warrior from Dream Land' 
  },
  { 
    id: 130, 
    franchise: 'smash', 
    src: mewtwo, 
    name: 'Mewtwo', 
    price: 34.99, 
    description: 'The genetically engineered Psychic-type Pokémon' 
  },
  { 
    id: 131, 
    franchise: 'smash', 
    src: minMin, 
    name: 'Min Min', 
    price: 34.99, 
    description: 'The ramen fighter from ARMS' 
  },
  { 
    id: 132, 
    franchise: 'smash', 
    src: ness, 
    name: 'Ness', 
    price: 29.99, 
    description: 'The young PSI hero from EarthBound' 
  },
  { 
    id: 133, 
    franchise: 'smash', 
    src: olimar, 
    name: 'Olimar', 
    price: 29.99, 
    description: 'The tiny captain with his loyal Pikmin' 
  },
  { 
    id: 134, 
    franchise: 'smash', 
    src: pacMan, 
    name: 'Pac-Man', 
    price: 29.99, 
    description: 'The legendary arcade hero' 
  },
  { 
    id: 135, 
    franchise: 'smash', 
    src: palutena, 
    name: 'Palutena', 
    price: 34.99, 
    description: 'The goddess of light from Kid Icarus' 
  },
  { 
    id: 136, 
    franchise: 'smash', 
    src: pichu, 
    name: 'Pichu', 
    price: 29.99, 
    description: 'The tiny Electric-type Pokémon that damages itself' 
  },
  { 
    id: 137, 
    franchise: 'smash', 
    src: pikachu, 
    name: 'Pikachu', 
    price: 29.99, 
    description: 'The iconic Electric-type Pokémon mascot' 
  },
  { 
    id: 138, 
    franchise: 'smash', 
    src: pit, 
    name: 'Pit', 
    price: 29.99, 
    description: 'The angelic captain of Palutena\'s guard' 
  },
  { 
    id: 139, 
    franchise: 'smash', 
    src: pokemonTrainer, 
    name: 'Pokémon Trainer', 
    price: 34.99, 
    description: 'The trainer who commands Squirtle, Ivysaur, and Charizard' 
  },
  { 
    id: 140, 
    franchise: 'smash', 
    src: richter, 
    name: 'Richter', 
    price: 34.99, 
    description: 'The vampire hunter from Castlevania' 
  },
  { 
    id: 141, 
    franchise: 'smash', 
    src: ridley, 
    name: 'Ridley', 
    price: 34.99, 
    description: 'The cunning space pirate from Metroid' 
  },
  { 
    id: 142, 
    franchise: 'smash', 
    src: rob, 
    name: 'R.O.B.', 
    price: 29.99, 
    description: 'The Robotic Operating Buddy from Nintendo\'s history' 
  },
  { 
    id: 143, 
    franchise: 'smash', 
    src: robin, 
    name: 'Robin', 
    price: 34.99, 
    description: 'The tactical magician from Fire Emblem Awakening' 
  },
  { 
    id: 144, 
    franchise: 'smash', 
    src: rosalinaSmash, 
    name: 'Rosalina & Luma', 
    price: 34.99, 
    description: 'The cosmic princess and her star companion' 
  },
  { 
    id: 145, 
    franchise: 'smash', 
    src: roy, 
    name: 'Roy', 
    price: 34.99, 
    description: 'The young lion from Fire Emblem' 
  },
  { 
    id: 146, 
    franchise: 'smash', 
    src: ryu, 
    name: 'Ryu', 
    price: 34.99, 
    description: 'The wandering warrior from Street Fighter' 
  },
  { 
    id: 147, 
    franchise: 'smash', 
    src: samus, 
    name: 'Samus', 
    price: 34.99, 
    description: 'The legendary bounty hunter in her Power Suit' 
  },
  { 
    id: 148, 
    franchise: 'smash', 
    src: sephiroth, 
    name: 'Sephiroth', 
    price: 39.99, 
    description: 'The legendary SOLDIER and nemesis of Cloud' 
  },
  { 
    id: 149, 
    franchise: 'smash', 
    src: sheik, 
    name: 'Sheik', 
    price: 29.99, 
    description: 'The mysterious Sheikah warrior' 
  },
  { 
    id: 150, 
    franchise: 'smash', 
    src: shulk, 
    name: 'Shulk', 
    price: 34.99, 
    description: 'The wielder of the Monado from Xenoblade Chronicles' 
  },
  { 
    id: 151, 
    franchise: 'smash', 
    src: miiBrawler, 
    name: 'Mii Brawler', 
    price: 29.99, 
    description: 'Your custom fighter specializing in hand-to-hand combat' 
  },
  { 
    id: 152, 
    franchise: 'smash', 
    src: miiGunner, 
    name: 'Mii Gunner', 
    price: 29.99, 
    description: 'Your custom fighter specializing in projectile attacks' 
  },
  { 
    id: 153, 
    franchise: 'smash', 
    src: miiSwordfighter, 
    name: 'Mii Swordfighter', 
    price: 29.99, 
    description: 'Your custom fighter specializing in sword-based combat' 
  },
  { 
    id: 154, 
    franchise: 'smash', 
    src: simon, 
    name: 'Simon', 
    price: 34.99, 
    description: 'The legendary vampire hunter from Castlevania' 
  },
  { 
    id: 155, 
    franchise: 'smash', 
    src: snake, 
    name: 'Snake', 
    price: 34.99, 
    description: 'The legendary soldier from Metal Gear Solid' 
  },
  { 
    id: 156, 
    franchise: 'smash', 
    src: sonic, 
    name: 'Sonic', 
    price: 34.99, 
    description: 'The fastest hedgehog in the world' 
  },
  { 
    id: 157, 
    franchise: 'smash', 
    src: sora, 
    name: 'Sora', 
    price: 39.99, 
    description: 'The Keyblade wielder from Kingdom Hearts' 
  },
  { 
    id: 158, 
    franchise: 'smash', 
    src: squirtle, 
    name: 'Squirtle', 
    price: 29.99, 
    description: 'The iconic Water-type Pokémon from Kanto' 
  },
  { 
    id: 159, 
    franchise: 'smash', 
    src: steve, 
    name: 'Steve', 
    price: 34.99, 
    description: 'The iconic Minecraft miner' 
  },
  { 
    id: 160, 
    franchise: 'smash', 
    src: terry, 
    name: 'Terry', 
    price: 34.99, 
    description: 'The legendary ravenous wolf from Fatal Fury' 
  },
  { 
    id: 161, 
    franchise: 'smash', 
    src: toonLink, 
    name: 'Toon Link', 
    price: 29.99, 
    description: 'The caricature version of the Hyrule hero' 
  },
  { 
    id: 162, 
    franchise: 'smash', 
    src: villager, 
    name: 'Villager', 
    price: 29.99, 
    description: 'The charismatic Animal Crossing villager' 
  },
  { 
    id: 163, 
    franchise: 'smash', 
    src: warioSmash, 
    name: 'Wario', 
    price: 29.99, 
    description: 'The greedy antihero and rival of Mario' 
  },
  { 
    id: 164, 
    franchise: 'smash', 
    src: wiiFitTrainer, 
    name: 'Wii Fit Trainer', 
    price: 29.99, 
    description: 'The Wii Fit instructor' 
  },
  { 
    id: 165, 
    franchise: 'smash', 
    src: wolf, 
    name: 'Wolf', 
    price: 34.99, 
    description: 'The leader of Star Wolf and rival of Fox' 
  },
  { 
    id: 166, 
    franchise: 'smash', 
    src: yoshiSmash, 
    name: 'Yoshi', 
    price: 29.99, 
    description: 'Mario\'s faithful dinosaur companion' 
  },
  { 
    id: 167, 
    franchise: 'smash', 
    src: youngLink, 
    name: 'Young Link', 
    price: 29.99, 
    description: 'The young version of Link from Ocarina of Time' 
  },
  { 
    id: 168, 
    franchise: 'smash', 
    src: zeldaSmash, 
    name: 'Zelda', 
    price: 34.99, 
    description: 'The wise princess of Hyrule' 
  },
  { 
    id: 169, 
    franchise: 'smash', 
    src: zeroSuitSamus, 
    name: 'Zero Suit Samus', 
    price: 34.99, 
    description: 'Samus Aran without her Power Suit' 
  },
  { 
    id: 170, 
    franchise: 'smash', 
    src: gameAndWatch, 
    name: 'Mr. Game & Watch', 
    price: 29.99, 
    description: 'The 2D hero from the classic Game & Watch series' 
  },
  { 
    id: 171, 
    franchise: 'smash', 
    src: cloud, 
    name: 'Cloud', 
    price: 34.99, 
    description: 'The ex-SOLDIER from Final Fantasy VII' 
  },
  { 
    id: 172, 
    franchise: 'smash', 
    src: cloud2, 
    name: 'Cloud (Advent Children)', 
    price: 34.99, 
    description: 'Cloud in his Advent Children attire' 
  }
];

const categories = [
  {
    id: 1,
    name: "Mario",
    franchise: "mario",
    icon: "/icons/mario.png"
  },
  {
    id: 2,
    name: "Zelda",
    franchise: "zelda",
    icon: "/icons/zelda.png"
  },
  // ... más categorías
];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Verificar si hay un token al cargar la aplicación
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const addToCart = (product) => {
    setCartItems(prev => [...prev, { ...product, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const handleLogin = (userData) => {
    console.log('handleLogin called with:', userData);
    setUser(userData);
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    window.location.reload(); // Forzar recarga para limpiar el estado
  };

  return (
    <Router>
      <div className="app">
        <Navbar 
          cartCount={cartItems.length}
          onSearchChange={setSearchQuery}
          onLoginClick={() => setShowLoginModal(true)}
          user={user}
          onLogout={handleLogout}
        />
        
        <div className="main-container">
          <Sidebar 
            categories={categories} 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          <Routes>
            <Route 
              path="/" 
              element={
                <ProductGrid 
                  products={PRODUCTS}
                  selectedCategory={selectedCategory}
                  searchQuery={searchQuery}
                  onAddToCart={addToCart}
                />
              } 
            />
            <Route 
              path="/cart" 
              element={
                <Cart 
                  items={cartItems}
                  onRemoveItem={removeFromCart}
                />
              } 
            />
          </Routes>
        </div>

        {showLoginModal && (
          <LoginModal 
            onClose={() => setShowLoginModal(false)}
            onLogin={handleLogin}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
