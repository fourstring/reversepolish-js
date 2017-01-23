/**
 * Created by fourstring on 17/1/22.
 */
function compare(firstOperator, secondOperator) {
    if (((firstOperator == "+") || (firstOperator == "-")) && ((secondOperator == "*") || (secondOperator == "/"))) {
        return -1; //第一个操作符的优先级较小
    } else if ((((firstOperator == "+") || (firstOperator == "-")) && ((secondOperator == "+") || (secondOperator == "-"))) || (
        ((firstOperator == "*") || (firstOperator == "/")) && ((secondOperator == "*") || (secondOperator == "/")))) {
        return 0; //二者具有相等的优先级
    } else {
        return 1; //第一个操作符的优先级较大
    }
}
function turnReversePolish(expression) {
    var echoList = [];
    var operatorStack = [];
    var marks = expression.split(" ");
    for (var k in marks) {
        var i = marks[k];
        switch (Boolean(parseFloat(i))) {
            case true: //如果记号为数字
                echoList.push(parseFloat(i));
                break;
            case false:
                var stackTopOperator = false;
                if ("+-*/".indexOf(i) >= 0) { //如果记号是操作符
                    do {
                        if (compare(i, operatorStack[operatorStack.length - 1]) <= 0) {
                            stackTopOperator = true;
                            echoList.push(operatorStack.pop());
                        } else {
                            stackTopOperator = false;
                        }
                    } while (stackTopOperator);
                    operatorStack.push(i);
                }
                if (i == "(") { //如果记号是左括号
                    operatorStack.push(i);
                }
                if (i == ")") { //如果记号是右括号
                    while (true) {
                        if (!Boolean(operatorStack.indexOf("(") + 1)) {
                            return false;
                        }
                        var temp = operatorStack.pop();
                        if (temp != "(") {
                            echoList.push(temp);
                        } else {
                            break;
                        }
                    }
                }
                break;
            default:
                return false;
        }
    }
    do {
        var topOperator = operatorStack[operatorStack.length - 1];
        if (topOperator) {
            if ((topOperator == "(") || (topOperator == ")")) {
                return false;
            } else {
                echoList.push(operatorStack.pop())
            }
        }
    } while (topOperator);
    var resultReversePolish = "";
    for (var j in echoList) {
        resultReversePolish = resultReversePolish + echoList[j] + " ";
    }
    document.getElementById('compute').className = 'btn btn-success btn-block';
    document.getElementById('compute').disabled = '';
    document.getElementById('computeResult').value = resultReversePolish;
    return resultReversePolish;
}
function computeReversePolish(theReversePolish) {
    if (!theReversePolish) {
        document.getElementById('computeResult').value = "转换失败！存在未配对的括号！";
        document.getElementById('compute').className = 'btn btn-danger btn-block';
        document.getElementById('compute').disabled = 'disabled';
        return;
    }
    theReversePolish = theReversePolish.substring(0, theReversePolish.length - 1);
    var computeStack = [];
    var marks = theReversePolish.split(' ');
    for (var i in marks) {
        var k = marks[i];
        if (parseFloat(k)) {
            computeStack.push(k);
        } else if ("+-*/".indexOf(marks[i]) >= 0) {
            if (computeStack.length < 2) {
                document.getElementById('computeResult').value = "计算失败！操作数过少！";
                document.getElementById('compute').className = 'btn btn-danger btn-block';
                document.getElementById('compute').disabled = 'disabled';
                return;
            } else {
                var opNumber1=computeStack.pop();
                var opNumber2=computeStack.pop();
                var result = eval(opNumber2 + marks[i] + opNumber1);
                computeStack.push(result);
            }
        }
    }
    if (computeStack.length == 1) {
        document.getElementById('computeResult').value = computeStack[0];
        document.getElementById('compute').disabled = 'disabled';
    } else {
        document.getElementById('computeResult').value = "计算失败！操作数过多！";
        document.getElementById('compute').className = 'btn btn-danger btn-block';
        document.getElementById('compute').disabled = 'disabled';
    }
}