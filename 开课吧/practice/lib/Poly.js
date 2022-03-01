const defAttr = () => ({
    gl: null,
    vertices: [],
    geoData: [],
    size: 2,
    attrName: 'a_Position',
    count: 0,
    types: ['POINTS']
})
class Poly {
    constructor(attr) {
        Object.assign(this, defAttr(), attr)
        this.init();
    }

    init() {
        const { gl, attrName, size } = this;
        if (!gl) {
            return;
        }
        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

        this.updateBuffer();

        const a_Position = gl.getAttribLocation(gl.program, attrName);
        gl.vertexAttribPointer(a_Position, size, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);
    }

    updateBuffer() {
        const { gl, vertices } = this;
        this.updateCount();
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STREAM_DRAW);
    }

    updateCount() {
        this.count = this.vertices.length / this.size;
    }

    addVertice(...parms) {
        this.vertices.push(...parms);
        this.updateBuffer();
    }

    popVertice() {
        const { vertices, size} = this;
        const length = vertices.length;
        vertices.splice(length - size, size);
        this.updateCount();
    }

    setVertice(ind, ...params) {
        const { vertices, size} = this;
        const i = ind * size;
        params.forEach((item, index) => {
            vertices[i + index] = item;
        })
        this.updateBuffer();
    }

    updateVertices(params) {
        const { geoData } = this;
        const vertices = [];
        geoData.forEach((data) => {
            params.forEach(param => {
                vertices.push(data[param]);
            })
        });
        this.vertices = vertices;
    }

    draw(types = this.types) {
        console.log(this.vertices)
        const { gl, count } = this;
        for (const type of types) {
            gl.drawArrays(gl[type], 0, count);
        }
    }
}

export default Poly