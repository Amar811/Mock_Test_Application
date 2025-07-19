 const  mockQuestions = [
    {
      id: 1,
      category: "Paper I",
      difficulty: "Medium",
      marks: 2,
      text: "Which planet is known as the \'Red Planet\'?",
      options: {
        a: "Venus",
        b: "Mars",
        c: "Jupiter",
        d: "Saturn"
      },
      correctAnswer: "b",
     
    },
    {
      id: 2,
      category: "Science",
      difficulty: "Easy",
      marks: 1,
      text: "What is the chemical symbol for water?",
      options: {
        a: "H2O",
        b: "CO2",
        c: "NaCl",
        d: "O2"
      },
      correctAnswer: "a",
      explanation: "Water is composed of two hydrogen atoms and one oxygen atom, hence H2O."
    },
    // {
    //   id: 3,
    //   category: "Mathematics",
    //   difficulty: "Medium",
    //   marks: 2,
    //   text: "What is the value of π (pi) approximately?",
    //   options: {
    //     a: "3.14159",
    //     b: "2.71828",
    //     c: "1.41421",
    //     d: "1.73205"
    //   },
    //   correctAnswer: "a",
    //   explanation: "Pi (π) is approximately 3.14159, representing the ratio of a circle's circumference to its diameter."
    // },
    // {
    //   id: 4,
    //   category: "History",
    //   difficulty: "Hard",
    //   marks: 3,
    //   text: "In which year did World War II end?",
    //   options: {
    //     a: "1944",
    //     b: "1945",
    //     c: "1946",
    //     d: "1947"
    //   },
    //   correctAnswer: "b",
    //   explanation: "World War II ended in 1945 with the surrender of Japan in September, following the atomic bombings and Soviet invasion."
    // },
    // {
    //   id: 5,
    //   category: "Geography",
    //   difficulty: "Easy",
    //   marks: 1,
    //   text: "Which is the largest continent by area?",
    //   options: {
    //     a: "Africa",
    //     b: "North America",
    //     c: "Asia",
    //     d: "Europe"
    //   },
    //   correctAnswer: "c",
    //   explanation: "Asia is the largest continent, covering about 30% of Earth's total land area and 8.7% of Earth's total surface area."
    // },
    // {
    //   id: 6,
    //   category: "Literature",
    //   difficulty: "Medium",
    //   marks: 2,
    //   text: "Who wrote the novel \'Pride and Prejudice\'?",
    //   options: {
    //     a: "Charlotte Brontë",
    //     b: "Jane Austen",
    //     c: "Emily Dickinson",
    //     d: "Virginia Woolf"
    //   },
    //   correctAnswer: "b",
    //   explanation: "Jane Austen wrote 'Pride and Prejudice', published in 1813, which is considered one of the greatest novels in English literature."
    // },
    // {
    //   id: 7,
    //   category: "Physics",
    //   difficulty: "Hard",
    //   marks: 3,
    //   text: "What is the speed of light in vacuum?",
    //   options: {
    //     a: "299,792,458 m/s",
    //     b: "300,000,000 m/s",
    //     c: "299,000,000 m/s",
    //     d: "298,792,458 m/s"
    //   },
    //   correctAnswer: "a",
    //   explanation: "The speed of light in vacuum is exactly 299,792,458 meters per second, a fundamental physical constant."
    // },
    // {
    //   id: 8,
    //   category: "Biology",
    //   difficulty: "Medium",
    //   marks: 2,
    //   text: "What is the powerhouse of the cell?",
    //   options: {
    //     a: "Nucleus",
    //     b: "Ribosome",
    //     c: "Mitochondria",
    //     d: "Endoplasmic Reticulum"
    //   },
    //   correctAnswer: "c",
    //   explanation: "Mitochondria are called the powerhouse of the cell because they produce ATP, the energy currency of cells."
    // },
    // {
    //   id: 9,
    //   category: "Chemistry",
    //   difficulty: "Easy",
    //   marks: 1,
    //   text: "What is the atomic number of carbon?",
    //   options: {
    //     a: "4",
    //     b: "6",
    //     c: "8",
    //     d: "12"
    //   },
    //   correctAnswer: "b",
    //   explanation: "Carbon has an atomic number of 6, meaning it has 6 protons in its nucleus."
    // },
    // {
    //   id: 10,
    //   category: "Sports",
    //   difficulty: "Easy",
    //   marks: 1,
    //   text: "How many players are there in a basketball team on the court?",
    //   options: {
    //     a: "4",
    //     b: "5",
    //     c: "6",
    //     d: "7"
    //   },
    //   correctAnswer: "b",
    //   explanation: "A basketball team has 5 players on the court at any given time during play."
    // }
  ];

  export default mockQuestions;

