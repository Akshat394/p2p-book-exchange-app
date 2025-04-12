import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBook, 
  faEdit, 
  faTrash, 
  faCheck, 
  faXmark,
  faStar,
  faTag,
  faImage,
  faSave,
  faSpinner,
  faPlus,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

const iconMap = {
  book: faBook,
  edit: faEdit,
  trash: faTrash,
  check: faCheck,
  x: faXmark,
  star: faStar,
  tag: faTag,
  faImage: faImage,
  faSave: faSave,
  faSpinner: faSpinner,
  faPlus: faPlus,
  faSignOutAlt: faSignOutAlt
};

const Icon = ({ name, size = "1x", spin = false, style = {} }) => {
  const icon = iconMap[name];
  
  if (!icon) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <FontAwesomeIcon 
      icon={icon} 
      size={size} 
      spin={spin}
      style={style}
    />
  );
};

export default Icon; 