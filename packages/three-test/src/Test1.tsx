import React, {useEffect, useRef} from 'react'

import * as three from 'three'

const {PerspectiveCamera, Scene, BoxGeometry, MeshNormalMaterial, Mesh, WebGLRenderer} = three

let render
let camera
let mesh
let scene

function animate() {
  requestAnimationFrame(animate)
  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.02
  render.render(scene, camera)
}

function Test1() {
  let ref = useRef<HTMLDivElement>()

  useEffect(() => {

    camera = new PerspectiveCamera(70, 1, 0.01, 10)
    camera.position.z = 1

    scene = new Scene()

    let geometry = new BoxGeometry(0.2, 0.2, 0.2)
    let material = new MeshNormalMaterial()

    mesh = new Mesh(geometry, material)
    scene.add(mesh)

    render = new WebGLRenderer({antialias: true})
    render.setSize(300, 300)
    ref.current.appendChild(render.domElement)
    animate()
  }, [])

  return (
    <div ref={ref} style={{width: 300, height: 300}}>
    </div>
  )
}

export default Test1
