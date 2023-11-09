import { CompoundButton, Image } from "@fluentui/react-components";
import React from "react";
import Draggable from "react-draggable";
import { useEffect, useRef, useState, useContext } from "react";

import { UserContext } from "../pages/home";

const DraggableCircle = ({ id, color, position, onDrag }) => {
  const [currentColor, setCurrentColor] = useState([255, 0, 0]);
  const [radius, setRadius] = useState(5.0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const circles = [
      { radius: 0, alpha: 1 },
      { radius: radius / 2, alpha: 0.5 },
    ];

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      circles.forEach((circle) => {
        if (circle.radius >= radius) {
          circle.radius = 0;
          circle.alpha = 1;
        }
        context.beginPath();
        context.arc(15, 15, circle.radius, 0, 2 * Math.PI);
        context.fillStyle = `rgba(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]}, ${circle.alpha})`;
        context.fill();

        context.beginPath();
        context.arc(15, 15, circle.radius, 0, 2 * Math.PI);
        context.fillStyle = `rgba(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]}, ${circle.alpha})`;
        context.fill();

        circle.radius += radius / 100;
        circle.alpha -= 0.01; // Adjust the increment value for smoother or faster changes
      });
      requestAnimationFrame(animate);
    };

    animate();
  }, [currentColor]);

  const handleMouseOver = () => {
    setCurrentColor([255, 0, 0]);
    setRadius(15);
  };

  const handleMouseOut = () => {
    setCurrentColor([255, 0, 0]);
    setRadius(5);
  };

  return (
    <Draggable
      bounds="parent"
      position={{ x: position.x, y: position.y }}
      onDrag={(e, data) => onDrag(data, id)}
    >
      <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{
          width: "0px",
          height: "0px",
          left: "-15px",
          top: "-15px",
          borderRadius: "0%",
          backgroundColor: color,
          cursor: "move",
          position: "relative",
        }}
      >
        <canvas ref={canvasRef} width={30} height={30} />
        {/* style={{ left: "-5px", top: "-5px" }} */}
        {/* style={{left:{radius}, top:{radius}}} */}
      </div>
    </Draggable>
  );
};

export const FrontTargetMapping = ({
  selectedPoint,
  handleSelectPointChange,
}) => {
  const imageRef = useRef(null);
  const [imageOffsetX, setImageOffsetX] = useState(0.0);

  const { markPoints, setMarkPoints } = useContext(UserContext);

  const { selectedFrontImage } = useContext(UserContext);

  const [circles, setCircles] = React.useState([
    { id: 1, color: "red", issymmetry: false, position: { x: 0, y: 0 } },
    { id: 2, color: "blue", issymmetry: true, position: { x: 0, y: 10 } },
    { id: 3, color: "green", issymmetry: true, position: { x: 0, y: 20 } },
    { id: 4, color: "red", issymmetry: true, position: { x: 0, y: 30 } },
    { id: 5, color: "blue", issymmetry: false, position: { x: 0, y: 40 } },
    { id: 6, color: "green", issymmetry: false, position: { x: 0, y: 50 } },
    { id: 7, color: "red", issymmetry: true, position: { x: 0, y: 60 } },
    { id: 8, color: "blue", issymmetry: true, position: { x: 150, y: 150 } },
    { id: 9, color: "green", issymmetry: true, position: { x: 300, y: 300 } },
    { id: 10, color: "red", issymmetry: true, position: { x: 0, y: 0 } },
    { id: 11, color: "blue", issymmetry: true, position: { x: 150, y: 150 } },
    { id: 12, color: "green", issymmetry: true, position: { x: 300, y: 300 } },
    { id: 13, color: "red", issymmetry: true, position: { x: 0, y: 0 } },
    { id: 14, color: "blue", issymmetry: true, position: { x: 150, y: 150 } },
    { id: 15, color: "green", issymmetry: true, position: { x: 300, y: 300 } },
    { id: 16, color: "red", issymmetry: true, position: { x: 0, y: 0 } },
    { id: 17, color: "blue", issymmetry: true, position: { x: 150, y: 150 } },
    { id: 18, color: "green", issymmetry: true, position: { x: 300, y: 300 } },
    { id: 19, color: "red", issymmetry: false, position: { x: 0, y: 0 } },
    { id: 20, color: "blue", issymmetry: false, position: { x: 150, y: 150 } },
    { id: 21, color: "red", issymmetry: false, position: { x: 0, y: 0 } },
    { id: 22, color: "blue", issymmetry: true, position: { x: 150, y: 150 } },
    { id: 23, color: "green", issymmetry: true, position: { x: 300, y: 300 } },
    { id: 24, color: "red", issymmetry: false, position: { x: 0, y: 0 } },
    { id: 25, color: "blue", issymmetry: false, position: { x: 150, y: 150 } },
    { id: 26, color: "green", issymmetry: true, position: { x: 300, y: 300 } },
    { id: 27, color: "red", issymmetry: true, position: { x: 0, y: 0 } },
    { id: 28, color: "blue", issymmetry: true, position: { x: 150, y: 150 } },
    { id: 29, color: "green", issymmetry: false, position: { x: 300, y: 300 } },
  ]);

  const handleDrag = (data, id) => {
    const updatedCircles = circles.map((circle) => {
      if (circle.id * 2 === id) {
        const updatedMarkPoints = { ...markPoints };
        updatedMarkPoints[circle.id][0] = { x: data.x, y: data.y };
        handleSelectPointChange([circle.id, 0]);
        if (!circle.issymmetry) {
          updatedMarkPoints[circle.id][1] = { x: data.x, y: data.y };
        }
        setMarkPoints(updatedMarkPoints);
        return {
          ...circle,
          position: { x: data.x, y: data.y },
        };
      } else if (circle.id * 2 + 1 === id) {
        const updatedMarkPoints = { ...markPoints };
        updatedMarkPoints[circle.id][1] = { x: data.x, y: data.y };
        handleSelectPointChange([circle.id, 1]);
        if (!circle.issymmetry) {
          updatedMarkPoints[circle.id][0] = { x: data.x, y: data.y };
        }
        setMarkPoints(updatedMarkPoints);
        return {
          ...circle,
          position: { x: data.x, y: data.y },
        };
      }

      return circle;
    });
    setCircles(updatedCircles);
  };

  const canvasRef = useRef(null);

  const handleMagicButtonClick = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedFrontImage);

      const response = await fetch(
        "https://d7pxwnyh16qdcm-8000.proxy.runpod.net/frontmagic",        
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();

      const updatedMarkPoints = { ...markPoints };

      const width = imageRef.current.naturalWidth;
      const height = imageRef.current.naturalHeight;

      setImageOffsetX((800 - (800 * width) / height) / 2);

      for (let i = 0; i < data.points.length; i++) {
        updatedMarkPoints[i][0] = {
          x: data.points[i][0][0] + (800 - (800 * width) / height) / 2,
          y: data.points[i][0][1],
        };
        updatedMarkPoints[i][1] = {
          x: data.points[i][1][0] + (800 - (800 * width) / height) / 2,
          y: data.points[i][1][1],
        };
      }

      setMarkPoints(updatedMarkPoints);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {/* <Image src="./images/front.jpg" width={800} height={800} style={{ zIndex: 1 }}></Image> */}
      
      
      <div style={{position:"absolute", top:"0px", zIndex:7, backgroundColor:"#ffffffc0", width:"100%", height:"40px", display:"flex", justifyContent:"center", color:"red", 
      fontSize:"24px", alignItems:"center"}}>
        <b>Move points around as needed to copy the left image</b>
      </div>
      <div
        style={{
          width: "800px",
          height: "800px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
          backgroundColor: "#6d546a",
        }}
      >
        {selectedFrontImage && (
          <img
            ref={imageRef}
            style={{ zIndex: 2, height: "800px" }}
            src={URL.createObjectURL(selectedFrontImage)}
          ></img>
        )}
        {!selectedFrontImage && (
          <Image
            width={800}
            height={800}
            style={{ zIndex: 2 }}
            src={"./images/front_blank.jpg"}
          ></Image>
        )}
      </div>
      <div
        style={{ position: "absolute", top: "0px", right: "0px", zIndex: 9 }}
      >
        <CompoundButton
          appearance="square"
          style={{ width: "30px", height: "30px" }}
          onClick={handleMagicButtonClick}
        >
          <i class="fa-solid fa-wand-magic-sparkles"></i>
        </CompoundButton>
      </div>
      <div
        style={{
          position: "absolute",
          top: "0px",
          right: "0px",
          height: "800px",
          width: "800px",
          zIndex: "5",
        }}
      >
        {circles.map((circle) => (
          <DraggableCircle
            key={circle.id * 2}
            id={circle.id * 2}
            color={circle.color}
            position={markPoints[circle.id][0]}
            // position={{x:markPoints[circle.id][0].x-markPoints[circle.id-1][0].x, y:markPoints[circle.id][0].y-markPoints[circle.id-1][0].y}}
            // position={circle.position}
            onDrag={handleDrag}
            style={{ zIndex: 10 }}
          />
        ))}
        {circles.map((circle) => (
          <DraggableCircle
            key={circle.id * 2 + 1}
            id={circle.id * 2 + 1}
            color={circle.color}
            position={markPoints[circle.id][1]}
            // position={{x:markPoints[circle.id][0].x-markPoints[circle.id-1][0].x, y:markPoints[circle.id][0].y-markPoints[circle.id-1][0].y}}
            // position={circle.position}
            onDrag={handleDrag}
            style={{ zIndex: 10 }}
          />
        ))}
      </div>
      {/* <div style={{ position:"absolute", top:"0px", right:"0px", height: '800px', width: "800px" }}>
            <canvas ref={canvasRef} width={800} height={800} style={{ zIndex: 9 }} />
            </div> */}
    </div>
  );
};

export const SideTargetMapping = ({
  selectedPoint,
  handleSelectPointChange,
}) => {
  const imageRef = useRef(null);
  const [imageOffsetX, setImageOffsetX] = useState(0.0);

  const { markPoints, setMarkPoints } = useContext(UserContext);

  const { selectedSideImage } = useContext(UserContext);

  const [circles, setCircles] = React.useState([
    { id: 30, color: "red", issymmetry: false, position: { x: 0, y: 0 } },
    { id: 31, color: "blue", issymmetry: false, position: { x: 0, y: 10 } },
    { id: 32, color: "green", issymmetry: false, position: { x: 0, y: 20 } },
    { id: 33, color: "red", issymmetry: false, position: { x: 0, y: 30 } },
    { id: 34, color: "blue", issymmetry: false, position: { x: 0, y: 40 } },
    { id: 35, color: "green", issymmetry: false, position: { x: 0, y: 50 } },
    { id: 36, color: "red", issymmetry: false, position: { x: 0, y: 60 } },
    { id: 37, color: "blue", issymmetry: false, position: { x: 150, y: 150 } },
    { id: 38, color: "green", issymmetry: false, position: { x: 300, y: 300 } },
    { id: 39, color: "red", issymmetry: false, position: { x: 0, y: 0 } },
    { id: 40, color: "blue", issymmetry: false, position: { x: 150, y: 150 } },
    { id: 41, color: "green", issymmetry: false, position: { x: 300, y: 300 } },
    { id: 42, color: "red", issymmetry: false, position: { x: 0, y: 0 } },
    { id: 43, color: "blue", issymmetry: false, position: { x: 150, y: 150 } },
    { id: 44, color: "green", issymmetry: false, position: { x: 300, y: 300 } },
    { id: 45, color: "red", issymmetry: false, position: { x: 0, y: 0 } },
    { id: 46, color: "blue", issymmetry: false, position: { x: 150, y: 150 } },
    { id: 47, color: "green", issymmetry: false, position: { x: 300, y: 300 } },
    { id: 48, color: "red", issymmetry: false, position: { x: 0, y: 0 } },
    { id: 49, color: "blue", issymmetry: false, position: { x: 150, y: 150 } },
    { id: 50, color: "red", issymmetry: false, position: { x: 0, y: 0 } },
    { id: 51, color: "blue", issymmetry: false, position: { x: 150, y: 150 } },
    { id: 52, color: "green", issymmetry: false, position: { x: 300, y: 300 } },
    { id: 53, color: "red", issymmetry: false, position: { x: 0, y: 0 } },
    { id: 54, color: "blue", issymmetry: false, position: { x: 150, y: 150 } },
    { id: 55, color: "green", issymmetry: false, position: { x: 300, y: 300 } },
    { id: 56, color: "green", issymmetry: false, position: { x: 300, y: 300 } },
    { id: 57, color: "green", issymmetry: false, position: { x: 300, y: 310 } },
    { id: 58, color: "green", issymmetry: false, position: { x: 300, y: 310 } },
  ]);

  const handleDrag = (data, id) => {
    const updatedCircles = circles.map((circle) => {
      if (circle.id === id) {
        const updatedMarkPoints = { ...markPoints };
        updatedMarkPoints[circle.id][0] = { x: data.x, y: data.y };
        handleSelectPointChange([circle.id, 0]);
        setMarkPoints(updatedMarkPoints);
        return {
          ...circle,
          position: { x: data.x, y: data.y },
        };
      }
      return circle;
    });
    setCircles(updatedCircles);
  };

  const canvasRef = useRef(null);

  const handleMagicButtonClick = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedSideImage);

      const response = await fetch(
        "https://d7pxwnyh16qdcm-8000.proxy.runpod.net/sidemagic",        
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();

      const updatedMarkPoints = { ...markPoints };

      const width = imageRef.current.naturalWidth;
      const height = imageRef.current.naturalHeight;

      setImageOffsetX((800 - (800 * width) / height) / 2);

      for (let i = 0; i < data.points.length; i++) {
        updatedMarkPoints[i + 30][0] = {
          x: data.points[i][0] + (800 - (800 * width) / height) / 2,
          y: data.points[i][1],
        };
      }

      setMarkPoints(updatedMarkPoints);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  // useEffect(() => {
  //     const canvas = canvasRef.current;
  //     const context = canvas.getContext('2d');
  //     const markPointLines = [
  //         [1, 2], [1, 5],
  //         [2, 3], [2, 17],
  //         [3, 4], [3, 7], [3, 17],
  //         [4, 8], [4, 17],
  //         [5, 6], [5, 7],
  //         [6, 8], [6, 16],
  //         [7, 8],
  //         [8, 16],
  //         [9, 10], [9, 11], [9, 12], [9, 17],
  //         [10, 12], [10, 13],
  //         [11, 12], [11, 14],
  //         [12, 13], [12, 14], [12, 15], [12, 16],
  //         [13, 16],
  //         [14, 15],
  //         [15, 16],
  //         [16, 18],
  //         [17, 18], [17, 22],
  //         [18,19], [18,22],
  //         [19,20],
  //         [20,21],
  //         [22, 23], [22, 26],
  //         [23, 24], [23, 25], [23, 26],[23, 28],
  //         [24,25],
  //         [25, 26], [25, 28], [25, 29],
  //         [26, 27], [26, 28],
  //         [27, 28],
  //         [28, 29],
  //     ];

  //     // const animate = () => {
  //     context.clearRect(0, 0, canvas.width, canvas.height);
  //     context.lineWidth = 2;
  //     context.strokeStyle = 'purple';
  //     markPointLines.forEach(markPointLine => {
  //         context.beginPath();
  //         context.moveTo(markPoints[markPointLine[0]][0].x, markPoints[markPointLine[0]][0].y );
  //         context.lineTo(markPoints[markPointLine[1]][0].x, markPoints[markPointLine[1]][0].y );

  //         context.moveTo(markPoints[markPointLine[0]][1].x, markPoints[markPointLine[0]][1].y );
  //         context.lineTo(markPoints[markPointLine[1]][1].x, markPoints[markPointLine[1]][1].y );

  //         // context.moveTo(markPoints[1][0].x + 5, markPoints[1][0].y + 10);
  //         // context.lineTo(markPoints[markPointLine[1]][0].x,markPoints[markPointLine[1]][0].y);
  //         // context.lineTo(markPoints[2][0].x + 5, markPoints[2][0].y + 10);
  //         context.stroke();
  //         // context.beginPath();
  //         // context.arc(markPoints[currentIndex][0].x, markPoints[currentIndex][0].y, circle.radius, 0, 2 * Math.PI);
  //         // context.fillStyle = `rgba(0, 255, 0, ${circle.alpha})`;
  //         // context.fill();

  //         // circle.radius += 0.1;
  //         // circle.alpha -= 0.005; // Adjust the increment value for smoother or faster changes

  //     });
  //     // requestAnimationFrame(animate);
  //     // };

  //     // animate();
  // }, [markPoints]);

  return (
    <div style={{ position: "relative" }}>
      {/* <Image src="./images/front.jpg" width={800} height={800} style={{ zIndex: 1 }}></Image> */}
      <div style={{position:"absolute", top:"0px", zIndex:7, backgroundColor:"#ffffffc0", width:"100%", height:"40px", display:"flex", justifyContent:"center", color:"red", 
      fontSize:"24px", alignItems:"center"}}>
        <b>Move points around as needed to copy the left image</b>
      </div>
      <div
        style={{
          width: "800px",
          height: "800px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
          backgroundColor: "#6d546a",
        }}
      >
        {selectedSideImage && (
          <img
            ref={imageRef}
            style={{ zIndex: 2, height: "800px" }}
            src={URL.createObjectURL(selectedSideImage)}
          ></img>
        )}
        {!selectedSideImage && (
          <Image
            width={800}
            height={800}
            style={{ zIndex: 2 }}
            src={"./images/side_blank.jpg"}
          ></Image>
        )}
      </div>
      <div
        style={{ position: "absolute", top: "0px", right: "0px", zIndex: 9 }}
      >
        <CompoundButton
          appearance="square"
          style={{ width: "30px", height: "30px" }}
          onClick={handleMagicButtonClick}
        >
          <i class="fa-solid fa-wand-magic-sparkles"></i>
        </CompoundButton>
      </div>
      <div
        style={{
          position: "absolute",
          top: "0px",
          right: "0px",
          height: "800px",
          width: "800px",
          zIndex: "5",
        }}
      >
        {circles.map((circle) => (
          <DraggableCircle
            key={circle.id}
            id={circle.id}
            color={circle.color}
            position={markPoints[circle.id][0]}
            onDrag={handleDrag}
            style={{ zIndex: 10 }}
          />
        ))}
      </div>
      {/* <div style={{ position:"absolute", top:"0px", right:"0px", height: '800px', width: "800px" }}>
            <canvas ref={canvasRef} width={800} height={800} style={{ zIndex: 9 }} />
            </div> */}
    </div>
  );
};