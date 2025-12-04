export const patients = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    avatar: "/woman-face-portrait.png",
    age: 34,
    lastVisit: "2024-12-01",
    status: "needs-review",
    alerts: ["Low Vitamin D", "High Inflammation"],
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "mchen@email.com",
    avatar: "/man-face-portrait-asian.jpg",
    age: 45,
    lastVisit: "2024-11-28",
    status: "up-to-date",
    alerts: [],
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    avatar: "/woman-face-portrait-latina.jpg",
    age: 29,
    lastVisit: "2024-11-30",
    status: "needs-review",
    alerts: ["GI-MAP Dysbiosis", "Low DHA-PC"],
  },
  {
    id: "4",
    name: "James Wilson",
    email: "jwilson@email.com",
    avatar: "/man-face-portrait-older.jpg",
    age: 52,
    lastVisit: "2024-11-25",
    status: "pending-plan",
    alerts: ["Autoimmunity Markers"],
  },
]

export const labResults = {
  lipidPanel: {
    title: "Lipid & Genetic Biomarkers",
    source: "ProdromeScan",
    markers: [
      { name: "DHA-PC", value: 2.1, unit: "%", percentile: 15, zScore: -1.4, status: "low", reference: "3.5-6.0" },
      {
        name: "Plasmalogens",
        value: 45,
        unit: "μmol/L",
        percentile: 22,
        zScore: -0.9,
        status: "low",
        reference: "60-120",
      },
      { name: "GTAs", value: 8.5, unit: "μmol/L", percentile: 85, zScore: 1.2, status: "high", reference: "2-5" },
      {
        name: "Total Cholesterol",
        value: 195,
        unit: "mg/dL",
        percentile: 55,
        zScore: 0.1,
        status: "normal",
        reference: "150-200",
      },
    ],
    insights: [
      "Low DHA-PC indicates need for omega-3 support.",
      "High GTAs suggest inflammation or gut permeability.",
      "Low plasmalogens may affect brain health and cellular function.",
    ],
  },
  inflammation: {
    title: "Inflammation Markers",
    source: "Quest Diagnostics",
    markers: [
      { name: "CRP", value: 0.8, unit: "mg/L", status: "normal", reference: "<1.0" },
      { name: "ESR", value: 15, unit: "mm/hr", status: "normal", reference: "0-20" },
      { name: "Homocysteine", value: 12, unit: "μmol/L", status: "moderate", reference: "<10" },
      { name: "Ferritin", value: 11, unit: "ng/mL", status: "low", reference: "30-150" },
    ],
    insights: [
      "CRP within normal range indicates low systemic inflammation.",
      "Elevated homocysteine may increase cardiovascular risk.",
      "Low ferritin may reduce exercise tolerance and energy levels.",
    ],
  },
  micronutrients: {
    title: "Micronutrient & Metabolic Markers",
    source: "Quest Diagnostics",
    markers: [
      { name: "Vitamin D", value: 12, unit: "ng/mL", status: "critical", reference: "40-80" },
      { name: "Vitamin B12", value: 450, unit: "pg/mL", status: "normal", reference: "300-900" },
      { name: "TSH", value: 2.1, unit: "mIU/L", status: "normal", reference: "0.5-4.5" },
      { name: "Free T4", value: 1.2, unit: "ng/dL", status: "normal", reference: "0.8-1.8" },
      { name: "Free T3", value: 2.8, unit: "pg/mL", status: "normal", reference: "2.3-4.2" },
    ],
    insights: [
      "Vitamin D is very low. This may affect mood, energy, and immunity.",
      "Thyroid markers are within optimal range.",
    ],
  },
  autoimmunity: {
    title: "Autoimmunity Panel",
    source: "Quest Diagnostics",
    markers: [
      { name: "ANA", value: "1:40", unit: "titer", status: "low-positive", pattern: "Speckled" },
      { name: "Anti-dsDNA", value: "Negative", unit: "", status: "normal" },
      { name: "RF", value: 8, unit: "IU/mL", status: "normal", reference: "<14" },
    ],
    insights: [
      "Low-positive ANA with speckled pattern may warrant monitoring.",
      "No evidence of lupus-specific antibodies.",
    ],
  },
  giMap: {
    title: "GI-MAP Gut Analysis",
    source: "Diagnostic Solutions",
    pathogens: [
      { name: "H. pylori", status: "negative" },
      { name: "C. difficile", status: "negative" },
      { name: "Candida albicans", status: "elevated", value: "3.2e4" },
    ],
    dysbiosis: [
      { name: "Enterococcus", status: "high", value: "8.5e6", reference: "<1.0e5" },
      { name: "Akkermansia muciniphila", status: "low", value: "1.2e3", reference: ">1.0e5" },
      { name: "Bifidobacterium", status: "low", value: "2.1e4", reference: ">1.0e6" },
      { name: "Lactobacillus", status: "normal", value: "3.5e5", reference: ">1.0e5" },
    ],
    insights: [
      "High Enterococcus suggests possible gut imbalance.",
      "Low Akkermansia suggests mucosal barrier support needed.",
      "Consider probiotic support for Bifidobacterium.",
    ],
  },
  mrt: {
    title: "MRT Food Sensitivity",
    source: "Oxford Biomedical",
    reactive: [
      { food: "Dairy (Cow)", level: "high", category: "Dairy" },
      { food: "Gluten", level: "high", category: "Grains" },
      { food: "Eggs", level: "moderate", category: "Protein" },
      { food: "Almonds", level: "moderate", category: "Nuts" },
      { food: "Soy", level: "moderate", category: "Legumes" },
    ],
    safe: ["Chicken", "Rice", "Salmon", "Sweet Potato", "Spinach", "Olive Oil", "Blueberries", "Avocado"],
    insights: ["Eliminate high-reactive foods for 3-6 months.", "Rotate moderate-reactive foods every 4 days."],
  },
}

export const literature = [
  {
    id: "1",
    title: "Omega-3 Fatty Acid Supplementation and Cognitive Function",
    journal: "Journal of Clinical Nutrition",
    year: 2023,
    summary:
      "Meta-analysis of 15 RCTs showing DHA supplementation improves cognitive markers in adults with low baseline levels.",
    relevance: "DHA-PC",
    doi: "10.1000/jcn.2023.001",
  },
  {
    id: "2",
    title: "Vitamin D Deficiency and Immune Function: A Systematic Review",
    journal: "Frontiers in Immunology",
    year: 2024,
    summary:
      "Evidence supports vitamin D supplementation for immune regulation, particularly in deficient populations.",
    relevance: "Vitamin D",
    doi: "10.1000/fi.2024.123",
  },
  {
    id: "3",
    title: "Akkermansia muciniphila and Metabolic Health",
    journal: "Nature Microbiology",
    year: 2023,
    summary: "Akkermansia abundance correlates with improved metabolic markers and gut barrier function.",
    relevance: "GI-MAP",
    doi: "10.1000/nm.2023.456",
  },
  {
    id: "4",
    title: "Plasmalogen Supplementation in Cognitive Aging",
    journal: "Alzheimer's Research & Therapy",
    year: 2024,
    summary: "Oral plasmalogen supplementation shows promise for cognitive support in aging populations.",
    relevance: "Plasmalogens",
    doi: "10.1000/art.2024.789",
  },
  {
    id: "5",
    title: "Gut Microbiome Modulation for Metabolic Health",
    journal: "Cell Metabolism",
    year: 2024,
    summary:
      "Comprehensive review of dietary interventions that positively modulate gut microbiome composition and metabolic markers.",
    relevance: "GI-MAP",
    doi: "10.1000/cm.2024.321",
  },
  {
    id: "6",
    title: "Food Sensitivity Testing and Elimination Diets",
    journal: "Journal of Allergy and Clinical Immunology",
    year: 2023,
    summary:
      "Clinical outcomes of MRT-guided elimination diets show significant improvement in IBS symptoms and quality of life.",
    relevance: "MRT",
    doi: "10.1000/jaci.2023.654",
  },
  {
    id: "7",
    title: "Iron Deficiency Without Anemia: Clinical Implications",
    journal: "American Journal of Medicine",
    year: 2024,
    summary:
      "Low ferritin with normal hemoglobin is associated with fatigue, exercise intolerance, and cognitive impairment.",
    relevance: "Ferritin",
    doi: "10.1000/ajm.2024.987",
  },
  {
    id: "8",
    title: "Autoimmune Markers and Lifestyle Interventions",
    journal: "Autoimmunity Reviews",
    year: 2023,
    summary: "Anti-inflammatory diets and stress reduction show promise in modulating low-positive ANA patterns.",
    relevance: "Autoimmunity",
    doi: "10.1000/ar.2023.147",
  },
  {
    id: "9",
    title: "Homocysteine Lowering with B Vitamins",
    journal: "Circulation Research",
    year: 2024,
    summary: "B-vitamin supplementation effectively reduces elevated homocysteine and may lower cardiovascular risk.",
    relevance: "Homocysteine",
    doi: "10.1000/cr.2024.258",
  },
  {
    id: "10",
    title: "Probiotic Supplementation for Gut Barrier Function",
    journal: "Gut Microbes",
    year: 2023,
    summary: "Multi-strain probiotics containing Bifidobacterium improve intestinal permeability markers.",
    relevance: "GI-MAP",
    doi: "10.1000/gm.2023.369",
  },
]

export const lifestylePlan = {
  diet: {
    title: "Dietary Protocol",
    recommendations: [
      "Eliminate dairy and gluten for 12 weeks",
      "Focus on anti-inflammatory foods: fatty fish, leafy greens, berries",
      "Include 2-3 servings of omega-3 rich foods daily",
      "Increase fiber intake to 30g daily from vegetables",
    ],
    avoidList: ["Dairy (Cow)", "Gluten", "Processed foods", "Added sugars"],
    rotateList: ["Eggs (every 4 days)", "Almonds (every 4 days)", "Soy products"],
  },
  supplements: {
    title: "Supplement Protocol",
    items: [
      { name: "Vitamin D3", dosage: "5000 IU", frequency: "Daily with fat", reason: "Correct deficiency" },
      { name: "Omega-3 (EPA/DHA)", dosage: "2000mg", frequency: "Daily with meals", reason: "Increase DHA-PC" },
      { name: "Plasmalogen Precursors", dosage: "500mg", frequency: "Daily", reason: "Support cellular membranes" },
      {
        name: "Probiotic (Bifido blend)",
        dosage: "25B CFU",
        frequency: "Daily on empty stomach",
        reason: "Gut dysbiosis support",
      },
      { name: "L-Glutamine", dosage: "5g", frequency: "Daily", reason: "Gut barrier support" },
    ],
  },
  exercise: {
    title: "Exercise Protocol",
    recommendations: [
      "Zone 2 cardio: 150 minutes/week (walking, cycling, swimming)",
      "Strength training: 2-3 sessions/week focusing on compound movements",
      "Daily movement: 8,000-10,000 steps",
      "Avoid high-intensity training until ferritin improves",
    ],
  },
  sleep: {
    title: "Sleep Protocol",
    recommendations: [
      "Consistent sleep schedule: 10pm-6am target",
      "Blue light blocking after 8pm",
      "Cool bedroom temperature (65-68°F)",
      "Morning sunlight exposure within 30 minutes of waking",
    ],
  },
  stress: {
    title: "Stress & Recovery",
    recommendations: [
      "10 minutes daily meditation or breathwork",
      "Weekly nature exposure (forest bathing, park walks)",
      "Limit caffeine after 12pm",
      "Consider HRV monitoring for recovery tracking",
    ],
  },
  gut: {
    title: "Gut Protocol",
    recommendations: [
      "4R Protocol: Remove, Replace, Reinoculate, Repair",
      "Bone broth or collagen peptides daily",
      "Prebiotic foods: asparagus, garlic, onions",
      "Fermented foods: sauerkraut, kimchi (if tolerated)",
    ],
  },
}

export const progressEntries = [
  {
    id: "1",
    date: "2024-12-01",
    energy: 6,
    mood: 7,
    digestion: 5,
    sleep: 7,
    notes: "Feeling better after eliminating dairy. Less bloating.",
    photos: [],
  },
  {
    id: "2",
    date: "2024-11-28",
    energy: 5,
    mood: 6,
    digestion: 4,
    sleep: 6,
    notes: "Started supplement protocol. Some initial adjustment.",
    photos: [],
  },
  {
    id: "3",
    date: "2024-11-25",
    energy: 4,
    mood: 5,
    digestion: 3,
    sleep: 5,
    notes: "Baseline before starting new plan.",
    photos: [],
  },
]

export const literatureCategories = [
  { id: "all", label: "All Studies" },
  { id: "omega", label: "Omega-3 / DHA" },
  { id: "vitamin", label: "Vitamin D" },
  { id: "gut", label: "Gut Health" },
  { id: "inflammation", label: "Inflammation" },
  { id: "autoimmunity", label: "Autoimmunity" },
  { id: "nutrition", label: "Nutrition" },
]

export const extendedLiterature = literature

export const geneticVariants = {
  MTHFR: {
    gene: "MTHFR",
    variant: "C677T",
    status: "heterozygous",
    impact: "moderate",
    description: "Reduced ability to convert folate to methylfolate (40-60% reduction)",
    implications: [
      "Higher homocysteine levels",
      "Reduced methylation capacity",
      "May need methylated B vitamins",
      "Increased cardiovascular risk if unaddressed",
    ],
    recommendations: {
      supplements: ["Methylfolate (L-5-MTHF)", "Methylcobalamin (B12)", "Riboflavin (B2)"],
      nutrition: ["Leafy greens", "Avoid folic acid fortified foods", "Liver and organ meats"],
      avoid: ["Synthetic folic acid", "Excessive alcohol"],
    },
    relatedMarkers: ["Homocysteine", "Folate", "B12"],
  },
  APOE: {
    gene: "APOE",
    variant: "e3/e4",
    status: "carrier",
    impact: "significant",
    description: "One copy of APOE4 allele associated with increased Alzheimer's and cardiovascular risk",
    implications: [
      "Higher LDL cholesterol response to saturated fat",
      "Increased Alzheimer's risk (3x baseline)",
      "May benefit from lower saturated fat diet",
      "Exercise is especially protective",
    ],
    recommendations: {
      supplements: ["Omega-3 fatty acids", "Phosphatidylcholine", "Lion's Mane"],
      nutrition: ["Mediterranean diet", "Limit saturated fat", "Emphasize olive oil and fish"],
      exercise: ["Regular aerobic exercise is critical", "Aim for 150+ min/week"],
      avoid: ["High saturated fat intake", "Excessive alcohol", "Smoking"],
    },
    relatedMarkers: ["LDL-C", "ApoB", "Lp(a)"],
  },
  COMT: {
    gene: "COMT",
    variant: "Val158Met",
    status: "Met/Met (slow)",
    impact: "moderate",
    description: "Slow COMT means slower breakdown of catecholamines (dopamine, norepinephrine, epinephrine)",
    implications: [
      "Higher baseline dopamine levels",
      "Better focus but more anxiety-prone",
      "Sensitive to stress and stimulants",
      "May process caffeine slower",
    ],
    recommendations: {
      supplements: ["Magnesium", "L-theanine", "Adaptogens (Ashwagandha)"],
      nutrition: ["Avoid excessive caffeine", "Green tea over coffee", "Magnesium-rich foods"],
      lifestyle: ["Stress management critical", "Regular meditation", "Avoid overstimulation"],
      avoid: ["High caffeine intake", "High-stress environments"],
    },
    relatedMarkers: ["Cortisol", "Catecholamines"],
  },
  VDR: {
    gene: "VDR",
    variant: "Bsm/Taq",
    status: "variant",
    impact: "moderate",
    description: "Vitamin D receptor variants affecting vitamin D utilization",
    implications: [
      "May need higher vitamin D intake",
      "Reduced receptor sensitivity",
      "Higher risk of deficiency",
      "Important for immune and bone health",
    ],
    recommendations: {
      supplements: ["Vitamin D3 5000-10000 IU", "Vitamin K2 (MK-7)", "Magnesium for D activation"],
      nutrition: ["Fatty fish", "Egg yolks", "Mushrooms exposed to UV"],
      lifestyle: ["Regular sun exposure", "Test levels quarterly"],
    },
    relatedMarkers: ["Vitamin D (25-OH)", "Calcium", "PTH"],
  },
  HLA_DQ: {
    gene: "HLA-DQ2/DQ8",
    variant: "DQ2.5",
    status: "positive",
    impact: "significant",
    description: "Genetic predisposition for celiac disease (present in 95% of celiacs)",
    implications: [
      "Does NOT mean you have celiac disease",
      "30% of population carries this but only 1% develop celiac",
      "Should monitor for symptoms",
      "Consider periodic celiac antibody testing",
    ],
    recommendations: {
      nutrition: ["May benefit from gluten-free trial if symptomatic", "Monitor for GI symptoms"],
      testing: ["tTG-IgA annually if symptomatic", "Consider endoscopy if elevated"],
    },
    relatedMarkers: ["tTG-IgA", "DGP antibodies"],
  },
  ACTN3: {
    gene: "ACTN3",
    variant: "R577X",
    status: "XX (null)",
    impact: "moderate",
    description: "Absence of alpha-actinin-3 protein in fast-twitch muscle fibers",
    implications: [
      "Better suited for endurance activities",
      "Slower muscle recovery from power exercises",
      "May excel at endurance sports",
      "Strength training still beneficial but recovery matters",
    ],
    recommendations: {
      exercise: [
        "Emphasize endurance training",
        "Allow extra recovery between intense sessions",
        "Focus on Zone 2 cardio",
      ],
      supplements: ["Creatine may help compensate", "BCAAs for recovery", "Tart cherry for inflammation"],
      lifestyle: ["Prioritize sleep for recovery", "Don't overtrain with HIIT"],
    },
    relatedMarkers: ["CK (Creatine Kinase)", "Lactate threshold"],
  },
  CYP1A2: {
    gene: "CYP1A2",
    variant: "AA",
    status: "slow metabolizer",
    impact: "moderate",
    description: "Slow caffeine metabolism - caffeine stays in system longer",
    implications: [
      "Caffeine has longer half-life",
      "More susceptible to caffeine side effects",
      "May increase cardiovascular risk with high intake",
      "Afternoon coffee disrupts sleep more",
    ],
    recommendations: {
      nutrition: ["Limit caffeine to morning only", "Max 1-2 cups coffee", "Switch to green tea"],
      lifestyle: ["No caffeine after 12pm", "Monitor sleep quality with caffeine"],
      avoid: ["Afternoon/evening caffeine", "Energy drinks", "Pre-workout with high caffeine"],
    },
    relatedMarkers: ["Blood pressure", "Heart rate variability"],
  },
  FTO: {
    gene: "FTO",
    variant: "rs9939609",
    status: "AA (risk)",
    impact: "moderate",
    description: "Associated with increased appetite and reduced satiety signaling",
    implications: [
      "May feel hungrier than others",
      "Harder to feel satisfied after meals",
      "Responds well to protein",
      "Exercise can offset genetic risk",
    ],
    recommendations: {
      nutrition: ["High protein diet", "Fiber-rich foods for satiety", "Mindful eating practices"],
      lifestyle: ["Regular exercise crucial", "Sleep optimization (affects appetite hormones)"],
      supplements: ["Fiber supplements if needed", "Protein powder for satiety"],
    },
    relatedMarkers: ["Leptin", "Ghrelin", "Insulin"],
  },
}

export const biomarkerInsights = {
  "Vitamin D": {
    currentValue: 28,
    unit: "ng/mL",
    optimalRange: "50-80",
    status: "low",
    personalizedInsight:
      "Your vitamin D is at 28 ng/mL, which is below optimal. Combined with your VDR gene variant, you likely need higher supplementation than average.",
    affectedSystems: ["Immune function", "Bone health", "Mood regulation", "Muscle function"],
    recommendations: {
      supplements: [
        { name: "Vitamin D3", dose: "5000-10000 IU daily", reason: "VDR variant requires higher intake" },
        { name: "Vitamin K2 (MK-7)", dose: "200mcg daily", reason: "Ensures calcium goes to bones" },
      ],
      nutrition: ["Fatty fish 3x/week", "Egg yolks", "10-15 min midday sun exposure"],
      lifestyle: ["Morning sunlight exposure", "Test levels in 8-12 weeks"],
    },
    research: [
      {
        title: "Vitamin D and VDR polymorphisms",
        journal: "J Clin Endocrinol Metab",
        finding: "VDR variants require 2-3x higher D3 intake for same serum levels",
      },
    ],
  },
  Homocysteine: {
    currentValue: 12,
    unit: "μmol/L",
    optimalRange: "<8",
    status: "elevated",
    personalizedInsight:
      "Your homocysteine is 12 μmol/L. With your MTHFR C677T variant, this is expected - you need methylated B vitamins to bring it down.",
    affectedSystems: ["Cardiovascular health", "Brain function", "Methylation", "Detoxification"],
    recommendations: {
      supplements: [
        { name: "Methylfolate", dose: "800-1000mcg daily", reason: "Bypasses MTHFR enzyme deficiency" },
        { name: "Methylcobalamin", dose: "1000mcg daily", reason: "Works with folate for methylation" },
        { name: "B6 (P5P)", dose: "50mg daily", reason: "Complete homocysteine pathway support" },
      ],
      nutrition: ["Leafy greens", "Avoid folic acid (synthetic)", "Liver once weekly"],
      avoid: ["Fortified foods with folic acid", "Excessive alcohol"],
    },
    research: [
      {
        title: "MTHFR and cardiovascular risk",
        journal: "Circulation",
        finding: "Methylated B vitamins reduce homocysteine by 25-30% in MTHFR carriers",
      },
    ],
  },
  Ferritin: {
    currentValue: 18,
    unit: "ng/mL",
    optimalRange: "50-150",
    status: "low",
    personalizedInsight:
      "Your ferritin is 18 ng/mL - this explains your fatigue and exercise intolerance. Low iron stores limit oxygen delivery and energy production.",
    affectedSystems: ["Energy production", "Exercise capacity", "Thyroid function", "Cognitive function"],
    recommendations: {
      supplements: [
        { name: "Iron bisglycinate", dose: "25-50mg daily", reason: "Gentle, well-absorbed form" },
        { name: "Vitamin C", dose: "500mg with iron", reason: "Increases iron absorption 2-3x" },
      ],
      nutrition: ["Red meat 2-3x/week", "Pair plant iron with vitamin C", "Avoid tea/coffee with meals"],
      exercise: ["Avoid high-intensity until ferritin >50", "Focus on Zone 2 cardio"],
      avoid: ["Calcium with iron meals", "Coffee/tea within 1hr of iron-rich foods"],
    },
    research: [
      {
        title: "Iron deficiency without anemia",
        journal: "Am J Med",
        finding: "Ferritin <30 causes fatigue even with normal hemoglobin",
      },
    ],
  },
  "DHA-PC": {
    currentValue: 2.1,
    unit: "%",
    optimalRange: "3.5-6.0",
    status: "low",
    personalizedInsight:
      "Your DHA-PC is low at 2.1%. Given your APOE4 status, omega-3s are especially important for brain health and reducing Alzheimer's risk.",
    affectedSystems: ["Brain health", "Cardiovascular", "Inflammation", "Cell membranes"],
    recommendations: {
      supplements: [
        { name: "Omega-3 (EPA/DHA)", dose: "2000-3000mg daily", reason: "APOE4 carriers need higher omega-3" },
        { name: "Phosphatidylcholine", dose: "500mg daily", reason: "Supports brain phospholipid levels" },
      ],
      nutrition: ["Wild salmon 3x/week", "Sardines, mackerel", "Walnuts and flax daily"],
    },
    research: [
      {
        title: "Omega-3 and APOE4",
        journal: "Alzheimers Dement",
        finding: "High omega-3 intake reduces dementia risk by 50% in APOE4 carriers",
      },
    ],
  },
  CRP: {
    currentValue: 2.8,
    unit: "mg/L",
    optimalRange: "<1.0",
    status: "elevated",
    personalizedInsight:
      "Your CRP of 2.8 indicates systemic inflammation. This increases cardiovascular risk and may be contributing to fatigue and brain fog.",
    affectedSystems: ["Cardiovascular", "Immune system", "Brain function", "Joint health"],
    recommendations: {
      supplements: [
        { name: "Omega-3 fatty acids", dose: "2000mg EPA/DHA", reason: "Powerful anti-inflammatory" },
        { name: "Curcumin", dose: "500mg with piperine", reason: "Reduces CRP by 20-30%" },
        { name: "SPMs (Specialized Pro-resolving Mediators)", dose: "As directed", reason: "Resolves inflammation" },
      ],
      nutrition: [
        "Anti-inflammatory diet",
        "Eliminate processed foods",
        "Increase colorful vegetables",
        "Remove seed oils",
      ],
      lifestyle: ["Regular exercise", "Stress management", "Quality sleep"],
    },
    research: [
      {
        title: "CRP and cardiovascular events",
        journal: "NEJM",
        finding: "CRP >2 doubles cardiovascular event risk",
      },
    ],
  },
  Akkermansia: {
    currentValue: "1.2e3",
    unit: "CFU/g",
    optimalRange: ">1.0e5",
    status: "low",
    personalizedInsight:
      "Your Akkermansia levels are very low. This keystone species is critical for gut barrier integrity and metabolic health.",
    affectedSystems: ["Gut barrier", "Metabolic health", "Immune function", "Weight management"],
    recommendations: {
      supplements: [
        { name: "Akkermansia supplement", dose: "As directed", reason: "Direct supplementation now available" },
        { name: "Polyphenols", dose: "From food or supplements", reason: "Feed Akkermansia growth" },
      ],
      nutrition: ["Pomegranate", "Cranberries", "Grapes", "Green tea", "Polyphenol-rich foods"],
      lifestyle: ["Intermittent fasting may help", "Regular exercise increases Akkermansia"],
    },
    research: [
      {
        title: "Akkermansia and metabolic health",
        journal: "Nature Medicine",
        finding: "Akkermansia supplementation improves insulin sensitivity and reduces inflammation",
      },
    ],
  },
}

export const aiExplanation = {
  howItWorks: {
    title: "How Helix AI Works",
    steps: [
      {
        step: 1,
        title: "Data Integration",
        description:
          "We securely import your lab results, genetic data, wearable metrics, and health history into our system.",
      },
      {
        step: 2,
        title: "Pattern Recognition",
        description:
          "Our AI analyzes thousands of biomarker interactions, genetic variants, and peer-reviewed research to identify patterns specific to your biology.",
      },
      {
        step: 3,
        title: "Personalized Synthesis",
        description:
          "We cross-reference your data with the latest clinical research to generate recommendations tailored to YOUR unique genetic makeup and current health status.",
      },
      {
        step: 4,
        title: "Doctor Review",
        description:
          "Every recommendation is reviewed and approved by your functional medicine physician before you see it.",
      },
      {
        step: 5,
        title: "Continuous Learning",
        description:
          "As you track progress and new research emerges, your protocol automatically adapts with physician oversight.",
      },
    ],
  },
  dataUsed: [
    "Blood biomarkers (60+ markers)",
    "Genetic variants (SNPs)",
    "Gut microbiome composition",
    "Food sensitivity results",
    "Wearable data (sleep, HRV, activity)",
    "Symptom tracking",
    "Progress logs",
  ],
  researchSources: [
    "PubMed peer-reviewed studies",
    "Clinical trial databases",
    "Functional medicine literature",
    "Nutrigenomics research",
    "Microbiome studies",
  ],
  limitations: [
    "AI recommendations are not medical diagnoses",
    "Always consult your physician before making changes",
    "Individual responses may vary",
    "Research is constantly evolving",
  ],
}

export const researchUpdates = [
  {
    id: "1",
    date: "2024-12-01",
    title: "New APOE4 Research: Exercise More Protective Than Previously Thought",
    summary:
      "A landmark study in JAMA Neurology shows that APOE4 carriers who exercise 150+ min/week reduce dementia risk by 60%.",
    relevantTo: ["APOE"],
    impact: "Your exercise recommendations have been updated to emphasize this finding.",
    source: "JAMA Neurology, Nov 2024",
    isNew: true,
  },
  {
    id: "2",
    date: "2024-11-15",
    title: "Vitamin D Optimal Range Updated",
    summary:
      "New meta-analysis suggests optimal vitamin D for immune function is 60-80 ng/mL, higher than previous 40-60 range.",
    relevantTo: ["VDR", "Vitamin D"],
    impact: "Your vitamin D target has been updated to reflect this research.",
    source: "Frontiers in Immunology, Nov 2024",
    isNew: true,
  },
  {
    id: "3",
    date: "2024-11-01",
    title: "MTHFR and Mental Health Connection",
    summary:
      "Study confirms methylfolate supplementation improves depression outcomes in MTHFR variant carriers by 40%.",
    relevantTo: ["MTHFR"],
    impact: "Consider methylfolate if experiencing mood symptoms.",
    source: "J Psychiatric Research, Oct 2024",
    isNew: false,
  },
]

export const privacyInfo = {
  dataProtection: [
    "HIPAA compliant infrastructure",
    "256-bit AES encryption at rest",
    "TLS 1.3 encryption in transit",
    "SOC 2 Type II certified",
    "No data sold to third parties EVER",
  ],
  yourRights: [
    "Download all your data anytime",
    "Delete your account and data permanently",
    "Control what data is shared with providers",
    "Opt out of anonymized research",
  ],
  doctorOversight: {
    title: "Physician Oversight",
    description:
      "Every recommendation in Helix is reviewed and approved by a licensed functional medicine physician. AI assists but never replaces clinical judgment.",
    features: [
      "Board-certified functional medicine physicians",
      "All AI recommendations require MD approval",
      "Direct messaging with your care team",
      "Quarterly protocol reviews",
    ],
  },
}
