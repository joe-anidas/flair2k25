import React from 'react';
import styled from 'styled-components';

const GlitchRegisterButton = ({ label = 'Register', onClick }) => {
  return (
    <StyledWrapper>
      <button type="button" className="btn-glitch-fill" onClick={onClick}>
        <span className="text">// {label}</span>
        <span className="text-decoration"> _</span>
        <span className="decoration">⇒</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  [class*="btn-glitch-"] {
    display: inline-block;
    font-family: 'Benguiat', serif;
    border: 1px solid #ff0000;
    color: #ff0000;
    padding: 10px 13px;
    min-width: 175px;
    line-height: 1.5em;
    white-space: nowrap;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 15px;
    background: transparent;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  }

  .btn-glitch-fill .text,
  .btn-glitch-fill .decoration {
    display: inline-block;
  }

  .btn-glitch-fill .decoration {
    display: inline-block;
    float: right;
  }

  .btn-glitch-fill:hover,
  .btn-glitch-fill:focus {
    animation-name: glitch;
    animation-duration: 0.2s;
    background-color: #ff0000;
    color: #000000;
    border: 1px solid #ff0000;
  }

  .btn-glitch-fill:hover .text-decoration,
  .btn-glitch-fill:hover .decoration,
  .btn-glitch-fill:focus .text-decoration,
  .btn-glitch-fill:focus .decoration {
    animation-name: blink;
    animation-duration: 0.1s;
    animation-iteration-count: infinite;
  }

  .btn-glitch-fill:active {
    background: #b30000; /* darker red */
    color: #ffffff;
  }

  .btn-glitch-fill:active .text-decoration,
  .btn-glitch-fill:active .decoration {
    animation-name: none;
  }

  @keyframes glitch {
    25% {
      background-color: red;
      transform: translateX(-10px);
      letter-spacing: 10px;
    }

    35% {
      background-color: green;
      transform: translate(10px);
    }

    59% {
      opacity: 0;
    }

    60% {
      background-color: blue;
      transform: translate(-10px);
      filter: blur(5px);
    }

    100% {
      background-color: yellow;
    }
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
`;

export default GlitchRegisterButton;


