const path = require('path');
/**
 * 
 * @param {*} classDefine 
 * type HitPoint struct {
        id int32
        x int32
        y int32
        r int32
    }
    
    type HitPointTable struct {
        hitPoints [] HitPoint
    }
    
    func DecodeHitPoint() []HitPoint {
        v := HitPointTable{}
        Load(tableURL + "HitPoint.json", &v)
        return v.hitPoints
    }

    func GetHitPoint(value int) HitPointConfig {
        for k, v := range tables.HitPoint {
            if(v.id == value) return v
        }
        return nil
    }

    func GetHitPointByX(value int) HitPointConfig {
        for k, v := range tables.HitPoint {
            if(v.X == value) return v
        }
        return nil
    }
 * 
 * @param {*} classes 
 * 
        HitPoint []HitPoint
 * @param {*} decodeTable 
 * 
        c.HitPoint = DecodeHitPoint()
 */
global.GetGoTemp = function(package,classDefine,classes,maps,decodeTable,linkTable,outPath) {
    if (global.params.declaration) {
        let dirName = path.basename(global.params.dir);
        dirName = ('' + dirName.charAt(0)).toLocaleUpperCase() + dirName.slice(1, dirName.length);
        return `package ${package}
        
${classDefine}
        
type ${dirName}Configs struct {
${classes}}
            
type ${dirName}Maps struct {
${maps}}`;
    }
    return `package ${package}

import (
    "io/ioutil"
    "encoding/json"
)
    
var tableURL = "./"
    
var tables Configs
var maps Maps

func GetTables() *Configs {
    return &tables
}

func GetMaps() *Maps {
    return &maps
}
    
${classDefine}
    
type Configs struct {
${classes}}

type Maps struct {
${maps}}
    
func DecodeAll(url string) (err error) {
    if(url[len(url)-1] != '/') {
        url = url + "/"
    }
    tableURL = url
    tables = Configs{}
${decodeTable}${linkTable}    return 
}

func DecodeAllByPath() (err error) {
    return DecodeAll("${outPath}");
}
    
func Load(filename string, v interface{})(err error) {
    //ReadFile函数会读取文件的全部内容，并将结果以[]byte类型返回
    data, err := ioutil.ReadFile(filename)
    if err != nil {
        return
    }
    //读取的数据为json格式，需要进行解码
    err = json.Unmarshal(data, v)
    if err != nil {
        return
    }
    return
}
`;
}