import React from 'react';

const Card = ({ 
  children, 
  className = "", 
  hoverEffect = true,
  borderColor = "red",
  shadowColor = "red"
}) => {
  const baseClasses = "bg-white/5 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-500";
  const borderClasses = `border-${borderColor}-500/20 hover:border-${borderColor}-400/40`;
  const shadowClasses = hoverEffect ? `hover:shadow-2xl hover:shadow-${shadowColor}-500/20` : "";
  
  return (
    <div className={`${baseClasses} ${borderClasses} ${shadowClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
