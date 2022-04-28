let canvas = document.createElement('canvas')
canvas.style.background = '#000'
document.body.appendChild(canvas)
let gl = canvas.getContext('webgl', {preserveDrawingBuffer: true})

let clearPass = program({
  type: gl.TRIANGLES,
  vertexSize: 2,
  vertices: [-1, 3, -1, -1, 3, -1], // full screen triangle
  shaders: [`
            attribute vec2 pt;
            void main(void) {
                gl_Position=vec4(pt, 0.0, 1.0);
            }`, `
            void main(void) {
                gl_FragColor=vec4(0.0, 0.0, 0.0, 0.05);
            }`]
})

let particles = program({
  type: gl.POINTS,
  vertexSize: 4,
  vertices: createVertices(),
  uniforms: {time: '1f', resolution: '2f'},
  shaders: [`
            uniform float time;
            uniform vec2 resolution;
            attribute vec4 pt;
            varying float i;
            void main() {
                float aspect = resolution.y/resolution.x;
                float t = smoothstep(0.0, 1.0, fract(time*0.3));
                t += mod(floor(time*0.3), 2.0);
                t *= 3.1415;
                i = fract(pt.x*pt.y*pt.z*pt.w);
                vec2 c = (pt.xy + pt.zw)/2.0;
                float a = atan(pt.y - c.y, pt.x - c.x);
                float r = length(vec2(pt.x - c.x, pt.y - c.y));
                r -= sin(t*3.)*0.005; 
                c += vec2(cos(a+t), sin(a+t)) * r;
                gl_Position = vec4(c.x*aspect, c.y, 0., 1.);
                gl_PointSize = 10.0;
            }`, `
            uniform float time;
            varying float i;
            float ch(vec2 uv) {
                float d = length(uv - 0.5);
                return smoothstep(0.2, 0.00, d);
            }
            void main() {
                float d = length(gl_PointCoord.xy-0.5);
                d = smoothstep(0.5, 0.00, d);
                gl_FragColor = vec4(
                    ch(gl_PointCoord.xy-0.25*sin(time+i)),
                    ch(gl_PointCoord.xy),
                    ch(gl_PointCoord.xy+0.25*sin(time+i)), 
                    0.01
                 );
            }`]
})

gl.enable(gl.BLEND)

requestAnimationFrame(function draw(t) {

  gl.blendFunc(gl.ONE, gl.ONE) // additive
  particles.bind()
  if (canvas.width != innerWidth || canvas.height !== innerHeight) {
    particles.uniforms.resolution([innerWidth, innerHeight])
    gl.viewport(0, 0, canvas.width = innerWidth, canvas.height = innerHeight)
  }
  particles.uniforms.time([t / 1000])
  particles.draw()

  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
  clearPass.bind()
  clearPass.draw()

  requestAnimationFrame(draw)

})

function program(o) {
  let pid = gl.createProgram()
  let bufferId = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(o.vertices), gl.STATIC_DRAW)
  o.shaders.forEach((src, i) => {
    let id = gl.createShader(i ? gl.FRAGMENT_SHADER : gl.VERTEX_SHADER)
    gl.shaderSource(id, 'precision highp float;\n' + src)
    gl.compileShader(id)
    var message = gl.getShaderInfoLog(id)
    gl.attachShader(pid, id)
    if (message.length > 0) {
      console.log(src.split('\n').map((str, i) =>
        ('' + (1 + i)).padStart(4, '0') + ': ' + str).join('\n'))
      throw message
    }
  })
  gl.linkProgram(pid)
  gl.useProgram(pid)
  o.uniforms && Object.keys(o.uniforms).forEach(uf => {
    let loc = gl.getUniformLocation(pid, uf),
      f = gl[`uniform${o.uniforms[uf]}`]
    o.uniforms[uf] = v => f.call(gl, loc, ...v)
  })
  let pt = gl.getAttribLocation(pid, 'pt')
  gl.enableVertexAttribArray(pt)
  o.draw = () => {
    gl.drawArrays(o.type, 0, o.vertices.length / o.vertexSize)
  }
  o.bind = () => {
    gl.useProgram(pid)
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId)
    gl.vertexAttribPointer(pt, o.vertexSize, gl.FLOAT, false, 0, 0)
  }
  return o
}

function createVertices() {
  let count = 2000
  let vertices = []
  let s = 500
  let canvas = document.createElement('canvas')
  canvas.width = canvas.height = s
  let ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, s, s)
  ctx.font = `bold ${s / 5}px Arial`
  ctx.fillStyle = 'red'
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  let mask = ['HAPPY', 'BIRTHDAY'].map(text => {
    ctx.clearRect(0, 0, s, s)
    ctx.fillText(text, s / 2, s / 2)
    let data = ctx.getImageData(0, 0, s, s)
    return (x, y) => data.data[((y | 0) * s + (x | 0)) * 4]
  })
  while (vertices.length < count * 4) {
    let x1 = s * Math.random()
    let y1 = s * Math.random()
    if (!mask[0](x1, y1))
      continue
    let x2 = s * Math.random()
    let y2 = s * Math.random()
    if (!mask[1](x2, y2))
      continue
    let r = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) / 2
    if (r > s / 6)
      continue
    vertices.push(2 * (x2 / s - 0.5), 2 * (0.5 - y2 / s), 2 * (x1 / s - 0.5), 2 * (0.5 - y1 / s))
  }
  return vertices
}