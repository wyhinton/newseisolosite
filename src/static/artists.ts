import Artist from "@interfaces/Artist";


const vivekPhoto = `${process.env.PUBLIC_URL}/Headshots/Diaspoura.jpg`
const anjaliPhoto = `${process.env.PUBLIC_URL}/Headshots/DIASPOURA_HS.png`
const pacificPhoto = `${process.env.PUBLIC_URL}/Headshots/PACIFIC_YEW_HS.png`
const countourPhoto = `${process.env.PUBLIC_URL}/Headshots/CONTOUR_HS.png`
const webbPhoto = `${process.env.PUBLIC_URL}/Headshots/Diaspoura.jpg`

const webbLink = "https://webbhinton.co"
const vivekLink = "https://webbhinton.co"
const diaspouraLink = "https://webbhinton.co"
const kontourLink = "https://webbhinton.co"
const pacificLink = "https://webbhinton.co"


const anjaliBio = `Anjali is the singer, electronic producer, and new media artist behind Diaspoura. Their latest EP release “Traumaporn” is a developed study of sounds encompassing both power and vulnerability using rigid beats, bells, and dense harmonies. Since then, Diaspoura has pledged through https://patreon.com/diaspoura to stay independent and committed to sustaining organic art and media. Stream their music anywhere and visit https://diaspoura.com for more.`
const kontourBio = `Khari Lucas, aka Contour, is an songwriter/composer/artist with an artistic voice that reaches into several disciplines, music being the primary vehicle his expression. His current musical output exists somewhere between jazz, soul, and psych rock, but he considers himself a student of all areas of music, and intends to cover as much sonic and thematic ground as possible over his artistic life. His work explores such themes as self-exploration, self determination, love and it's iterations, and isolation, and cultural context among others.`
const pacificBio = `Of course! I've been making music since somewhere back around 2002-2003 in middle school. I started out trying my hand at remaking songs I would hear on the radio until I finally got good at creating my own melodies, but I didn't start fully experimenting with sound until about 2010. I would start with a blank canvas and just try to go as far in with my ideas as possible. Over the years I would explore music with no real formal training and more of a spiritual understanding of the way music moves, gaining most of my technical skills and understanding through the creation of different music projects I've released over the years. More recently, maybe about 6 months to a year before the pandemic, I started getting into theory more than I ever have and it's since brought my sound to a place where I'm realising the spiritual and technical sides of music for me are meeting at a very happy medium. My sound these days is a mixture of all the different stops I've made along the way, those numerous time periods where I would spend time focusing on one aspect of my artistry to polish the sound as a whole, be it playing bass, keys, drums, or vocals, and most recently guitar in a much more serious manner. There's also countless forms of inspiration that have found their way into my life over the years, be it music from the past, today, friends and family, and just living life in general. So many of my favorite artists of various mediums have really shown me the way, and I'm honestly still being shown by them and my own potential as I better myself as an artist and continue to venture into unknown territory.. My apologies for the long winded response, but I hope this is helpful! Seriously stoked for your recital/installation and hoping everything turns out as spectacular as possible! haha. much love! Please let me know if there's any other way I can help!`
const vivekBio = "Vivek is a Violinist"
const webbBio = "Webb is a designer"


const artists: Artist[] = [
    {
        name: "Webb Hinton",
        link: webbLink,
        photo: webbPhoto,
        role: "Developer",
        bio: webbBio,

    },
    {
        name: "Vivek Menon",
        link: vivekLink,
        photo: vivekPhoto,
        role: "Violinist",
        bio: vivekBio,
    },
    {
        name: "Diaspoura",
        link: diaspouraLink,
        photo: anjaliPhoto,
        role: "Commisioned Producer",
        bio: anjaliBio,
    },
    {
        name: "Pacific Yew",
        link: pacificLink,
        photo: pacificPhoto,
        role: "Commisioned Producer",
        bio: pacificBio,
    },
    {
        name: "Contour",
        link: kontourLink,
        photo: countourPhoto,
        role: "Commisioned Producer",
        bio: kontourBio,
    },

]
export default artists