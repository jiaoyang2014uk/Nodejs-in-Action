//代码清单2-1 定义一个Node模块
const canadianDollar = 0.91;

function roundTwo(dollar) {
    return Math.round(dollar * 100) / 100;
}

exports.canadianToUs = canadian => roundTwo(canadian * canadianDollar); 
exports.usToCanadian = us => roundTwo(us / canadianDollar);