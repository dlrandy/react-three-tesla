import { extend, Object3DNode } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
extend({OrbitControls});
declare global {
    namespace JSX {
      interface IntrinsicElements {
        orbitControls: Object3DNode<OrbitControls, typeof OrbitControls>
      }
    }
  }