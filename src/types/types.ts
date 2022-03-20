import { extend, Object3DNode, ReactThreeFiber } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
extend({OrbitControls});
declare global {
    namespace JSX {
      interface IntrinsicElements {
        orbitControls: ReactThreeFiber.Node<OrbitControls, typeof OrbitControls>
      }
    }
  }