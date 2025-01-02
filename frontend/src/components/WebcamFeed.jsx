// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { gsap } from "gsap";

// const WebcamFeed = () => {
//   const [logs, setLogs] = useState([]);
//   const [isDetectionStarted, setIsDetectionStarted] = useState(false);
//   const [feedUrl, setFeedUrl] = useState(""); // Initially empty feed URL
//   const [showText, setShowText] = useState(true); // State to control showing of "TraceVision" text

//   const webcamFeedRef = useRef(null);
//   const traceVisionRef = useRef(null);

//   // Fetch logs every 3 seconds once detection is started
//   useEffect(() => {
//     if (isDetectionStarted) {
//       const interval = setInterval(() => {
//         axios
//           .get("http://localhost:5000/get_logs")
//           .then((response) => {
//             setLogs(response.data.logs || []); // Ensure logs is an array
//           })
//           .catch((error) => console.error("Error fetching logs:", error));
//       }, 3000);

//       return () => clearInterval(interval);
//     }
//   }, [isDetectionStarted]);

//   // Start detection and set webcam feed URL
//   const handleStartDetection = () => {
//     setIsDetectionStarted(true);
//     setShowText(false); // Hide the "TraceVision" text
//     axios
//       .post("http://localhost:5000/start_detection")
//       .then(() => {
//         setFeedUrl("http://localhost:5000/video_feed");
//         animateWebcamFeed(); // Animate webcam feed in
//       })
//       .catch((error) => console.error("Error starting detection:", error));
//   };

//   // Stop detection and clear webcam feed URL
//   const handleStopDetection = () => {
//     setIsDetectionStarted(false);
//     setFeedUrl(""); // Clear feed URL when stopping detection
//     setShowText(true); // Show "TraceVision" text again
//     axios
//       .post("http://localhost:5000/stop_detection")
//       .then(() => console.log("Detection stopped"))
//       .catch((error) => console.error("Error stopping detection:", error));
//   };

//   // GSAP animation for webcam feed appearance
//   const animateWebcamFeed = () => {
//     gsap.fromTo(
//       webcamFeedRef.current,
//       { opacity: 0, scale: 0.8 },
//       { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
//     );
//   };

//   // GSAP animation for "TraceVision" text disappearance
//   const animateTextDisappearance = () => {
//     gsap.to(traceVisionRef.current, {
//       opacity: 0,
//       scale: 0.5,
//       duration: 1,
//       ease: "power2.out",
//     });
//   };

//   // GSAP animation for "TraceVision" text reappearance
//   const animateTextAppearance = () => {
//     gsap.to(traceVisionRef.current, {
//       opacity: 1,
//       scale: 1,
//       duration: 1,
//       ease: "power2.out",
//     });
//   };

//   return (
//     <div className="p-8">
//       <div className="flex flex-col items-center">
//         {/* Webcam Feed Section - Centered at the top */}
//         <div className="w-[680px] h-[380px] bg-black rounded-lg overflow-hidden shadow-md mb-8 relative">
//           {showText ? (
//             // "TraceVision" text will show here
//             <div
//               ref={traceVisionRef}
//               className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-6xl font-semibold"
//             >
//               TraceVision
//             </div>
//           ) : (
//             // Webcam Feed Section - Shown after start detection
//             <img
//               ref={webcamFeedRef}
//               src={feedUrl}
//               alt="Webcam Feed"
//               className="w-full h-full object-cover"
//             />
//           )}
//         </div>

//         <div className="flex justify-center mb-8">
//           {/* Buttons for starting/stopping detection */}
//           {!isDetectionStarted ? (
//             <button
//               onClick={() => {
//                 handleStartDetection();
//                 animateTextDisappearance(); // Trigger text disappearance when start is clicked
//               }}
//               className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg"
//             >
//               Start Detection
//             </button>
//           ) : (
//             <button
//               onClick={() => {
//                 handleStopDetection();
//                 animateTextAppearance(); // Trigger text reappearance when stop is clicked
//               }}
//               className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out shadow-lg"
//             >
//               Stop Detection
//             </button>
//           )}
//         </div>

//         {/* Logs Section - Below Webcam Feed with Horizontal Scroll */}
//         <h2 className="text-2xl flex w-full items-left font-semibold text-gray-700 mb-4">LOGS</h2>
//         <div className="w-full h-[45vh] overflow-x-auto">
//           {/* Use flexbox to display logs horizontally */}
//           <div className="flex space-x-6">
//             {logs.map((log, index) => (
//               <div
//                 key={index}
//                 className="bg-gray-800 rounded-md p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex-shrink-0 w-[300px]" // Prevent shrinking and set fixed width
//               >
//                 <div className="flex flex-col items-center">
//                   <img
//                     src={`http://localhost:5000/uploads/${log.person_id}.jpg`} // Corrected image path
//                     alt="Detected person"
//                     onError={(e) => {
//                       e.target.src = "/default-profile.jpg"; // Fallback image
//                     }}
//                     className="w-40 h-40 rounded-md object-cover mb-4"
//                   />

//                   <div className="text-center space-y-2">
//                     <p className="text-lg font-semibold text-white">
//                       <span className="text-xl text-white"></span> {log.timestamp}
//                     </p>
//                     <p className="text-sm text-gray-500">ID: {log.person_id}</p>
//                     <p className="text-sm text-gray-400">{log.event}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WebcamFeed;





// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { gsap } from "gsap";
// import { IoIosArrowDropright } from "react-icons/io";
// import { GoArrowDown } from "react-icons/go";

// const WebcamFeed = () => {
//   const [logs, setLogs] = useState([]);
//   const [isDetectionStarted, setIsDetectionStarted] = useState(false);
//   const [feedUrl, setFeedUrl] = useState(""); // Initially empty feed URL
//   const [showText, setShowText] = useState(true); // State to control showing of "TraceVision" text

//   const webcamFeedRef = useRef(null);
//   const traceVisionRef = useRef(null);

//   // Fetch logs every 3 seconds once detection is started
//   useEffect(() => {
//     if (isDetectionStarted) {
//       const interval = setInterval(() => {
//         axios
//           .get("http://localhost:4000/api/logs")
//           .then((response) => {
//             setLogs(response.data.logs || []); // Ensure logs is an array
//           })
//           .catch((error) => console.error("Error fetching logs:", error));
//       }, 3000);

//       return () => clearInterval(interval);
//     }
//   }, [isDetectionStarted]);

//   // Start detection and set webcam feed URL
//   const handleStartDetection = () => {
//     setIsDetectionStarted(true);
//     setShowText(false); // Hide the "TraceVision" text
//     axios
//       .post("http://localhost:5000/start_detection")
//       .then(() => {
//         setFeedUrl("http://localhost:5000/video_feed");
//         animateWebcamFeed(); // Animate webcam feed in
//       })
//       .catch((error) => console.error("Error starting detection:", error));
//   };

//   // Stop detection and clear webcam feed URL
//   const handleStopDetection = () => {
//     setIsDetectionStarted(false);
//     setFeedUrl(""); // Clear feed URL when stopping detection
//     setShowText(true); // Show "TraceVision" text again
//     axios
//       .post("http://localhost:5000/stop_detection")
//       .then(() => console.log("Detection stopped"))
//       .catch((error) => console.error("Error stopping detection:", error));
//   };

//   // GSAP animation for webcam feed appearance
//   const animateWebcamFeed = () => {
//     gsap.fromTo(
//       webcamFeedRef.current,
//       { opacity: 0, scale: 0.8 },
//       { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
//     );
//   };

//   // GSAP animation for "TraceVision" text disappearance
//   const animateTextDisappearance = () => {
//     gsap.to(traceVisionRef.current, {
//       opacity: 0,
//       scale: 0.5,
//       duration: 1,
//       ease: "power2.out",
//     });
//   };

//   // GSAP animation for "TraceVision" text reappearance
//   const animateTextAppearance = () => {
//     gsap.to(traceVisionRef.current, {
//       opacity: 1,
//       scale: 1,
//       duration: 1,
//       ease: "power2.out",
//     });
//   };

//   return (
//     <div className="px-8 py-2">
//       <div className="flex flex-col items-center">
//         {/* Webcam Feed Section - Centered at the top */}
//         <div className="w-[680px] h-[380px] bg-black rounded-lg overflow-hidden shadow-md mb-2 relative">
//           {showText ? (
//             // "TraceVision" text will show here
//             <div
//               ref={traceVisionRef}
//               className="h-40 flex flex-col justify-around tinos-font absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 text-6xl font-semibold"
//             >
//               TraceVision
//               <div className="flex justify-center items-center arrow">
//               <GoArrowDown size={'0.5em'}/>
//               </div>
//             </div>
//           ) : (
//             // Webcam Feed Section - Shown after start detection
//             <img
//               ref={webcamFeedRef}
//               src={feedUrl}
//               alt="Webcam Feed"
//               className="w-full h-full object-cover"
//             />
//           )}
//         </div>

//         <div className="flex justify-center">
//           {/* Buttons for starting/stopping detection */}
//           {!isDetectionStarted ? (
//             <button
//               onClick={() => {
//                 handleStartDetection();
//                 animateTextDisappearance(); // Trigger text disappearance when start is clicked
//               }}
//               className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out shadow-lg"
//             >
//               Start Detection
//             </button>
//           ) : (
//             <button
//               onClick={() => {
//                 handleStopDetection();
//                 animateTextAppearance(); // Trigger text reappearance when stop is clicked
//               }}
//               className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out shadow-lg"
//             >
//               Stop Detection
//             </button>
//           )}
//         </div>

//         {/* Logs Section - Below Webcam Feed with Horizontal Scroll */}
//         {/* <h2 className="text-2xl flex w-full items-left font-semibold text-gray-500 mb-4">LOGS</h2> */}
//         <div className="w-full h-full overflow-x-auto">
//           {/* Use flexbox to display logs horizontally */}
//           <div className="flex space-x-6">
//             {logs.map((log, index) => (
//               <div
//                 key={index}
//                 className="bg-gray-800 rounded-md px-6 pb-4 pt-3 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex-shrink-0 w-[300px]" // Prevent shrinking and set fixed width
//               >
//                 <div className="flex flex-col items-center h-full justify-between">
//                   <div className="w-full flex flex-col gap-2">
//                   <p className="text-lg font-semibold text-gray-400 flex w-full justify-center items-center">
//                       <span className="text-xl "></span> {log.timestamp}
//                     </p>
//                   <img
//                     src={`http://localhost:4000/uploads/${log.person_id}.jpg`} // Corrected image path
//                     alt="Detected person"
//                     onError={(e) => {
//                       e.target.src = "/default-profile.jpg"; // Fallback image
//                     }}
//                     className="w-full h-60 rounded-md object-fill"
//                   />
//                   <p className="text-sm text-gray-500 w-full flex justify-center">ID: {log.person_id}</p>
//                   <p className=" text-gray-300"><span className="text-gray-400">Top:</span> {log.top_color} <br></br>  <span className="text-gray-400">Bottom:</span> {log.bottom_color}</p>
                
//                   </div>

//                   <div className="flex flex-col items-start w-full ">
                    
                    
//                     <div className="flex w-full justify-between items-center mt-8">
//                     <p className="text-green-500 ">{log.event}</p>
//                     <IoIosArrowDropright size={'1.4em'} className="text-gray-400" />
//                     </div>
                    
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WebcamFeed;



import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { IoIosArrowDropright } from "react-icons/io";
import { GoArrowDown } from "react-icons/go";
import { ThreeDots } from 'react-loader-spinner';

const WebcamFeed = () => {
  const [logs, setLogs] = useState([]);
  const [isDetectionStarted, setIsDetectionStarted] = useState(false);
  const [feedUrl, setFeedUrl] = useState(""); // Initially empty feed URL
  const [showText, setShowText] = useState(true); // State to control showing of "TraceVision" text
  const [isLoading, setIsLoading] = useState(false); // State for loader visibility

  const webcamFeedRef = useRef(null);
  const traceVisionRef = useRef(null);

  // Fetch logs every 3 seconds once detection is started
  useEffect(() => {
    if (isDetectionStarted) {
      const interval = setInterval(() => {
        axios
          .get("http://localhost:4000/api/logs")
          .then((response) => {
            setLogs(response.data.logs || []); // Ensure logs is an array
          })
          .catch((error) => console.error("Error fetching logs:", error));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isDetectionStarted]);

  // Start detection and set webcam feed URL
  const handleStartDetection = () => {
    setIsDetectionStarted(true);
    setShowText(false); // Hide the "TraceVision" text
    setIsLoading(true); // Set loader visible while waiting for feed

    axios
      .post("http://localhost:5000/start_detection")
      .then(() => {
        setFeedUrl("http://localhost:5000/video_feed");
        animateWebcamFeed(); // Animate webcam feed in
        setIsLoading(false); // Hide loader after feed is ready
      })
      .catch((error) => {
        console.error("Error starting detection:", error);
        setIsLoading(false); // Hide loader even if there is an error
      });
  };

  // Stop detection and clear webcam feed URL
  const handleStopDetection = () => {
    setIsDetectionStarted(false);
    setFeedUrl(""); // Clear feed URL when stopping detection
    setShowText(true); // Show "TraceVision" text again
    axios
      .post("http://localhost:5000/stop_detection")
      .then(() => console.log("Detection stopped"))
      .catch((error) => console.error("Error stopping detection:", error));
  };

  // GSAP animation for webcam feed appearance
  const animateWebcamFeed = () => {
    gsap.fromTo(
      webcamFeedRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
    );
  };

  // GSAP animation for "TraceVision" text disappearance
  const animateTextDisappearance = () => {
    gsap.to(traceVisionRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 1,
      ease: "power2.out",
    });
  };

  // GSAP animation for "TraceVision" text reappearance
  const animateTextAppearance = () => {
    gsap.to(traceVisionRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power2.out",
    });
  };

  return (
    <div className="px-8 py-2">
      <div className="flex flex-col items-center">
        {/* Webcam Feed Section - Centered at the top */}
        <div className="w-[680px] h-[380px] bg-black rounded-lg overflow-hidden shadow-md mb-2 relative">
          {isLoading ? (
            // Show loader while loading
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <ThreeDots color="#fff" height={50} width={50} />
            </div>
          ) : showText ? (
            // "TraceVision" text will show here
            <div
              ref={traceVisionRef}
              className="h-40 flex flex-col justify-around tinos-font absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/30 text-6xl font-semibold"
            >
              TraceVision
              <div className="flex justify-center items-center arrow">
                <GoArrowDown size={"0.5em"} />
              </div>
            </div>
          ) : (
            // Webcam Feed Section - Shown after start detection
            <img
              ref={webcamFeedRef}
              src={feedUrl}
              alt="Webcam Feed"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="flex justify-center">
          {/* Buttons for starting/stopping detection */}
          {!isDetectionStarted ? (
            <button
              onClick={() => {
                handleStartDetection();
                animateTextDisappearance(); // Trigger text disappearance when start is clicked
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg"
            >
              Start Detection
            </button>
          ) : (
            <button
              onClick={() => {
                handleStopDetection();
                animateTextAppearance(); // Trigger text reappearance when stop is clicked
              }}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out shadow-lg"
            >
              Stop Detection
            </button>
          )}
        </div>

        {/* Logs Section - Below Webcam Feed with Horizontal Scroll */}
        <div className="w-full h-full overflow-x-auto mt-12 [mask-image:linear-gradient(to_right,transparent,black_0%,black_96%,transparent)]">
          {/* Use flexbox to display logs horizontally */}
          <div className="flex space-x-6 ">
            {logs.map((log, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-md px-6 pb-4 pt-3 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex-shrink-0 w-[300px]" // Prevent shrinking and set fixed width
              >
                <div className="flex flex-col items-center h-full justify-between">
                  <div className="w-full flex flex-col gap-2">
                    <p className="text-lg font-semibold text-gray-400 flex w-full justify-center items-center">
                      <span className="text-xl "></span> {log.timestamp}
                    </p>
                    <img
                      src={`http://localhost:4000/uploads/${log.person_id}.jpg`}
                      alt="Detected person"
                      onError={(e) => {
                        e.target.src = "/default-profile.jpg"; // Fallback image
                      }}
                      className="w-full h-60 rounded-md object-fill"
                    />
                    <p className="text-sm text-gray-500 w-full flex justify-center">ID: {log.person_id}</p>
                    <p className=" text-gray-300">
                      <span className="text-gray-400">Top:</span> {log.top_color} <br />{" "}
                      <span className="text-gray-400">Bottom:</span> {log.bottom_color}
                    </p>
                  </div>

                  <div className="flex flex-col items-start w-full ">
                    <div className="flex w-full justify-between items-center mt-2">
                      <p className="text-green-500 ">{log.event}</p>
                      <IoIosArrowDropright size={"1.4em"} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebcamFeed;



