const OpenAI = require("openai");

const analyzeContract = async (contract, apiKey) => {
  const openai = new OpenAI({
    apiKey: apiKey,
  });

  const params = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `your role and goal is to be an ai smart contract auditor. your job is to perforn an audit on the given smart contracts.
    here is the smart contract: ${contract}
    plase provide the results in the following array format for easy front-end display
    [
        {
          'section': 'Audit Report',
          'details': 'A detail audit report of the smart contract, covering segurity,performance and any other relevant aspect'
        },
        {
            'section': 'Metric Scores',
'details': [
  {
    'metric': 'Security',
    'score': '0-10',
  },
  {
    'metric': 'Performance',
    'score': '0-10',
  }, {
    'metric': 'other key areas',
    'score': '0-10',
  },
] {
    'metric': 'Gas Eficciency',
    'score': '0-10',
  }, {
    'metric': 'Code quality',
    'score': '0-10',
    {
        'metric': 'Documentation',
        'score': '0-10',
      },
  },
        }
        [
            {
              'section': 'Audit Report',
              'details': 'Sugestim for improving the smart contracts in terms of segurity,perfomance and any other identify weaknesses'
            }
          ]
      ] Thank you`,
      },
    ],
  };
  const chatCompletion = await openai.chat.chatCompletion.create(params);

  const auditResults = JSON.parse(chatCompletion.choices[0].message.content);

  console.log("Audit Reports");
};
