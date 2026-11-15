/**
 * Beyond Code — Interactive Creative World Data
 * Centralised content for the 6 interactive areas in the 3D isometric studio.
 * Personal, genuine stories reflecting Farheen's interests outside academics.
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
      category: "Baking & Treats",
      accentColor: "#D46238", // Terracotta / warm coral
      secondaryColor: "#FFF1C7",
      badge: "In The Kitchen",
      icon: "Cookie",
      shortDescription: "Cakes, cookies, cinnamon rolls, churros, and trying out new recipes.",
      fullNarrative:
        "I've been interested in baking for a while now, and it's something I genuinely enjoy spending time on. There's something really comforting about putting ingredients together, watching them bake in the oven, and seeing how they turn out.",
      story: [
        "I bake different kinds of things depending on what I'm in the mood for—cakes, cookies, cinnamon rolls, and even churros. A little achievement I'm really proud of is winning first prize in a cupcake decorating competition back in school. It was so much fun working on the piping, colors, and all the tiny details.",
        "Most of all, I love experimenting in the kitchen. Whether it's testing a new recipe, tweaking flavors, or trying out creative decorations, I always look forward to trying something different."
      ],
      objects: [
        { name: "Countertop Oven", detail: "Where the cakes, cookies, and cinnamon rolls get baked." },
        { name: "Mixing Bowls", detail: "Ceramic bowls for mixing dough, batter, and frostings." },
        { name: "Baking Tray & Cookies", detail: "A fresh batch of chocolate-chunk cookies straight out of the oven." },
        { name: "Ingredient Canisters", detail: "Glass jars filled with flour, sugar, and everyday baking essentials." }
      ]
    },

    writing: {
      id: "writing",
      name: "The Writing Desk",
      category: "Essays & Reviews",
      accentColor: "#7654C8", // Violet
      secondaryColor: "#FAF8F1",
      badge: "Substack & Fable",
      icon: "PenTool",
      shortDescription: "Book reviews on Fable, essays on Substack, and favorite stories.",
      fullNarrative:
        "This desk brings together two things I spend a lot of my free time on: reading and writing. Whenever I finish a book, I almost always have strong thoughts about it—what pulled me in, what didn't work, and what stayed with me after turning the last page.",
      story: [
        "I post my book reviews on Fable, where I share honest opinions and break down what I liked and didn't like about the stories I read. When it comes to reading preferences, my favorite genres are fantasy, fiction, whodunnits, and murder mysteries. I'm a huge fan of Agatha Christie for clever mysteries where every clue matters, and Leigh Bardugo for immersive fantasy worlds and memorable characters.",
        "Alongside reviewing books, I enjoy writing essays on Substack. It's a space where I can put my thoughts into words, explore personal topics, and write about things that interest me. I also spend a lot of time reading other people's essays on Substack—it's become one of my favorite places to discover good writing."
      ],
      objects: [
        { name: "Journal & Fountain Pen", detail: "Where I jot down thoughts and notes right after finishing a book." },
        { name: "Laptop", detail: "Used for drafting Substack essays and posting book reviews on Fable." },
        { name: "Architect's Lamp", detail: "A warm brass desk lamp for late-night reading and writing sessions." },
        { name: "Notes & Bookmarks", detail: "Sticky notes with favorite lines, bookmarks, and everyday pens." }
      ]
    },

    reading: {
      id: "reading",
      name: "The Reading Nook",
      category: "Quiet Corner",
      accentColor: "#36AFA0", // Teal
      secondaryColor: "#FFF1C7",
      badge: "Books & Chai",
      icon: "BookOpen",
      shortDescription: "Getting lost in fantasy worlds and solving mysteries before the end.",
      fullNarrative:
        "While my desk is where I review and write about books, this corner is purely for getting lost in a good story. Reading has always been my favorite way to take a break, slow down, and immerse myself in another world for a few hours.",
      story: [
        "I love escaping into fantasy and fiction, especially stories with rich worldbuilding like Leigh Bardugo's books. At the same time, I have a big soft spot for murder mysteries and whodunnits. With Agatha Christie novels, half the fun is trying to piece together the clues and figure out what is happening before the big reveal at the end.",
        "All I really need is a cozy chair, a warm cup of chai, and a paperback that keeps me turning pages."
      ],
      objects: [
        { name: "Bookshelf", detail: "Packed with fantasy series, paperbacks, and classic murder mysteries." },
        { name: "Wingback Armchair", detail: "A deep, comfortable chair with a warm cushion for long reading sessions." },
        { name: "Chai Mug & Side Table", detail: "A hot cup of chai always within reach beside whatever book I'm reading." },
        { name: "Floor Lamp", detail: "A tall arched lamp that casts a gentle glow over the armchair." }
      ]
    },

    photography: {
      id: "photography",
      name: "The Photography Corner",
      category: "Visual Creativity",
      accentColor: "#4267C8", // Blue
      secondaryColor: "#FF795D",
      badge: "Everyday Moments",
      icon: "Camera",
      shortDescription: "Capturing everyday scenes, interesting angles, and small visual details.",
      fullNarrative:
        "Photography is something I enjoy simply for the love of noticing things around me. It encourages me to slow down and appreciate visual details that are easy to overlook in the middle of a busy day.",
      story: [
        "I like taking photos of everyday moments—interesting shadows on a wall, sunlight filtering through trees, a quiet street corner, or candid photos with friends and family. I don't worry about having fancy equipment; for me, it's mostly about spotting an angle or a composition that catches my eye and saving that small slice of time.",
        "It's a relaxed, creative outlet that keeps me observant and gives me a way to collect memories from ordinary days."
      ],
      objects: [
        { name: "Camera on Tripod", detail: "A camera ready to grab whenever an interesting scene catches my eye." },
        { name: "Cork Board with Snapshots", detail: "Polaroid-style prints and small photo memories pinned up on the wall." },
        { name: "Photo Albums", detail: "Collected prints from everyday outings, family gatherings, and trips." },
        { name: "Framed Prints", detail: "A couple of favorite photo prints hanging beside the window." }
      ]
    },

    workshop: {
      id: "workshop",
      name: "The Creative Workshop",
      category: "Jewellery & Craft",
      accentColor: "#F19BC0", // Warm pink
      secondaryColor: "#7654C8",
      badge: "Jewellery Making",
      icon: "Sparkles",
      shortDescription: "Working with metals, soldering, stones, and sea glass.",
      fullNarrative:
        "I love experimenting with jewellery-making. It started out of simple curiosity, and over time it has grown into one of my favorite creative hobbies. I really enjoy the hands-on feeling of working with raw materials and figuring out how to turn an idea into a finished piece.",
      story: [
        "I especially enjoy working with different metals. I've been experimenting with shaping metal strips and learning how to use soldering to join pieces together cleanly. I also love bringing in stones and pieces of sea glass, exploring different combinations of textures, colors, and shapes to see what works well together.",
        "Right now, it's all about trying new designs and enjoying the creative process. Looking ahead, I'm definitely interested in the possibility of developing my own jewellery brand in the future, but for now I'm just having fun learning and seeing what I can make."
      ],
      objects: [
        { name: "Jeweller's Workbench", detail: "My work table equipped with pliers, cutters, and shaping tools." },
        { name: "Stones & Sea Glass Trays", detail: "Compartment trays sorted with collected stones, beads, and sea glass." },
        { name: "Metal Strips & Wire", detail: "Spools of wire and thin metal strips ready for bending and soldering." },
        { name: "Necklace Display Bust", detail: "A linen bust to test out pendants and see how finished designs hang." }
      ]
    },

    personal: {
      id: "personal",
      name: "The Personal Corner",
      category: "Sports & Puzzles",
      accentColor: "#F5B72F", // Mango yellow / amber
      secondaryColor: "#36AFA0",
      badge: "Games & Milestones",
      icon: "Award",
      shortDescription: "Volleyball, board games, Sudoku puzzles, and school elocution.",
      fullNarrative:
        "Outside of academics and creative work, I like staying active and challenging myself with different games and activities.",
      story: [
        "When it comes to sports, I really enjoy playing volleyball. It's fast, energising, and a lot of fun when you're playing with a team and working together to keep the ball in play.",
        "On quieter days, I love sitting down with puzzles—especially Sudoku. I'm also quite serious about board games and genuinely enjoy playing them with friends and family. I like the challenge of figuring things out, planning a couple of moves ahead, and playing games that require some thought and strategy.",
        "Public speaking is another interest I've carried with me since school. I took part in elocution competitions and ended up winning first prize twice—once speaking in English and once in Hindi. Speaking in front of a room was nerve-racking at the start, but it helped me build confidence and is an experience I look back on with a lot of pride."
      ],
      objects: [
        { name: "Volleyball", detail: "From games with friends and practice on the court." },
        { name: "Trophy & Medals", detail: "Keepsakes from school elocution competitions in English and Hindi." },
        { name: "Puzzles & Board Games", detail: "Sudoku booklets and strategy board games for family game nights." },
        { name: "Memory Chest", detail: "A wooden box holding school badges, pins, and little keepsakes." }
      ]
    }
  }
};
