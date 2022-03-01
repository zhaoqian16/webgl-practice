// 初始化着色器
function initShaders(gl, vsSource, fsSource) {
    // 创建着色器对象
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    // 创建程序对象
    const program = gl.createProgram();
    // 将顶点着色器装进程序对象中
    gl.attachShader(program, vertexShader);
    // 将片元着色器装进程序对象中
    gl.attachShader(program, fragmentShader);
    // 连接webgl上下文对象和程序对象
    gl.linkProgram(program);
    // 启动程序对象
    gl.useProgram(program);
    // 将程序对象挂到上下文对象上
    gl.program = program;
    return true;
}

// 加载着色器
function loadShader(gl, type, source) {
    // 根据着色器类型，建立着色器对象
    const shader = gl.createShader(type);
    // 将着色器源文件传入着色器对象中
    gl.shaderSource(shader, source);
    // 编译着色器对象
    gl.compileShader(shader);
    // 返回着色器对象
    return shader;
}

function getMousePosInWebgl({clientX, clientY}, canvas) {
    const { left, top, width, height } = canvas.getBoundingClientRect();
    const canvasX = clientX - left;
    const canvasY = clientY - top;

    const [halfWidth, halfHeight] = [width / 2, height / 2];
    const glX = (canvasX - halfWidth) / halfWidth;
    const glY = - (canvasY - halfHeight) / halfHeight;
    return {
        x: glX,
        y: glY,
    }
}

function glToCssPos({x, y}, {width, height}) {
    const [halfWidth, halfHeight] = [width / 2, height / 2];
    return {
        x: x * halfWidth,
        y: -y * halfHeight,
    }
}

export {
    initShaders,
    getMousePosInWebgl,
    glToCssPos
}