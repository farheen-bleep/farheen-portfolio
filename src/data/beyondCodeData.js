/**
 * Beyond Code — Interactive Creative World Data
 * Centralised content for the 6 interactive areas in the 3D isometric studio.
 * Truthful, personal, editable information reflecting Farheen's creative pursuits outside engineering.
 */

export const beyondCodeData = {
  meta: {
    title: "Beyond Code",
    eyebrow: "VERSION 2.0 // CREATIVE UNIVERSE",
    subtitle: "A miniature interactive universe exploring my passions, creative experiments, and life outside engineering.",
    instructions: "Click any object in the 3D room to explore its story · Drag to gently orbit · Scroll to inspect details"
  },

  areas: {
    baking: {
      id: "baking",
      name: "The Baking Corner",
      category: "Culinary Craft & Science",
      accentColor: "#FF795D", // Coral
      secondaryColor: "#FFF1C7", // Butter yellow
      badge: "Recipes & Science",
      icon: "Cookie",
      shortDescription: "Precision measurements, yeast dough fermentation, and the dream of an artisanal venture.",
      fullNarrative:
        "Baking is where my love for structural precision and sensory creativity meet. Much like engineering, baking is grounded in chemistry—hydration ratios, oven temperatures, exact gram scales, and fermentation timings. But unlike software, you can taste the finished iteration.",
      story: [
        "I find immense joy in perfecting recipes from scratch: slow-fermented focaccia with rosemary and flaky salt, cardamom-infused cinnamon twists, and delicate French macarons with crisp feet and chewy centers.",
        "Beyond a weekend hobby, baking represents my entrepreneurial curiosity—the tangible ambition of one day building an independent bakery or artisanal pastry brand that pairs uncompromising flavor with thoughtful aesthetic packaging."
      ],
      objects: [
        { name: "Pastel Oven", detail: "Mint countertop convection oven calibrated for artisan breads and pastries." },
        { name: "Ceramic Mixing Bowls", detail: "Stacked ceramic prep bowls with sourdough starter and whipped batter." },
        { name: "Baking Sheet & Whisk", detail: "Stainless steel balloon whisk and golden cookies fresh off the cooling rack." },
        { name: "Glass Ingredient Jars", detail: "Labeled jars of unbleached bread flour, vanilla bean pods, and raw cane sugar." }
      ],
      quote: "Baking is delicious chemistry—where 2 grams of yeast and 12 hours of patience create magic."
    },

    writing: {
      id: "writing",
      name: "The Writing Desk",
      category: "Essays & Reflection",
      accentColor: "#7654C8", // Violet
      secondaryColor: "#FAF8F1", // Warm cream
      badge: "Substack & Essays",
      icon: "PenTool",
      shortDescription: "Reflective essays, Substack dispatches, and thinking out loud through the written word.",
      fullNarrative:
        "Writing is my tool for making sense of the world. While code communicates with computers, writing bridges human intent, ambiguity, and emotion. My writing desk is a dedicated space for drafting long-form essays, organizing raw observations, and exploring ideas at the intersection of technology, philosophy, and personal growth.",
      story: [
        "Through personal essays and Substack writing, I explore questions around craft, learning in public, architectural discipline, and the quiet beauty of everyday curiosities.",
        "Putting thoughts into complete paragraphs forces intellectual honesty: if an idea cannot be explained clearly on paper, it usually isn't fully understood yet."
      ],
      objects: [
        { name: "Open Leather Notebook", detail: "Fountain pen annotations, margin reflections, and structural drafts." },
        { name: "Writing Laptop", detail: "Minimal markdown editor open to latest Substack essay in progress." },
        { name: "Brass Desk Lamp", detail: "Warm focused task light illuminating late-night thought sessions." },
        { name: "Scattered Index Cards", detail: "Quick thesis outlines, memorable quotes, and essay prompts." }
      ],
      quote: "Clear writing is the ultimate debugging tool for thought."
    },

    reading: {
      id: "reading",
      name: "The Reading Nook",
      category: "Literature & Inquiry",
      accentColor: "#36AFA0", // Teal
      secondaryColor: "#FFF1C7", // Butter yellow
      badge: "Books & Stories",
      icon: "BookOpen",
      shortDescription: "Speculative fiction, memoirs, design theory, and annotated physical paperbacks.",
      fullNarrative:
        "My reading corner is a sanctuary of quiet focus. I gravitate toward books that expand worldview—from thought-provoking speculative fiction and psychological realism to design philosophy, biographies, and historical narratives.",
      story: [
        "I believe reading widely outside computer science makes you a significantly better engineer and thinker. Reading fiction cultivates empathy and an appreciation for human nuance, while architectural and design literature teaches the value of restraint, proportion, and form.",
        "I love physical books: dog-eared corners, pencil underlinings in the margins, and the tangible weight of turning a paper page."
      ],
      objects: [
        { name: "Looming Bookshelf", detail: "Shelves packed with philosophy, classic literature, and design histories." },
        { name: "Cozy Armchair", detail: "Comfortable cushioned reading chair draped with a textured warm throw." },
        { name: "Side Table & Tea Cup", detail: "Ceramic mug of spiced chai resting on a stack of current weekend reads." },
        { name: "Curved Floor Lamp", detail: "Gentle ambient reading light casting a soft glow over the corner." }
      ],
      quote: "To read is to inhabit other minds, eras, and dimensions without leaving your chair."
    },

    photography: {
      id: "photography",
      name: "The Photography Corner",
      category: "Visual Storytelling",
      accentColor: "#4267C8", // Blue
      secondaryColor: "#FF795D", // Coral
      badge: "Moments & Light",
      icon: "Camera",
      shortDescription: "Street photography, geometric shadows, candid portraits, and visual storytelling.",
      fullNarrative:
        "Photography taught me to look at light before looking at objects. It is the practice of noticing what everyone else walks right past—how morning sun slices through concrete balconies, the geometry of shadows on city streets, and spontaneous, unposed expressions.",
      story: [
        "I enjoy street and architectural photography because they reward patience and keen observation. You don't create the scene; you wait for composition, timing, and emotion to align in a single frame.",
        "This visual discipline feeds directly back into my engineering work—training my eye for micro-spacing, visual balance, and clean composition in digital interfaces."
      ],
      objects: [
        { name: "Rangefinder Camera", detail: "Compact 35mm prime lens camera used for daily street exploration." },
        { name: "Cork Pinboard", detail: "Curated Polaroid prints, film contact sheets, and color studies." },
        { name: "Stacked Photo Albums", detail: "Archival albums containing chronologically cataloged memory prints." },
        { name: "Light Leaks & Prints", detail: "Framed black-and-white architectural compositions on the wall." }
      ],
      quote: "Photography is the art of seeing the extraordinary hidden within everyday stillness."
    },

    workshop: {
      id: "workshop",
      name: "The Creative Workshop",
      category: "Jewellery & Material Craft",
      accentColor: "#F19BC0", // Pink
      secondaryColor: "#7654C8", // Violet
      badge: "Jewellery Design",
      icon: "Sparkles",
      shortDescription: "Handcrafted jewellery, wire manipulation, organic beads, and brand ideation.",
      fullNarrative:
        "My jewellery workbench is a celebration of tactile making. Working with physical materials—pliers, gold-filled wire, semi-precious beads, and freshwater pearls—provides an immediate, tactile counterbalance to writing abstract code on a screen.",
      story: [
        "I design and handcraft contemporary jewellery pieces that balance delicate wire loops with bold geometric contrasts. Each piece begins with rough pencil sketches on graph paper before being hand-manipulated with precision pliers.",
        "I am actively developing concepts for an independent boutique jewellery brand, exploring packaging typography, organic material sourcing, and tactile unboxing experiences."
      ],
      objects: [
        { name: "Crafting Workbench", detail: "Oak work surface fitted with precision pliers, cutters, and measuring calipers." },
        { name: "Organizer Compartments", detail: "Clear acrylic trays sorted with glass beads, pearls, and metallic findings." },
        { name: "Sketch Pad & Caliper", detail: "Hand-drawn earring and necklace schematics with proportion notations." },
        { name: "Display Bust", detail: "Linen display neck showcasing a finished handcrafted pendant necklace." }
      ],
      quote: "Crafting by hand reminds me that true beauty lives in tactile imperfection and meticulous care."
    },

    personal: {
      id: "personal",
      name: "The Personal Corner",
      category: "Athletics & Milestones",
      accentColor: "#F5B72F", // Mango yellow
      secondaryColor: "#36AFA0", // Teal
      badge: "Sports & Milestones",
      icon: "Award",
      shortDescription: "Volleyball teamwork, school elocution milestones, trophies, and lifelong keepsakes.",
      fullNarrative:
        "This corner holds the memories and athletic pursuits that shaped my discipline and grit. Long before engineering exams or production code, competitive sports and stage elocution taught me how to handle pressure, communicate clearly, and rally teammates when the score was against us.",
      story: [
        "Volleyball taught me split-second spatial awareness, collective trust, and relentless hustle. You can't play volleyball alone—every point depends on communication, clean passes, and trusting your teammate to cover the court.",
        "School elocution competitions and extracurricular leadership built the confidence to articulate complex ideas clearly—a skill that continues to serve me in engineering presentations and collaborative team environments."
      ],
      objects: [
        { name: "Volleyball", detail: "Well-loved leather volleyball with match-worn scuffs and court memories." },
        { name: "Trophy & Ribbon", detail: "Engraved inter-school athletics medals and elocution tournament awards." },
        { name: "Framed Certificate", detail: "Academic distinction certificates and tournament participation badges." },
        { name: "Memory Keepsake Box", detail: "Wooden memory chest holding handwritten notes, pins, and school badges." }
      ],
      quote: "Athletics taught me that teamwork, resilience, and composure under pressure matter in every arena."
    }
  }
};

