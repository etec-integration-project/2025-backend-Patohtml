import React from 'react';
import './Sidebar.css';
import acnh from '../media/SideBar/acnh.png';
import fireEmblem from '../media/SideBar/FireEmblem.png';
import smb from '../media/SideBar/smb.png';
import splatoon from '../media/SideBar/splatoon.png';
import ssbu from '../media/SideBar/ssbu.png';
import zelda from '../media/SideBar/zelda.png';

const Sidebar = ({ onSelectCategory, selectedCategory }) => {
  const gameCategories = [
    { 
      id: 'smb', 
      name: 'Super Mario Bros', 
      image: smb,
      characters: ['Mario']
    },
    { 
      id: 'splatoon', 
      name: 'Splatoon', 
      image: splatoon 
    },
    { 
      id: 'animal-crossing', 
      name: 'Animal Crossing', 
      image: acnh,
      characters: ['Isabelle']
    },
    { 
      id: 'smash', 
      name: 'Super Smash Bros', 
      image: ssbu,
      characters: ['Kazuya']
    },
    { 
      id: 'zelda', 
      name: 'The Legend of Zelda', 
      image: zelda 
    },
    { 
      id: 'fire-emblem', 
      name: 'Fire Emblem', 
      image: fireEmblem,
      characters: ['Chrom']
    }
  ];

  const handleCategoryClick = (categoryId) => {
    if (selectedCategory === categoryId) {
      onSelectCategory(null);
    } else {
      onSelectCategory(categoryId);
    }
  };

  return (
    <nav className="sidebar">
      {gameCategories.map((category) => (
        <button
          key={category.id}
          className={`sidebar-item ${selectedCategory === category.id ? 'active' : ''}`}
          onClick={() => handleCategoryClick(category.id)}
        >
          <img 
            src={category.image} 
            alt={category.name} 
            className="category-icon"
          />
        </button>
      ))}
    </nav>
  );
};

export default Sidebar; 