import React, { useState, useEffect, useRef } from 'react';

const codeContent = `
# Section 2.1: String Data Type

# Strings are identified as a contiguous set of characters represented in the quotation marks.
# Python allows for either pairs of single or double quotes.
# Strings are immutable sequence data type, i.e each time one makes any changes
# to a string, completely new string object is created.

a_str = 'Hello World'
print(a_str)
print(a_str[0])
print(a_str[0:5])

# Attempting to modify a string directly will result in an error
# a_str[0] = 'J' # This line would cause a TypeError: 'str' object does not support item assignment
`;

const steps = [
  {
    codeLine: 1,
    terminalOutput: '',
    subtitle: "Let's explore Python's String Data Type.",
  },
  {
    codeLine: 4,
    terminalOutput: '',
    subtitle: "Strings are sequences of characters, enclosed in single or double quotes.",
  },
  {
    codeLine: 5,
    terminalOutput: '',
    subtitle: "An important characteristic is that strings are immutable.",
  },
  {
    codeLine: 8,
    terminalOutput: 'a_str = \'Hello World\'',
    subtitle: "Here, we assign the string 'Hello World' to the variable `a_str`.",
  },
  {
    codeLine: 9,
    terminalOutput: 'Hello World',
    subtitle: "Printing `a_str` outputs the entire string.",
  },
  {
    codeLine: 10,
    terminalOutput: 'H',
    subtitle: "We can access individual characters using indexing. `a_str[0]` gives the first character.",
  },
  {
    codeLine: 11,
    terminalOutput: 'Hello',
    subtitle: "Slicing allows us to extract substrings. `a_str[0:5]` gets characters from index 0 up to (but not including) 5.",
  },
  {
    codeLine: 14,
    terminalOutput: "TypeError: 'str' object does not support item assignment",
    subtitle: "Attempting to change a character directly will result in a TypeError, as strings are immutable.",
  },
  {
    codeLine: 15,
    terminalOutput: '',
    subtitle: "This means any operation that seems to 'change' a string actually creates a new one.",
  },
];

const SyntaxHighlighter = ({ code, highlightLine }) => {
  const lines = code.split('\n');
  return (
    <pre className="p-4 rounded-lg bg-gray-800 text-white text-sm overflow-auto h-full font-mono">
      {lines.map((line, index) => (
        <div
          key={index}
          className={`
            ${index + 1 === highlightLine ? 'bg-blue-700 bg-opacity-50' : ''}
            ${line.trim().startsWith('#') ? 'text-gray-400' : 'text-white'}
            ${line.includes('TypeError') ? 'text-red-400' : ''}
            transition-colors duration-300
          `}
        >
          <span className="inline-block w-6 text-right text-gray-500 mr-2 select-none">
            {index + 1}
          </span>
          {line}
        </div>
      ))}
    </pre>
  );
};

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [terminalLines, setTerminalLines] = useState([]);
  const terminalRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prevStep) => {
        const nextStep = prevStep + 1;
        if (nextStep >= steps.length) {
          clearInterval(timer);
          return prevStep; // Stay on the last step
        }
        return nextStep;
      });
    }, 3000); // Advance every 3 seconds

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Add terminal output for the current step
    if (steps[currentStep].terminalOutput) {
      setTerminalLines((prevLines) => {
        const newLines = [...prevLines, steps[currentStep].terminalOutput];
        // Keep only a reasonable number of lines to prevent overflow
        return newLines.slice(Math.max(newLines.length - 10, 0));
      });
    }
  }, [currentStep]);

  useEffect(() => {
    // Scroll to bottom of terminal
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines]);

  const currentCodeLine = steps[currentStep].codeLine;
  const currentSubtitle = steps[currentStep].subtitle;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 font-inter flex flex-col items-center justify-center">
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />

      <style>
        {`
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        .font-mono {
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
        }
        /* Custom scrollbar for better aesthetics */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #333;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        `}
      </style>

      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-4 mb-4 h-[60vh]">
        {/* Code Panel */}
        <div className="flex-1 bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col">
          <div className="bg-gray-700 p-2 text-center text-lg font-semibold rounded-t-xl">
            Python Code (Section 2.1)
          </div>
          <div className="flex-1 overflow-hidden">
            <SyntaxHighlighter code={codeContent} highlightLine={currentCodeLine} />
          </div>
        </div>

        {/* Terminal Panel */}
        <div className="flex-1 bg-gray-900 rounded-xl shadow-lg flex flex-col">
          <div className="bg-gray-700 p-2 text-center text-lg font-semibold rounded-t-xl">
            Terminal Output
          </div>
          <div ref={terminalRef} className="flex-1 p-4 text-sm text-green-300 overflow-auto font-mono bg-black rounded-b-xl">
            {terminalLines.map((line, index) => (
              <div key={index} className="whitespace-pre-wrap">
                <span className="text-gray-500">$ </span>{line}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtitles Panel */}
      <div className="w-full max-w-4xl bg-gray-700 p-4 rounded-xl shadow-lg text-center text-lg font-medium min-h-[80px] flex items-center justify-center">
        {currentSubtitle}
      </div>

      {/* Playback controls (optional, for manual control) */}
      {/* <div className="mt-4 flex gap-4">
        <button
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition-all duration-300"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition-all duration-300"
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default App;
