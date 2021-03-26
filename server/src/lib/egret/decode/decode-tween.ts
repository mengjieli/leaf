import { XMLElement } from "./../../utils/xml-element"
import { TweenGroup } from "./../tween/tween-group";
import { TweenItem } from "./../tween/tween-item";
import { TweenSet } from "./../tween/tween-set";
import { TweenTo } from "./../tween/tween-to";
import { Console } from './../../console/console'
import { EXML } from "../exml";

var current: EXML;

export function decodeTweenGroup(xml: XMLElement, exml: EXML) {
  current = exml;
  let group = new TweenGroup();
  xml.attributes.forEach(attribute => {
    let flag = group.setAttribute(attribute.name, attribute.value);
    if (!flag) {
      group[attribute.name] = attribute.value;
      console.log(`${Console.styles.red[0]}无法识别的 ${xml.name} 属性 ${attribute.name}=${attribute.value} url:${exml.url}${Console.styles.red[1]}`);
    }
  });
  xml.list.forEach(element => {
    if (element.name == 'tween:TweenItem') {
      group.items.push(decodeTweenItem(element));
    } else {
      console.log(`${Console.styles.red[0]}无法识别的对象 ${element.name} url:${exml.url}${Console.styles.red[1]}`);
    }
  });
  return group;
}

function decodeTweenItem(xml: XMLElement) {
  let item = new TweenItem();
  let time = 0;
  if (!xml.getAttribute('target')) {
    console.log(`${Console.styles.red[0]}没有找到 tween:TweenItem target url:${current.url}${Console.styles.red[1]}`);
    return item;
  }
  let val = xml.getAttribute('target').value;
  item.target = val.slice(1, val.length - 1);
  xml.list.forEach(element => {
    if (element.name == 'tween:Set') {
      item.items.push(decodeTweeSet(element, time))
    } else if (element.name == 'tween:To') {
      let ease = "none";
      if (element.getAttribute('ease')) ease = element.getAttribute('ease').value;
      item.items.push(decodeTweeTo(element, time, ease));
      if (element.getAttribute('duration')) {
        time += +element.getAttribute('duration').value;
      }
    } else if (element.name == 'tween:Wait') {
      if (element.getAttribute('duration')) {
        time += +element.getAttribute('duration').value;
      }
    } else {
      console.log(`${Console.styles.red[0]}无法识别的对象 ${element.name} url:${current.url}${Console.styles.red[1]}`);
    }
  });
  return item;
}

function decodeTweeSet(xml: XMLElement, time: number): TweenSet {
  let item = new TweenSet();
  item.time = time;
  xml.list.forEach(element => {
    if (element.name == 'tween:props') {
      element.list.forEach(e => {
        if (e.name == 'e:Object') {
          e.attributes.filter(attribute => {
            let flag = item.setAttribute(attribute.name, attribute.value);
            if (!flag) {
              console.log(`${Console.styles.red[0]}无法识别的 ${xml.name} 属性 ${attribute.name}=${attribute.value} url:${current.url}${Console.styles.red[1]}`);
            }
          })
        } else {
          console.log(`${Console.styles.red[0]}无法识别的对象 ${element.name} url:${current.url}${Console.styles.red[1]}`);
        }
      });
    } else {
      console.log(`${Console.styles.red[0]}无法识别的对象 ${element.name} url:${current.url}${Console.styles.red[1]}`);
    }
  });
  return item;
}

function decodeTweeTo(xml: XMLElement, time: number, ease: string): TweenTo {
  let item = new TweenTo();
  item.time = time;
  item.ease = ease;
  if (!xml.getAttribute('duration')) {
    console.log(`${Console.styles.red[0]}没有找到 tween:To duration url:${current.url}${Console.styles.red[1]}`);
  }
  item.duration = +xml.getAttribute('duration').value;
  xml.list.forEach(element => {
    if (element.name == 'tween:props') {
      element.list.forEach(e => {
        if (e.name == 'e:Object') {
          e.attributes.filter(attribute => {
            let flag = item.setAttribute(attribute.name, attribute.value);
            if (!flag) {
              console.log(`${Console.styles.red[0]}无法识别的 ${xml.name} 属性 ${attribute.name}=${attribute.value} url:${current.url}${Console.styles.red[1]}`);
            }
          })
        } else {
          console.log(`${Console.styles.red[0]}无法识别的对象 ${element.name} url:${current.url}${Console.styles.red[1]}`);
        }
      });
    } else {
      console.log(`${Console.styles.red[0]}无法识别的对象 ${element.name} url:${current.url}${Console.styles.red[1]}`);
    }
  });
  return item;
}