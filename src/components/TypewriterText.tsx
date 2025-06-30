import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

interface Props {
  text: string;
  startFrame: number;
  charactersPerSecond: number;
  highlightErrors?: boolean;
}

export const TypewriterText: React.FC<Props> = ({
  text,
  startFrame,
  charactersPerSecond,
  highlightErrors = false,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = Math.max(0, frame - startFrame);
  
  const charactersToShow = interpolate(
    relativeFrame,
    [0, text.length / charactersPerSecond * 30], // 30 fps
    [0, text.length],
    {extrapolateRight: 'clamp'}
  );

  const visibleText = text.slice(0, Math.floor(charactersToShow));
  const showCursor = Math.floor(charactersToShow) < text.length;

  // Syntax highlighting for Python
  const highlightSyntax = (code: string) => {
    return code
      .replace(/(def|if|for|in|return|not|print)/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/(#.*$)/gm, '<span style="color: #6a9955;">$1</span>')
      .replace(/(".*?")/g, '<span style="color: #ce9178;">$1</span>')
      .replace(/(\d+)/g, '<span style="color: #b5cea8;">$1</span>');
  };

  return (
    <div style={{position: 'relative'}}>
      <pre style={{
        color: highlightErrors ? '#ef4444' : '#22c55e',
        fontSize: 14,
        lineHeight: 1.5,
        margin: 0,
        backgroundColor: highlightErrors ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
        padding: highlightErrors ? 12 : 0,
        borderRadius: highlightErrors ? 8 : 0,
        borderLeft: highlightErrors ? '4px solid #ef4444' : 'none',
      }}>
        <code 
          dangerouslySetInnerHTML={{
            __html: highlightSyntax(visibleText)
          }}
        />
        {showCursor && (
          <span style={{
            backgroundColor: '#22c55e',
            color: 'black',
            animation: 'blink 1s infinite',
          }}>
            |
          </span>
        )}
      </pre>
      
      <style>
        {`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};