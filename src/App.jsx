import { useRef, useState, useEffect } from "react";
import {
  Box,
  Slider,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import BrushIcon from "@mui/icons-material/Brush";
import "./App.css";

function App() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#8b6f61");
  const [width, setWidth] = useState(12);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth - 60;
    canvas.height = 450;

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctxRef.current = ctx;
  }, []);

  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    ctxRef.current.strokeStyle = color;
    ctxRef.current.lineWidth = width;
    ctxRef.current.globalAlpha = opacity;

    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };


  return (
    <Box className="app">
      <h1 variant="h3" className="title">
        Paint App
      </h1>
      <Paper elevation={3} className="toolbar">
        <Stack direction="row" spacing={4} alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <BrushIcon />
            <Typography>Brush Color</Typography>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </Stack>

          <Box width={200}>
            <Typography>Brush Width</Typography>
            <Slider
              value={width}
              min={1}
              max={50}
              onChange={(e, v) => setWidth(v)}
            />
          </Box>

          <Box width={200}>
            <Typography>Brush Opacity</Typography>
            <Slider
              value={opacity}
              min={0.1}
              max={1}
              step={0.1}
              onChange={(e, v) => setOpacity(v)}
            />
          </Box>
        </Stack>
      </Paper>

      <canvas
        ref={canvasRef}
        className="canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </Box>
  );
}

export default App;
