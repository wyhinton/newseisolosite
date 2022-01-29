import { Track } from "@interfaces/Track";

const src = `${process.env.PUBLIC_URL}/overandunder (infinity).wav`;

const anjaliImage = `${process.env.PUBLIC_URL}/Headshots/DIASPOURA_HS.png`;
const pacificImage = `${process.env.PUBLIC_URL}/Headshots/PACIFIC_YEW_HS.png`;
const contourImage = `${process.env.PUBLIC_URL}/Headshots/CONTOUR_HS.png`;

const anjaliTrack = `${process.env.PUBLIC_URL}/Tracks/Believe.mp3`;
const pacificTrack = `${process.env.PUBLIC_URL}/Tracks/overandunder (infinity).mp3`;
const contourTrack = `${process.env.PUBLIC_URL}/Tracks/Kontour_Remix_16.mp3`;

const bachTrack = `${process.env.PUBLIC_URL}/Tracks/Bach Mov 2.wav`;
const bartokTrack = `${process.env.PUBLIC_URL}/Tracks/Bartok Mov 1.wav`;
const ysaeTrack = `${process.env.PUBLIC_URL}/Tracks/Ysaye_AUDIO.mp3`;

// const anjaliBio = `Anjali is the singer, electronic producer, and new media artist behind Diaspoura. Their latest EP release “Traumaporn” is a developed study of sounds encompassing both power and vulnerability using rigid beats, bells, and dense harmonies. Since then, Diaspoura has pledged through https://patreon.com/diaspoura to stay independent and committed to sustaining organic art and media. Stream their music anywhere and visit https://diaspoura.com for more.`
const anjaliBio = `Anjali is the singer, electronic producer, and new media artist behind Diaspoura. Their latest EP release “Traumaporn” is a developed study of sounds encompassing both power and vulnerability using rigid beats, bells, and dense harmonies. Since then, Diaspoura has pledged through https://patreon.com/diaspoura to stay independent and committed to sustaining organic art and media. Stream their music anywhere and visit https://diaspoura.com for more.`
const countourBio = `Khari Lucas, aka Contour, is an songwriter/composer/artist with an artistic voice that reaches into several disciplines, music being the primary vehicle his expression. His current musical output exists somewhere between jazz, soul, and psych rock, but he considers himself a student of all areas of music, and intends to cover as much sonic and thematic ground as possible over his artistic life. His work explores such themes as self-exploration, self determination, love and it's iterations, and isolation, and cultural context among others.`
const pacificBio = `Of course! I've been making music since somewhere back around 2002-2003 in middle school. I started out trying my hand at remaking songs I would hear on the radio until I finally got good at creating my own melodies, but I didn't start fully experimenting with sound until about 2010. I would start with a blank canvas and just try to go as far in with my ideas as possible. Over the years I would explore music with no real formal training and more of a spiritual understanding of the way music moves, gaining most of my technical skills and understanding through the creation of different music projects I've released over the years. More recently, maybe about 6 months to a year before the pandemic, I started getting into theory more than I ever have and it's since brought my sound to a place where I'm realising the spiritual and technical sides of music for me are meeting at a very happy medium. My sound these days is a mixture of all the different stops I've made along the way, those numerous time periods where I would spend time focusing on one aspect of my artistry to polish the sound as a whole, be it playing bass, keys, drums, or vocals, and most recently guitar in a much more serious manner. There's also countless forms of inspiration that have found their way into my life over the years, be it music from the past, today, friends and family, and just living life in general. So many of my favorite artists of various mediums have really shown me the way, and I'm honestly still being shown by them and my own potential as I better myself as an artist and continue to venture into unknown territory.. My apologies for the long winded response, but I hope this is helpful! Seriously stoked for your recital/installation and hoping everything turns out as spectacular as possible! haha. much love! Please let me know if there's any other way I can help!`

const bachAbout = `J.S. Bach's D Minor Partita is one of 6 pieces (3 sonatas and 3 partitas) written for solo violin. Bach's partitas are based around baroque dance music, and typically alternate between slow tempo and fast tempo dance forms. In addition to being the most somber and dark in nature of all the sonatas and partitas, the D Minor Partita is unique due to its final movement: the Ciaconna, a sprawling theme and variations that doesn't conform to the traditional dance structure of the partitas. According to legend, Bach, having already written the first four dance movements of the D minor Partita, returned home from his travels to find that his beloved wife had unexpectedly died in his absence. Filled with grief, he composed the Ciaconna, which has since become a staple in the classical repertoire and beloved for its expression of the human condition. Bach's solo violin music has always been very spiritual and personal for me, and in this performance I decided to add my own improvised embellishments and ornaments to the music, much like Bach himself may have done hundreds of years ago.`
const bartokAbout = `
Béla Bartók's Sonata for Solo Violin is directly inspired by the tradition of solo violin music started by Bach. In fact, the title of its first movement, "Tempo di Ciaconna", is a direct reference to Bach's Ciaconna, and its second Fuga movement sounds like a maddening and spicy rendition of the many fugal fantasies that Bach composed during his life. In addition to his adoration for Bach, Bartók was also very proud of his native Hungarian and Eastern European culture, and his music often quotes Hungarian folk melodies and dance rhythms. This Sonata, written in 1944 for British virtuoso violinist Yehudi Menhuin, is one of the most challenging pieces I've ever learned, filled with nasty chords and asymmetric grooves.`
const ysaeAbout = `Sonata No. 3 "Ballade" was composed by Eugène Ysaÿe, a Belgian violin virtuoso who is considered to be one of the greatest violinists of all time. It is one of six sonatas that Ysaÿe wrote for solo violin, yet another reference Bach's six sonatas and partitas. Ysaÿe wrote this single-movement sonata for his close friend and fellow violinist George Enescu, and it features Romanian folk music melodies and rhythms that shout out Enescu's Romanian heritage. Like the rest of his sonatas, Ysaÿe's Ballade is above all a love letter to the violin, full of passion and technical fireworks that push the instrument to its limits.`


const bachVideo = `${process.env.PUBLIC_URL}/Videos/Recital/Vivek Menon - JS Bach Partita n2_rev01.mp4`;
const ysayeVideo = `${process.env.PUBLIC_URL}/Videos/Recital/Vivek Menon - Sonate n3 - Eugene Ysaye_Rev02.mp4`;
const bartokVideo = `${process.env.PUBLIC_URL}/Videos/Recital/Vivek Menon - Bartok Sonata for Violin Solo_rev01.mp4`;


"COUNTOUR FIRST"
"PACIFIC"
"DIASPOURA"

const bachLength = 1658
const ysayeLength = 418;
const bartokLength = 1609;


const anjaliAbout = `I worked with Vivek’s performance of Movement 1 of Allemande by Bach to write Believe. When I listened through, one small section caught my ear as an interesting loop. I built layers around this loop and tried my best intuitively to match synth sounds with the clear and smooth violin. The pace of the violin sample encouraged me to explore writing at 140bpm. When I told Vivek I was working with Allemande, he anticipated a perhaps brooding and mysterious energy to be built. I have a much different perception of the energy the harmonies create. I thought this could be from my exposure to old South Asian folk and pop songs, many of which are based in a minor pentatonic scale and sing of love and desire.
It feels exciting to me that the violin can sound so in the mix with a bunch of synthesizers. And that I could integrate Bach’s music into my sound. Thanks for the challenge sei.solo.`;

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pulvinar lorem ipsum, at suscipit nibh finibus sed. Donec dignissim erat sed nunc consequat molestie. In arcu urna, eleifend vitae nisi vel, dignissim efficitur odio. Suspendisse hendrerit odio feugiat nulla suscipit posuere. Nulla scelerisque, urna in euismod dictum, mi elit fermentum nisi, et porttitor ipsum massa auctor tellus. Sed a sem vitae quam volutpat ultricies ac ac odio. Maecenas sit amet felis varius massa tempor porta. Quisque eu tristique massa.";
// const pacificAbout = `It's been a while since I've had a chance to experiment with sampling, and to be honest my sound as of late has been geared to more of an analog/live nature, so it was very interesting getting back into the more electronic sound. I'm finding my new setup is a lot more equipped for the task than I was aware of. I feel like I landed on a nice balance of electronic and live/acoustic with this one. Going through the files I found myself wanting to keep their integrity as much as possible, and as a result found myself playing with very subtle pitch corrections, and spending time finding phrases and bits that felt organic in reference to a melody I wrote on rhodes piano. Pulling samples from two completely different pieces was a really interesting experiment. I found Ysaé's "Ballade" and Bartók's "Presto" to have the most favorable parts for the comp. Their usage of such abstract melody and the players spotless technique made them resonate in a way that gave me all the inspiration I needed to write the progression. Towards the end I tried my hand at a solo using only phrasing from the violin audio. Although the overall placement of the violin alongside the other instruments in the piece throughout tends to be a more supportive role, I wanted to give it a way to stand out. It never fails to blow my mind when creating circumstances around the musical process produces such beautiful and bizarre results. I feel I may have never attempted such a thing, had this opportunity not been present. This will most certainly have lasting effects on my creative process.`;
const pacificAbout = `Going through the files I found myself wanting to keep their integrity as much as possible, and as a result found myself playing with very subtle pitch corrections, and spending time finding phrases and bits that felt organic in reference to a melody I wrote on rhodes piano. Pulling samples from two completely different pieces was a really interesting experiment. I found Ysaé's "Ballade" and Bartók's "Presto" to have the most favorable parts for the comp.`;
// const pacificAbout = `Going through the files I found myself wanting to keep their integrity as much as possible, and as a result found myself playing with very subtle pitch corrections, and spending time finding phrases and bits that felt organic in reference to a melody I wrote on rhodes piano. Pulling samples from two completely different pieces was a really interesting experiment. I found Ysaé's "Ballade" and Bartók's "Presto" to have the most favorable parts for the comp. Their usage of such abstract melody and the players spotless technique made them resonate in a way that gave me all the inspiration I needed to write the progression. Towards the end I tried my hand at a solo using only phrasing from the violin audio. Although the overall placement of the violin alongside the other instruments in the piece throughout tends to be a more supportive role, I wanted to give it a way to stand out. It never fails to blow my mind when creating circumstances around the musical process produces such beautiful and bizarre results. I feel I may have never attempted such a thing, had this opportunity not been present. This will most certainly have lasting effects on my creative process.`;

const vVideo = `${process.env.PUBLIC_URL}/Headshots/ROTOSCOPE_TEST_1.mp4`;
const contourAbout =
  "*A young Jeronimo gets a fly caught in his eye and spends the week at home. Each morning he wakes, left eye patched and crusted shut with pus, to the sound of parents knocking at the door with a fresh set of tweezers, towels, and medic grade eye solution. He lies in bed struggling to open his left eye as he dreads the coming pry of the lid for removal of yet another fly limb. These songs track Jeronimo's journey back to dual-eyed sight*";


//random sampel when click 
//effects on violin when playing
//

const tracks: Track[] = [
  {
    id: `Comission #001`,
    artist: "Contour",
    title: "Revolving Melody",
    link: "https://diaspoura.bandcamp.com/",
    src: contourTrack,
    about: contourAbout,
    visualType: "image",
    visual: contourImage,
    playing: false,
    connections: [
      {
        target: "Ysaé",
        description: "Connects in this way",
      },
    ],
    category: "remix",
    bio: countourBio,
    duration: 211,
    bpm: 135,
    origin: 'Charleston, SC'
  },
  {
    id: `Comission #002`,
    artist: "Pacific Yew",
    title: "overandunder (infinity)",
    link: "https://nomad1.bandcamp.com/",
    src: pacificTrack,
    about: pacificAbout,
    visualType: "image",
    visual: pacificImage,
    playing: false,
    connections: [
      {
        target: "Ysaé",
        description: "Connects in this way",
      },
    ],
    category: "remix",
    bio: pacificBio,
    duration: 198,
    bpm: 80,
    origin: "New Orleans, LA"
  },
  {
    id: `Comission #003`,
    artist: "Diaspoura",
    title: "Diaspoura Track",
    link: "https://diaspoura.bandcamp.com/",
    src: anjaliTrack,
    about: anjaliAbout,
    visualType: "image",
    visual: anjaliImage,
    playing: false,
    connections: [
      {
        target: "Ysaé",
        description: "Connects in this way",
      },
    ],
    category: "remix",
    bio: anjaliBio,
    duration: 103,
    bpm: 140,
    origin: "Charleston, SC",
  },
  {
    id: `Recital Part #001`,
    artist: "Vivek Menon",
    title: "Bach",
    src: bachVideo,
    // src: bachTrack,
    // about: "about Bach",
    about: lorem,
    visualType: "video",
    visual: bachVideo,
    playing: false,
    connections: [
      {
        target: "Ysaé",
        description: "Connects in this way",
      },
    ],
    category: "recital",
    duration: bachLength,
    origin: "Eisenach, Thuringia"
  },
  {
    id: `Recital Part #002`,
    artist: "Vivek Menon",
    title: "Bartók",
    // src: bartokTrack,
    src: bartokVideo,
    about: bartokAbout,
    visualType: "video",
    visual: bartokVideo,
    playing: false,
    connections: [
      {
        target: "Ysaé",
        description: "Connects in this way",
      },
    ],
    category: "recital",
    duration: bartokLength,
    origin: "Nagyszentmiklós, King of Hungary",
  },
  {
    id: `Recital Part #003`,
    artist: "Vivek Menon",
    title: "Ysaé",
    src: ysayeVideo,
    about: lorem,
    visualType: "video",
    visual: ysayeVideo,
    playing: false,
    connections: [
      {
        target: "Bach",
        description: "Connects in this way",
      },
    ],
    category: "recital",
    duration: ysayeLength,
    origin: "Liège, Blegium",
    // movements: {}
  },
];

export default tracks;
