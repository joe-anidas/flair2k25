import React from 'react';
import styled from 'styled-components';

const NavButton = ({ children, onClick, className = "" }) => {
  const label = typeof children === 'string' ? children : '';
  return (
    <StyledWrapper className={className}>
      <button className="button" data-text={label} onClick={onClick}>
        <span className="actual-text">&nbsp;{children}&nbsp;</span>
        <span aria-hidden="true" className="hover-text">&nbsp;{children}&nbsp;</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* === removing default button style ===*/
  .button {
    margin: 0;
    height: auto;
    background: transparent;
    padding: 0;
    border: none;
    cursor: pointer;
  }

  /* button styling */
  .button {
    --border-right: 6px;
    --text-stroke-color: rgba(255, 0, 0, 0.7);
    --animation-color: #ff0000;
    --fs-size: 1rem;
    letter-spacing: 3px;
    text-decoration: none;
    font-size: var(--fs-size);
    font-family: "Arial";
    position: relative;
    text-transform: uppercase;
    color: var(--animation-color);
    -webkit-text-stroke: 0;
  }

  /* this is the text, when you hover on button */
  .hover-text {
    position: absolute;
    box-sizing: border-box;
    content: attr(data-text);
    color: var(--animation-color);
    width: 0%;
    inset: 0;
    border-right: 0;
    overflow: hidden;
    transition: width 0.5s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s cubic-bezier(0.22, 1, 0.36, 1), text-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1), -webkit-text-stroke 0.5s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: width, filter, text-shadow;
    -webkit-text-stroke: 1px var(--animation-color);
  }

  /* hover */
  .button:hover .hover-text {
    width: 100%;
    filter: drop-shadow(0 0 8px var(--animation-color));
    text-shadow: 0 0 3px var(--animation-color), 0 0 6px var(--animation-color), 0 0 9px var(--animation-color);
  }
`;

export default NavButton;