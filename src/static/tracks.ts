import { Track } from "@interfaces/Track";

const src = `${process.env.PUBLIC_URL}/overandunder (infinity).wav`;

const anjaliImage = `${process.env.PUBLIC_URL}/Headshots/Diaspoura.jpg`;
const pacificImage = `${process.env.PUBLIC_URL}/Headshots/Pacific.jpg`;
const contourImage = `${process.env.PUBLIC_URL}/Headshots/Contour.jpg`;

const anjaliTrack = `${process.env.PUBLIC_URL}/Tracks/1.wav`;
const pacificTrack = `${process.env.PUBLIC_URL}/Tracks/overandunder (infinity).wav`;
const contourTrack = `${process.env.PUBLIC_URL}/Tracks/Kontour_Remix.wav`;

const pacificAbout = `It's been a while since I've had a chance to experiment with sampling, and to be honest my sound as of late has been geared to more of an analog/live nature, so it was very interesting getting back into the more electronic sound. I'm finding my new setup is a lot more equipped for the task than I was aware of. I feel like I landed on a nice balance of electronic and live/acoustic with this one. Going through the files I found myself wanting to keep their integrity as much as possible, and as a result found myself playing with very subtle pitch corrections, and spending time finding phrases and bits that felt organic in reference to a melody I wrote on rhodes piano. Pulling samples from two completely different pieces was a really interesting experiment. I found Ysaye's "Ballade" and Bartok's "Presto" to have the most favorable parts for the comp. Their usage of such abstract melody and the players spotless technique made them resonate in a way that gave me all the inspiration I needed to write the progression. Towards the end I tried my hand at a solo using only phrasing from the violin audio. Although the overall placement of the violin alongside the other instruments in the piece throughout tends to be a more supportive role, I wanted to give it a way to stand out. It never fails to blow my mind when creating circumstances around the musical process produces such beautiful and bizarre results. I feel I may have never attempted such a thing, had this opportunity not been present. This will most certainly have lasting effects on my creative process.`;

const vVideo = `${process.env.PUBLIC_URL}/Headshots/ROTOSCOPE_TEST_1.mp4`;
const about =
  "*A young Jeronimo gets a fly caught in his eye and spends the week at home. Each morning he wakes, left eye patched and crusted shut with pus, to the sound of parents knocking at the door with a fresh set of tweezers, towels, and medic grade eye solution. He lies in bed struggling to open his left eye as he dreads the coming pry of the lid for removal of yet another fly limb. These songs track Jeronimo's journey back to dual-eyed sight*";

const tracks: Track[] = [
  {
    artist: "Diaspoura",
    title: "Diaspoura Track",
    link: "https://diaspoura.bandcamp.com/",
    src: anjaliTrack,
    about: about,
    visualType: "image",
    visual: anjaliImage,
    playing: false,
  },
  {
    artist: "Pacific Yew",
    title: "overandunder (infinity)",
    link: "https://nomad1.bandcamp.com/",
    src: pacificTrack,
    about: pacificAbout,
    visualType: "image",
    visual: pacificImage,
    playing: false,
  },
  {
    artist: "Contour",
    title: "Revolving Melody",
    link: "https://diaspoura.bandcamp.com/",
    src: contourTrack,
    about:
      "The way i approached the track was finding a melodic section of one of the pieces to build around to create a full piece that plays with repetition as a vehicle of composition while also facilitating space for improvisation. I chose the melodia movement of the Bartok piece because the balance of dissonance/harmony in that particular one stood out to me. I used delay and looping to kind of simulate the idea of an ensemble playing the section i chose and play with the intersection of production/affectation and composing in the traditional sense and then worked from there.",
    visualType: "image",
    visual: contourImage,
    playing: false,
  },
  {
    artist: "Vivek Menon",
    title: "Bartok",
    src,
    visualType: "video",
    visual: vVideo,
    playing: false,
  },
  {
    artist: "Vivek Menon",
    title: "Bach",
    src,
    visualType: "video",
    visual: vVideo,
    playing: false,
  },
  {
    artist: "Vivek Menon",
    title: "Ysaye",
    src,
    visualType: "video",
    visual: vVideo,
    playing: false,
  },
];

export default tracks;