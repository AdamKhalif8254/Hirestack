import { css } from '@emotion/react';

export const styles = {
  fadeInUp: css`
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,

  animateFadeInUp: css`
    animation: fadeInUp 0.6s ease-out forwards;
  `,

  animationDelay300: css`
    animation-delay: 300ms;
  `,

  animationDelay600: css`
    animation-delay: 600ms;
  `,

  hoverShadowNeon: css`
    &:hover {
      box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
    }
  `,

  animateGradientText: css`
    @keyframes gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    background: linear-gradient(135deg, #3b82f6, #10b981);
    background-size: 200% 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient 5s ease-in-out infinite;
  `,

  animateScroll: css`
    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-33.33%);
      }
    }

    animation: scroll 30s linear infinite;
    width: 300%; /* Tripled width */
  `,
};
