type Theme = { 
    id: string; 
    name: string; 
    description: string; 
    subThemes: { 
        id: string; 
        name: string; 
        description: string; 
    }[]; 
};

const historicalPeriodsData: Theme[] = [
    {
        id: "ancient-civilizations",
        name: "Ancient Civilizations",
        description: "Exploring the foundational societies that shaped early human civilization",
        subThemes: [
            {
                id: "mesopotamia",
                name: "Mesopotamia",
                description: "The Cradle of Civilization, birthplace of writing and complex societies"
            },
            {
                id: "ancient-egypt",
                name: "Ancient Egypt",
                description: "Pharaohs, pyramids, and a sophisticated cultural and religious system"
            },
            {
                id: "indus-valley",
                name: "Indus Valley",
                description: "Advanced urban planning and intricate cultural developments"
            },
            {
                id: "ancient-china",
                name: "Ancient China",
                description: "Dynasties that drove technological and cultural innovations"
            },
            {
                id: "mesoamerican-cultures",
                name: "Mesoamerican Cultures",
                description: "Maya, Aztecs, and Olmecs: Complex civilizations of the Americas"
            },
            {
                id: "ancient-greece",
                name: "Ancient Greece",
                description: "Birthplace of democracy, philosophy, and classical thought"
            },
            {
                id: "ancient-rome",
                name: "Ancient Rome",
                description: "From republic to empire, a civilization that transformed the ancient world"
            }
        ]
    },
    {
        id: "medieval-eras",
        name: "Medieval Eras",
        description: "Exploring the complex social, cultural, and political landscapes of the Middle Ages",
        subThemes: [
            {
                id: "dark-ages",
                name: "The Dark Ages",
                description: "Life and challenges in Medieval European societies"
            },
            {
                id: "byzantine-empire",
                name: "The Byzantine Empire",
                description: "Continuation of Roman legacy in the Eastern Mediterranean"
            },
            {
                id: "islamic-golden-age",
                name: "The Islamic Golden Age",
                description: "Remarkable advances in science, arts, and culture"
            },
            {
                id: "feudal-japan",
                name: "Feudal Japan",
                description: "Society of samurai, shogunate, and complex social hierarchies"
            },
            {
                id: "crusades",
                name: "The Crusades",
                description: "Religious conflicts and cultural intersections"
            },
            {
                id: "medieval-africa",
                name: "Medieval Africa",
                description: "Powerful empires like Mali and Great Zimbabwe"
            }
        ]
    },
    {
        id: "renaissance-enlightenment",
        name: "Renaissance & Enlightenment",
        description: "An era of intellectual, artistic, and scientific awakening",
        subThemes: [
            {
                id: "italian-renaissance",
                name: "The Italian Renaissance",
                description: "Rebirth of art, architecture, and humanistic thinking"
            },
            {
                id: "age-of-exploration",
                name: "The Age of Exploration",
                description: "Voyages of discovery and global cultural exchanges"
            },
            {
                id: "scientific-revolution",
                name: "Scientific Revolution",
                description: "Groundbreaking discoveries by Galileo, Newton, and contemporaries"
            },
            {
                id: "enlightenment",
                name: "Enlightenment Thinkers",
                description: "Philosophical movement emphasizing reason and individual rights"
            },
            {
                id: "baroque-europe",
                name: "Baroque Europe",
                description: "Artistic and cultural movement of elaborate artistic expression"
            }
        ]
    },
    {
        id: "revolutionary-eras",
        name: "Revolutionary Eras",
        description: "Periods of significant political, social, and technological transformations",
        subThemes: [
            {
                id: "american-revolution",
                name: "The American Revolution",
                description: "Struggle for independence and founding of a new nation"
            },
            {
                id: "french-revolution",
                name: "The French Revolution",
                description: "Radical social and political upheaval challenging monarchical systems"
            },
            {
                id: "industrial-revolution",
                name: "Industrial Revolution",
                description: "Technological innovations transforming economic and social structures"
            },
            {
                id: "abolition-movements",
                name: "Abolition Movements",
                description: "Global struggle against slavery and for human rights"
            },
            {
                id: "age-of-imperialism",
                name: "The Age of Imperialism",
                description: "Global colonization and resistance movements"
            }
        ]
    },
    {
        id: "world-wars",
        name: "World Wars",
        description: "Global conflicts that reshaped international relations and human societies",
        subThemes: [
            {
                id: "world-war-one",
                name: "World War I",
                description: "The Great War that redefined global political landscapes"
            },
            {
                id: "world-war-two",
                name: "World War II",
                description: "Global conflict with unprecedented destruction and societal impact"
            },
            {
                id: "holocaust",
                name: "The Holocaust",
                description: "Genocidal persecution during World War II"
            },
            {
                id: "cold-war",
                name: "The Cold War",
                description: "Geopolitical tension between superpowers and global ideological conflict"
            }
        ]
    },
    {
        id: "cultural-social-movements",
        name: "Cultural & Social Movements",
        description: "Transformative social and cultural shifts challenging existing norms",
        subThemes: [
            {
                id: "romantic-era",
                name: "The Romantic Era",
                description: "Artistic and intellectual movement emphasizing emotion and individualism"
            },
            {
                id: "womens-suffrage",
                name: "Women's Suffrage",
                description: "Global movement for women's political and social equality"
            },
            {
                id: "civil-rights-movement",
                name: "Civil Rights Movement",
                description: "Struggle for racial equality and social justice"
            },
            {
                id: "digital-age",
                name: "The Digital Age",
                description: "Technological transformation reshaping human interaction and society"
            }
        ]
    },
    {
        id: "scientific-technological-advancements",
        name: "Scientific & Technological Advancements",
        description: "Innovative breakthroughs that revolutionized human capabilities",
        subThemes: [
            {
                id: "printing-press",
                name: "The Invention of Printing Press",
                description: "Gutenberg's revolution in information dissemination"
            },
            {
                id: "space-exploration",
                name: "Space Exploration",
                description: "Pioneering journeys beyond Earth, including moon landing"
            },
            {
                id: "age-of-electricity",
                name: "The Age of Electricity",
                description: "Transformative innovations by Edison, Tesla, and others"
            },
            {
                id: "rise-of-internet",
                name: "The Rise of the Internet",
                description: "Global connectivity and information revolution"
            }
        ]
    },
    {
        id: "global-cultural-interactions",
        name: "Global Cultural Interactions",
        description: "Exchanges and encounters that shaped global understanding",
        subThemes: [
            {
                id: "silk-road",
                name: "The Silk Road",
                description: "Ancient trade routes facilitating cultural and economic exchanges"
            },
            {
                id: "old-world-new-world",
                name: "The Age of Exploration",
                description: "Encounters between different world cultures and civilizations"
            },
            {
                id: "decolonization",
                name: "Decolonization Movements",
                description: "Rise of post-colonial nations and independence struggles"
            }
        ]
    },
    {
        id: "natural-history-environmental-changes",
        name: "Natural History and Environmental Changes",
        description: "Earth's transformations and human interactions with the environment",
        subThemes: [
            {
                id: "ice-age-climate",
                name: "Ice Age to Modern Climate",
                description: "Environmental evolution and ecological transformations"
            },
            {
                id: "rise-of-agriculture",
                name: "The Rise of Agriculture",
                description: "Development of farming and human settlement patterns"
            },
            {
                id: "environmental-movements",
                name: "Environmental Movements",
                description: "Global efforts for ecological preservation and sustainability"
            }
        ]
    }
];

export default historicalPeriodsData;