import {interpolate} from 'remotion';

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

// src/components/TerminalOutput.tsx
import React from 'react';
import {useCurrentFrame} from 'remotion';

interface Props {
  lines: string[];
  startFrame: number;
  isError?: boolean;
  isSuccess?: boolean;
}

export const TerminalOutput: React.FC<Props> = ({
  lines,
  startFrame,
  isError = false,
  isSuccess = false,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = Math.max(0, frame - startFrame);
  
  const linesToShow = Math.min(Math.floor(relativeFrame / 30), lines.length); // Show one line per second

  return (
    <div>
      {lines.slice(0, linesToShow).map((line, index) => (
        <div
          key={index}
          style={{
            color: isError ? '#ef4444' : isSuccess ? '#22c55e' : '#ffffff',
            backgroundColor: isError ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
            padding: isError ? '8px 12px' : '4px 0',
            marginBottom: 8,
            borderRadius: isError ? 6 : 0,
            borderLeft: isError ? '4px solid #ef4444' : 'none',
            fontFamily: 'monospace',
            fontSize: 14,
          }}
        >
          <span style={{color: '#3b82f6'}}>$ </span>
          {line}
        </div>
      ))}
      {linesToShow > 0 && linesToShow === lines.length && (
        <div style={{
          color: '#22c55e',
          fontFamily: 'monospace',
          fontSize: 14,
          animation: 'blink 1s infinite',
        }}>
          <span style={{color: '#3b82f6'}}>$ </span>|
        </div>
      )}
    </div>
  );
};