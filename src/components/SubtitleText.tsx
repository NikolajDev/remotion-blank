import React from 'react';

interface Props {
  text: string;
}

export const SubtitleText: React.FC<Props> = ({text}) => {
  return (
    <div style={{
      color: '#fbbf24',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
      animation: 'fadeIn 0.5s ease-in',
      maxWidth: '90%',
      lineHeight: 1.4,
    }}>
      {text}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};