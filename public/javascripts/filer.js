const fs = require('fs-extra')
const path = require('path')
const rd = require('rd')


let dir = 'D:/tal'
let exists = fs.existsSync('D:/tal/shuangshi-blackboard/log.log')
// console.info(exists)
/**
 * 获取指定目录内所有文件大小总和  单位为字节
 * @param dir
 * @param callback
 */
function getdirsize(dir,callback){
    var size = 0;
    fs.stat(dir,function(err,stats){
        if(err) return callback(err);//如果出错
        if(stats.isFile()) return callback(null,stats.size);//如果是文件
        fs.readdir(dir,function(err,files){//如果是目录
            if(err) return callback(err);//如果遍历目录出错
            if(files.length==0) return callback(null,0);//如果目录是空的

            var count = files.length;//哨兵变量
            for(var i = 0;i<files.length;i++){
                getdirsize(path.join(dir,files[i]),function(err,_size){
                    if(err) return callback(err);
                    size += _size;
                    if(--count<=0){//如果目录中所有文件(或目录)都遍历完成
                        callback(null,size);
                    }
                });
            }
        });
    });
}
// getdirsize(dir, function(backnull, size) {
//     // console.log('size------',size/1024/1024/1024)
//     // fs.readdir(dir, (err, files) => {
//     //     if (err) {
//     //     console.log(err);
//     //     return;
//     //     }
        
//     //     files.forEach(fileName => {
//     //         // path.join得到当前文件的绝对路径
//     //         const filepath = path.join(dir, fileName);
//     //         // 根据文件路径获取文件信息
//     //         fs.stat(filepath, (error, stats) => {
//     //             if (error) {
//     //               console.log('获取文件stats失败');
//     //               return;
//     //             }
//     //             console.log('--files----------', filepath, stats)
//     //         });
//     //     })
//     // })
// })
fs.stat(dir, function (err, stats) {
    console.log('stats', stats.size)
})

 

// var walk = function(dir, done) {
//     var size = 0;
//     fs.readdir(dir, function(err, list) {
//         if (err) return done(err);
//         var pending = list.length;
//         if (!pending) return done(null, size);
//         list.forEach(function(file) {
//             file = path.resolve(dir, file);
//             fs.stat(file, function(err, stat) {
//                 if (stat && stat.isDirectory()) {
//                     walk(file, function(err, res) {
//                         size = size+res;
//                         if (!--pending) done(null, size);
//                     });
//                 } else {
//                     size = size+stat.size;
//                     if (!--pending) done(null, size);
//                 }
//             });
//         });
//     });
// };
// walk(dir, function(backnull, size) {
//     console.log('walk size------',size)
// })




