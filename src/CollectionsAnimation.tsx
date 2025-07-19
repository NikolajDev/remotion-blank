import { useCurrentFrame, useVideoConfig, AbsoluteFill, interpolate, Sequence } from 'remotion';
import './index.css'
import { useMemo } from 'react';

// Utility to calculate opacity based on time intervals
const useOpacity = (start: number, end: number) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [start * 30, end * 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

// Utility to simulate typing effect for code
const useTypingEffect = (text: string, start: number, duration: number) => {
  const frame = useCurrentFrame();
  const charsToShow = Math.floor(
    interpolate(frame, [start * 30, (start + duration) * 30], [0, text.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  return text.slice(0, charsToShow);
};

export const CollectionsAnimation: React.FC = () => {
  const { height, fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Gradient background
  const backgroundStyle = {
    background: 'linear-gradient(to bottom right, #2a2a2a, #1a1a1a)',
    width: '100%',
    height: '100%',
  };

  // Slide transition (from top)
  const slideTransitionY = interpolate(frame, [0, 0.6 * fps], [-height, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Code and output content for each section
  const sections = useMemo(
    () => [
      {
        title: 'Counter',
        subtitle: '`Counter` is a powerful dictionary subclass, perfect for quickly counting hashable objects like items in a list or characters in a string.',
        code: `from collections import Counter

# Count characters in a string
word = "banana"
char_counts = Counter(word)
print(f"Char counts: {char_counts}")

# Count items in a list
items = ["apple", "banana", "apple", "orange", "banana"]
item_counts = Counter(items)
print(f"Item counts: {item_counts}")

# Accessing counts
print(f"Apples: {item_counts['apple']}")
print(f"Grapes: {item_counts['grape']}") # Non-existent item returns 0`,
        output: `Char counts: Counter({'a': 3, 'n': 2, 'b': 1})
Item counts: Counter({'apple': 2, 'banana': 2, 'orange': 1})
Apples: 2
Grapes: 0`,
        codeDuration: 6,
        outputDuration: 4.5,
        subtitleExtra: '`Counter` is great for frequency counts and finding most common elements.',
        subtitleExtraDuration: 5,
      },
      {
        title: 'defaultdict',
        subtitle: '`defaultdict` simplifies dictionary operations by automatically providing a default value when you try to access a non-existent key, eliminating `KeyError`s.',
        code: `from collections import defaultdict

# Grouping words by first letter
word_list = ["apple", "banana", "apricot", "berry", "cat"]
grouped_words = defaultdict(list)

for word in word_list:
    first_letter = word[0]
    grouped_words[first_letter].append(word)

print(f"Grouped words: {grouped_words}")

# Counting occurrences without checking if key exists
counts = defaultdict(int)
numbers = [1, 2, 1, 3, 2, 1]
for num in numbers:
    counts[num] += 1
print(f"Counts: {counts}")`,
        output: `Grouped words: defaultdict(<class 'list'>, {'a': ['apple', 'apricot'], 'b': ['banana', 'berry'], 'c': ['cat']})
Counts: defaultdict(<class 'int'>, {1: 3, 2: 2, 3: 1})`,
        codeDuration: 7,
        outputDuration: 5,
        subtitleExtra: 'It simplifies code by removing the need for `if key in dict` checks.',
        subtitleExtraDuration: 5,
      },
      {
        title: 'deque (Double-ended queue)',
        subtitle: '`deque` (double-ended queue) is a versatile list-like container, optimized for lightning-fast additions and removals from both the front and back.',
        code: `from collections import deque

my_deque = deque([1, 2, 3])
print(f"Original deque: {my_deque}")

# Add to right
my_deque.append(4)
print(f"After append(4): {my_deque}")

# Add to left
my_deque.appendleft(0)
print(f"After appendleft(0): {my_deque}")

# Pop from right
popped_right = my_deque.pop()
print(f"Popped right: {popped_right}, Deque: {my_deque}")

# Pop from left
popped_left = my_deque.popleft()
print(f"Popped left: {popped_left}, Deque: {my_deque}")`,
        output: `Original deque: deque([1, 2, 3])
After append(4): deque([1, 2, 3, 4])
After appendleft(0): deque([0, 1, 2, 3, 4])
Popped right: 4, Deque: deque([0, 1, 2, 3])
Popped left: 0, Deque: deque([1, 2, 3])`,
        codeDuration: 7,
        outputDuration: 5.5,
        subtitleExtra: "It's efficient for queues, stacks, and keeping a limited history.",
        subtitleExtraDuration: 5,
      },
      {
        title: 'namedtuple',
        subtitle: '`namedtuple` allows you to create immutable tuple-like objects with named fields, making your data structures more readable and self-documenting.',
        code: `from collections import namedtuple

# Define a namedtuple type
Point = namedtuple('Point', ['x', 'y'])

# Create instances
p1 = Point(10, 20)
p2 = Point(x=30, y=40)

print(f"Point 1: {p1}")
print(f"Point 2: {p2}")

# Access elements by name or index
print(f"P1 X: {p1.x}, P1 Y: {p1.y}")
print(f"P2 X (by index): {p2[0]}")`,
        output: `Point 1: Point(x=10, y=20)
Point 2: Point(x=30, y=40)
P1 X: 10, P1 Y: 20
P2 X (by index): 30`,
        codeDuration: 6,
        outputDuration: 4,
        subtitleExtra: 'They are immutable like regular tuples, but with more readable access.',
        subtitleExtraDuration: 5,
      },
    ],
    []
  );

  const tasks = useMemo(
    () => [
      {
        subtitle: "Task 1: Use `Counter` to count numbers in `[1, 2, 1, 3, 2, 1]`. Print result.",
        code: `from collections import Counter

numbers = [1, 2, 1, 3, 2, 1]
counts = Counter(numbers)
print(counts)`,
        output: `Counter({1: 3, 2: 2, 3: 1})`,
        codeDuration: 3,
        outputDuration: 1.5,
      },
      {
        subtitle: "Task 2: Use `defaultdict(list)` to group words by length: 'cat', 'dog', 'elephant'. Print result.",
        code: `from collections import defaultdict

words = ["cat", "dog", "elephant", "bird"]
grouped_by_length = defaultdict(list)
for word in words:
    grouped_by_length[len(word)].append(word)
print(grouped_by_length)`,
        output: `defaultdict(<class 'list'>, {3: ['cat', 'dog'], 8: ['elephant'], 4: ['bird']})`,
        codeDuration: 4,
        outputDuration: 2,
      },
      {
        subtitle: "Task 3: Create `deque` with 'a', 'b', 'c'. Append 'd', appendleft 'z'. Print it.",
        code: `from collections import deque

my_deque = deque(["a", "b", "c"])
my_deque.append("d")
my_deque.appendleft("z")
print(my_deque)`,
        output: `deque(['z', 'a', 'b', 'c', 'd'])`,
        codeDuration: 3,
        outputDuration: 1.5,
      },
      {
        subtitle: "Task 4: Define `namedtuple` `Book` ('title', 'author', 'pages'). Create instance. Print title.",
        code: `from collections import namedtuple

Book = namedtuple('Book', ['title', 'author', 'pages'])
book1 = Book("The Great Gatsby", "F. Scott Fitzgerald", 180)
print(book1.title)`,
        output: `The Great Gatsby`,
        codeDuration: 3,
        outputDuration: 1.5,
      },
      {
        subtitle: "Task 5: Find 2 most common chars in 'programming is fun' using `Counter`. Print result.",
        code: `from collections import Counter

sentence = "programming is fun"
char_counts = Counter(sentence)
most_common = char_counts.most_common(2)
print(most_common)`,
        output: `[('g', 2), ('r', 2)]`,
        codeDuration: 3,
        outputDuration: 1.5,
      },
      {
        subtitle: "Task 6: Use `defaultdict(int)` to count votes: 'Alice', 'Bob', 'Alice'. Print result.",
        code: `from collections import defaultdict

votes = ["Alice", "Bob", "Alice", "Charlie", "Bob", "Alice"]
vote_counts = defaultdict(int)
for candidate in votes:
    vote_counts[candidate] += 1
print(vote_counts)`,
        output: `defaultdict(<class 'int'>, {'Alice': 3, 'Bob': 2, 'Charlie': 1})`,
        codeDuration: 4,
        outputDuration: 2,
      },
      {
        subtitle: "Task 7: Pop from right, then left of `deque([10, 20, 30, 40])`. Print deque after each pop.",
        code: `from collections import deque

my_dq = deque([10, 20, 30, 40])
my_dq.pop()
print(f"After pop right: {my_dq}")
my_dq.popleft()
print(f"After pop left: {my_dq}")`,
        output: `After pop right: deque([10, 20, 30])
After pop left: deque([20, 30])`,
        codeDuration: 3,
        outputDuration: 2,
      },
      {
        subtitle: "Task 8: Access `Book`'s author by name and pages by index. Print them.",
        code: `from collections import namedtuple

Book = namedtuple('Book', ['title', 'author', 'pages'])
book1 = Book("The Odyssey", "Homer", 500)
print(f"Author: {book1.author}, Pages: {book1[2]}")`,
        output: `Author: Homer, Pages: 500`,
        codeDuration: 3,
        outputDuration: 1.5,
      },
      {
        subtitle: "Task 9: Convert `Counter({'a': 3, 'b': 1})` to a regular dict. Print it.",
        code: `from collections import Counter

counts_counter = Counter("aaab")
regular_dict = dict(counts_counter)
print(regular_dict)`,
        output: `{'a': 3, 'b': 1}`,
        codeDuration: 3,
        outputDuration: 1.5,
      },
      {
        subtitle: "Task 10: Use `deque` (maxlen=3) for last 3 websites. Add 4. Print deque.",
        code: `from collections import deque

history = deque(maxlen=3)
history.append("google.com")
history.append("youtube.com")
history.append("github.com")
history.append("stackoverflow.com") # This will push out google.com
print(history)`,
        output: `deque(['youtube.com', 'github.com', 'stackoverflow.com'], maxlen=3)`,
        codeDuration: 4,
        outputDuration: 2.5,
      },
      {
        subtitle: "Task 11: Combine `Counter('apple')` and `Counter('banana')`. Print combined.",
        code: `from collections import Counter

c1 = Counter("apple")
c2 = Counter("banana")
combined_c = c1 + c2
print(combined_c)`,
        output: `Counter({'a': 3, 'p': 2, 'l': 1, 'e': 1, 'b': 1, 'n': 2})`,
        codeDuration: 3,
        outputDuration: 1.5,
      },
      {
        subtitle: "Task 12: Rotate `deque([1, 2, 3, 4])` by 1 to the right. Print it.",
        code: `from collections import deque

nums_deque = deque([1, 2, 3, 4])
nums_deque.rotate(1) # Rotates elements to the right by 1
print(nums_deque)`,
        output: `deque([4, 1, 2, 3])`,
        codeDuration: 3,
        outputDuration: 1.5,
      },
      {
        subtitle: "Task 13: Check if a `namedtuple` instance is iterable. Print True/False.",
        code: `from collections import namedtuple

Person = namedtuple('Person', ['name', 'age'])
p = Person("Eve", 25)

# Check if iterable
is_iterable = hasattr(p, '__iter__')
print(f"Is Person iterable? {is_iterable}")`,
        output: `Is Person iterable? True`,
        codeDuration: 3,
        outputDuration: 1.5,
      },
      {
        subtitle: "Task 14: Use `defaultdict(lambda: 'unknown')`. Access non-existent key. Print it.",
        code: `from collections import defaultdict

user_settings = defaultdict(lambda: "unknown")
user_settings["theme"] = "dark"
print(f"Theme: {user_settings['theme']}")
print(f"Language: {user_settings['language']}")`,
        output: `Theme: dark
Language: unknown`,
        codeDuration: 3,
        outputDuration: 2,
      },
      {
        subtitle: "Task 15: Find elements with count < 2 from `Counter('aabbc')`. Print them.",
        code: `from collections import Counter

my_counter = Counter("aabbc")
low_frequency_items = [item for item, count in my_counter.items() if count < 2]
print(low_frequency_items)`,
        output: `['c']`,
        codeDuration: 3,
        outputDuration: 1.5,
      },
    ],
    []
  );

  // Timing calculations
  let currentTime = 0;

  // Intro sequence
  const introDuration = 3;
  const introSubtitles = [
    {
      text: "Welcome to Day 15! Today, we're unlocking Python's specialized data structures with the `collections` module!",
      duration: 4,
    },
    {
      text: 'This module provides powerful container datatypes beyond standard lists, tuples, and dictionaries.',
      duration: 4.5,
    },
    {
      text: "Get ready to master tools that make your data handling incredibly efficient and clean!",
      duration: 4.5,
    },
  ];

  // Calculate section timings
  const sectionTimings = sections.map((section) => {
    const start = currentTime;
    const titleDuration = 3; // Title + subtitle display
    const codeOutputDuration = section.codeDuration + section.outputDuration + 4; // Code + output + pause
    const extraSubtitleDuration = section.subtitleExtraDuration;
    currentTime += 0.5 + titleDuration + 0.5 + codeOutputDuration + extraSubtitleDuration + 0.5; // Fade transitions
    return { start, titleDuration, codeOutputDuration, extraSubtitleDuration };
  });

  // Tasks intro
  const tasksIntroStart = currentTime;
  const tasksIntroDuration = 3;
  currentTime += tasksIntroDuration + 0.5;

  // Calculate task timings
  const taskTimings = tasks.map((task) => {
    const start = currentTime;
    const subtitleDuration = 4.5;
    const codeOutputDuration = task.codeDuration + task.outputDuration + 4.5;
    currentTime += subtitleDuration + codeOutputDuration + 0.5;
    return { start, subtitleDuration, codeOutputDuration };
  });

  // Outro
  const outroStart = currentTime;
  const outroDuration = 6;

  return (
    <AbsoluteFill style={backgroundStyle}>
      <div style={{ transform: `translateY(${slideTransitionY}px)` }} className="w-full h-full flex flex-col items-center justify-center">
        {/* Intro Title */}
        <Sequence from={0} durationInFrames={introDuration * fps}>
          <div
            className="text-[#FFD700] text-[96px] font-['JetBrains_Mono'] text-center shadow-md"
            style={{
              textShadow: '2px 2px 10px #000000',
              opacity: useOpacity(0, 0.5),
            }}
          >
            100 Days of Code: Day 15<br />
            Data Structures: Collections Module
          </div>
        </Sequence>

        {/* Intro Subtitles */}
        {introSubtitles.map((subtitle, index) => {
          const startTime = introDuration + index * (4 + 0.5);
          return (
            <Sequence
              key={index}
              from={startTime * fps}
              durationInFrames={subtitle.duration * fps}
            >
              <div
                className="text-white text-[48px] font-sans text-center w-[80%] mt-[60px]"
                style={{ textShadow: '2px 2px 10px #000000', opacity: useOpacity(0, 0.5) }}
              >
                {subtitle.text}
              </div>
            </Sequence>
          );
        })}

        {/* Sections */}
        {sections.map((section, index) => {
          const timing = sectionTimings[index];
          const codeText = useTypingEffect(section.code, timing.start + timing.titleDuration + 0.5, section.codeDuration);
          return (
            <div key={index}>
              {/* Section Title */}
              <Sequence
                from={timing.start * fps}
                durationInFrames={timing.titleDuration * fps}
              >
                <div
                  className="text-[#FFD700] text-[96px] font-['JetBrains_Mono'] text-center"
                  style={{ textShadow: '2px 2px 10px #000000', opacity: useOpacity(0, 0.5) }}
                >
                  {section.title}
                </div>
                <div
                  className="text-white text-[48px] font-sans text-center w-[80%] mt-[60px]"
                  style={{ textShadow: '2px 2px 10px #000000', opacity: useOpacity(0, 0.5) }}
                >
                  {section.subtitle}
                </div>
              </Sequence>

              {/* Code and Output */}
              <Sequence
                from={(timing.start + timing.titleDuration + 0.5) * fps}
                durationInFrames={timing.codeOutputDuration * fps}
              >
                <div className="flex flex-row justify-center items-start w-[95%] h-[70%] gap-[2%]">
                  <div
                    className="bg-[#1e1e1e] rounded-[16px] p-[50px] shadow-lg border-2 border-[#444]"
                    style={{ width: '48%', height: '100%', boxShadow: '8px 8px 25px #000000' }}
                  >
                    <pre
                      className="text-white text-[30px] font-['JetBrains_Mono'] whitespace-pre"
                      style={{ opacity: useOpacity(0, 1) }}
                    >
                      {codeText}
                    </pre>
                  </div>
                  <div
                    className="bg-black rounded-[16px] p-[50px] shadow-lg border-2 border-[#0f0]"
                    style={{ width: '48%', height: '100%', boxShadow: '8px 8px 25px #000000' }}
                  >
                    <pre
                      className="text-[#0f0] text-[30px] font-['JetBrains_Mono'] whitespace-pre"
                      style={{ opacity: useOpacity(section.codeDuration, section.codeDuration + 1) }}
                    >
                      {section.output}
                    </pre>
                  </div>
                </div>
              </Sequence>

              {/* Extra Subtitle */}
              <Sequence
                from={(timing.start + timing.titleDuration + timing.codeOutputDuration) * fps}
                durationInFrames={timing.extraSubtitleDuration * fps}
              >
                <div
                  className="text-white text-[48px] font-sans text-center w-[80%] mt-[60px]"
                  style={{ textShadow: '2px 2px 10px #000000', opacity: useOpacity(0, 0.5) }}
                >
                  {section.subtitleExtra}
                </div>
              </Sequence>
            </div>
          );
        })}

        {/* Tasks Intro */}
        <Sequence from={tasksIntroStart * fps} durationInFrames={tasksIntroDuration * fps}>
          <div
            className="text-white text-[48px] font-sans text-center w-[80%] mt-[60px]"
            style={{ textShadow: '2px 2px 10px #000000', opacity: useOpacity(0, 0.5) }}
          >
            Now, let's put your new `collections` module knowledge to the test with these hands-on mini-tasks!
          </div>
        </Sequence>

        {/* Tasks */}
        {tasks.map((task, index) => {
          const timing = taskTimings[index];
          const codeText = useTypingEffect(task.code, timing.start + timing.subtitleDuration, task.codeDuration);
          return (
            <div key={index}>
              <Sequence
                from={timing.start * fps}
                durationInFrames={timing.subtitleDuration * fps}
              >
                <div
                  className="text-white text-[48px] font-sans text-center w-[80%] mt-[60px]"
                  style={{ textShadow: '2px 2px 10px #000000', opacity: useOpacity(0, 0.5) }}
                >
                  {task.subtitle}
                </div>
              </Sequence>
              <Sequence
                from={(timing.start + timing.subtitleDuration) * fps}
                durationInFrames={timing.codeOutputDuration * fps}
              >
                <div className="flex flex-row justify-center items-start w-[95%] h-[70%] gap-[2%]">
                  <div
                    className="bg-[#1e1e1e] rounded-[16px] p-[50px] shadow-lg border-2 border-[#444]"
                    style={{ width: '48%', height: '100%', boxShadow: '8px 8px 25px #000000' }}
                  >
                    <pre
                      className="text-white text-[30px] font-['JetBrains_Mono'] whitespace-pre"
                      style={{ opacity: useOpacity(0, 1) }}
                    >
                      {codeText}
                    </pre>
                  </div>
                  <div
                    className="bg-black rounded-[16px] p-[50px] shadow-lg border-2 border-[#0f0]"
                    style={{ width: '48%', height: '100%', boxShadow: '8px 8px 25px #000000' }}
                  >
                    <pre
                      className="text-[#0f0] text-[30px] font-['JetBrains_Mono'] whitespace-pre"
                      style={{ opacity: useOpacity(task.codeDuration, task.codeDuration + 1) }}
                    >
                      {task.output}
                    </pre>
                  </div>
                </div>
              </Sequence>
            </div>
          );
        })}

        {/* Outro */}
        <Sequence from={outroStart * fps} durationInFrames={outroDuration * fps}>
          <div
            className="text-white text-[64px] font-sans text-center"
            style={{ textShadow: '2px 2px 10px #000000', opacity: useOpacity(0, 0.5) }}
          >
            🆕 Follow for Day 16: Dictionary Methods and Operations!<br />
            ❤️ Like if you're mastering collections!<br />
            💬 Comment: Which `collections` type is your favorite?<br />
            🔥 Share with fellow coders!
          </div>
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};