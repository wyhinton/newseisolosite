// I'm creating an audio app that has playlist like functionality. Now

// export function usePlaylist(): UsePlaylistProps {
//     const currentTrackState = useHomeState((state) => state.currentTrack);
//     const setCurrentTrack = useHomeActions((actions) => actions.setCurrentTrack);
//     const allAudioElems = useRef<HTMLAudioElement[]>();
//     const setIsPlayingAction = useHomeActions((actions) => actions.setIsPlaying);
//     const isPlayingState = useHomeState((state) => state.isPlaying);
//     const currentAudioRef = useRef<HTMLAudioElement>(null);

//     // const getCurrentAudio = () =>{

//     // }
//     // const pauseTrack = useHomeState((state) => state.pause)
//     // const playNextTrack = () =>{
//     //   const nextInd = tracks.findIndex(track)
//     // }
//     const handleEnd = (e: Event) => {
//       console.log(e.target);
//       const targ = e.target as HTMLAudioElement;
//       const title = targ.id.split("_")[1];
//       const endedIndex = tracks.indexOf(
//         tracks.filter((t) => t.title === title)[0]
//       );
//       playTrack(tracks[endedIndex + 1]);
//       console.log(endedIndex);
//       console.log(title);
//       // const title = e.target.
//     };

//     useEffect(() => {
//       //TODO: ADD RECITAL TRACKS
//       const elems = tracks
//         .map((t) => "audio_" + t.title)
//         .map((id) => document.getElementById(id) as HTMLAudioElement)
//         .filter((e) => e !== null);

//       console.log(elems);
//       allAudioElems.current = elems;
//       allAudioElems.current.forEach((audio) => {
//         audio.addEventListener("ended", handleEnd);
//       });
//       currentAudioRef.current = getTrackAudio(currentTrackState);
//       return () => {
//         allAudioElems.current.forEach((audio) => {
//           audio.removeEventListener("ended", handleEnd);
//         });
//       };
//     }, []);

//     const playTrack = (track: Track) => {
//       if (allAudioElems.current) {
//         allAudioElems.current.forEach((element) => {
//           if (element.id === "audio_" + track.title) {
//             element.play();
//           } else {
//             element.pause();
//           }
//         });
//       }
//       setCurrentTrack(track.title);
//       setIsPlayingAction(true);
//     };

//     const pauseTrack = (track: Track) => {
//       if (allAudioElems.current) {
//         allAudioElems.current.forEach((element) => {
//           if (element.id === "audio_" + track.title) {
//             element.pause();
//           }
//         });
//       }
//       // setCurrentTrack(track.title);
//       setIsPlayingAction(false);
//     };

//     const [currentTrack, setCurrentTrackLocal] = useState(currentTrackState);
//     const [currentAudio, setCurrentAudio] = useState(
//       getTrackAudio(currentTrackState)
//     );
//     const [currentDuration, setCurrentDuration] = useState(0);
//     const [isPlaying, setIsPlaying] = useState(false);

//     const onRefChange = useCallback((node) => {
//       if (node === null) {
//         // DOM node referenced by ref has been unmounted
//       } else {
//         // DOM node referenced by ref has changed and exists
//       }
//     }, []); // adjust deps
//     // const curentAudioRef = () =>{getTrackAudio()}

//     useEffect(() => {
//       // console.log(currentTrackState);
//       setCurrentTrackLocal(currentTrackState);
//       // setCurrentAudio(getTrackAudio(currentTrackState));
//       setCurrentAudio(getTrackAudio(currentTrack));
//       // setCurrentDuration(currentAudio.duration);
//       currentAudioRef.current = getTrackAudio(currentTrack);
//       if (currentAudioRef.current) {
//         setCurrentDuration(currentAudioRef.current.duration);
//       }
//     }, [currentTrackState]);

//     useEffect(() => {
//       // console.log(currentTrackState);
//       setIsPlaying(isPlayingState);
//     }, [isPlayingState]);

//     return {
//       currentTrack,
//       setCurrentTrack,
//       playTrack,
//       pauseTrack,
//       isPlaying,
//       currentAudioRef,
//       currentAudio,
//       currentDuration,
//     };
//   }
