const BASE_URL = import.meta.env.BASE_URL;

export const bottles = [
  {
    id: 1,
    name: "Johnnie Walker Blue Label",
    type: "whisky",
    image: `${BASE_URL}bottles/blue-label.png`
  },
  {
    id: 2,
    name: "Aviation American",
    type: "gin",
    image: `${BASE_URL}bottles/aviation.png`
  },
  {
    id: 3,
    name: "Woodford Reserve Kentucky",
    type: "bourbon",
    image: `${BASE_URL}bottles/woodford.png`
  },
  {
    id: 4,
    name: "Don Julio 70th",
    type: "tequila",
    image: `${BASE_URL}bottles/don-julio.png`
  },
  {
    id: 5,
    name: "Veuve Clicquot Brut",
    type: "wine",
    image: `${BASE_URL}bottles/veuve.png`
  },
  {
    id: 6,
    name: "Le Portier Shay",
    type: "cognac",
    image: `${BASE_URL}bottles/le-portier.png`
  },
  {
    id: 7,
    name: "Tito's Handmade",
    type: "vodka",
    image: `${BASE_URL}bottles/titos.png`
  },
  {
    id: 8,
    name: "Cedilla Acai",
    type: "liqueur",
    image: `${BASE_URL}bottles/cedilla.png`
  },
  {
    id: 9,
    name: "Iylia Lager Craft",
    type: "beer",
    image: `${BASE_URL}bottles/iylia.png`
  },
  {
    id: 10,
    name: "Bacardi Superior White",
    type: "rum",
    image: `${BASE_URL}bottles/bacardi.png`
  },
  {
    id: 11,
    name: "Zomoz Espadin Joven",
    type: "mezcal",
    image: `${BASE_URL}bottles/zomoz.png`
  },
  {
    id: 12,
    name: "Risata Moscato d'Asti",
    type: "moscato",
    image: `${BASE_URL}bottles/risata.png`
  }
];

export const customerDialogues = [
  {
    customer: "Luis",
    type: "byName",
    dialogue: "Can I get a Blue Label, please? I lost my poker case and things aren't looking good.",
    greet: "Thanks handsome!",
    expected: ["Johnnie Walker Blue Label"],
    failDialogue: "This is not what i asked for, i will send you a CSV."
  },
  {
    customer: "Felipe",
    type: "byName",
    dialogue: "Bring me a beer, preferably a larger one, because i'm going to have another child.",
    expected: ["Iylia Lager Craft"],
    failDialogue: "Does that looks like a beer to you?"
  },
  {
    customer: "Yassine",
    type: "byName",
    dialogue: "Do you have Veuve Clicquot Brut? I'll take one!",
    expected: ["Veuve Clicquot Brut"],
    failDialogue: "This isn't Veuve Clicquot!"
  },
  {
    customer: "Yousif",
    type: "byType",
    dialogue: "Can you give me a good bourbon?",
    expected: ["Woodford Reserve Kentucky"],
    failDialogue: "That's not the bourbon I was hoping for."
  },
  {
    customer: "Firas",
    type: "byType",
    dialogue: "I want a tequila. Any brand works.",
    expected: ["Don Julio 70th"],
    failDialogue: "That's not quite right... I need tequila."
  },
  {
    customer: "Houssem",
    type: "byType",
    dialogue: "I need some rum for my party, got any?",
    greet: "Thank you!",
    fail: "Do you wanna ruin my party?",
    expected: ["Bacardi Superior White"],
    failDialogue: "Wrong spirit, my friend."
  },
  {
    customer: "Ines",
    type: "byType",
    dialogue: "Tests are going to be a wild tonight! I need a liqueur.",
    fail: "this is wrong, i will move this bottle to 'needs fixing'.",
    greet: "Verified in production!",
    expected: ["Cedilla Acai"],
    failDialogue: "My wild night is ruined! Wrong bottles."
  },
  {
    customer: "Khalil",
    type: "byDrink",
    dialogue: "I wanna make a Cuba Libre. Give me what I need.",
    expected: ["Bacardi Superior White"],
    failDialogue: "Can't make a Cuba Libre with that!"
  },
  {
    customer: "Wissem",
    type: "byDrink",
    dialogue: "I need the stuff for a Dirty Martini.",
    greet: "Thanks!",
    fail: "I can't make a martini with that.",
    expected: ["Aviation American"],
    failDialogue: "That won't make my martini dirty... or right."
  },
  {
    customer: "Amel",
    type: "byType",
    dialogue: "Get me a cognac. Make it quick!",
    greet: "Ok, no tip.",
    fail: "Why did you bring me this? Is this a cognac by any chance? What can we do to prevent this from happening?",
    expected: ["Le Portier Shay"],
    failDialogue: "Uh uh, not what I asked for."
  },
];

export const customers = customerDialogues.map((dialogue, index) => ({
  id: index + 1,
  name: dialogue.customer,
  avatar: `${BASE_URL}customers/${dialogue.customer.toLowerCase()}.png`,
  timeLimit: 15,
  dialogue: dialogue.dialogue,
  expected: dialogue.expected,
  type: dialogue.type,
  failDialogue: dialogue.failDialogue
}));

export const gameStages = [
  {
    id: 1,
    name: "Single Bottle",
    description: "Customer asks for specific bottle names",
    timeLimit: 15
  },
  {
    id: 2,
    name: "Multiple Bottles",
    description: "Customer asks for multiple specific bottles",
    timeLimit: 20
  },
  {
    id: 3,
    name: "Alcohol Type",
    description: "Customer asks for specific types of alcohol",
    timeLimit: 25
  },
  {
    id: 4,
    name: "Cocktail Recipes",
    description: "Customer asks for cocktail ingredients",
    timeLimit: 30
  }
]; 