
const chatBox = document.getElementById('chat-box');

function displayUserMessage(message) {
    return new Promise(resolve => {
        const messageElement = document.createElement('div');
        messageElement.className = 'user-message';
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        scrollToBottom(); // 新消息后自动滚动到底部
        setBubbleWidth(messageElement); // 设置对话气泡的宽度
        messageElement.style.position = "relative";
        let width = Number.parseInt(messageElement.style.width.replace("px",""));
        width = width > 258 ? 238 :width;
        messageElement.style.right = 'calc( -100% + '+(width+20)+'px)';
        setTimeout(resolve, 1000); // 延迟一秒后解析Promise
    });
}

function displayOtherMessage(message) {
    return new Promise(resolve => {
        const messageElement = document.createElement('div');
        messageElement.className = 'other-message';
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        scrollToBottom(); // 新消息后自动滚动到底部
        setBubbleWidth(messageElement); // 设置对话气泡的宽度
        setTimeout(resolve, 1000); // 延迟一秒后解析Promise
    });
}


// 设置对话气泡的宽度
function setBubbleWidth(element) {
    const charactersPerLine = 45; // 每行字符数，可以根据实际情况调整
    const messageLength = element.textContent.length;
    const numberOfLines = Math.ceil(messageLength / charactersPerLine);
    const maxWidth = 450; // 对话气泡的最大宽度，可以根据实际情况调整

    // 根据消息长度调整对话气泡的宽度
    const calculatedWidth = Math.min(messageLength * 16, maxWidth); // 15 是一个经验值，可以根据实际情况调整

    element.style.width = `${calculatedWidth}px`
}

// 对话函数
async function conversation() {
    // 显示其他角色的对话开头
    await displayOtherMessage("喂！那边的人");

    // 显示玩家的选项1
    displayOptions(["N！！你终于来了！"], ["chooseOption1"]);

    // 对话继续在每个选项的回调函数中
}

// 玩家选项1的回调函数
async function chooseOption1() {
    await displayUserMessage("N！！你终于来了！");
    await displayOtherMessage("好久不见");

    // 显示玩家的选项2
    await displayOptions(["真的好久不见……"], ["chooseOption2"]);
}

// 玩家选项2的回调函数
async function chooseOption2() {
    await displayUserMessage("真的好久不见……");
    await displayOtherMessage("那盆花你还有在浇水吗？");

    // 显示玩家的选项3
    await displayOptions(["有！！我养得可好了！",  "说实话……你那盆花早就死了，我给你买了一盆新的……"], ["chooseOption3", "chooseOption4"]);
}

// 玩家选项3的回调函数
async function chooseOption3() {
    await displayUserMessage("有！！我养得可好了！");
    await displayOtherMessage("呵呵，无所谓的");
    await displayOtherMessage("对了……");

    // 显示玩家的选项4
    await displayOptions(["新任务？"], ["chooseOption5"]);
}

// 玩家选项4的回调函数
async function chooseOption4() {
    await displayUserMessage("说实话……你那盆花早就死了，我给你买了一盆新的……");
    await displayOtherMessage("呵呵，无所谓的");
    await displayOtherMessage("对了……");

    // 显示玩家的选项4
    await displayOptions(["新任务？"], ["chooseOption5"]);
}

// 玩家选项5的回调函数
async function chooseOption5() {
    await displayUserMessage("新任务？");
    await displayOtherMessage("对，这次的任务和往常不一样……");

    // 显示玩家的选项6
    await displayOptions(["哪里不一样？"], ["chooseOption6"]);
}

// 玩家选项6的回调函数
async function chooseOption6() {
    await displayUserMessage("哪里不一样？");
    await displayOtherMessage("我先更新报告，你看了就知道了。");

    // 显示玩家的选项7
    await displayOptions(["又是这样……", "好，我去看！"], ["chooseOption7", "chooseOption8"]);
}

// 玩家选项7的回调函数
async function chooseOption7() {
    await displayUserMessage("又是这样……");
    await displayOtherMessage("什么样？");

    // 显示玩家的选项8
    await displayOptions(["遇到麻烦才想起我……"], ["chooseOption9"]);
}

// 玩家选项8的回调函数
async function chooseOption8() {
    await displayUserMessage("好，我去看！");
    // 这里执行你的跳转逻辑或其他操作

    // 跳转到结束对话
    endConversation();
}


// 玩家选项9的回调函数
async function chooseOption9() {
    await displayUserMessage("遇到麻烦才想起我……");
    await displayOtherMessage("……");
    await displayOtherMessage("好吧。我向你道歉");


    // 显示玩家的选项10
    await displayOptions(["哼！"], ["chooseOption10"]);
}

// 玩家选项10的回调函数
async function chooseOption10() {
    await displayUserMessage("哼！");
     // 跳转到结束对话
     endConversation();
    }

// 结束对话的函数
function endConversation() {
    // 在此添加你的结束对话逻辑
      // 创建按钮元素
      const button = document.createElement('button');
      button.textContent = '【N的调查报告】一';
      // 添加自定义样式
    button.style.backgroundColor = '#000'; // 黑色背景
    button.style.color = '#fff'; // 白色字体
    button.style.padding = '10px 20px'; // 添加一些内边距
    button.style.border = 'none'; // 去掉边框
    button.style.borderRadius = '5px'; // 添加圆角
      // 添加点击事件监听器
      button.addEventListener('click', function() {
          // 在点击按钮时跳转到另一个页面
          window.location.href = 'article.html';
      });
      // 将按钮添加到聊天框中
      chatBox.appendChild(button);

    // 隐藏选项按钮
    hideOptions();
}

// 隐藏选项按钮的函数
function hideOptions() {
    const userInput = document.getElementById('user-input');
    userInput.innerHTML = ''; // 清空之前的选项
}


// 显示玩家的选项
function displayOptions(options, callbacks) {
    return new Promise(resolve => {
        const userInput = document.getElementById('user-input');
        userInput.innerHTML = ''; // 清空之前的选项

        if (options.length > 0) {
            options.forEach((option, index) => {
                const button = document.createElement('button');
                button.textContent = option;
                button.onclick = async function() {
                    userInput.innerHTML = ''; // 清空选项按钮
                    await window[callbacks[index]](); // 执行选项的回调函数
                    resolve(); // 解析Promise
                };
                userInput.appendChild(button);
            });
        }
    });
}

// 自动滚动到底部的函数
function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}


// 初始化
conversation();