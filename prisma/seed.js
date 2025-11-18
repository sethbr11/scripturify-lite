// prisma/seed.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const scriptures = [
    // --- New Testament ---
    {
      ref: "John 3:16",
      text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
      keywords: JSON.stringify(["God", "loved", "world", "Son", "begotten"]),
    },
    {
      ref: "Matthew 5:14",
      text: "Ye are the light of the world. A city that is set on an hill cannot be hid.",
      keywords: JSON.stringify(["light", "world", "city", "hill"]),
    },
    {
      ref: "Romans 8:28",
      text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
      keywords: JSON.stringify(["work", "good", "love", "God"]),
    },
    {
      ref: "James 1:5",
      text: "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.",
      keywords: JSON.stringify(["wisdom", "ask", "God"]),
    },
    {
      ref: "Philippians 4:13",
      text: "I can do all things through Christ which strengtheneth me.",
      keywords: JSON.stringify(["Christ", "strengtheneth", "do", "all"]),
    },
    {
      ref: "1 Corinthians 13:4",
      text: "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up,",
      keywords: JSON.stringify(["charity", "kind", "suffereth"]),
    },
    {
      ref: "Hebrews 11:1",
      text: "Faith is the substance of things hoped for, the evidence of things not seen.",
      keywords: JSON.stringify(["faith", "hoped", "substance"]),
    },
    {
      ref: "John 14:27",
      text: "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.",
      keywords: JSON.stringify(["peace", "give", "leave"]),
    },
    {
      ref: "Matthew 11:28",
      text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.",
      keywords: JSON.stringify(["come", "labour", "laden", "rest"]),
    },
    {
      ref: "Ephesians 6:11",
      text: "Put on the whole armour of God, that ye may be able to stand against the wiles of the devil.",
      keywords: JSON.stringify(["armour", "God", "whole"]),
    },

    // --- Book of Mormon ---
    {
      ref: "1 Nephi 1:1",
      text: "I, Nephi, having been born of goodly parents, therefore I was taught somewhat in all the learning of my father; and having seen many afflictions in the course of my days, nevertheless, having been highly favored of the Lord in all my days; yea, having had a great knowledge of the goodness and the mysteries of God, therefore I make a record of my proceedings in my days.",
      keywords: JSON.stringify(["Nephi", "goodly", "parents", "born"]),
    },
    {
      ref: "2 Nephi 2:25",
      text: "Adam fell that men might be; and men are, that they might have joy",
      keywords: JSON.stringify(["Adam", "joy", "fell", "men"]),
    },
    {
      ref: "Mosiah 2:17",
      text: "And behold, I tell you these things that ye may learn wisdom; that ye may learn that when ye are in the service of your fellow beings ye are only in the service of your God.",
      keywords: JSON.stringify(["service", "fellow", "God", "beings"]),
    },
    {
      ref: "Alma 32:21",
      text: "And now as I said concerning faith—faith is not to have a perfect knowledge of things; therefore if ye have faith ye hope for things which are not seen, which are true.",
      keywords: JSON.stringify(["faith", "knowledge", "things"]),
    },
    {
      ref: "Alma 7:11",
      text: "And he shall go forth, suffering pains and afflictions and temptations of every kind; and this that the word might be fulfilled that saith he will take upon him the pains and the sicknesses of his people.",
      keywords: JSON.stringify([
        "suffering",
        "pains",
        "afflictions",
        "temptations",
      ]),
    },
    {
      ref: "Alma 36:3",
      text: "And now, O my son Helaman, behold, thou art in thy youth, and therefore, I beseech of thee that thou wilt hear my words and learn of me; for I do know that whosoever shall put their trust in God shall be supported in their trials, and their troubles, and their afflictions, and shall be lifted up at the last day.",
      keywords: JSON.stringify(["trust", "God", "supported"]),
    },
    {
      ref: "Helaman 5:12",
      text: "And now, my sons, remember, remember that it is upon the rock of our Redeemer, who is Christ, the Son of God, that ye must build your foundation; that when the devil shall send forth his mighty winds, yea, his shafts in the whirlwind, yea, when all his hail and his mighty storm shall beat upon you, it shall have no power over you to drag you down to the gulf of misery and endless wo, because of the rock upon which ye are built, which is a sure foundation, a foundation whereon if men build they cannot fall.",
      keywords: JSON.stringify(["rock", "Redeemer", "Christ", "God"]),
    },
    {
      ref: "3 Nephi 11:10",
      text: "Behold, I am Jesus Christ, whom the prophets testified shall come into the world.",
      keywords: JSON.stringify(["Jesus", "Christ", "prophets", "world"]),
    },
    {
      ref: "Ether 12:27",
      text: "For if there be no faith among the children of men God can do no miracle among them; wherefore, he showed not himself until after their faith.",
      keywords: JSON.stringify(["weakness", "come", "men", "show"]),
    },
    {
      ref: "Moroni 7:45",
      text: "And charity suffereth long, and is kind, and envieth not, and is not puffed up, seeketh not her own, is not easily provoked, thinketh no evil, and rejoiceth not in iniquity but rejoiceth in the truth, beareth all things, believeth all things, hopeth all things, endureth all things.",
      keywords: JSON.stringify(["charity", "kind", "envieth", "suffereth"]),
    },
  ];

  console.log("Seeding scriptures...");
  for (const s of scriptures) {
    await prisma.scripture.create({ data: s });
  }

  console.log("✔ Done seeding!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
