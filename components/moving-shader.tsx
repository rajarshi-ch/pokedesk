'use-client';
// components/MovingShader.tsx
import React, { useRef, useEffect } from 'react';

interface MovingShaderProps {
    className?: string;
    style?: React.CSSProperties;
}

/**
 * A reusable moving shader background component.
 * Usage: <MovingShader style={{ width: '100vw', height: '100vh' }} />
 */
const MovingShader: React.FC<MovingShaderProps> = ({ className, style }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const animationFrameIdRef = useRef<number | null>(null);

    // Vertex Shader (GLSL) — draws a full-screen quad
    const vertexShaderSrc = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    // Convert clip space [-1..1] to UV space [0..1]
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

    // Fragment Shader (GLSL) — creates a dark aurora-like effect
    const fragmentShaderSrc = `
  precision mediump float;
  varying vec2 v_uv;
  uniform float u_time;
  // Pseudo-random
    float rand(vec2 co) {
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453123);
    }
  void main() {
    // Transform v_uv from [0,1] to [-1,1] for symmetrical effects
    vec2 uv = v_uv * 2.0 - 1.0;

    // Slow time for subtle motion
    float time = u_time * 0.7;

    // Slight "swirl" displacement
    uv.x += 0.2 * sin(uv.y * 4.0 + time);
    uv.y += 0.2 * sin(uv.x * 4.0 - time);

    // Combine multiple sine waves
    float wave = sin(uv.x * 2.0 + time * 0.7) + cos(uv.y * 2.0 - time * 0.3);
    // Map to 0..1
    float brightness = 0.8 + 0.5 * wave;

    // Color palette: dark greenish base, purple highlight, teal mid-tone
    vec3 colorA = vec3(1.00,0.33,0.33);  // near-black with a slight green tint
    vec3 colorB = vec3(0.00,0.00,0.00);  // purple
    vec3 colorC = vec3(0.46,0.96,1.00);  // teal-green

    // vec3 colorA = vec3(0.376, 0.376, 0.502);
    // vec3 colorB = vec3(0.553, 0.490, 0.792);
    // vec3 colorC = vec3(0.129, 0.129, 0.129);


    // Two-step color mix 
    vec3 col = mix(colorA, colorB, brightness);
    col = mix(col, colorC, brightness * 0.2);

    // ==================================================
    // ADD GRAIN: just a small random offset to col
    // ==================================================
    // We'll get a noise value between 0.0 and 1.0
    // and shift it so it can be negative or positive around 0
    float noise = rand(uv * 500.0 + u_time * 100.0) - 0.5; 
    // scale it down so it’s subtle
    float grainStrength = 0.08; // tweak to taste

    // Add or multiply the color
    // Typically, adding a small offset is enough for “film grain”
    col += noise * grainStrength;

    // Final output
    gl_FragColor = vec4(col, 1.0);

  }
`;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Create a <canvas> element and append to container
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);

        // Get WebGL context
        const gl = canvas.getContext('webgl');
        if (!gl) {
            console.error('WebGL not supported in this browser.');
            return;
        }

        // ========== Resize Handling ==========
        function resizeCanvas() {
            canvas.width = container!.clientWidth;
            canvas.height = container!.clientHeight;
            gl!.viewport(0, 0, gl!.drawingBufferWidth, gl!.drawingBufferHeight);
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // ========== Shader Compilation Helper ==========
        function compileShader(source: string, type: number) {
            const shader = gl!.createShader(type);
            if (!shader) {
                throw new Error('Failed to create shader.');
            }
            gl!.shaderSource(shader, source);
            gl!.compileShader(shader);

            if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
                const log = gl!.getShaderInfoLog(shader);
                gl!.deleteShader(shader);
                throw new Error('Shader compile error: ' + log);
            }
            return shader;
        }

        // Compile the vertex & fragment shaders
        const vertexShader = compileShader(vertexShaderSrc, gl.VERTEX_SHADER);
        const fragmentShader = compileShader(fragmentShaderSrc, gl.FRAGMENT_SHADER);

        // Create and link a WebGL program
        const program = gl.createProgram();
        if (!program) {
            throw new Error('Failed to create WebGL program.');
        }
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            const log = gl.getProgramInfoLog(program);
            gl.deleteProgram(program);
            throw new Error('Program link error: ' + log);
        }
        gl.useProgram(program);

        // ========== Create a Full-Screen Quad ==========
        const vertices = new Float32Array([
            -1, -1,
            1, -1,
            -1, 1,
            1, 1,
        ]);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const aPosLoc = gl.getAttribLocation(program, 'a_position');
        gl.enableVertexAttribArray(aPosLoc);
        gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

        // ========== Set up uniform for time ==========
        const uTimeLoc = gl.getUniformLocation(program, 'u_time');
        const startTime = performance.now();

        // ========== Animation Loop ==========
        function render() {
            const currentTime = performance.now();
            const elapsed = (currentTime - startTime) * 0.001; // ms -> seconds

            // Update time uniform
            if (uTimeLoc) {
                gl!.uniform1f(uTimeLoc, elapsed);
            }

            // Clear & draw
            gl!.clearColor(0.0, 0.0, 0.0, 1.0);
            gl!.clear(gl!.COLOR_BUFFER_BIT);
            gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);

            animationFrameIdRef.current = requestAnimationFrame(render);
        }
        render();

        // ========== Cleanup on Unmount ==========
        return () => {
            if (animationFrameIdRef.current !== null) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
            window.removeEventListener('resize', resizeCanvas);

            container.removeChild(canvas);
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            gl.deleteProgram(program);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                ...style,
            }}
        />
    );
};

export default MovingShader;
