export class Const {

  static dirMasksDelta = {
    1: [0, -1],//up
    2: [0, 1],//'down'  : 
    4: [-1, 0],//'left'  : 
    8: [1, 0],//'right' : 
    15: [0, 0],//'?' : 
    16: [0, 0],//'action' : 
    3: [0, 0]//'no'
  };

  static dirMaskName = {
    1: 'up',
    2: 'down',
    4: 'left',
    8: 'right',
    15: '?',
    16: 'action',
    3: 'no'
  };

}