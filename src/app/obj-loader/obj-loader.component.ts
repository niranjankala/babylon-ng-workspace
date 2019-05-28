import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import * as BABYLON from 'babylonjs';
import { Scene, Engine } from 'babylonjs';
import 'babylonjs-loaders';
import 'babylonjs-gui';

@Component({
  selector: 'app-obj-loader',
  templateUrl: './obj-loader.component.html',
  styleUrls: ['./obj-loader.component.css']
})
export class ObjLoaderComponent implements OnInit, AfterViewInit {
  engine: any;
  scene: any;
  camera: BABYLON.ArcRotateCamera;

  constructor() { }

  @ViewChild('canvas')
  private canvasRef: ElementRef;
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    // this.canvas = document.getElementById('renderCanvas');
    this.engine = new BABYLON.Engine(this.canvas, true, { preserveDrawingBuffer: true, stencil: true });
    var createScene = () => {
      let scene = new BABYLON.Scene(this.engine);
      // Adding a light
      //let light = new BABYLON.PointLight('Omni', new BABYLON.Vector3(20, 20, 100), scene);
      let light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(20, 20, 100), scene);

      // Adding an Arc Rotate Camera
      this.camera = new BABYLON.ArcRotateCamera("Camera", BABYLON.Tools.ToRadians(90),
        BABYLON.Tools.ToRadians(0), 80, new BABYLON.Vector3(0, 0, 0), scene);
      //this.camera = new BABYLON.ArcRotateCamera("Camera", 1.57, 10, 80, BABYLON.Vector3.Zero(), scene);
      //this.camera = new BABYLON.ArcRotateCamera("Camera",Math.PI / 2, Math.PI / 3, 80, BABYLON.Vector3.Zero(), scene);
      this.camera.setTarget(new BABYLON.Vector3(20, 3, 4.5));

      this.camera.attachControl(this.canvas, false);

      // The first parameter can be used to specify which mesh to import. Here we import all meshes      
      //BABYLON.SceneLoader.ImportMesh('', '/assets/models/', 'WaltHead.obj', scene, (newMeshes) => {        
      BABYLON.SceneLoader.ImportMesh('', '/assets/models/', 'BLIS_SmallOfficeBldg.obj', scene, (meshes) => {
        //meshes.forEach(m=> m.reservedDataStore());
        scene.activeCamera = null;
        // Create a default arc rotate camera and light.        
        scene.createDefaultCameraOrLight(true, false, true);
        scene.activeCamera.attachControl(this.canvas, true);
        this.camera = (scene.activeCamera as BABYLON.ArcRotateCamera);
        this.camera.beta = Math.PI/2;
        //this.camera.alpha = Math.PI ;
        
        //this.camera.target = new BABYLON.Vector3(0, 0, 4.5);
        this.camera.wheelPrecision = 10;
         this.camera.lowerBetaLimit = Math.PI /3; 
         this.camera.upperBetaLimit = Math.PI/2 ;
        // this.camera.lowerAlphaLimit = Math.PI/2;
        // this.camera.upperAlphaLimit = Math.PI / 2;
        this.camera.allowUpsideDown = false;
        //this.camera.position=(new BABYLON.Vector3(5,10,-75  ));        
        this.camera.upVector = (new BABYLON.Vector3(0,0,1 ));  
        //console.log(this.camera.wheelPrecision);
        console.log('camera target: ' + this.camera.target);
        console.log(this.camera.allowUpsideDown);
        console.log('camera position: ' + this.camera.position);
        console.log('camera upVector: ' + this.camera.upVector);

        // Positions the camera overwriting alpha, beta, radius
        //this.camera.setPosition(this.camera.position.multiply(new BABYLON.Vector3(-1, -1, -1)));

        //this.camera.upVector =new BABYLON.Vector3(this.camera.position.x, this.camera.position.y +5, this.camera.position.z);
        //this.camera.beta = Math.PI;
        //  this.camera.alpha = Math.PI/2;
        light = scene.lights[0] as BABYLON.PointLight;
        light.position = this.camera.position;
      });

      // Move the light with the camera
      scene.registerBeforeRender(() => {
        light.position = this.camera.position;
      });
      // Return the created scene
      return scene;
    }

    let scene = createScene();
    this.scene = scene;
    // run the render loop
    this.engine.runRenderLoop(() => {
      scene.render();
      //console.log('beta - ' + this.camera.beta);
      //console.log('alpha - ' + this.camera.alpha);

    });
    // window.addEventListener('resize', function () {
    //   scene.resize();
    // });
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: Event) {
    if (this.scene) {
      this.engine.resize();
    }
  }
}
