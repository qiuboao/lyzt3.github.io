
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

    displayOptions(["你说你很尊敬王明？"], ["chooseOption1"]);


}

async function chooseOption1() {
    await displayUserMessage("你说你很尊敬王明？");
    await displayOtherMessage("嗯，能在某个领域做到有建树的人都值得尊敬");


    await displayOptions(["你说他像你爷爷……","他是个什么感觉的人？"], [ "chooseOption2","chooseOption3"]);
}

async function chooseOption2() {
    await displayUserMessage("你说他像你爷爷……");
    await displayOtherMessage("他的整个人看上去很沉稳，瘦小的一个小老头，精气神很好，说话不紧不慢，是那种饱经风霜充满智慧的老人");
    await displayOtherMessage("说他像我爷爷，只是觉得他对我有一种对小辈的慈爱");

    await displayOptions(["很难想象你会被当成小辈……","像老秦对你吗？"], [ "chooseOption4","chooseOption5"]);
}


async function chooseOption3() {
    await displayUserMessage("他是个什么感觉的人？");
    await displayOtherMessage("他的整个人看上去很沉稳，瘦小的一个小老头，精气神很好，说话不紧不慢，是那种饱经风霜充满智慧的老人");
    await displayOtherMessage("说他像我爷爷，只是觉得他对我有一种对小辈的慈爱");
    await displayOptions(["很难想象你会被当成小辈……","像老秦对你吗？"], [ "chooseOption4","chooseOption5"]);
}

async function chooseOption4() {
    await displayUserMessage("很难想象你会被当成小辈……");
    await displayOtherMessage("是吗，我觉得还好");
    await displayOptions(["王明这样对你，你是怎么想的呢？"], ["chooseOption6"]);
}


async function chooseOption5() {
    await displayUserMessage("像老秦对你吗？");
    await displayOtherMessage("老秦？不，这不一样");
    await displayOtherMessage("老秦给我的感觉更像父亲");

    await displayOptions(["王明这样对你，你是怎么想的呢？"], ["chooseOption6"]);
}

async function chooseOption6() {
    await displayUserMessage("王明这样对你，你是怎么想的呢？");
    await displayOtherMessage("我不喜欢这种感觉，但我说不上来");
    await displayOptions(["嗯……"], ["chooseOption7"]);
}

async function chooseOption7() {
        await displayUserMessage("嗯……");
    
        // 跳转到结束对话
        endConversation();
    }

    async function chooseOption11() {
        await displayUserMessage("没关系！！你现在有我陪你！");

    // 跳转到结束对话
    endConversation();}

// 结束对话的函数
function endConversation() {
    // 在此添加你的结束对话逻辑
      // 创建按钮元素
      const button = document.createElement('button');
      button.textContent = '返回【线索】';
      // 添加自定义样式
    button.style.backgroundColor = '#000'; // 黑色背景
    button.style.color = '#fff'; // 白色字体
    button.style.padding = '10px 20px'; // 添加一些内边距
    button.style.border = 'none'; // 去掉边框
    button.style.borderRadius = '5px'; // 添加圆角
      // 添加点击事件监听器
      button.addEventListener('click', function() {
          // 在点击按钮时跳转到另一个页面
          window.location.href = 'clue.html';
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